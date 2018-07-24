import test from 'tape'
import { tokenizer } from '@txt/tokenizer/src/'

import {
  lexerPairs,
  T_PARENTHESES,
  T_DOUBLE_QUOTES
} from '../src/'

test('lexer-pairs', (t) => {
  const tokenize = tokenizer()

  t.deepEqual(
    lexerPairs(
      tokenize('(foo)')
    ),
    [
      {
        type: T_PARENTHESES,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      }
    ],
    'single pair of parentheses'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('(foo))')
    ),
    [
      {
        type: T_PARENTHESES,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      }
    ],
    'unpaired parenthesis'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('(foo (bar) baz)')
    ),
    [
      {
        type: T_PARENTHESES,
        open: { x: 3, y: 0 },
        close: { x: 5, y: 0 }
      },
      {
        type: T_PARENTHESES,
        open: { x: 0, y: 0 },
        close: { x: 8, y: 0 }
      }
    ],
    'nested parentheses'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('"foo"')
    ),
    [
      {
        type: T_DOUBLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      }
    ],
    'double quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('"fo(o)"')
    ),
    [
      {
        type: T_DOUBLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 5, y: 0 }
      }
    ],
    'parentheses inside of double quotes'
  )

  t.end()
})
