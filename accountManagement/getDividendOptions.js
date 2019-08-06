const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

const dividendOptionCodeToDividendOptionName = {
  R: 'Automatic Dividend Reinvestment',
  H: 'Hold In Account',
  P: 'Pay Away Immediately',
  P6: 'Pay Away 6-Monthly'
}

module.exports = (config) => () =>
  request(urlBuilder(config).SDDividendOptions)
    .then(log('Got dividend options'))
    .then(response => {
      const dividendOptionRadios = response.$('tbody tr input:checked').get()

      return dividendOptionRadios.map(dividendOptionRadio => ({
        accountId: dividendOptionRadio.attribs.name.split('radio')[1],
        dividendOptionCode: dividendOptionRadio.attribs.value,
        dividendOptionName: dividendOptionCodeToDividendOptionName[dividendOptionRadio.attribs.value]
      }))
    })
