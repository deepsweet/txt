import test from 'tape'

import {
  tokenizer,
  T_WORD,
  T_SPACE
} from '../src/'

const tokenize = tokenizer()

test('tokenizer: words', (t) => {
  t.deepEqual(
    tokenize('h'),
    [
      [
        [0, 0, T_WORD, 'h']
      ]
    ],
    'single char'
  )

  t.deepEqual(
    tokenize('hello'),
    [
      [
        [0, 4, T_WORD, 'hello']
      ]
    ],
    'single word'
  )

  t.end()
})

test('tokenizer: space', (t) => {
  t.deepEqual(
    tokenize('hello world'),
    [
      [
        [0, 4, T_WORD, 'hello'],
        [5, 5, T_SPACE, ' '],
        [6, 10, T_WORD, 'world']
      ]
    ],
    'multiple words with single space'
  )

  t.deepEqual(
    tokenize('hello  world'),
    [
      [
        [0, 4, T_WORD, 'hello'],
        [5, 6, T_SPACE, '  '],
        [7, 11, T_WORD, 'world']
      ]
    ],
    'multiple words with multiple spaces'
  )

  t.end()
})

test('tokenizer: lines', (t) => {
  t.deepEqual(
    tokenize('hello\nworld'),
    [
      [
        [0, 4, T_WORD, 'hello']
      ],
      [
        [0, 4, T_WORD, 'world']
      ]
    ],
    'multiple lines'
  )

  t.deepEqual(
    tokenize('\nhello\n\n\nworld\n'),
    [
      [],
      [
        [0, 4, T_WORD, 'hello']
      ],
      [],
      [],
      [
        [0, 4, T_WORD, 'world']
      ],
      []
    ],
    'empty lines'
  )

  t.end()
})
