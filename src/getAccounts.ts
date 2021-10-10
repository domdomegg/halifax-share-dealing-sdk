import urlBuilder from './utils/urlBuilder'
import request from './utils/requestAgent'
import log from './utils/promiseLogger'
import nP from './utils/numberParser'
import { Account, Config } from './types'

export default (config: Config) => (): Promise<Account[]> =>
  request(urlBuilder(config).generateSD('sdwelcomehome'))
    .then(log('Got account details'))
    .then(({ body: { $ } }) => {
      const accountContainers = $('.acct-overview-container').get()

      return accountContainers.map(accountContainerElem => {
        const accountContainer = $(accountContainerElem)
        const tds = $('td', accountContainerElem)

        return {
          accountId: accountContainer.find('a').first().attr('onclick')!.split(/PortCode=|'\)/)[1],
          name: accountContainer.find('a').first().text(),
          availableToInvest: nP(tds.eq(0).text()),
          totalSecurities: nP(tds.eq(1).text()),
          totalValue: nP(tds.eq(2).text())
        }
      })
    })
