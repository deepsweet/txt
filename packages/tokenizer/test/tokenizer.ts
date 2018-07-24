import test from 'tape'

import {
  tokenizer,
  T_WORD,
  T_SPACE,
  T_LEFT_PARENTHESIS,
  T_RIGHT_PARENTHESIS,
  T_DOUBLE_QUOTE,
  T_SINGLE_QUOTE
} from '../src/'

test('tokenizer', (t) => {
  const tokenize = tokenizer()

  t.deepEqual(
    tokenize('h'),
    [
      [
        {
          type: T_WORD,
          from: 0,
          to: 0,
          value: 'h'
        }
      ]
    ],
    'single char'
  )

  t.deepEqual(
    tokenize('hello'),
    [
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'hello'
        }
      ]
    ],
    'single word'
  )

  t.deepEqual(
    tokenize('hello world'),
    [
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'hello'
        },
        {
          type: T_SPACE,
          from: 5,
          to: 5,
          value: ' '
        },
        {
          type: T_WORD,
          from: 6,
          to: 10,
          value: 'world'
        }
      ]
    ],
    'multiple words with single space'
  )

  t.deepEqual(
    tokenize('hello  world'),
    [
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'hello'
        },
        {
          type: T_SPACE,
          from: 5,
          to: 6,
          value: '  '
        },
        {
          type: T_WORD,
          from: 7,
          to: 11,
          value: 'world'
        }
      ]
    ],
    'multiple words with multiple spaces'
  )

  t.deepEqual(
    tokenize('hello\nworld'),
    [
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'hello'
        }
      ],
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'world'
        }
      ]
    ],
    'multiple lines'
  )

  t.deepEqual(
    tokenize('\nhello\n\n\nworld\n'),
    [
      [],
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'hello'
        }
      ],
      [],
      [],
      [
        {
          type: T_WORD,
          from: 0,
          to: 4,
          value: 'world'
        }
      ],
      []
    ],
    'empty lines'
  )

  t.deepEqual(
    tokenize('(foo)'),
    [
      [
        {
          type: T_LEFT_PARENTHESIS,
          from: 0,
          to: 0,
          value: '('
        },
        {
          type: T_WORD,
          from: 1,
          to: 3,
          value: 'foo'
        },
        {
          type: T_RIGHT_PARENTHESIS,
          from: 4,
          to: 4,
          value: ')'
        }
      ]
    ],
    'parenthesis'
  )

  t.deepEqual(
    tokenize('"foo"'),
    [
      [
        {
          type: T_DOUBLE_QUOTE,
          from: 0,
          to: 0,
          value: '"'
        },
        {
          type: T_WORD,
          from: 1,
          to: 3,
          value: 'foo'
        },
        {
          type: T_DOUBLE_QUOTE,
          from: 4,
          to: 4,
          value: '"'
        }
      ]
    ],
    'double quotes'
  )

  t.deepEqual(
    tokenize('\'foo\''),
    [
      [
        {
          type: T_SINGLE_QUOTE,
          from: 0,
          to: 0,
          value: '\''
        },
        {
          type: T_WORD,
          from: 1,
          to: 3,
          value: 'foo'
        },
        {
          type: T_SINGLE_QUOTE,
          from: 4,
          to: 4,
          value: '\''
        }
      ]
    ],
    'single quotes'
  )

  t.end()
})
