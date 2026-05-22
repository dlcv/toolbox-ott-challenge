const React = require('react')
const { useState } = require('react')
const AppTexts = require('../utils/appTexts')
const { Form, Button, InputGroup } = require('react-bootstrap')

function SearchBar ({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return React.createElement(
    Form,
    { onSubmit: handleSubmit, className: 'mb-3' },
    React.createElement(
      InputGroup,
      null,
      React.createElement(Form.Control, {
        type: 'text',
        placeholder: AppTexts.SEARCH_PLACEHOLDER,
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value)
      }),
      React.createElement(
        Button,
        { type: 'submit', variant: 'secondary' },
        AppTexts.SEARCH_BUTTON
      ),
      React.createElement(
        Button,
        { variant: 'outline-secondary', onClick: handleClear },
        AppTexts.RESET_BUTTON
      )
    )
  )
}

module.exports = SearchBar
