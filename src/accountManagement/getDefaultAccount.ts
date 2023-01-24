import type { Accounty, Config } from '../types';
import urlBuilder from '../utils/urlBuilder';
import request from '../utils/requestAgent';
import log from '../utils/promiseLogger';

export default (config: Config) => (): Promise<Accounty> => request(urlBuilder(config).generateSD('sddefaultaccount'))
  .then(log('Got default account'))
  .then(({ body: { $ } }) => {
    const defaultAccountRadio = $('input:checked');

    return {
      accountId: defaultAccountRadio.val(),
    };
  });
