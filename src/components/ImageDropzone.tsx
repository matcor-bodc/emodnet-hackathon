import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import './style.css'

const thumbsContainer: any = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

const thumb: any = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner: any = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img: any = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

export const ImageDropzone = (props: any) => {
  const [files, setFiles] = useState<any[]>([])
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg']
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  // const removeFile = (file: any) => () => {
  //   const newFiles = [...files]
  //   newFiles.splice(newFiles.indexOf(file), 1)
  //   setFiles(newFiles)
  // }

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
      {/* <button onClick={removeFile(file)}>Remove File</button> */}
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <section className='container'>
      <div
        {...getRootProps({ className: 'dropzone' })}
        onClick={(e) => e.stopPropagation}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
        <div>
          <Button type='button' onClick={open}>
            Open File Dialog
          </Button>
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  )
}
