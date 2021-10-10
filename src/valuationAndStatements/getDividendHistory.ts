import urlBuilder from '../utils/urlBuilder'
import request from '../utils/requestAgent'
import log from '../utils/promiseLogger'
import nP from '../utils/numberParser'
import { fromName as dividendOptionNameToDividendOptionCode } from '../utils/dividendOptionMap'
import { Accounty, Config, Dividend, DividendOption } from '../types'

export default (config: Config) => ({ accountId }: Accounty): Promise<Dividend[]> =>
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
          dividendOptionName: dividendOptionNameToDividendOptionCode[$('td', row).eq(5).text() as DividendOption['dividendOptionName']]
        } as unknown as Omit<DividendOption, 'accountId'>,
        cashRef: $('a', row).get(0).attribs.href.split('cashref=')[1].split('&')[0]
      }))
    })
