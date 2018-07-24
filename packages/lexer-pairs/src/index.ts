import {
  TLines,
  T_LEFT_PARENTHESIS,
  T_RIGHT_PARENTHESIS,
  // T_SINGLE_QUOTE,
  T_DOUBLE_QUOTE
  // T_BACKTICK
} from '@txt/tokenizer/src/'

export const T_PARENTHESES = 'PARENTHESES'
// export const T_SINGLE_QUOTES = 'SINGLE_QUOTES'
export const T_DOUBLE_QUOTES = 'DOUBLE_QUOTES'
// export const T_BACKTICKS = 'BACKTICKS'

export type TPair = {
  from: {
    x: number,
    y: number
  },
  to: {
    x: number,
    y: number
  },
  type: string
}
export type TPairs = TPair[]

export const lexerPairs = (lines: TLines): TPairs => {
  const pairs = {
    [T_PARENTHESES]: [],
    [T_DOUBLE_QUOTES]: []
  }
  const result = []

  for (let li = 0; li < lines.length; li++) {
    const tokens = lines[li]

    for (let ti = 0; ti < tokens.length; ti++) {
      const token = tokens[ti]

      if (
        token.type === T_LEFT_PARENTHESIS &&
        pairs[T_DOUBLE_QUOTES].length === 0
      ) {
        pairs[T_PARENTHESES].push({ x: ti, y: li })
        continue
      }

      if (
        token.type === T_RIGHT_PARENTHESIS &&
        pairs[T_PARENTHESES].length > 0 &&
        pairs[T_DOUBLE_QUOTES].length === 0
      ) {
        result.push({
          type: T_PARENTHESES,
          open: pairs[T_PARENTHESES].pop(),
          close: { x: ti, y: li }
        })
        continue
      }

      if (token.type === T_DOUBLE_QUOTE && pairs[T_DOUBLE_QUOTES].length > 0) {
        result.push({
          type: T_DOUBLE_QUOTES,
          open: pairs[T_DOUBLE_QUOTES].pop(),
          close: { x: ti, y: li }
        })
        continue
      }

      if (token.type === T_DOUBLE_QUOTE) {
        pairs[T_DOUBLE_QUOTES].push({ x: ti, y: li })
        continue
      }
    }
  }

  return result
}
