const urlBuilder = require('../utils/urlBuilder')
const request = require('../utils/requestAgent')
const log = require('../utils/promiseLogger')

module.exports = (config) => () =>
  request(urlBuilder(config).generateSD('sddefaultaccount'))
    .then(log('Got default account'))
    .then(({ body: { $ } }) => {
      const defaultAccountRadio = $('input:checked')

      return {
        accountId: defaultAccountRadio.val()
      }
    })
