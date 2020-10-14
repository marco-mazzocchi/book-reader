import { digitalClockFormat } from '../../../../src/utils/time'

describe('digitalClockFormat', () => {
  it('Should split seconds in minutes and seconds', () => {
    expect(digitalClockFormat(80)).toBe('01:20')
    expect(digitalClockFormat(120)).toBe('02:00')
  })
  it('Should show 0 minutes if less than 60 seconds', () => {
    expect(digitalClockFormat(39)).toBe('00:39')
  })
  it('Should accept custom sperator', () => {
    expect(digitalClockFormat(80, '.')).toBe('01.20')
  })
  it('Should not return negative number', () => {
    expect(digitalClockFormat(458)).toBe('07:38')
  })
})
