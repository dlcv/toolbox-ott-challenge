require('./styles/index.css')

const React = require('react')
const { useEffect } = require('react')
const AppTexts = require('./utils/appTexts')
const { fetchFiles } = require('./redux/actions')
const SearchBar = require('./components/searchBar')
const DataTable = require('./components/dataTable')
const { useDispatch, useSelector } = require('react-redux')
const { Container, Spinner, Alert } = require('react-bootstrap')

function App () {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchFiles())
  }, [dispatch])

  const handleSearch = (fileName) => {
    dispatch(fetchFiles(fileName))
  }

  return React.createElement(
    'div',
    null,
    React.createElement('div', { className: 'simple-header' }, AppTexts.APP_TITLE),
    React.createElement(
      Container,
      { className: 'main-container' },
      React.createElement(SearchBar, { onSearch: handleSearch }),

      loading && React.createElement(
        'div',
        { className: 'text-center my-4' },
        React.createElement(Spinner, { animation: 'border', variant: 'danger' })
      ),

      (!loading && error) && React.createElement(
        Alert,
        { variant: 'danger', className: 'text-center' },
        error
      ),

      (!loading && !error && data.length === 0) && React.createElement(
        Alert,
        { variant: 'warning', className: 'text-center' },
        AppTexts.NO_FILES_FOUND
      ),

      (!loading && !error && data.length > 0) && React.createElement(
        DataTable,
        { files: data }
      )
    )
  )
}

module.exports = App
