import type {Config, Statement} from '../types';
import urlBuilder from '../utils/urlBuilder';
import request from '../utils/requestAgent';
import log from '../utils/promiseLogger';

export default (config: Config) => async (): Promise<Statement[]> => request(urlBuilder(config).generateSS('Stmnts'))
	.then(log('Got statements'))
	.then(({body: {$}}) => {
		const statementRows = $('#divDealingHistDT table > tr').get();

		return statementRows.map<Statement>((statementRow) => ({

			statementId: $('a', statementRow).eq(0).attr('href')!.split('?id=')[1]!,
			statementDate: $('td', statementRow).eq(0).text(),
		}));
	});
