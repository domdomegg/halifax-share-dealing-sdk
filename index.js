module.exports = (config) => ({
  login: require('./login')(config),
  getAccounts: require('./getAccounts')(config)
})
