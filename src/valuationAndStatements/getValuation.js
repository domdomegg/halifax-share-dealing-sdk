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

      const cash = nP(response.$('.account-header tr td').eq(3).text())
      const totalSecurities = nP(response.$('[headers="val total"]').eq(0).text())

      const totalSecuritiesFromStocks = stocks.reduce((acc, cur) => acc + cur.valuation.asFloat, 0)
      if (Math.abs(totalSecurities.asFloat - totalSecuritiesFromStocks) > 0.01) {
        console.warn('Total securities figure and sum of stocks don\'t add up')
      }

      const totalValue = {
        asFloat: totalSecurities.asFloat + cash.asFloat,
        asText: '£' + (totalSecurities.asFloat + cash.asFloat).toString()
      }

      return {
        accountId,
        stocks,
        cash,
        availableToInvest: cash,
        totalSecurities,
        totalValue
      }
    })
