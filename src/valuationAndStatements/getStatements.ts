import urlBuilder from '../utils/urlBuilder'
import request from '../utils/requestAgent'
import log from '../utils/promiseLogger'
import { Config, Statement } from '../types'

export default (config: Config) => (): Promise<Statement[]> =>
  request(urlBuilder(config).generateSS('Stmnts'))
    .then(log('Got statements'))
    .then(({ body: { $ } }) => {
      const statementRows = $('#divDealingHistDT table > tr').get()

      return statementRows.map(statementRow => ({
        statementId: $('a', statementRow).eq(0).attr('href')!.split('?id=')[1],
        statementDate: $('td', statementRow).eq(0).text()
      }))
    })
