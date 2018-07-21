import findWordForward from './find-word-forward'
import findSubWordForward from './find-sub-word-forward'
import findOneCharForward from './find-one-char-forward'
import findTwoCharsForward from './find-two-chars-forward'

const moveToNextSubWord = (props) => {
  const result = findSubWordForward(props)

  console.log(
    props.str.slice(0, result.pos) + '|' + props.str.slice(result.pos)
  )
}

const deleteTillNextWord = (props) => {
  const result = findWordForward(props)
  const newStr = props.str.slice(0, props.pos) + props.str.slice(result.pos)
  const newPos = result.pos - (result.pos - props.pos)

  console.log(
    newStr.slice(0, newPos) + '|' + newStr.slice(newPos)
  )
}

const findOneChar = (props) => {
  const result = findOneCharForward(props)

  console.log(
    props.str.slice(0, result.pos) + '|' + props.str.slice(result.pos)
  )
}

const findTwoChars = (props) => {
  const result = findTwoCharsForward(props)

  console.log(
    props.str.slice(0, result.pos) + '|' + props.str.slice(result.pos)
  )
}

moveToNextSubWord({
  str: 'foo-AABarBaz',
  pos: 0
})

deleteTillNextWord({
  str: 'foo bar baz',
  pos: 2
})

findOneChar({
  str: 'foo bar baz',
  pos: 0,
  char: 'z'
})

findTwoChars({
  str: 'foo bar baz',
  pos: 0,
  chars: ['a', 'r']
})
