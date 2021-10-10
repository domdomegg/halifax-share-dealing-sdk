import urlBuilder from '../utils/urlBuilder'
import request from '../utils/requestAgent'
import log from '../utils/promiseLogger'
import getDefaultAccount from './getDefaultAccount'
import { Accounty, Config } from '../types'

export default (config: Config) => ({ accountId }: Accounty): Promise<Accounty> =>
  request(urlBuilder(config).generateSD('sddefaultaccount'))
    .then(log('Got default account'))
    .then(({ body: { $ } }) => request(urlBuilder(config).generateSD('sddefaultaccountverify'))
      .type('form')
      .send({
        rdoDefaultAccount: accountId,
        Source: 'sddefaultaccount.asp',
        HxUniqueID: $('input[name="HxUniqueID"]').val()
      }))
    .then(log('Set default account'))
    .then(getDefaultAccount(config))
