const cheerio = require('cheerio')

module.exports = require('request-promise-native').defaults({
  method: 'POST',
  headers: {
    'cache-control': 'no-cache', // Necessary to generate new tokens
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36' // Necessary or we get an AuthenticationCritical response
  },
  encoding: 'latin1', // Necessary for currency symbols to be retrieved correctly
  jar: true, // Necessary to save import cookies e.g. Hx, HxSession, IDX, ONTCred,
  simple: false, // Necessary so 302s don't cause promise rejections
  transform: (body, response) => ({ ...response, $: cheerio.load(body) })
})
