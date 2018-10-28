import * as React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Layout } from './components/container/Layout'
import { Page } from './components/container/Page'
import { setupIcon } from './services/icon'
import { SearchPage } from './scences/SearchPage'
import { NotFoundPage } from './components/static/NotFoundPage'

setupIcon()

const App = () => (
  <BrowserRouter>
    <div className='cobi'>
      <Layout>
        <Switch>
          <Page title='Cobi'
            description='Cobi home page'
            path='/'
            exact={true}
            component={SearchPage} />
          <Page title='Search'
            description='Seeking your information'
            path='/search' component={SearchPage} />
          <Page title='Not found page'
            description='Sorry we could not found your page'
            component={NotFoundPage} />
        </Switch>
      </Layout>
    </div>
  </BrowserRouter>
)

export default App