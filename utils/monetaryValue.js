module.exports = (valueAsText) => {
  const parsedText = valueAsText.replace(/[*,\s]/g, '').replace(/[£p]/, '')

  if (!validParsedText(parsedText)) {
    throw new Error('Invalid monetary value string: ' + valueAsText)
  }

  if (!valueAsText.includes('£') && !valueAsText.includes('p')) {
    throw new Error('Monetary value string missing units (£ or p): ' + valueAsText)
  }

  return {
    asFloat: parseFloat(parsedText) / (valueAsText.includes('p') ? 100 : 1),
    asText: valueAsText
  }
}

const validParsedText = str => /^\d+(\.?\d\d)$/.test(str)
