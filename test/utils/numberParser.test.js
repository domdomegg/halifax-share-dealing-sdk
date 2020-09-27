const nP = require('../../src/utils/numberParser')

// Pounds (£)

it('processes £100.00 correctly', () => {
  expect(nP('£100.00').asFloat).toBe(100)
  expect(nP('£100.00').asText).toBe('£100.00')
})

it('processes £100.01 correctly', () => {
  expect(nP('£100.01').asFloat).toBe(100.01)
})

it('processes £1,000.00 correctly', () => {
  expect(nP('£1,000.00').asFloat).toBe(1000)
})

it('processes £-1,000.00 correctly', () => {
  expect(nP('£-1,000.00').asFloat).toBe(-1000)
})

it('processes -£1,000.00 correctly', () => {
  expect(nP('-£1,000.00').asFloat).toBe(-1000)
})

it('processes £1,000,000.00 correctly', () => {
  expect(nP('£1,000,000.00').asFloat).toBe(1000000)
})

it('processes £1,234.56 correctly', () => {
  expect(nP('£1,234.56').asFloat).toBe(1234.56)
})

it('processes £1,234,567.89 correctly', () => {
  expect(nP('£1,234,567.89').asFloat).toBe(1234567.89)
})

it('processes £0.00 correctly', () => {
  expect(nP('£0.00').asFloat).toBe(0)
})

it('processes £-0.00 correctly', () => {
  expect(nP('£-0.00').asFloat).toBe(-0)
})

it('processes £0 correctly', () => {
  expect(nP('£0').asFloat).toBe(0)
})

it('processes £1 correctly', () => {
  expect(nP('£1').asFloat).toBe(1)
})

it('processes £10 correctly', () => {
  expect(nP('£10').asFloat).toBe(10)
})

it('handles extra whitespace in £100.00 correctly', () => {
  expect(nP('£ 100   . 00').asFloat).toBe(100)
  expect(nP('£ 100   . 00').asText).toBe('£100.00')
})

it('handles extra whitespace around £100.00 correctly', () => {
  expect(nP(' £100.00    ').asFloat).toBe(100)
  expect(nP(' £100.00    ').asText).toBe('£100.00')
})

it('handles extra whitespace in and around £100.00 correctly', () => {
  expect(nP(' £100 . 00    ').asFloat).toBe(100)
  expect(nP(' £100 . 00    ').asText).toBe('£100.00')
})

// Pence (p)

it('processes 100.00p correctly', () => {
  expect(nP('100.00p').asFloat).toBe(1)
  expect(nP('100.00p').asText).toBe('100.00p')
})

it('processes 100.01p correctly', () => {
  expect(nP('100.01p').asFloat).toBe(1.0001)
})

it('processes 1,000.00p correctly', () => {
  expect(nP('1000.00p').asFloat).toBe(10)
})

it('processes 1,000,000.00p correctly', () => {
  expect(nP('1,000,000.00p').asFloat).toBe(10000)
})

it('processes 1,234.56p correctly', () => {
  expect(nP('1,234.56p').asFloat).toBe(12.3456)
})

it('processes -1,234.56p correctly', () => {
  expect(nP('-1,234.56p').asFloat).toBe(-12.3456)
})

it('processes 1,234,567.89p correctly', () => {
  expect(nP('1,234,567.89p').asFloat).toBe(12345.6789)
})

it('processes 99.9999p correctly', () => {
  expect(nP('99.9999p').asFloat).toBe(0.999999)
})

it('processes 0.00p correctly', () => {
  expect(nP('0.00p').asFloat).toBe(0)
})

it('processes 0p correctly', () => {
  expect(nP('0p').asFloat).toBe(0)
})

it('processes 1p correctly', () => {
  expect(nP('1p').asFloat).toBe(0.01)
})

it('processes 10p correctly', () => {
  expect(nP('10p').asFloat).toBe(0.1)
})

it('handles extra whitespace in 100.00p correctly', () => {
  expect(nP('100   . 00 p').asFloat).toBe(1)
  expect(nP(' 100 . 00 p   ').asText).toBe('100.00p')
})

it('handles extra whitespace around 100.00p correctly', () => {
  expect(nP(' 100.00p    ').asFloat).toBe(1)
  expect(nP(' 100 . 00 p   ').asText).toBe('100.00p')
})

it('handles extra whitespace in and around 100.00p correctly', () => {
  expect(nP(' 100 . 00 p   ').asFloat).toBe(1)
  expect(nP(' 100 . 00 p   ').asText).toBe('100.00p')
})

// Percentage (%)

it('processes 100.00% correctly', () => {
  expect(nP('100.00%').asFloat).toBe(1)
})

it('processes 100.01% correctly', () => {
  expect(nP('100.01%').asFloat).toBe(1.0001)
})

it('processes 1,000.00% correctly', () => {
  expect(nP('1000.00%').asFloat).toBe(10)
})

it('processes 1,000,000.00p correctly', () => {
  expect(nP('1,000,000.00%').asFloat).toBe(10000)
})

it('processes 1,234.56% correctly', () => {
  expect(nP('1,234.56%').asFloat).toBe(12.3456)
})

it('processes 1,234,567.89% correctly', () => {
  expect(nP('1,234,567.89%').asFloat).toBe(12345.6789)
})

it('processes 99.9999% correctly', () => {
  expect(nP('99.9999%').asFloat).toBe(0.999999)
})

it('processes 0.00% correctly', () => {
  expect(nP('0.00%').asFloat).toBe(0)
})

it('processes 0% correctly', () => {
  expect(nP('0%').asFloat).toBe(0)
})

it('processes 1% correctly', () => {
  expect(nP('1%').asFloat).toBe(0.01)
})

it('processes 10% correctly', () => {
  expect(nP('10%').asFloat).toBe(0.1)
})

it('processes -10% correctly', () => {
  expect(nP('-10%').asFloat).toBe(-0.1)
})

it('handles extra whitespace in 100.00% correctly', () => {
  expect(nP('100   . 00 %').asFloat).toBe(1)
  expect(nP('100   . 00 %').asText).toBe('100.00%')
  expect(nP('100   . 00 %').asRawText).toBe('100   . 00 %')
})

it('handles extra whitespace around 100.00% correctly', () => {
  expect(nP(' 100.00%    ').asFloat).toBe(1)
  expect(nP('100   . 00 %').asText).toBe('100.00%')
  expect(nP('100   . 00 %').asRawText).toBe('100   . 00 %')
})

it('handles extra whitespace in and around 100.00% correctly', () => {
  expect(nP(' 100 . 00 %   ').asFloat).toBe(1)
  expect(nP('100   . 00 %').asText).toBe('100.00%')
  expect(nP('100   . 00 %').asRawText).toBe('100   . 00 %')
})

// No unit

it('processes 100.00 correctly', () => {
  expect(nP('100.00').asFloat).toBe(100)
})

it('processes 100.01 correctly', () => {
  expect(nP('100.01').asFloat).toBe(100.01)
})

it('processes 1,000.00 correctly', () => {
  expect(nP('1000.00').asFloat).toBe(1000)
})

it('processes -1,000.00 correctly', () => {
  expect(nP('-1000.00').asFloat).toBe(-1000)
})

it('processes 1,000,000.00 correctly', () => {
  expect(nP('1,000,000.00').asFloat).toBe(1000000)
})

it('processes 1,234.56 correctly', () => {
  expect(nP('1,234.56').asFloat).toBe(1234.56)
})

it('processes 1,234,567.89 correctly', () => {
  expect(nP('1,234,567.89').asFloat).toBe(1234567.89)
})

it('processes 0.00 correctly', () => {
  expect(nP('0.00').asFloat).toBe(0)
})

it('processes 0 correctly', () => {
  expect(nP('0').asFloat).toBe(0)
})

it('processes 1 correctly', () => {
  expect(nP('1').asFloat).toBe(1)
})

it('processes 10 correctly', () => {
  expect(nP('10').asFloat).toBe(10)
})

it('handles extra whitespace in 100.00 correctly', () => {
  expect(nP(' 100   . 00').asFloat).toBe(100)
  expect(nP(' 100   . 00').asText).toBe('100.00')
})

it('handles extra whitespace around 100.00 correctly', () => {
  expect(nP(' 100.00    ').asFloat).toBe(100)
  expect(nP(' 100.00    ').asText).toBe('100.00')
})

it('handles extra whitespace in and around 100.00 correctly', () => {
  expect(nP(' 100 . 00    ').asFloat).toBe(100)
  expect(nP(' 100 . 00    ').asText).toBe('100.00')
})

// Invalid

it('throws when provided £1.00p', () => {
  expect(() => nP('£1.00p')).toThrow()
})

it('throws when provided ££1.00', () => {
  expect(() => nP('££1.00')).toThrow()
})

it('throws when provided 1.00q', () => {
  expect(() => nP('1.00q')).toThrow()
})

it('throws when provided £1.00p', () => {
  expect(() => nP('£1.00p')).toThrow()
})

it('throws when provided ££1.00', () => {
  expect(() => nP('££1.00')).toThrow()
})

it('throws when provided £1.00%', () => {
  expect(() => nP('£1.00%')).toThrow()
})
