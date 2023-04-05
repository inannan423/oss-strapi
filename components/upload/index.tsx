import React from 'react'
import { Upload as UploadArco, Message, Progress } from '@arco-design/web-react'
import { useToken, useApi } from '@/hooks'

export default function Upload (): JSX.Element {
  const token = useToken()
  const api = useApi()
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState< 'success' | 'error' | 'normal' >('normal')
  const upload = (file: File): void => {
    setProgress(Math.floor(Math.random() * 100))
    const formData = new FormData()
    formData.append('files', file)
    void fetch(api.apiPrefix + '/api/upload/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token.token
      },
      body: formData
    }).then(async (res) => {
      return await res.json()
    }).then((res) => {
      console.log(res)
      setProgress(100)
      setStatus('success')
      Message.success('Upload success')
    }).catch((e) => {
      Message.error('Upload failed')
      setStatus('error')
      console.log(e)
    })
  }
  return (
    <div className={'h-full absolute w-96'}>
        <UploadArco
            className={'h-max w-96'}
            drag
            autoUpload={false}
            directory={false}
            multiple={false}
            onDrop={(e) => {
              upload(e.dataTransfer.files[0])
            }}
            beforeUpload={(file) => {
              upload(file)
              return false
            }}
        />
        <Progress percent={progress} status={status} style={{ marginBottom: 20 }} />
    </div>
  )
}
