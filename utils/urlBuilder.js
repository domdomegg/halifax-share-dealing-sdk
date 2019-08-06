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
  const baseSDUrl = 'https://share-dealing.' + baseUrl
  const baseSDApp = baseSDUrl + '/Sharedealing/App/'
  const SDHome = baseSDApp + 'sdwelcomehome.asp'
  const SDDividendOptions = baseSDApp + 'sddividendinstructions.asp'
  const baseSSUrl = 'https://share-dealing.' + baseUrl + '/SecureSite/'
  const generateSS = (navTarget, accountId) => baseSSUrl + 'sdAccountManagementPortal.aspx?NavTarget=' + navTarget + '&PortCode=' + accountId

  return { baseUrl, baseLoginUrl, loginHxProcess, baseSDUrl, baseSDApp, SDHome, SDDividendOptions, generateSS }
}
