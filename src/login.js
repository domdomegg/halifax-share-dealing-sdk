const urlBuilder = require('./utils/urlBuilder')
const request = require('./utils/requestAgent')
const log = require('./utils/promiseLogger')

module.exports = (config) => () =>
  request({
    url: urlBuilder(config).loginHxProcess,
    form: {
      Username: config.USERNAME,
      password: config.PASSWORD
    } })
    .then(response => urlBuilder(config).baseLoginUrl + response.headers.location)
    .then(log('Got memorable information question URL using username and password'))
    .then(request)
    .then(response => {
      const memorableInformationPrompt = response.$('#ctl00_MainPageContent_answer__LabelID').text()
      const viewstate = response.$('#__VIEWSTATE').val()

      if (!Object.prototype.hasOwnProperty.call(config.MEMORABLE_INFORMATION, memorableInformationPrompt)) {
        throw new Error('Config did not have answer for prompt: ' + memorableInformationPrompt)
      }

      console.log('Got memorable information question and understood prompt')

      const answer = config.MEMORABLE_INFORMATION[memorableInformationPrompt]

      return {
        url: response.request.uri.href,
        form: {
          __VIEWSTATE: viewstate,
          ctl00$MainPageContent$answer$TextBox: answer,
          ctl00$MainPageContent$_signin: 'Sign In'
        }
      }
    })
    .then(request)
    .then(response => urlBuilder(config).baseLoginUrl + response.headers.location) // processLoginEpilogue URL
    .then(log('Got process login epilogue URL using memorable information'))
    .then(request)
    .then(response => response.headers.location) // SDsetup URL
    .then(log('Got SDsetup URL'))
    .then(request)
    .then(response => urlBuilder(config).baseSDUrl + response.headers.location) // SDwelcomehome URL
    .then(log('Got SDwelcomehome URL'))
    .then(request)
    .then(log('Successfully logged in'))
    .then(response => ({ accountId: response.request.uri.href.split('?Portcode=')[1] }))
