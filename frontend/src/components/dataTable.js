const React = require('react')
const { Table } = require('react-bootstrap')
const AppTexts = require('../utils/appTexts')

function DataTable ({ files }) {
  const rows = files.flatMap(fileObj =>
    fileObj.lines.map((line, index) => ({
      id: `${fileObj.file}-${index}`,
      fileName: fileObj.file,
      text: line.text,
      number: line.number,
      hex: line.hex
    }))
  )

  return React.createElement(
    Table,
    { striped: true, bordered: true, hover: true, className: 'mt-3' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement('th', null, AppTexts.FILE_NAME),
        React.createElement('th', null, AppTexts.FILE_TEXT),
        React.createElement('th', null, AppTexts.FILE_NUMBER),
        React.createElement('th', null, AppTexts.FILE_HEX)
      )
    ),
    React.createElement(
      'tbody',
      null,
      rows.map(row =>
        React.createElement(
          'tr',
          { key: row.id },
          React.createElement('td', null, row.fileName),
          React.createElement('td', null, row.text),
          React.createElement('td', null, row.number),
          React.createElement('td', null, row.hex)
        )
      )
    )
  )
}

module.exports = DataTable
