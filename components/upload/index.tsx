import React from 'react'
import { Upload as UploadArco } from '@arco-design/web-react'
import { useToken, useApi } from '@/hooks'

export default function Upload (): JSX.Element {
  const token = useToken()
  const api = useApi()
  return (
    <div className={'h-full'}>
        <UploadArco
            className={'h-max'}
            listType='picture-list'
            drag
            multiple
            accept='image/*'
            action='/'
            onDrop={(e) => {
              console.log(e)
            }}
            imagePreview
        />
    </div>
  )
}
