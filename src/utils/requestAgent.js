const sharedAgent = require('superagent').agent()
const cheerio = require('cheerio')

module.exports = url => sharedAgent
  .post(url)
  .set('cache-control', 'no-cache')
  .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36') // Necessary or we get an AuthenticationCritical response  )
  .buffer(true).parse((res, cb) => {
    const buffer = []
    res.on('data', (chunk) => { buffer.push(chunk) })
    res.on('end', () => {
      const html = Buffer.concat(buffer).toString('latin1')
      cb(null, { html, $: cheerio.load(html) })
    })
  })
