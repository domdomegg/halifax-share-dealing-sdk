module.exports = (config) => ({
  login: require('./login')(config),
  getAccounts: require('./getAccounts')(config),
  getDefaultAccount: require('./accountManagement/getDefaultAccount')(config),
  setDefaultAccount: require('./accountManagement/setDefaultAccount')(config),
  getDividendOptions: require('./accountManagement/getDividendOptions')(config),
  setDividendOptions: require('./accountManagement/setDividendOptions')(config),
  getStatements: require('./valuationAndStatements/getStatements')(config),
  getValuation: require('./valuationAndStatements/getValuation')(config),
  getDividendHistory: require('./valuationAndStatements/getDividendHistory')(config)
})
