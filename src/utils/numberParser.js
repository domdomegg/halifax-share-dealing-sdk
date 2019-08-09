module.exports = valueAsText => {
  const parsedText = valueAsText.replace(/[*,\s]/g, '').replace(/[£p%]/, '')

  if (!validParsedText(parsedText)) {
    throw new Error('Invalid numeric string: ' + valueAsText)
  }

  if (!valueAsText.includes('£') && !valueAsText.includes('p') && !valueAsText.includes('%')) {
    return {
      asFloat: parseFloat(parsedText),
      asText: parsedText,
      asRawText: valueAsText.trim()
    }
  }

  return {
    asFloat: parseFloat(valueAsText.includes('£') ? parsedText : divide100(parsedText)),
    asText: valueAsText.includes('£') ? '£' + parsedText : (valueAsText.includes('p') ? parsedText + 'p' : parsedText + '%'),
    asRawText: valueAsText.trim()
  }
}

const validParsedText = str => /^\d+(\.\d+)?$/.test(str)
const divide100 = str => (parseFloat(str) / 100).toFixed((str.split('.')[1] || '').length + 2)
