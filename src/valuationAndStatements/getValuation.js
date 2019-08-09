const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')
const nP = require('../utils/numberParser')

module.exports = (config) => ({ accountId }) =>
  request(urlBuilder(config).generateSD('sdaccountvaluation', accountId))
    .then(log('Got valuation'))
    .then(response => {
      const valuationRows = response.$('#sortable tbody tr').get()

      const stocks = valuationRows.map(valuationRow => ({
        TIDM: response.$('td strong', valuationRow).eq(0).text(),
        fullName: response.$('td div', valuationRow).eq(0).attr('title'),
        holding: nP(response.$('td', valuationRow).eq(1).text()),
        avgCostPerShare: nP(response.$('td', valuationRow).eq(2).text()),
        bookCost: nP(response.$('td', valuationRow).eq(3).text()),
        latestPricePerShare: nP(response.$('td', valuationRow).eq(4).text()),
        valuation: nP(response.$('td', valuationRow).eq(5).text()),
        change: {
          absolute: nP(response.$('td', valuationRow).eq(6).text()),
          percentage: nP(response.$('td', valuationRow).eq(7).text())
        }
      }))

      return {
        accountId,
        stocks: stocks,
        cash: nP(response.$('.account-header tr td').eq(3).text())
      }
    })
