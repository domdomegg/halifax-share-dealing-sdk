const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')
const nP = require('../utils/numberParser')

const dividendOptionNameToDividendOptionCode = require('../utils/dividendOptionMap').fromName

module.exports = (config) => ({ accountId }) =>
  request(urlBuilder(config).generateSD('sdaccountdividendstatement', accountId) + '&ChosenStartMonth=1&ChosenStartYear=2005&ChosenEndMonth=12&ChosenEndYear=3000')
    .then(log('Got dividend history'))
    .then(({ body: { $ } }) => {
      const dividendHistoryRows = $('.table-responsive tbody tr').get()

      return dividendHistoryRows.map(row => ({
        issueDate: $('td', row).eq(0).text(),
        fullName: $('td', row).eq(1).text(),
        exDividendDate: $('td', row).eq(2).text(),
        sharesHeldOnExDividendDate: nP($('td', row).eq(3).text()),
        amountPayable: nP($('td', row).eq(4).text()),
        handlingOperation: {
          dividendOptionCode: $('td', row).eq(5).text(),
          dividendOptionName: dividendOptionNameToDividendOptionCode[$('td', row).eq(5).text()]
        },
        cashRef: $('a', row).get(0).attribs['href'].split('cashref=')[1].split('&')[0]
      }))
    })
