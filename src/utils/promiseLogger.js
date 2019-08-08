// Generates a function that logs the message while passing any arguments through
// Makes logging in promise .then()'s on one line nicer
module.exports = (logMessage, level = console.info) => (x) => {
  level(logMessage)
  return x
}
