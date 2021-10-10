import { Config } from "../types"

const BASE_URLS: Record<Config['site'], string> = {
  halifax: 'halifaxsharedealing-online.co.uk',
  iweb: 'iwebsharedealing.co.uk',
  bos: 'bankofscotlandsharedealing-online.co.uk',
  lloyds: 'lloydsbankdirectinvestmentsonline.co.uk'
}

export default (config: Config) => {
  const baseUrl: string = BASE_URLS[config.site]
  const baseLoginUrl: string = 'https://www.' + baseUrl
  const loginHxProcess: string = baseLoginUrl + '/CustomerAuthentication/HxProcessLogin.aspx'
  const baseMainUrl: string = 'https://share-dealing.' + baseUrl
  const baseSDUrl: string = baseMainUrl + '/Sharedealing/App/'
  const generateSD = (navTarget: string, accountId?: string): string => baseSDUrl + navTarget + '.asp' + (accountId ? '?PortCode=' + accountId : '')
  const baseSSUrl: string = baseMainUrl + '/SecureSite/'
  const generateSS = (navTarget: string, accountId?: string): string => baseSSUrl + 'sdAccountManagementPortal.aspx?NavTarget=' + navTarget + (accountId ? '&PortCode=' + accountId : '')

  return { baseUrl, baseLoginUrl, loginHxProcess, baseMainUrl, baseSDUrl, generateSD, generateSS }
}
