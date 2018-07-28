import test from 'tape'
import { tokenizer } from '@txt/tokenizer/src/'

import {
  lexerPairs,
  T_PAIR_PARENTHESES,
  T_PAIR_DOUBLE_QUOTES,
  T_PAIR_SINGLE_QUOTES,
  T_PAIR_BACKTICKS
} from '../src/'

test('lexer-pairs', (t) => {
  const tokenize = tokenizer()

  t.deepEqual(
    lexerPairs(
      tokenize('(foo)')
    ),
    [
      {
        type: T_PAIR_PARENTHESES,
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
        type: T_PAIR_PARENTHESES,
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
        type: T_PAIR_PARENTHESES,
        open: { x: 0, y: 0 },
        close: { x: 8, y: 0 }
      },
      {
        type: T_PAIR_PARENTHESES,
        open: { x: 3, y: 0 },
        close: { x: 5, y: 0 }
      }
    ],
    'nested parentheses, sorted'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('(foo)(\n(bar)\nbaz)')
    ),
    [
      {
        type: T_PAIR_PARENTHESES,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      },
      {
        type: T_PAIR_PARENTHESES,
        open: { x: 3, y: 0 },
        close: { x: 1, y: 2 }
      },
      {
        type: T_PAIR_PARENTHESES,
        open: { x: 0, y: 1 },
        close: { x: 2, y: 1 }
      }
    ],
    'multiline nested parentheses, sorted'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('"foo"')
    ),
    [
      {
        type: T_PAIR_DOUBLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      }
    ],
    'double quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('"f\'o\'o"')
    ),
    [
      {
        type: T_PAIR_DOUBLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 6, y: 0 }
      }
    ],
    'single quotes inside of double quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('"f`o`o"')
    ),
    [
      {
        type: T_PAIR_DOUBLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 6, y: 0 }
      }
    ],
    'backticks inside of double quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('"fo(o)"')
    ),
    [
      {
        type: T_PAIR_DOUBLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 5, y: 0 }
      }
    ],
    'parentheses inside of double quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('\'foo\'')
    ),
    [
      {
        type: T_PAIR_SINGLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      }
    ],
    'single quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('\'f"o"o\'')
    ),
    [
      {
        type: T_PAIR_SINGLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 6, y: 0 }
      }
    ],
    'double quotes inside of single quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('\'f`o`o\'')
    ),
    [
      {
        type: T_PAIR_SINGLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 6, y: 0 }
      }
    ],
    'backticks inside of single quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('\'fo(o)\'')
    ),
    [
      {
        type: T_PAIR_SINGLE_QUOTES,
        open: { x: 0, y: 0 },
        close: { x: 5, y: 0 }
      }
    ],
    'parentheses inside of single quotes'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('`foo`')
    ),
    [
      {
        type: T_PAIR_BACKTICKS,
        open: { x: 0, y: 0 },
        close: { x: 2, y: 0 }
      }
    ],
    'backticks'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('`f"o"o`')
    ),
    [
      {
        type: T_PAIR_BACKTICKS,
        open: { x: 0, y: 0 },
        close: { x: 6, y: 0 }
      }
    ],
    'double quotes inside of backticks'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('`f\'o\'o`')
    ),
    [
      {
        type: T_PAIR_BACKTICKS,
        open: { x: 0, y: 0 },
        close: { x: 6, y: 0 }
      }
    ],
    'single quotes inside of backticks'
  )

  t.deepEqual(
    lexerPairs(
      tokenize('`fo(o)`')
    ),
    [
      {
        type: T_PAIR_BACKTICKS,
        open: { x: 0, y: 0 },
        close: { x: 5, y: 0 }
      }
    ],
    'parentheses inside of backticks'
  )

  t.end()
})
