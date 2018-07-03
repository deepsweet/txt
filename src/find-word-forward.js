import isCharSeparator from './is-char-separator'

const findWordForward = ({ str, pos }) => {
  let i = pos

  while (i < str.length) {
    // squash and skip separators
    if (isCharSeparator(str.charAt(i))) {
      i++
      continue
    }

    // |foo_bar => foo_|bar
    if (
      i > pos &&
      isCharSeparator(str.charAt(i - 1))
    ) {
      return { pos: i }
    }

    i++
  }

  return { pos }
}

export default findWordForward
