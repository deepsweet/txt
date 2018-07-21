const SEPARATORS = [
  ' ',
  '\t',
  '_',
  '-',
  '+',
  '<',
  '>',
  '{',
  '}',
  '(',
  ')',
  '[',
  ']',
  '/',
  '|',
  '\\'
]

const isCharSeparator = (char) => SEPARATORS.indexOf(char) >= 0

export default isCharSeparator
