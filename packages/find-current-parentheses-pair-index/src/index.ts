// TODO: transpile back on build
import { TPairs } from '@txt/lexer-pairs/src/'
import binarySearch from 'bsc'

export type TTokenPos = {
  x: number,
  y: number
}

const findCurrentParenthesesPairIndex = (pairs: TPairs, tokenPos: TTokenPos) => {
  return binarySearch(pairs, tokenPos, (key, pair) => {
    if (key.y < pair.open.y) {
      return -1
    }

    if (key.y > pair.close.y) {
      return 1
    }

    if (key.y === pair.open.y && key.x < pair.open.x) {
      return -1
    }

    if (key.y === pair.close.y && key.x > pair.close.x) {
      return 1
    }

    return 0
  })
}

export default findCurrentParenthesesPairIndex
