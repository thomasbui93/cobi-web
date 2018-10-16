import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/container/Layout'
import { setupIcon } from './services/icon'

setupIcon()

const App = () => (
  <BrowserRouter>
    <div className='cobi'>
      <Layout>
        <div>
          Content
        </div>
      </Layout>
    </div>
  </BrowserRouter>
)

export default App