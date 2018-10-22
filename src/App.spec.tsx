import * as React from 'react'
import configureStore from 'redux-mock-store'
import * as ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const mockStore = configureStore()
  const store = mockStore({
    search: {
      items: [],
      error: false,
      isLoading: false
    }
  })
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
    div)
});
