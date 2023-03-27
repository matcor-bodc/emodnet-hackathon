import React from 'react'

import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <Container>
      <Link to='/submit'>Submit Report</Link>
      <br/>
      <Link to='/reports'>Reports</Link>
    </Container>
  )
}
