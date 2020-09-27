const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

module.exports = (config) => () =>
  request(urlBuilder(config).generateSS('Stmnts'))
    .then(log('Got statements'))
    .then(({ body: { $ } }) => {
      const statementRows = $('#divDealingHistDT table > tr').get()

      return statementRows.map(statementRow => ({
        statementId: $('a', statementRow).eq(0).attr('href').split('?id=')[1],
        statementDate: $('td', statementRow).eq(0).text()
      }))
    })
