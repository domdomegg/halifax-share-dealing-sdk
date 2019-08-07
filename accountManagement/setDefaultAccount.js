const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

const getDefaultAccount = require('./getDefaultAccount')

module.exports = (config) => ({ accountId }) =>
  request(urlBuilder(config).generateSD('sddefaultaccount'))
    .then(log('Got default account'))
    .then(response => {
      return request({
        url: urlBuilder(config).generateSD('sddefaultaccountverify'),
        form: {
          rdoDefaultAccount: accountId,
          Source: 'sddefaultaccount.asp',
          HxUniqueID: response.$('input[name="HxUniqueID"]').val()
        }
      })
    })
    .then(log('Set default account'))
    .then(getDefaultAccount(config))
