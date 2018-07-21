const findTwoCharsForward = ({ str, pos, chars }) => {
  let i = pos

  while (i < str.length) {
    if (
      i > pos &&
      str.charAt(i - 1) === chars[0] &&
      str.charAt(i) === chars[1]
    ) {
      return { pos: i - 1 }
    }

    i++
  }

  return { pos }
}

export default findTwoCharsForward
