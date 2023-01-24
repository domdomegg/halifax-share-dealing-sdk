import type { Config } from './types';
import login from './login';
import getAccounts from './getAccounts';
import getDefaultAccount from './accountManagement/getDefaultAccount';
import setDefaultAccount from './accountManagement/setDefaultAccount';
import getDividendOptions from './accountManagement/getDividendOptions';
import setDividendOptions from './accountManagement/setDividendOptions';
import getStatements from './valuationAndStatements/getStatements';
import getValuation from './valuationAndStatements/getValuation';
import getDividendHistory from './valuationAndStatements/getDividendHistory';

export default (config: Config) => ({
  login: login(config),
  getAccounts: getAccounts(config),
  getDefaultAccount: getDefaultAccount(config),
  setDefaultAccount: setDefaultAccount(config),
  getDividendOptions: getDividendOptions(config),
  setDividendOptions: setDividendOptions(config),
  getStatements: getStatements(config),
  getValuation: getValuation(config),
  getDividendHistory: getDividendHistory(config),
});
