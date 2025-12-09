import type { Config } from '../types';

const SITE_URLS: Record<Config['site'], { login: string, main: string }> = {
  halifax: {
    login: 'www.halifaxsharedealing-online.co.uk',
    main: 'share-dealing.halifaxsharedealing-online.co.uk',
  },
  scottishwidows: {
    login: 'www.share-dealing.personal.secure.scottishwidows.co.uk',
    main: 'share-dealing.personal.secure.scottishwidows.co.uk',
  },
  iweb: {
    login: 'www.iwebsharedealing.co.uk',
    main: 'share-dealing.iwebsharedealing.co.uk',
  },
  bos: {
    login: 'www.bankofscotlandsharedealing-online.co.uk',
    main: 'share-dealing.bankofscotlandsharedealing-online.co.uk',
  },
  lloyds: {
    login: 'www.lloydsbankdirectinvestmentsonline.co.uk',
    main: 'share-dealing.lloydsbankdirectinvestmentsonline.co.uk',
  },
};

export default (config: Config) => {
  const urls = SITE_URLS[config.site];
  const baseLoginUrl = `https://${urls.login}`;
  const loginHxProcess = `${baseLoginUrl}/CustomerAuthentication/HxProcessLogin.aspx`;
  const baseMainUrl = `https://${urls.main}`;
  const baseSDUrl = `${baseMainUrl}/Sharedealing/App/`;
  const generateSD = (navTarget: string, accountId?: string): string => `${baseSDUrl + navTarget}.asp${accountId ? `?PortCode=${accountId}` : ''}`;
  const baseSSUrl = `${baseMainUrl}/SecureSite/`;
  const generateSS = (navTarget: string, accountId?: string): string => `${baseSSUrl}sdAccountManagementPortal.aspx?NavTarget=${navTarget}${accountId ? `&PortCode=${accountId}` : ''}`;

  return {
    baseLoginUrl, loginHxProcess, baseMainUrl, baseSDUrl, generateSD, generateSS,
  };
};
