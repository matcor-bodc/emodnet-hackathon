import React, { useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

// import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

// import { ImageDropzone } from 'src/components/ImageDropzone'
import { Map } from 'src/components/Map'

const TYPES = [
  'Animal',
  'Litter',
  'Other'
]

export const Submit = () => {
  const [data, setData] = useState<any>({})
  const [position, setPosition] = useState<[number, number]>()

  const onFieldChange = (value: any, name: string) => {
    setData((prev: any) => ({ ...prev, [name]: value }))
  }

  const onSubmit = () => {
    if (!position || !data) return

    const payload = {
      ...data,
      latitude: position[1],
      longitude: position[0]
    }
    console.log(payload)
    // axios.post('http://@localhost:5984/data', payload)
  }

  return (
    <Container>
      <div style={{ height: '400px' }}>
        <Map setPosition={setPosition} position={position} />
      </div>

      <Form>
        <Row>
          <Col>
            <Form.Group className='mt-3'>
              <Form.Label>Latitude</Form.Label>
              <Form.Control type='number' value={position ? position[1] : ''} readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mt-3'>
              <Form.Label>Longitude</Form.Label>
              <Form.Control type='number' value={position ? position[0] : ''} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mt-3'>
          <Form.Label>When did this happen?</Form.Label>
          <DatePicker
            selected={data.date}
            onChange={date => onFieldChange(date, 'date')}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className='form-control'
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>What type of event was it?</Form.Label>
          <Form.Select value={data.type} onChange={e => onFieldChange(e.target.value, 'type')}>
            <option>Please select</option>
            {TYPES.map(x =>
              <option value={x} key={x}>{x}</option>
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Describe the incident</Form.Label>
          <Form.Control
            as='textarea'
            value={data ? data.incident : ''}
            onChange={e => onFieldChange(e.target.value, 'incident')}
          />
        </Form.Group>

        {/*
        <Form.Group className='mt-3'>
          <Form.Label>Upload Photos/Videos</Form.Label>
          <ImageDropzone />
        </Form.Group> */}

        <Button variant="primary" onClick={onSubmit} className='mt-4'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
