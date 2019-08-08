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
  const baseMainUrl = 'https://share-dealing.' + baseUrl
  const baseSDUrl = baseMainUrl + '/Sharedealing/App/'
  const generateSD = (navTarget, accountId) => baseSDUrl + navTarget + '.asp' + (accountId ? '?PortCode=' + accountId : '')
  const baseSSUrl = baseMainUrl + '/SecureSite/'
  const generateSS = (navTarget, accountId) => baseSSUrl + 'sdAccountManagementPortal.aspx?NavTarget=' + navTarget + (accountId ? '&PortCode=' + accountId : '')

  return { baseUrl, baseLoginUrl, loginHxProcess, baseMainUrl, baseSDUrl, generateSD, generateSS }
}
