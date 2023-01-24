import type { Accounty, Config } from './types';
import urlBuilder from './utils/urlBuilder';
import request from './utils/requestAgent';
import log from './utils/promiseLogger';

export default (config: Config) => (): Promise<Accounty> => request(urlBuilder(config).loginHxProcess)
  .type('form')
  .send({
    Username: config.USERNAME,
    password: config.PASSWORD,
  })
  .then(({ body: { $ }, redirects }) => {
    const memorableInformationPrompt: keyof Config['MEMORABLE_INFORMATION'] = $('#ctl00_MainPageContent_answer__LabelID').text();
    const viewstate: string = $('#__VIEWSTATE').val();

    if (!(memorableInformationPrompt in config.MEMORABLE_INFORMATION)) {
      throw new Error(`Config did not have answer for prompt: ${memorableInformationPrompt}`);
    }

    // eslint-disable-next-line no-console
    console.log('Got memorable information question and understood prompt');

    const answer = config.MEMORABLE_INFORMATION[memorableInformationPrompt];

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return request(redirects[0]!)
      .type('form')
      .send({
        __VIEWSTATE: viewstate,
        ctl00$MainPageContent$answer$TextBox: answer,
        ctl00$MainPageContent$_signin: 'Sign In',
      });
  })
  .then(log('Successfully logged in'))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - superagent v5 is missing TS definitions
  .then(({ req: { path } }) => ({ accountId: path.split('?Portcode=')[1] }));
