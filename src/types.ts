export type Config = {
	site: 'halifax' | 'scottishwidows' | 'iweb' | 'bos' | 'lloyds';
	USERNAME: string;
	PASSWORD: string;
	MEMORABLE_INFORMATION: {
		'Your mother\'s FIRST name': string;
		'Your father\'s FIRST name': string;
		'Your place/town of birth': string;
		'The name of your first school': string;
	};
};

export type Accounty = {
	accountId: string;
};

export type Account = {
	name: string;
	availableToInvest: ParsedNumber;
	totalSecurities: ParsedNumber;
	totalValue: ParsedNumber;
} & Accounty;

export type DividendOption = Accounty & (
	| {dividendOptionCode: 'R'; dividendOptionName: 'Automatic Dividend Reinvestment'}
	| {dividendOptionCode: 'H'; dividendOptionName: 'Hold In Account'}
	| {dividendOptionCode: 'P'; dividendOptionName: 'Pay Away Immediately'}
	| {dividendOptionCode: 'P6'; dividendOptionName: 'Pay Away 6-Monthly'}
);

export type Statement = {
	statementId: string;
	statementDate: string;
};

export type Valuation = {
	accountId: string;
	stocks: Stock[];
	cash: ParsedNumber;
	availableToInvest: ParsedNumber;
	totalSecurities: ParsedNumber;
	totalValue: Omit<ParsedNumber, 'asRawText'>;
};

export type Stock = {
	TIDM: string;
	fullName: string;
	holding: ParsedNumber;
	avgCostPerShare: ParsedNumber;
	bookCost: ParsedNumber;
	latestPricePerShare: ParsedNumber;
	valuation: ParsedNumber;
	change: {
		absolute: ParsedNumber;
		percentage: ParsedNumber;
	};
};

export type Dividend = {
	issueDate: string;
	fullName: string;
	exDividendDate: string;
	sharesHeldOnExDividendDate: ParsedNumber;
	amountPayable: ParsedNumber;
	handlingOperation: Omit<DividendOption, 'accountId'>;
	cashRef: string;
};

export type ParsedNumber = {
	asFloat: number;
	asText: string;
	asRawText: string;
};
