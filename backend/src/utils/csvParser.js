function csvParser (csvText, fileName) {
  if (!csvText || typeof csvText !== 'string' || csvText.trim() === '') {
    return null
  }

  const lines = csvText.split(/\r?\n/)
  if (lines.length <= 1) {
    return null
  }

  const validLines = []
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim()
    if (rawLine === '') {
      continue
    }

    const columns = rawLine.split(',')
    if (columns.length !== 4) {
      continue
    }

    const [fileField, textField, numberField, hexField] = columns
    if (fileField.trim() !== fileName) {
      continue
    }

    const cleanText = textField.trim()
    if (cleanText === '') {
      continue
    }

    const cleanNumber = numberField.trim()
    const parsedNumber = Number(cleanNumber)
    if (cleanNumber === '' || Number.isNaN(parsedNumber) || !Number.isInteger(parsedNumber)) {
      continue
    }

    const cleanHex = hexField.trim()
    const hexRegex = /^[0-9a-fA-F]{32}$/
    if (!hexRegex.test(cleanHex)) {
      continue
    }

    validLines.push({
      text: cleanText,
      number: parsedNumber,
      hex: cleanHex
    })
  }

  if (validLines.length === 0) {
    return null
  }

  return {
    file: fileName,
    lines: validLines
  }
}

module.exports = csvParser