import { digitalClockFormat } from '../../../../src/utils/time'

describe('digitalClockFormat', () => {
  it('Should split seconds in minutes and seconds', () => {
    expect(digitalClockFormat(80)).toBe('00:01:20')
    expect(digitalClockFormat(120)).toBe('00:02:00')
  })
  it('Should show 0 minutes if less than 60 seconds', () => {
    expect(digitalClockFormat(39)).toBe('00:00:39')
  })
  it('Should accept custom sperator', () => {
    expect(digitalClockFormat(80, { separator: '.' })).toBe('00.01.20')
  })
  it('Should not return negative number', () => {
    expect(digitalClockFormat(458)).toBe('00:07:38')
  })
  it('Should hide seconds if required', () => {
    expect(digitalClockFormat(4335)).toBe('01:12:15')
    expect(digitalClockFormat(4335, {
      showSeconds: false
    })).toBe('01:12')
    expect(digitalClockFormat(4335, {
      showSeconds: false,
      showMinutes: false
    })).toBe('01')
    expect(digitalClockFormat(4335, {
      showHours: false
    })).toBe('72:15')
  })
})
