import { getFileExtension, sizeToBytes } from './files'

describe('utils > files > getFileExtension...', () => {
  it('should return correct file extension with valid input', () => {
    expect(getFileExtension('test.test')).toBe('test')
  })

  it('should return correct lowercase file extension with valid uppercase input', () => {
    expect(getFileExtension('test.TEST')).toBe('test')
  })

  it('should return empty string if not given string input', () => {
    expect(getFileExtension({ filename: 'test.test' })).toBe('')
  })

  it('should return last extension if multiple periods in filename', () => {
    expect(getFileExtension('test.test1.test2')).toBe('test2')
  })

  it('should return empty string if no input given', () => {
    expect(getFileExtension()).toBe('')
  })
})

describe('utils > files > sizeToBytes...', () => {
  it('should return correct filesize given bytes less than 1KB without suffix', () => {
    expect(sizeToBytes('999')).toBe(999)
  })

  it('should return correct filesize given bytes greater than 1KB without suffix', () => {
    expect(sizeToBytes('123456')).toBe(123456)
  })

  it('should return correct filesize given bytes with "K" suffix', () => {
    expect(sizeToBytes('123 K')).toBe(123 * 1024)
    expect(sizeToBytes('123 k')).toBe(123 * 1024)
  })

  it('should return correct filesize given bytes with "M" suffix', () => {
    expect(sizeToBytes('123 M')).toBe(123 * 1024 * 1024)
    expect(sizeToBytes('123 m')).toBe(123 * 1024 * 1024)
  })

  it('should return correct filesize given bytes with "G" suffix', () => {
    expect(sizeToBytes('123 G')).toBe(123 * 1024 * 1024 * 1024)
    expect(sizeToBytes('123 g')).toBe(123 * 1024 * 1024 * 1024)
  })

  it('should return 0 if passed empty string, null, or undefined', () => {
    expect(sizeToBytes('')).toBe(0)
    expect(sizeToBytes(null)).toBe(0)
    expect(sizeToBytes(undefined)).toBe(0)
  })

  it('should throw error if input with incorrect suffix is given', () => {
    expect(sizeToBytes.bind(null, '123 Z')).toThrow(Error)
  })

  it('should throw error if input cannot be parsed into float', () => {
    expect(sizeToBytes.bind(null, '123P3 M')).toThrow(Error)
    expect(sizeToBytes.bind(null, '123P3')).toThrow(Error)
  })
})
