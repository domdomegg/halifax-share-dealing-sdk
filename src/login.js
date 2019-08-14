const urlBuilder = require('./utils/urlBuilder')
const request = require('./utils/requestAgent')
const log = require('./utils/promiseLogger')

module.exports = (config) => () =>
  request(urlBuilder(config).loginHxProcess)
    .type('form')
    .send({
      Username: config.USERNAME,
      password: config.PASSWORD
    })
    .then(({ body: { $ }, redirects }) => {
      const memorableInformationPrompt = $('#ctl00_MainPageContent_answer__LabelID').text()
      const viewstate = $('#__VIEWSTATE').val()

      if (!Object.prototype.hasOwnProperty.call(config.MEMORABLE_INFORMATION, memorableInformationPrompt)) {
        throw new Error('Config did not have answer for prompt: ' + memorableInformationPrompt)
      }

      console.log('Got memorable information question and understood prompt')

      const answer = config.MEMORABLE_INFORMATION[memorableInformationPrompt]

      return request(redirects[0])
        .type('form')
        .send({
          __VIEWSTATE: viewstate,
          ctl00$MainPageContent$answer$TextBox: answer,
          ctl00$MainPageContent$_signin: 'Sign In'
        })
    })
    .then(log('Successfully logged in'))
    .then(({ req: { path } }) => ({ accountId: path.split('?Portcode=')[1] }))
