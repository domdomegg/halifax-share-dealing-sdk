import type { Config, DividendOption } from '../types';
import urlBuilder from '../utils/urlBuilder';
import request from '../utils/requestAgent';
import log from '../utils/promiseLogger';
import { fromCode as dividendOptionCodeToDividendOptionName } from '../utils/dividendOptionMap';

export default (config: Config) => (): Promise<DividendOption[]> => request(urlBuilder(config).generateSD('sddividendinstructions'))
  .then(log('Got dividend options'))
  .then(({ body: { $ } }) => {
    const dividendOptionRadios = $('tbody tr input:checked').get();

    return dividendOptionRadios.map((dividendOptionRadio) => ({
      accountId: dividendOptionRadio.attribs.name.split('radio')[1],
      dividendOptionCode: dividendOptionRadio.attribs.value,
      dividendOptionName: dividendOptionCodeToDividendOptionName[
        dividendOptionRadio.attribs.value as
          keyof typeof dividendOptionCodeToDividendOptionName
      ],
    }));
  });
