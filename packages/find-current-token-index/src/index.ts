// TODO: transpile back on build
// eslint-disable-next-line node/no-missing-import
import { TLine } from '@txt/tokenizer/src/'
import binarySearch from 'bsc'

const findCurrentTokenIndex = (line: TLine, x: number) => {
  return binarySearch(line, x, (key, token) => {
    if (key < token.from && key < token.to) {
      return -1
    }

    if (key > token.from && key > token.to) {
      return 1
    }

    return 0
  })
}

export default findCurrentTokenIndex
