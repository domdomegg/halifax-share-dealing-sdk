# halifax-share-dealing-sdk

[![Build Status](https://img.shields.io/travis/com/domdomegg/halifax-share-dealing-sdk/master)](https://travis-ci.com/domdomegg/halifax-share-dealing-sdk) [![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/domdomegg/halifax-share-dealing-sdk/blob/master/LICENSE)

Unofficial SDK for Halifax Share Dealing, IWeb Share Dealing, Bank of Scotland Share Dealing and The Lloyds Bank Direct Investments Service

Scrapes internet banking, so may be broken by updates to their front end

## Usage

### Setup

```js
const halifaxShareDealingSdk = require("halifax-share-dealing-sdk")
const sd = halifaxShareDealingSdk({
    site: 'halifax', // one of 'halifax', 'iweb', 'bos', 'lloyds'
    USERNAME: 'username',
    PASSWORD: 'password',
    MEMORABLE_INFORMATION: {
      'Your place/town of birth': 'Anytown',
      "Your mother's FIRST name": 'Jane',
      "Your father's FIRST name": 'John',
      'The name of your first school': 'Anyschool',
    }
})
```

### Login

This is required before making any other calls

Returns an accounty object with the default account

```js
sd.login()
    .then(console.dir)

// { accountId: '000123456ABCD' }
```

### Get accounts

Lists all accounts

Returns an array of accounty objects with account names and balances

```js
sd.login()
    .then(sd.getAccounts)
    .then(console.dir)

// [ { accountId: '000123456',
//     name: 'Share Dealing Account',
//     availableToInvest: { asFloat: 1.23, asText: '£1.23' },
//     totalSecurities: { asFloat: 4.56, asText: '£4.56' },
//     totalValue: { asFloat: 5.79, asText: '£5.79' } },
//   { accountId: '000123456ABCD',
//     name: 'Stocks and Shares ISA',
//     availableToInvest: { asFloat: 1.23, asText: '£1.23' },
//     totalSecurities: { asFloat: 4.56, asText: '£4.56' },
//     totalValue: { asFloat: 5.79, asText: '£5.79' } } ]
```

### Get default account

Gets the accountId for the default account from the 'set default account' page.

Returns an accounty object with the default account

```js
sd.login()
  .then(sd.getDefaultAccount)
  .then(console.dir)

// { accountId: '000123456ABCD' }
```

### Set default account

Sets the default account

Requires an accounty object for the account you want to set as default

Returns an accounty object with the new default account

```js
sd.login()
  .then(() => sd.setDefaultAccount({ accountId: '000123456' }))
  .then(console.dir)

// { accountId: '000123456' }
```

```js
sd.login()
  .then(sd.getAccounts)
  .then(accounts => accounts.find(account => account.name == 'Share Dealing Account'))
  .then(sd.setDefaultAccount)
  .then(console.dir)

// { accountId: '000123456' }
```

### Get dividend options

Returns the dividend options for all accounts

Returns an array of accounty objects with divident option data

```js
sd.login()
  .then(sd.getDividendOptions)
  .then(console.dir)

// [ { accountId: '000123456',
//     dividendOptionCode: 'H',
//     dividendOptionName: 'Hold In Account' },
//   { accountId: '000123456ABCD',
//     dividendOptionCode: 'R',
//     dividendOptionName: 'Automatic Dividend Reinvestment' } ]
```

### Get statements

Gets all statements

Returns an array of statements

```js
sd.login()
  .then(sd.getStatements)
  .then(console.dir)

// [ { statementId: '1', statementDate: '01 Jan 1970' } ]
```

## Glossary

- `accountId`: Equivalent to what I think Halifax call a `PortCode`. Usually the account code with potentially some letters after it. Accounts with different `accountId`s may share the same account code. I think these are unique across logins.
- `statementId`: Statement id, I think it's an incrementing number starting at `1` - not unique across logins. Statements are attached to a login (as opposed to account), and `statementId`s are unique within a login.
- `accounty object`: An object with an `accountId` property

## Contributing

PRs are welcomed, please submit them on [Github](https://github.com/domdomegg/halifax-share-dealing-sdk/pulls).

Install dependencies with `npm install`

Uses Jest for tests - run `npm run test` to run them.

Uses JavaScript Standard Style - run `npm run lint` to view issues, and `npm run lint:fix` to automagically fix them.

A useful pre-commit hook (save as `.git/hooks/pre-commit`) to ensure the tests pass, the code is formatted correctly and you haven't accidentally left your personal details in is (change 000123456 to your account code or other personal data you want to search for):

```sh
#!/bin/sh
npm run test && npm run lint && ! grep --exclude=pre-commit -r '000123456' .
```

Warning: It is still possible to commit your data if you stage it, delete it and then commit. Please be careful!