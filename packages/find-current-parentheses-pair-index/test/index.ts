import test from 'tape'
import { tokenizer } from '@txt/tokenizer/src/'
import { lexerPairs } from '@txt/lexer-pairs/src/'

import findCurrentParenthesesPairIndex from '../src/'

test('find-current-parentheses-pair-index', (t) => {
  const tokenize = tokenizer()
  const tokens = tokenize('well\n(\nhello\n) (\nworld\n)')
  const pairs = lexerPairs(tokens)

  t.deepEqual(
    findCurrentParenthesesPairIndex(pairs, { x: 0, y: 1 }),
    0,
    'should find first pair'
  )

  t.deepEqual(
    findCurrentParenthesesPairIndex(pairs, { x: 0, y: 4 }),
    1,
    'should find second pair'
  )

  t.deepEqual(
    findCurrentParenthesesPairIndex(pairs, { x: 1, y: 3 }),
    -1,
    'should return -1 if nothing has been found (inner)'
  )

  t.deepEqual(
    findCurrentParenthesesPairIndex(pairs, { x: 0, y: 0 }),
    -1,
    'should return -1 if nothing has been found (leftmost)'
  )

  t.end()
})
