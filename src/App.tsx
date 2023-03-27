import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { Home } from 'src/Home'

import { Reports } from './pages/Reports'
import { Submit } from './pages/Submit'

export const App = () => {
  return (
    <Router basename={'/'}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/submit' element={<Submit />} />
        <Route path='/reports' element={<Reports />} />
      </Routes>
    </Router>
  )
}
