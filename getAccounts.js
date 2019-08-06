const urlBuilder = require('./urlBuilder')
const request = require('./requestAgent')
const log = require('./promiseLogger')

module.exports = (config) => () =>
  request(urlBuilder(config).SDHome)
    .then(log('Got account details'))
    .then(response => {
      const accountContainers = response.$('.acct-overview-container').get()

      return accountContainers.map((accountContainerElem) => {
        const accountContainer = response.$(accountContainerElem)
        const tds = response.$('td', accountContainerElem)

        return {
          accountId: accountContainer.find('a').first().attr('onclick').split(/PortCode=|'\)/)[1],
          name: accountContainer.find('a').first().text(),
          availableToInvest: tds.eq(0).text(),
          totalSecurities: tds.eq(1).text(),
          totalValue: tds.eq(2).text()
        }
      })
    })
