import React, { useEffect, useState } from 'react'

// import axios from 'axios'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import _ from 'lodash'
import { Modal } from 'react-bootstrap'

import { ReportMap } from 'src/components/ReportMap'

dayjs.extend(localizedFormat)

const TEST_DATA = [
  {
    _id: 1,
    date: '2023-03-27T12:30:00.085Z',
    type: 'Animal',
    incident: 'Found a seal',
    latitude: 53.4052864,
    longitude: -2.9622272
  },
  {
    _id: 2,
    date: '2023-03-09T00:00:00.000Z',
    type: 'Litter',
    incident: 'rubbish',
    latitude: 53.3088015532806,
    longitude: -4.653087638265936
  },
  {
    _id: 3,
    date: '2023-03-09T00:00:00.000Z',
    type: 'Other',
    incident: 'The water is purple!',
    latitude: 53.50677459491004,
    longitude: -3.6364213024833942
  }
]

export const Reports = () => {
  const [reports, setReports] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string|number|undefined>()

  useEffect(() => {
    setReports(TEST_DATA)
    // axios.get('http://localhost:5984/data/_all_docs?include_docs=True').then(r => {
    //   setReports(r.data.rows.map((x: any) => x.doc))
    // })
  }, [])

  const thisData = selectedId ? _.find(reports, x => x._id === selectedId) : null

  return (
    <div style={{ height: '100vh' }}>
      {selectedId &&
        <Modal show onHide={() => setSelectedId(undefined)}>
          <Modal.Header closeButton>
            <Modal.Title>{thisData.type} at {dayjs(thisData.date).format('L LT')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {thisData.incident}
          </Modal.Body>
        </Modal>
      }

      <ReportMap data={reports} setSelectedId={setSelectedId} />
    </div>
  )
}
