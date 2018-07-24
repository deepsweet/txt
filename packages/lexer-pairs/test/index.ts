import test from 'tape'
import { tokenizer } from '@txt/tokenizer/src/'

import { lexerPairs, T_PARENTHESES } from '../src/'

test('lexer-pairs', (t) => {
  const tokenize = tokenizer()

  t.deepEqual(
    lexerPairs(
      tokenize('(foo (bar) baz)')
    ),
    [
      { open: { x: 3, y: 0 }, close: { x: 5, y: 0 }, type: T_PARENTHESES },
      { open: { x: 0, y: 0 }, close: { x: 8, y: 0 }, type: T_PARENTHESES }
    ],
    'nested parentheses'
  )

  t.end()
})
