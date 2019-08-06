# halifax-share-dealing-sdk

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
//     availableToInvest: '£1.23',
//     totalSecurities: '£4.56',
//     totalValue: '£5.79' },
//   { accountId: '000123456ABCD',
//     name: 'Stocks and Shares ISA',
//     availableToInvest: '£1.23',
//     totalSecurities: '£4.56',
//     totalValue: '£5.79' } ]
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

Gets all the statements for an account

Requires an accounty object to get the statements for
Returns an array of accounty objects with statement data

```js
sd.login() // NB: Returns accounty object for default account
  .then(sd.getStatements)
  .then(console.dir)

// [ { accountId: '000123456ABCD',
//     statementId: '1',
//     statementDate: '01 Jan 1970' },
//   { accountId: '000123456ABCD',
//     statementId: '2',
//     statementDate: '02 Jan 1970' } ]
```

```js
sd.login()
  .then(sd.getAccounts)
  .then(accounts => accounts.find(account => account.name == 'Share Dealing Account'))
  .then(sd.getStatements)
  .then(console.dir)

// [ { accountId: '000123456',
//     statementId: '1',
//     statementDate: '01 Jan 1970' } ]
```

## Glossary

- `accountId`: Equivalent to what I think Halifax call a `PortCode`. Usually the account code with potentially some letters after it. Accounts with different `accountId`s may share the same account code.
- `accounty object`: An object with an `accountId` property

## Contributing

PRs are welcomed, please submit them on [Github](https://github.com/domdomegg/halifax-share-dealing-sdk/pulls).

Uses JavaScript Standard Style - run `npm run lint` to view issues, and `npm run lint:fix` to automagically fix them.