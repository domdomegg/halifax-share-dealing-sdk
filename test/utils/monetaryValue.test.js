const monetaryValue = require('../../src/utils/monetaryValue')

// Pounds (£)

it('processes £100.00 correctly', () => {
  expect(monetaryValue('£100.00').asFloat).toBe(100)
})

it('processes £100.01 correctly', () => {
  expect(monetaryValue('£100.01').asFloat).toBe(100.01)
})

it('processes £1,000.00 correctly', () => {
  expect(monetaryValue('£1000.00').asFloat).toBe(1000)
})

it('processes £1,000,000.00 correctly', () => {
  expect(monetaryValue('£1,000,000.00').asFloat).toBe(1000000)
})

it('processes £1,234.56 correctly', () => {
  expect(monetaryValue('£1,234.56').asFloat).toBe(1234.56)
})

it('processes £1,234,567.89 correctly', () => {
  expect(monetaryValue('£1,234,567.89').asFloat).toBe(1234567.89)
})

it('processes £0.00 correctly', () => {
  expect(monetaryValue('£0.00').asFloat).toBe(0)
})

it('processes £0 correctly', () => {
  expect(monetaryValue('£0').asFloat).toBe(0)
})

it('processes £1 correctly', () => {
  expect(monetaryValue('£1').asFloat).toBe(1)
})

it('processes £10 correctly', () => {
  expect(monetaryValue('£10').asFloat).toBe(10)
})

it('handles extra whitespace in £100.00 correctly', () => {
  expect(monetaryValue('£ 100   . 00').asFloat).toBe(100)
})

it('handles extra whitespace around £100.00 correctly', () => {
  expect(monetaryValue(' £100.00    ').asFloat).toBe(100)
})

it('handles extra whitespace in and around £100.00 correctly', () => {
  expect(monetaryValue(' £100 . 00    ').asFloat).toBe(100)
})

// Pence (p)

it('processes 100.00p correctly', () => {
  expect(monetaryValue('100.00p').asFloat).toBe(1)
})

it('processes 100.01p correctly', () => {
  expect(monetaryValue('100.01p').asFloat).toBe(1.0001)
})

it('processes 1,000.00p correctly', () => {
  expect(monetaryValue('1000.00p').asFloat).toBe(10)
})

it('processes 1,000,000.00p correctly', () => {
  expect(monetaryValue('1,000,000.00p').asFloat).toBe(10000)
})

it('processes 1,234.56p correctly', () => {
  expect(monetaryValue('1,234.56p').asFloat).toBe(12.3456)
})

it('processes 1,234,567.89 correctly', () => {
  expect(monetaryValue('1,234,567.89p').asFloat).toBe(12345.6789)
})

it('processes 0.00p correctly', () => {
  expect(monetaryValue('0.00p').asFloat).toBe(0)
})

it('processes 0p correctly', () => {
  expect(monetaryValue('0p').asFloat).toBe(0)
})

it('processes 1p correctly', () => {
  expect(monetaryValue('1p').asFloat).toBe(0.01)
})

it('processes 10p correctly', () => {
  expect(monetaryValue('10p').asFloat).toBe(0.1)
})

it('handles extra whitespace in 100.00p correctly', () => {
  expect(monetaryValue('100   . 00 p').asFloat).toBe(1)
})

it('handles extra whitespace around 100.00p correctly', () => {
  expect(monetaryValue(' 100.00p    ').asFloat).toBe(1)
})

it('handles extra whitespace in and around 100.00p correctly', () => {
  expect(monetaryValue(' 100 . 00 p   ').asFloat).toBe(1)
})

// Invalid

it('throws when provided £0.1', () => {
  expect(() => monetaryValue('£0.1')).toThrow()
})

it('throws when provided £1.1', () => {
  expect(() => monetaryValue('£1.1')).toThrow()
})

it('throws when provided £1.00p', () => {
  expect(() => monetaryValue('£1.00p')).toThrow()
})

it('throws when provided ££1.00', () => {
  expect(() => monetaryValue('££1.00')).toThrow()
})

it('throws when provided 1.00q', () => {
  expect(() => monetaryValue('1.00q')).toThrow()
})
