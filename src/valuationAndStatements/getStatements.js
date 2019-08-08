
const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

module.exports = (config) => () =>
  request(urlBuilder(config).generateSS('Stmnts'))
    .then(response => urlBuilder(config).baseMainUrl + response.headers.location)
    .then(log('Got statement list URL'))
    .then(request)
    .then(log('Got statements'))
    .then(response => {
      const statementRows = response.$('#divDealingHistDT tbody tr').get()

      return statementRows.map(statementRow => ({
        statementId: response.$('a', statementRow).eq(0).attr('href').split('?id=')[1],
        statementDate: response.$('td', statementRow).eq(0).text()
      }))
    })
