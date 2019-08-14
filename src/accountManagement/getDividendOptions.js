const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

const dividendOptionCodeToDividendOptionName = require('./dividendOptionCodeToDividendOptionName')

module.exports = (config) => () =>
  request(urlBuilder(config).generateSD('sddividendinstructions'))
    .then(log('Got dividend options'))
    .then(({ body: { $ } }) => {
      const dividendOptionRadios = $('tbody tr input:checked').get()

      return dividendOptionRadios.map(dividendOptionRadio => ({
        accountId: dividendOptionRadio.attribs.name.split('radio')[1],
        dividendOptionCode: dividendOptionRadio.attribs.value,
        dividendOptionName: dividendOptionCodeToDividendOptionName[dividendOptionRadio.attribs.value]
      }))
    })
