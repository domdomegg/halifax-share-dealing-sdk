import type {
  Accounty, Config, Stock, Valuation,
} from '../types';
import urlBuilder from '../utils/urlBuilder';
import request from '../utils/requestAgent';
import log from '../utils/promiseLogger';
import nP from '../utils/numberParser';

export default (config: Config) => ({ accountId }: Accounty): Promise<Valuation> => request(urlBuilder(config).generateSD('sdaccountvaluation', accountId))
  .then(log('Got valuation'))
  .then(({ body: { $ } }) => {
    const valuationRows = $('#sortable tbody tr').get();

    const stocks: Stock[] = valuationRows.map((valuationRow) => ({
      TIDM: $('td strong', valuationRow).eq(0).text(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fullName: $('td div', valuationRow).eq(0).attr('title')!,
      holding: nP($('td', valuationRow).eq(1).text()),
      avgCostPerShare: nP($('td', valuationRow).eq(2).text()),
      bookCost: nP($('td', valuationRow).eq(3).text()),
      latestPricePerShare: nP($('td', valuationRow).eq(4).text()),
      valuation: nP($('td', valuationRow).eq(5).text()),
      change: {
        absolute: nP($('td', valuationRow).eq(6).text()),
        percentage: nP($('td', valuationRow).eq(7).text()),
      },
    }));

    const cash = nP($('.account-header tr td').eq(3).text());
    const totalSecurities = nP($('[headers="val total"]').eq(0).text());

    const totalSecuritiesFromStocks = stocks.reduce((acc, cur) => acc + cur.valuation.asFloat, 0);
    if (Math.abs(totalSecurities.asFloat - totalSecuritiesFromStocks) > 0.01) {
      // eslint-disable-next-line no-console
      console.warn('Total securities figure and sum of stocks don\'t add up');
    }

    const nPTotalValue = nP(`£${(Math.round(100 * (totalSecurities.asFloat + cash.asFloat)) / 100).toFixed(2)}`);

    return {
      accountId,
      stocks,
      cash,
      availableToInvest: cash,
      totalSecurities,
      totalValue: {
        asFloat: nPTotalValue.asFloat,
        asText: nPTotalValue.asText,
      },
    };
  });
