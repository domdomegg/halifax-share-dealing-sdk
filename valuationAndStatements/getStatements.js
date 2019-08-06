
const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')
const validateAccountId = require('../utils/validateAccountId')

module.exports = (config) => ({ accountId }) =>
  validateAccountId(accountId)
    .then(() => urlBuilder(config).generateSS('Stmnts', accountId))
    .then(request)
    .then(response => urlBuilder(config).baseSDUrl + response.headers.location)
    .then(log('Got statement list URL'))
    .then(request)
    .then(log('Got statements'))
    .then(response => {
      const statementRows = response.$('#divDealingHistDT tbody tr').get()

      return statementRows.map(statementRow => ({
        accountId,
        statementId: response.$('a', statementRow).eq(0).attr('href').split('?id=')[1],
        statementDate: response.$('td', statementRow).eq(0).text()
      }))
    })
