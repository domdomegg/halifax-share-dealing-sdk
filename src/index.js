module.exports = (config) => ({
  login: require('./login')(config),
  getAccounts: require('./getAccounts')(config),
  getDefaultAccount: require('./accountManagement/getDefaultAccount')(config),
  setDefaultAccount: require('./accountManagement/setDefaultAccount')(config),
  getDividendOptions: require('./accountManagement/getDividendOptions')(config),
  getStatements: require('./valuationAndStatements/getStatements')(config)
})
