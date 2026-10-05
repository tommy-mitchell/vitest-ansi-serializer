import type {SnapshotSerializer} from 'vitest';
import * as codes from './codes.ts';

const pattern = /\x1B([78]|\[(?:\?25[lh]|\d+;\d+H|\d*[A-Z]+|\d+m))/g;
const repeatedPattern = /^(?<count>\d*)(?<code>[a-zA-Z])$/;
const lineColumnPattern = /^(?<line>\d+);(?<column>\d+)H$/;

function replaceAnsiCodes(str: string): string {
  return str.replaceAll(pattern, (str, codeOrPrefixed: string) => {
    const code = codeOrPrefixed.replace(/^\[/, '');
    if (code in codes.color) {
      return `<${codes.color[code as never]}>`;
    }
    if (code in codes.cursor) {
      return `<cursor.${codes.cursor[code as never]}>`;
    }
    if (code in codes.erase) {
      return `<erase.${codes.erase[code as never]}>`;
    }
    const repeatMatch = code.match(repeatedPattern);
    if (repeatMatch?.groups) {
      const {count, code: key} = repeatMatch.groups;
      if (key in codes.repeatableCursor) {
        return `<cursor.${codes.repeatableCursor[key as never]} count=${count || 1}>`;
      }
    }
    const lineColumnMatch = code.match(lineColumnPattern);
    if (lineColumnMatch?.groups) {
      const {line: lineNumber, column: lineColumn} = lineColumnMatch.groups;
      return `<cursor.moveTo line=${lineNumber} column=${lineColumn}>`;
    }
    return str;
  });
}

const ansiSerializer: SnapshotSerializer = {
  serialize(val, config, indentation, depth, refs, printer) {
    const newValue = replaceAnsiCodes(val);
    // TODO (43081j): maybe there's a way to not do this?
    // `printer` will call this plugin recursively since the `test` below
    // will always pass for a string.
    // Ideally, the `test` would test that this is a string we haven't already
    // processed. You can't just test for ANSI codes though, as we may not
    // replace all of them so would still enter recursion hell.
    const newConfig = {
      ...config,
      plugins: config.plugins.filter((plugin) => plugin !== ansiSerializer)
    };
    return printer(newValue, newConfig, indentation, depth, refs);
  },
  test(val) {
    return typeof val === 'string';
  }
};

export default ansiSerializer;
