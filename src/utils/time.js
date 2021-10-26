export function digitalClockFormat (seconds, options = {}) {
  const { separator, showSeconds, showMinutes, showHours } = {
    separator: ':',
    showSeconds: true,
    showMinutes: true,
    showHours: true,
    ...options
  }
  const secondsInsideAMinute = 60
  const minutesInsideAnHour = 60
  let minutes =
    seconds < secondsInsideAMinute
      ? 0
      : Math.floor(seconds / secondsInsideAMinute)
  const hours = minutes < minutesInsideAnHour
    ? 0
    : Math.floor(minutes / minutesInsideAnHour)

  if (showHours && hours > 0) {
    minutes = minutes - hours * minutesInsideAnHour
    seconds = seconds - hours * minutesInsideAnHour * secondsInsideAMinute
  }

  if (showMinutes) {
    seconds = seconds - minutes * secondsInsideAMinute
  }

  const result = []
  const addTime = (time) => {
    result.push(leadingZero(time))
  }
  if (showHours) addTime(hours)
  if (showMinutes) addTime(minutes)
  if (showSeconds) addTime(seconds)
  return result.join(separator)
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
