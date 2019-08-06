module.exports = (config) => ({
  login: require('./login')(config),
  getAccounts: require('./getAccounts')(config),
  getDividendOptions: require('./accountManagement/getDividendOptions')(config),
  getStatements: require('./valuationAndStatements/getStatements')(config)
})
