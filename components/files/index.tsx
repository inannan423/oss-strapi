import React, { useEffect } from 'react'
import { useApi, useToken, useLanguage } from '@/hooks'
import type { IStrapiImage, IResponse } from '@/types'
import { Message, Popconfirm, Tooltip } from '@arco-design/web-react'
import { IconCopy, IconDelete } from '@arco-design/web-react/icon'

export default function Files (): JSX.Element {
  const [getted, setGetted] = React.useState(false)
  const token = useToken()
  const api = useApi()
  const language = useLanguage()
  const [files, setFiles] = React.useState<IStrapiImage[]>()
  useEffect(() => {
    void fetch(api.apiPrefix + '/api/upload/files', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.token
      }
    }).then(async (res) => {
      return await res.json()
    }).then((res: IStrapiImage[]) => {
      setFiles(res.reverse())
      setGetted(true)
    }).catch((e) => {
      console.log(e)
      Message.error(language.i18n.error)
    })
  }, [getted])
  const deleteFile = (id: string): void => {
    void fetch(api.apiPrefix + '/api/upload/files/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.token
      }
    }).then(async (res) => {
      return await res.json()
    }).then((res: IResponse) => {
      console.log(res)
      if (res.id != null) {
        Message.success(language.i18n.success)
        setGetted(false)
      } else if (res.error.message != null) {
        Message.error(res.error.message)
      } else {
        Message.error(language.i18n.unknownError)
      }
    }).catch((e) => {
      console.log(e)
      Message.error(language.i18n.failed)
    })
  }
  return (
        <>
            <div className={'px-2'}>
                {files?.length} Files
            </div>
            <div className={'grid grid-cols-3 h-full gap-3 w-full px-2 py-3'}>
                {
                    files?.map((file, index) => {
                      return (
                            <div key={index} className={'h-full'}>
                                <Tooltip
                                    content={String(file.size) + 'B | ' + String(file.updatedAt)}>
                                    <div key={index} className={'w-full h-32 bg-gray-200 rounded-lg overflow-hidden'}>
                                        {
                                            file.mime.includes('image') && file.formats !== null &&
                                            <img src={api.apiPrefix + file.formats.thumbnail.url}
                                                 alt={file.alternativeText}
                                                 className={'h-32 w-full object-cover object-center'}/>
                                        }
                                        {
                                            file.mime.includes('video') && <video src={api.apiPrefix + file.url}
                                                                                  className={'h-32 w-full object-cover object-center'}/>
                                        }
                                    </div>
                                </Tooltip>
                                <div className={'flex w-full items-center justify-between mt-1'}>
                                    <div className={'w-1/2 truncate'}>
                                        {file.name}
                                    </div>
                                    <div className={'w-1/2 flex gap-2 justify-end'}>
                                        <IconCopy
                                            className={'cursor-pointer'}
                                            onClick={() => {
                                              void navigator.clipboard.writeText(api.apiPrefix + file.url).then(() => {
                                                Message.success(language.i18n.copied)
                                              })
                                            }}
                                        />
                                        <Popconfirm
                                            focusLock
                                            title={language.i18n.deleteTitle}
                                            content={language.i18n.deleteContent}
                                            okText={language.i18n.okText}
                                            cancelText={language.i18n.cancelText}
                                            onOk={() => {
                                              deleteFile(String(file.id))
                                            }}
                                        >
                                            <IconDelete
                                                className={'cursor-pointer'}
                                            />
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                      )
                    })
                }
            </div>
        </>
  )
}
