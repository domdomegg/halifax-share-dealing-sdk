module.exports = valueAsText => {
  const parsedText = valueAsText.replace(/[*,\s]/g, '').replace(/[£p]/, '')

  if (!validParsedText(parsedText)) {
    throw new Error('Invalid monetary value string: ' + valueAsText)
  }

  if (!valueAsText.includes('£') && !valueAsText.includes('p')) {
    throw new Error('Monetary value string missing units (£ or p): ' + valueAsText)
  }

  const poundsText = valueAsText.includes('£') ? parsedText : penceToPoundsText(parsedText)

  return {
    asFloat: parseFloat(poundsText),
    asText: valueAsText
  }
}

const validParsedText = str => /^\d+(\.\d\d)?$/.test(str)
const penceToPoundsText = str => (parseFloat(str) / 100).toFixed((str.split('.')[1] || '').length + 2)
