import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout } from './components/container/Layout'
import { setupIcon } from './services/icon'
import { SearchPage } from './scences/SearchPage'
import { NotFoundPage } from './components/static/NotFoundPage'

setupIcon()

const App = () => (
  <BrowserRouter>
    <div className='cobi'>
      <Layout>
        <Switch>
          <Route path='/' component={SearchPage} />
          <Route path='/search' component={SearchPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </div>
  </BrowserRouter>
)

export default App