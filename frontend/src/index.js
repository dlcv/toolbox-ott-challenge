require('bootstrap/dist/css/bootstrap.min.css')

const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const store = require('./redux/store')
const App = require('./App')

ReactDOM.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      Provider,
      { store: store },
      React.createElement(App, null)
    )
  ),
  document.getElementById('root')
)