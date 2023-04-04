import React, { useState } from 'react'
import { IconSettings } from '@arco-design/web-react/icon'
import { Alert } from '@arco-design/web-react'
import { Setting } from '@/components'

export default function Header (): JSX.Element {
  const [visible, setVisible] = useState(false)
  return (
        <div className={'w-full h-full flex justify-between items-center'}>
            <div className={'font-bold font-mono text-3xl'}>
                Strapi OSS
            </div>
            <Alert
                type='warning'
                className={'!w-96'}
                content={'请设置您的 API 前缀和 Token. Please set your API prefix and Token.'}
            />
            <div>
                <IconSettings
                    onClick={() => {
                      setVisible(true)
                    }}
                    className={'text-2xl transform hover:rotate-180 cursor-pointer transition-all ease duration-500'} />
                <Setting visible={visible}
                         onDrawerOk={() => {
                           setVisible(false)
                         }}
                         onDrawerCancel={() => {
                           setVisible(false)
                         }} />
            </div>
        </div>
  )
}
