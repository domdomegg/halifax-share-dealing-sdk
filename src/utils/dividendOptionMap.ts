import { DividendOption } from "../types"

export const fromName: Record<DividendOption['dividendOptionName'], DividendOption['dividendOptionCode']> = {
  'Automatic Dividend Reinvestment': 'R',
  'Hold In Account': 'H',
  'Pay Away Immediately': 'P',
  'Pay Away 6-Monthly': 'P6'
}

export const fromCode: Record<DividendOption['dividendOptionCode'], DividendOption['dividendOptionName']> = {
  R: 'Automatic Dividend Reinvestment',
  H: 'Hold In Account',
  P: 'Pay Away Immediately',
  P6: 'Pay Away 6-Monthly'
}
