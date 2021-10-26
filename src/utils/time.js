export function digitalClockFormat (timeInSeconds, separator = ':') {
  const secondsInsideAMinute = 60
  const minutes =
    timeInSeconds < secondsInsideAMinute
      ? 0
      : Math.floor(timeInSeconds / secondsInsideAMinute)
  const seconds = timeInSeconds - minutes * secondsInsideAMinute
  return `${leadingZero(minutes)}${separator}${leadingZero(seconds)}`
}

export function leadingZero (number, spaces = 2) {
  let str = '' + number
  const { length } = str
  if (length >= spaces) return str
  const zeros = spaces - length
  for (let i = 1; i <= zeros; i++) {
    str = '0' + str
  }
  return str
}

export function digitalClockToSeconds (value) {
  const [minutes, seconds] = value.split(':')
  return parseInt(minutes) * 60 + parseInt(seconds)
}
