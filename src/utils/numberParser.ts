import type { ParsedNumber } from '../types';

export default (valueAsText: string): ParsedNumber => {
  const parsedText = valueAsText.replace(/[*,\s]/g, '').replace(/[£p%]/, '');
  const symbol = valueAsText.match(/[£p%]/)?.[0] as '£' | 'p' | '%' | undefined;

  if (!validParsedText(parsedText)) {
    throw new Error(`Invalid numeric string: ${valueAsText}`);
  }

  if (!symbol) {
    return {
      asFloat: parseFloat(parsedText),
      asText: parsedText,
      asRawText: valueAsText.trim(),
    };
  }

  return {
    asFloat: parseFloat(valueAsText.includes('£') ? parsedText : divide100(parsedText)),
    asText: symbol === '£' ? `${symbol}${parsedText}` : `${parsedText}${symbol}`,
    asRawText: valueAsText.trim(),
  };
};

const validParsedText = (str: string): boolean => /^-?\d+(\.\d+)?$/.test(str);
const divide100 = (str: string): string => (parseFloat(str) / 100).toFixed((str.split('.')[1] || '').length + 2);
