const findOneCharForward = ({ str, pos, char }) => {
  let i = pos

  while (i < str.length) {
    if (str.charAt(i) === char) {
      return { pos: i }
    }

    i++
  }

  return { pos }
}

export default findOneCharForward
