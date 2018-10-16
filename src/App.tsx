import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/container/Layout'

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
