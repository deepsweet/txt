import {
  TLines,
  T_TOKEN_LEFT_PARENTHESIS,
  T_TOKEN_RIGHT_PARENTHESIS,
  T_TOKEN_SINGLE_QUOTE,
  T_TOKEN_DOUBLE_QUOTE,
  T_TOKEN_BACKTICK
// TODO: transpile back on build
} from '@txt/tokenizer/src/'

export const T_PAIR_PARENTHESES = 'PARENTHESES'
export const T_PAIR_SINGLE_QUOTES = 'SINGLE_QUOTES'
export const T_PAIR_DOUBLE_QUOTES = 'DOUBLE_QUOTES'
export const T_PAIR_BACKTICKS = 'BACKTICKS'

export type TPair = {
  open: {
    x: number,
    y: number
  },
  close: {
    x: number,
    y: number
  },
  type: string
}
export type TPairs = TPair[]

export const lexerPairs = (lines: TLines): TPairs => {
  const pairs = {
    [T_PAIR_PARENTHESES]: [],
    [T_PAIR_DOUBLE_QUOTES]: [],
    [T_PAIR_SINGLE_QUOTES]: [],
    [T_PAIR_BACKTICKS]: []
  }
  const result = []

  for (let li = 0; li < lines.length; li++) {
    const tokens = lines[li]

    for (let ti = 0; ti < tokens.length; ti++) {
      const token = tokens[ti]

      if (
        token.type === T_TOKEN_LEFT_PARENTHESIS &&
        pairs[T_PAIR_DOUBLE_QUOTES].length === 0 &&
        pairs[T_PAIR_SINGLE_QUOTES].length === 0 &&
        pairs[T_PAIR_BACKTICKS].length === 0
      ) {
        pairs[T_PAIR_PARENTHESES].push({ x: ti, y: li })
        continue
      }

      if (
        token.type === T_TOKEN_RIGHT_PARENTHESIS &&
        pairs[T_PAIR_PARENTHESES].length > 0 &&
        pairs[T_PAIR_DOUBLE_QUOTES].length === 0 &&
        pairs[T_PAIR_SINGLE_QUOTES].length === 0 &&
        pairs[T_PAIR_BACKTICKS].length === 0
      ) {
        result.push({
          type: T_PAIR_PARENTHESES,
          open: pairs[T_PAIR_PARENTHESES].pop(),
          close: { x: ti, y: li }
        })
        continue
      }

      if (
        token.type === T_TOKEN_DOUBLE_QUOTE &&
        pairs[T_PAIR_DOUBLE_QUOTES].length > 0 &&
        pairs[T_PAIR_SINGLE_QUOTES].length === 0 &&
        pairs[T_PAIR_BACKTICKS].length === 0
      ) {
        result.push({
          type: T_PAIR_DOUBLE_QUOTES,
          open: pairs[T_PAIR_DOUBLE_QUOTES].pop(),
          close: { x: ti, y: li }
        })
        continue
      }

      if (
        token.type === T_TOKEN_DOUBLE_QUOTE &&
        pairs[T_PAIR_SINGLE_QUOTES].length === 0 &&
        pairs[T_PAIR_BACKTICKS].length === 0
      ) {
        pairs[T_PAIR_DOUBLE_QUOTES].push({ x: ti, y: li })
        continue
      }

      if (
        token.type === T_TOKEN_SINGLE_QUOTE &&
        pairs[T_PAIR_SINGLE_QUOTES].length > 0 &&
        pairs[T_PAIR_DOUBLE_QUOTES].length === 0 &&
        pairs[T_PAIR_BACKTICKS].length === 0
      ) {
        result.push({
          type: T_PAIR_SINGLE_QUOTES,
          open: pairs[T_PAIR_SINGLE_QUOTES].pop(),
          close: { x: ti, y: li }
        })
        continue
      }

      if (
        token.type === T_TOKEN_SINGLE_QUOTE &&
        pairs[T_PAIR_DOUBLE_QUOTES].length === 0 &&
        pairs[T_PAIR_BACKTICKS].length === 0
      ) {
        pairs[T_PAIR_SINGLE_QUOTES].push({ x: ti, y: li })
        continue
      }

      if (
        token.type === T_TOKEN_BACKTICK &&
        pairs[T_PAIR_BACKTICKS].length > 0 &&
        pairs[T_PAIR_DOUBLE_QUOTES].length === 0 &&
        pairs[T_PAIR_SINGLE_QUOTES].length === 0
      ) {
        result.push({
          type: T_PAIR_BACKTICKS,
          open: pairs[T_PAIR_BACKTICKS].pop(),
          close: { x: ti, y: li }
        })
        continue
      }

      if (
        token.type === T_TOKEN_BACKTICK &&
        pairs[T_PAIR_DOUBLE_QUOTES].length === 0 &&
        pairs[T_PAIR_SINGLE_QUOTES].length === 0
      ) {
        pairs[T_PAIR_BACKTICKS].push({ x: ti, y: li })
        continue
      }
    }
  }

  const sortedResult = result.sort((a, b) => {
    if (a.open.y < b.open.y) {
      return -1
    }

    if (a.open.y > b.open.y) {
      return 1
    }

    return a.open.x - b.open.x
  })

  return result
}
