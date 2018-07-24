import test from 'tape'

import {
  tokenizer,
  T_WORD,
  T_SPACE
} from '../src/'

test('tokenizer', (t) => {
  const tokenize = tokenizer()

  t.deepEqual(
    tokenize('h'),
    [
      [
        {from: 0, to: 0, type: T_WORD, value: 'h'}
      ]
    ],
    'single char'
  )

  t.deepEqual(
    tokenize('hello'),
    [
      [
        {from: 0, to: 4, type: T_WORD, value: 'hello'}
      ]
    ],
    'single word'
  )

  t.deepEqual(
    tokenize('hello world'),
    [
      [
        {from: 0, to: 4, type: T_WORD, value: 'hello'},
        {from: 5, to: 5, type: T_SPACE, value: ' '},
        {from: 6, to: 10, type: T_WORD, value: 'world'}
      ]
    ],
    'multiple words with single space'
  )

  t.deepEqual(
    tokenize('hello  world'),
    [
      [
        {from: 0, to: 4, type: T_WORD, value: 'hello'},
        {from: 5, to: 6, type: T_SPACE, value: '  '},
        {from: 7, to: 11, type: T_WORD, value: 'world'}
      ]
    ],
    'multiple words with multiple spaces'
  )

  t.deepEqual(
    tokenize('hello\nworld'),
    [
      [
        {from: 0, to: 4, type: T_WORD, value: 'hello'}
      ],
      [
        {from: 0, to: 4, type: T_WORD, value: 'world'}
      ]
    ],
    'multiple lines'
  )

  t.deepEqual(
    tokenize('\nhello\n\n\nworld\n'),
    [
      [],
      [
        {from: 0, to: 4, type: T_WORD, value: 'hello'}
      ],
      [],
      [],
      [
        {from: 0, to: 4, type: T_WORD, value: 'world'}
      ],
      []
    ],
    'empty lines'
  )

  t.end()
})
