import test from 'tape'
import { tokenizer } from '@txt/tokenizer/src/'

import findCurrentTokenIndex from '../src/'

test('find-current-token-index', (t) => {
  const tokenize = tokenizer()
  const tokens = tokenize('hello world')[0]

  t.deepEqual(
    findCurrentTokenIndex(tokens, 2),
    0,
    'should find first token'
  )

  t.deepEqual(
    findCurrentTokenIndex(tokens, 5),
    1,
    'should find second token'
  )

  t.deepEqual(
    findCurrentTokenIndex(tokens, 9),
    2,
    'should find third token'
  )

  t.deepEqual(
    findCurrentTokenIndex(tokens, 20),
    -1,
    'should return -1 if nothing has been found'
  )

  t.end()
})
