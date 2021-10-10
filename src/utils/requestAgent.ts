import superagent from 'superagent'
import cheerio from 'cheerio'

const sharedAgent = superagent.agent()

// FIXME: superagent 5 is missing type definitions, this is a rough approximation but not perfect
export default (url: string): Omit<superagent.SuperAgentRequest, 'then' | 'catch' | 'finally'> & Promise<Omit<superagent.Response, 'body'> & { body: { html: string, $: cheerio.Root } }> => sharedAgent
  .post(url)
  .set('cache-control', 'no-cache')
  .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36') // Necessary or we get an AuthenticationCritical response
  .buffer(true)
  .parse((res, cb) => {
    const buffers: Buffer[] = []
    res.on('data', (chunk) => { buffers.push(chunk) })
    res.on('end', () => {
      const html = Buffer.concat(buffers).toString('latin1')
      cb(null, { html, $: cheerio.load(html) })
    })
  })
