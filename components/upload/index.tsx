import React, { useRef } from 'react'
import { Upload as UploadArco, Message, Progress, Alert } from '@arco-design/web-react'
import { useToken, useApi, useLanguage } from '@/hooks'

export default function Upload (
  {
    onUpload
  }: {
    onUpload: (e: number) => void
  }
): JSX.Element {
  const token = useToken()
  const api = useApi()
  const language = useLanguage()
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState< 'success' | 'error' | 'normal' >('normal')
  const count = useRef(0)
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent): void => {
      const items = e.clipboardData?.items
      if (items != null) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item.kind === 'file') {
            const file = item.getAsFile()
            if (file != null) {
              upload(file)
            }
          }
        }
      }
    }
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

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
      void navigator.clipboard.writeText(String(api.apiPrefix) + String(res[0].url)).then(() => {
        Message.success({
          content: language.i18n.success,
          duration: 1000,
          closable: true
        })
        Message.success({
          content: language.i18n.copied,
          duration: 1000,
          closable: true
        })
        count.current = count.current + 1
        onUpload(count.current)
      })
    }).catch((e) => {
      Message.error({
        content: language.i18n.failed,
        duration: 1000,
        closable: true
      })
      count.current = count.current + 1
      onUpload(count.current)
      setStatus('error')
      console.log(e)
    })
  }

  return (
    <div className={'h-full lg:absolute w-full xl:w-96 mb-3'}>
        <UploadArco
            className={'h-max w-full xl:w-96'}
            drag
            autoUpload={false}
            directory={false}
            multiple={false}
            beforeUpload={(file) => {
              upload(file)
              return false
            }}
            tip={language.i18n.upload}
        >
            <div className={'w-full mr-2 h-96 xl:w-96 bg-gray-50 rounded-md hover:bg-gray-100 transition-all ease-in-out duration-500 flex flex-col justify-center items-center'}>
                <div className={'text-xl'}>
                    {language.i18n.upload}
                </div>
            </div>
        </UploadArco>
        <Progress percent={progress} status={status} style={{ marginBottom: 20 }} />
        <Alert
            showIcon={false}
            type='success'
            className={'!w-96'}
            content={'TIP: 使用前请设置您的 API 前缀和 Token. Please set your API prefix and Token before use.'}
        />
    </div>
  )
}
