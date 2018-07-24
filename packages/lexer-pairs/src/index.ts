import {
  TLines,
  T_LEFT_PARENTHESIS,
  T_RIGHT_PARENTHESIS
} from '@txt/tokenizer/src/'

export const T_PARENTHESES = 'PARENTHESES'

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
    [T_PARENTHESES]: []
  }
  const result = []

  for (let li = 0; li < lines.length; li++) {
    const tokens = lines[li]

    for (let ti = 0; ti < tokens.length; ti++) {
      const token = tokens[ti]

      if (token.type === T_LEFT_PARENTHESIS) {
        pairs[T_PARENTHESES].push({
          x: ti,
          y: li
        })
        continue
      }

      if (token.type === T_RIGHT_PARENTHESIS && pairs[T_PARENTHESES].length > 0) {
        result.push({
          open: pairs[T_PARENTHESES].pop(),
          close: {
            x: ti,
            y: li
          },
          type: T_PARENTHESES
        })
        continue
      }
    }
  }

  return result
}
