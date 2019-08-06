const BASE_URLS = {
  halifax: 'halifaxsharedealing-online.co.uk',
  iweb: 'iwebsharedealing.co.uk',
  bos: 'bankofscotlandsharedealing-online.co.uk',
  lloyds: 'lloydsbankdirectinvestmentsonline.co.uk'
}

module.exports = (config) => {
  const baseUrl = BASE_URLS[config.site]
  const baseLoginUrl = 'https://www.' + baseUrl
  const loginHxProcess = baseLoginUrl + '/CustomerAuthentication/HxProcessLogin.aspx'
  const baseSDUrl = 'https://share-dealing.' + baseUrl + '/Sharedealing/App/'
  const SDHome = baseSDUrl + 'sdwelcomehome.asp'
  const SDDividendOptions = baseSDUrl + 'sddividendinstructions.asp'

  return { baseUrl, baseLoginUrl, loginHxProcess, baseSDUrl, SDHome, SDDividendOptions }
}
