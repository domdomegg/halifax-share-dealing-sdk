# halifax-share-dealing-sdk

Unofficial SDK for Halifax Share Dealing, IWeb Share Dealing, Bank of Scotland Share Dealing and The Lloyds Bank Direct Investments Service

Scrapes internet banking, so may be broken by updates to their front end

## Usage

```javascript
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

## Contributing

PRs are welcomed, please submit them on [Github](https://github.com/domdomegg/halifax-share-dealing-sdk/pulls).

Uses JavaScript Standard Style - run `npm run lint` to view issues, and `npm run lint:fix` to automagically fix them.