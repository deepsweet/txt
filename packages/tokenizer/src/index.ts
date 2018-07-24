export const T_WORD = 'WORD'
export const T_SPACE = 'SPACE'
// export const T_QUESTION_MARK = 'QUESTION_MARK'
// export const T_EXLAMATION_MARK = 'EXLAMATION_MARK'
export const T_LEFT_PARENTHESIS = 'LEFT_PARENTHESIS'
export const T_RIGHT_PARENTHESIS = 'RIGHT_PARENTHESIS'
// export const T_LEFT_CURLY_BRACKET = 'LEFT_CURLY_BRACKET'
// export const T_RIGHT_CURLY_BRACKET = 'RIGHT_CURLY_BRACKET'
// export const T_LESS_THAN_SIGN = 'LESS_THAN_SIGN'
// export const T_GREATER_THAN_SIGN = 'GREATER_THAN_SIGN'

export type TOptions = { [key: string]: any }
export type TToken = {
  from: number,
  to: number,
  type: string,
  value: any
}
export type TLine = TToken[]
export type TLines = TLine[]

export const tokenizer = (options?: TOptions) => (txt: string): TLines => {
  const lines: TLines = []
  let tokens: TLine = []

  for (let gi = 0, ci = 0; gi < txt.length; gi++, ci++) {
    const char = txt[gi]

    if (char === '\n') {
      lines.push(tokens)
      tokens = []
      ci = -1
      continue
    }

    if (char === ' ' && tokens.length > 0) {
      const token = tokens[tokens.length - 1]

      if (token.type === T_SPACE) {
        token.to = ci
        token.value += char
        continue
      }
    }

    if (char === ' ') {
      tokens.push({
        from: ci,
        to: ci,
        type: T_SPACE,
        value: char
      })
      continue
    }

    if (char === '(') {
      tokens.push({
        from: ci,
        to: ci,
        type: T_LEFT_PARENTHESIS,
        value: char
      })
      continue
    }

    if (char === ')') {
      tokens.push({
        from: ci,
        to: ci,
        type: T_RIGHT_PARENTHESIS,
        value: char
      })
      continue
    }

    if (tokens.length > 0) {
      const token = tokens[tokens.length - 1]

      if (token.type === T_WORD) {
        token.to = ci
        token.value += char
        continue
      }
    }

    tokens.push({
      from: ci,
      to: ci,
      type: T_WORD,
      value: char
    })
  }

  lines.push(tokens)

  return lines
}
