const log = require('../../src/utils/promiseLogger')

const mocks = {}

beforeEach(() => {
  mocks['console.info'] = jest.spyOn(console, 'info').mockImplementation()
})

afterEach(() => {
  mocks['console.info'].mockRestore()
})

it('calls console.info', () => {
  return Promise.resolve()
    .then(log('hello'))
    .then(() => expect(mocks['console.info']).toBeCalled())
})

it('writes the correct log', () => {
  return Promise.resolve()
    .then(log('hello'))
    .then(() => expect(mocks['console.info']).toBeCalledWith('hello'))
})

it('can be chained', () => {
  return Promise.resolve()
    .then(log('hello'))
    .then(log('my'))
    .then(log('name'))
    .then(log('is'))
    .then(log('Adam'))
    .then(() => expect(mocks['console.info']).toHaveBeenCalledTimes(5))
})

it('can use custom logging function', () => {
  const customLoggingFn = jest.fn()

  return Promise.resolve()
    .then(log('hello', customLoggingFn))
    .then(() => expect(customLoggingFn).toBeCalled())
    .then(() => expect(mocks['console.info']).not.toBeCalled())
})

it('does not affect promise data', () => {
  const data = { obj: { str: 'I am some data', num: 100 }, bool: true }

  return Promise.resolve(data)
    .then(log('hello'))
    .then(dataAfterLog => expect(dataAfterLog).toEqual(data))
})
