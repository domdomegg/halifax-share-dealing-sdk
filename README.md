# halifax-share-dealing-sdk

[![CI Status](https://github.com/domdomegg/halifax-share-dealing-sdk/workflows/CI/badge.svg)](https://github.com/domdomegg/halifax-share-dealing-sdk/actions?workflow=CI)
[![CD Status](https://github.com/domdomegg/halifax-share-dealing-sdk/workflows/CD/badge.svg)](https://github.com/domdomegg/halifax-share-dealing-sdk/actions?workflow=CD)
[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/domdomegg/halifax-share-dealing-sdk/blob/master/LICENSE)
[![NPM Package Version](https://img.shields.io/npm/v/halifax-share-dealing-sdk)](https://www.npmjs.com/package/halifax-share-dealing-sdk) 
[![Bundle size](https://img.shields.io/bundlephobia/minzip/halifax-share-dealing-sdk?label=size)](https://bundlephobia.com/result?p=halifax-share-dealing-sdk@latest)

Unofficial SDK for Halifax Share Dealing, IWeb Share Dealing, Bank of Scotland Share Dealing and The Lloyds Bank Direct Investments Service

Scrapes internet banking, so may be broken by updates to their front end

## Usage

### Setup

```js
const halifaxShareDealingSdk = require('halifax-share-dealing-sdk')
const sd = halifaxShareDealingSdk({
  site: 'halifax', // one of 'halifax', 'iweb', 'bos', 'lloyds'
  USERNAME: 'username',
  PASSWORD: 'password',
  MEMORABLE_INFORMATION: {
    "Your mother's FIRST name": 'Jane',
    "Your father's FIRST name": 'John',
    'Your place/town of birth': 'Anytown',
    'The name of your first school': 'Anyschool'
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
//     availableToInvest: { asFloat: 1.23, asText: '£1.23', asRawText: '£1.23' },
//     totalSecurities: { asFloat: 4.56, asText: '£4.56', asRawText: '£4.56' },
//     totalValue: { asFloat: 5.79, asText: '£5.79', asRawText: '£5.79' } },
//   { accountId: '000123456ABCD',
//     name: 'Stocks and Shares ISA',
//     availableToInvest: { asFloat: 1.23, asText: '£1.23', asRawText: '£1.23' },
//     totalSecurities: { asFloat: 4.56, asText: '£4.56', asRawText: '£4.56' },
//     totalValue: { asFloat: 5.79, asText: '£5.79', asRawText: '£5.79' } } ]
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

Returns an array of accounty objects with dividend option data

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

### Set dividend options

Sets the dividend options for all accounts

Requires an array of accounty objects with `dividendOptionCode`s. Only requires the data for the accounts you want changed. `dividendOptionName`s are optional, but if provided the request will fail if the `dividendOptionCode`s and `dividendOptionName`s do not match. `accountId`s must be unique in the input array.

Returns an array of accounty objects with the updated dividend option data

```js
sd.login()
  .then(() => [
      {
        accountId: '000123456ABCD',
        dividendOptionCode: 'P6'
      }
    ])
  .then(sd.setDividendOptions)
  .then(console.dir)

// [ { accountId: '000123456',
//     dividendOptionCode: 'H',
//     dividendOptionName: 'Hold In Account' },
//   { accountId: '000123456ABCD',
//     dividendOptionCode: 'P6',
//     dividendOptionName: 'Pay Away 6-Monthly' } ]
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

### Get valuation

Gets valuation for an account

Requires an accounty object for the account you wish to get the valuation for

Returns an accounty object with valuation data


```js
sd.login()
  .then(sd.getValuation)
  .then(console.dir)

// { accountId: '000123456ABCD',
//   stocks:
//      [ { TIDM: 'LLOY',
//        fullName: 'LLOYDS BANKING GP ORD GBP0.1',
//        holding: { asFloat: 100, asText: '100.000', asRawText: '100.000' },
//        avgCostPerShare: { asFloat: 0.495, asText: '49.50p', asRawText: '49.50p' },
//        bookCost: { asFloat: 49.5, asText: '£49.50', asRawText: '£49.50' },
//        latestPricePerShare: { asFloat: 0.555, asText: '55.50p', asRawText: '*55.50p' },
//        valuation: { asFloat: 55.5, asText: '£55.50', asRawText: '£55.50' },
//        change:
//         { absolute: { asFloat: 6, asText: '£6.00', asRawText: '£6.00' },
//           percentage: { asFloat: 0.1212, asText: '12.12%', asRawText: '12.12%' } } } ],
//   cash: { asFloat: 1000, asText: '£1000.00', asRawText: '£ 1,000.00' },
//   availableToInvest: { asFloat: 1000, asText: '£1000.00', asRawText: '£ 1,000.00' },
//   totalSecurities: { asFloat: 55.5, asText: '£55.50', asRawText: '£ 55.50' },
//   totalValue: { asFloat: 1055.5, asText: '£1055.50' } }
```

### Get dividend history

Gets dividend history for an account

Requires an accounty object for the account you wish to get the dividend history for

Returns an array of historical dividends relating to the account


```js
sd.login()
  .then(sd.getDividendHistory)
  .then(console.dir)

// [ { issueDate: '09 Oct 2019',
//     fullName: 'VANGUARD FUNDS PLC FTSE 250 UCITS ETF GBP DIS',
//     exDividendDate: '26 Sep 2019',
//     sharesHeldOnExDividendDate: { asFloat: 1, asText: '1', asRawText: '1' },
//     amountPayable: { asFloat: 0.26, asText: '£0.26', asRawText: '£0.26' },
//     handlingOperation:
//      { dividendOptionCode: 'Hold In Account',
//        dividendOptionName: 'H' },
//     cashRef: 'ABCDXYZ123' } ]
```

## Glossary

- `accountId`: Equivalent to what I think Halifax call a `PortCode`. Usually the account code with potentially some letters after it. Accounts with different `accountId`s may share the same account code. I think these are unique across logins.
- `statementId`: Statement id, I think it's an incrementing number starting at `1` - not unique across logins. Statements are attached to a login (as opposed to account), and `statementId`s are unique within a login.
- `accounty object`: An object with an `accountId` property
