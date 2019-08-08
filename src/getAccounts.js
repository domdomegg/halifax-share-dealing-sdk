const urlBuilder = require('./utils/urlBuilder')
const request = require('./utils/requestAgent')
const log = require('./utils/promiseLogger')
const monetaryValue = require('./utils/monetaryValue')

module.exports = (config) => () =>
  request(urlBuilder(config).generateSD('sdwelcomehome'))
    .then(log('Got account details'))
    .then(response => {
      const accountContainers = response.$('.acct-overview-container').get()

      return accountContainers.map(accountContainerElem => {
        const accountContainer = response.$(accountContainerElem)
        const tds = response.$('td', accountContainerElem)

        return {
          accountId: accountContainer.find('a').first().attr('onclick').split(/PortCode=|'\)/)[1],
          name: accountContainer.find('a').first().text(),
          availableToInvest: monetaryValue(tds.eq(0).text()),
          totalSecurities: monetaryValue(tds.eq(1).text()),
          totalValue: monetaryValue(tds.eq(2).text())
        }
      })
    })