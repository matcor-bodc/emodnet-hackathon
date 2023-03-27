import React, { useEffect, useState } from 'react'

import axios from 'axios'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import _ from 'lodash'
import { Modal } from 'react-bootstrap'

import { ReportMap } from 'src/components/ReportMap'

dayjs.extend(localizedFormat)

export const Reports = () => {
  const [reports, setReports] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string|number|undefined>()

  useEffect(() => {
    axios.get('http://localhost:5984/data/_all_docs?include_docs=True').then(r => {
      setReports(r.data.rows.map((x: any) => x.doc))
    })
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
