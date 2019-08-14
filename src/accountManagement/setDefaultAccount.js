const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

const getDefaultAccount = require('./getDefaultAccount')

module.exports = (config) => ({ accountId }) =>
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
