import {
  T_WORD,
  T_SPACE,
  T_QUESTION_MARK,
  T_EXLAMATION_MARK,
  T_LEFT_PARENTHESIS,
  T_RIGHT_PARENTHESIS,
  T_LEFT_CURLY_BRACKET,
  T_RIGHT_CURLY_BRACKET,
  T_LESS_THAN_SIGN,
  T_GREATER_THAN_SIGN,
  I_FROM,
  I_TO,
  I_TYPE,
  I_VALUE
} from './constants'

export type Options = { [key: string]: any }
export type Token = [number, number, string, string]
export type Line = Token[]
export type Lines = Line[]

const tokenizer = (options?: Options) => (txt: string): Lines => {
  const max = txt.length
  const lines: Lines = []
  let tokens: Line = []
  let li = 0
  let ci = 0
  let ti = -1

  while (true) {
    if (ci === max) {
      lines[li] = tokens
      break
    }

    const char = txt[ci]

    if (char === '\n') {
      lines[li] = tokens
      tokens = []
      lines[++li] = tokens
      ti = -1
      ci++
      continue
    }

    if (char === ' ') {
      if (ti >= 0 && tokens[ti][I_TYPE] === T_SPACE) {
        tokens[ti][I_TO] = ci++
        tokens[ti][I_VALUE] += char
        continue
      }

      tokens[++ti] = [ci++, ci, T_SPACE, char]
      continue
    }

    if (char === '?') {
      tokens[++ti] = [ci++, ci, T_QUESTION_MARK, char]
      continue
    }

    if (char === '!') {
      tokens[++ti] = [ci++, ci, T_EXLAMATION_MARK, char]
      continue
    }

    if (char === '(') {
      tokens[++ti] = [ci++, ci, T_LEFT_PARENTHESIS, char]
      continue
    }

    if (char === ')') {
      tokens[++ti] = [ci++, ci, T_RIGHT_PARENTHESIS, char]
      continue
    }

    if (char === '{') {
      tokens[++ti] = [ci++, ci, T_LEFT_CURLY_BRACKET, char]
      continue
    }

    if (char === '}') {
      tokens[++ti] = [ci++, ci, T_RIGHT_CURLY_BRACKET, char]
      continue
    }

    if (char === '<') {
      tokens[++ti] = [ci++, ci, T_LESS_THAN_SIGN, char]
      continue
    }

    if (char === '>') {
      tokens[++ti] = [ci++, ci, T_GREATER_THAN_SIGN, char]
      continue
    }

    if (ti >= 0 && tokens[ti][I_TYPE] === T_WORD) {
      tokens[ti][I_TO] = ci++
      tokens[ti][I_VALUE] += char
      continue
    }

    tokens[++ti] = [ci++, ci, T_WORD, char]
    continue
  }

  return lines
}

export default tokenizer
