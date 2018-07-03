import isCharSeparator from './is-char-separator'
import isCharLowerCase from './is-char-lower-case'
import isCharUpperCase from './is-char-upper-case'

const findSubWordForward = ({ str, pos }) => {
  let i = pos

  while (i < str.length) {
    // squash and skip separators
    if (isCharSeparator(str.charAt(i))) {
      i++
      continue
    }

    // |_bar => _|bar
    if (
      i > pos &&
      isCharSeparator(str.charAt(i - 1)) &&
      !isCharSeparator(str.charAt(i))
    ) {
      return { pos: i }
    }

    // |fooBar => foo|Bar
    if (
      i > pos &&
      isCharLowerCase(str.charAt(i - 1)) &&
      isCharUpperCase(str.charAt(i))
    ) {
      return { pos: i }
    }

    // |FOOBar => FOO|Bar
    if (
      i - 1 > pos &&
      isCharUpperCase(str.charAt(i - 2)) &&
      isCharUpperCase(str.charAt(i - 1)) &&
      isCharLowerCase(str.charAt(i))
    ) {
      return { pos: i - 1 }
    }

    i++
  }

  return { pos }
}

export default findSubWordForward
