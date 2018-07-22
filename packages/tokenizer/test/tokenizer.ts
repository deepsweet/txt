import test from 'tape'

import { tokenizer, constants } from '../src/'

const tokenize = tokenizer()

test('tokenizer: words', (t) => {
  t.deepEqual(
    tokenize('h'),
    [
      [
        [0, 0, constants.T_WORD, 'h']
      ]
    ],
    'single char'
  )

  t.deepEqual(
    tokenize('hello'),
    [
      [
        [0, 4, constants.T_WORD, 'hello']
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
        [0, 4, constants.T_WORD, 'hello'],
        [5, 5, constants.T_SPACE, ' '],
        [6, 10, constants.T_WORD, 'world']
      ]
    ],
    'multiple words with single space'
  )

  t.deepEqual(
    tokenize('hello  world'),
    [
      [
        [0, 4, constants.T_WORD, 'hello'],
        [5, 6, constants.T_SPACE, '  '],
        [7, 11, constants.T_WORD, 'world']
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
        [0, 4, constants.T_WORD, 'hello']
      ],
      [
        [0, 4, constants.T_WORD, 'world']
      ]
    ],
    'multiple lines'
  )

  t.deepEqual(
    tokenize('\nhello\n\n\nworld\n'),
    [
      [],
      [
        [0, 4, constants.T_WORD, 'hello']
      ],
      [],
      [],
      [
        [0, 4, constants.T_WORD, 'world']
      ],
      []
    ],
    'empty lines'
  )

  t.end()
})
