import React from 'react'

import { Dropzone } from './Dropzone'

export default {
  title: 'Components/Dropzone',
  component: Dropzone,
}

export const Primary = () => {
  return (
    <div style={{ width: 300 }}>
      <Dropzone
        onChange={() => {
          /* do nothing */
        }}
        allowedExtensions={['jpg', 'docx', 'pdf']}
        maFileSize="5 M"
        label="Upload File"
      />
    </div>
  )
}
