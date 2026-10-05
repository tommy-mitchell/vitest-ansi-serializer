export const cursor = {
  '?25l': 'hide',
  '?25h': 'show',
  '7': 'save',
  '8': 'restore'
} as const;

export const repeatableCursor = {
  A: 'up',
  B: 'down',
  C: 'forward',
  D: 'backward',
  E: 'nextLine',
  F: 'prevLine',
  G: 'left',
  S: 'scrollUp',
  T: 'scrollDown'
} as const;

export const erase = {
  '2J': 'screen',
  J: 'down',
  '0J': 'down',
  '1J': 'up',
  K: 'lineEnd',
  '0K': 'lineEnd',
  '1K': 'lineStart',
  '2K': 'line',
  c: 'reset'
} as const;

export const color = {
  // Reset
  '0m': '/',
  // Styles
  '1m': 'bold',
  '2m': 'dim',
  '3m': 'italic',
  '4m': 'underline',
  '22m': '/bold',
  '23m': '/italic',
  '24m': '/underline',
  // Foreground colors
  '30m': 'black',
  '31m': 'red',
  '32m': 'green',
  '33m': 'yellow',
  '34m': 'blue',
  '35m': 'magenta',
  '36m': 'cyan',
  '37m': 'white',
  '39m': '/fg',
  '90m': 'dim',
  // Background colors
  '40m': 'bg:black',
  '41m': 'bg:red',
  '42m': 'bg:green',
  '43m': 'bg:yellow',
  '44m': 'bg:blue',
  '45m': 'bg:magenta',
  '46m': 'bg:cyan',
  '47m': 'bg:white',
  '49m': '/bg'
} as const;
