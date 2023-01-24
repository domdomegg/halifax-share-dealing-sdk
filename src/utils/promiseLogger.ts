// Generates a function that logs the message while passing any arguments through
// Makes logging in promise .then()'s on one line nicer
// eslint-disable-next-line no-console
export default <T>(logMessage: string, level = console.info) => (x: T): T => {
  level(logMessage);
  return x;
};
