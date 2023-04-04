import React, { useState } from 'react'
import { Drawer, Form, Input, Select, Message, Icon } from '@arco-design/web-react'
import { useLanguage, useApi, useToken } from '@/hooks'
const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js'
})

export default function Setting ({ visible, onDrawerOk, onDrawerCancel }: {
  visible: boolean
  onDrawerOk: () => void
  onDrawerCancel: () => void
}): JSX.Element {
  const apip = useApi()
  const tokens = useToken()
  const language = useLanguage()
  const [form] = Form.useForm()
  const [langs, setLangs] = useState<string>()
  const [apiPrefix, setApiPrefix] = useState<string>()
  const [token, setToken] = useState<string>()

  const Submit = (): void => {
    if (typeof window !== 'undefined') {
      if (langs != null) {
        window.localStorage.setItem('strapilanguage', langs)
        language.changeLanguage(langs)
      }
      if (apiPrefix != null) {
        apip.setApiPrefix(apiPrefix)
      }
      if (token != null) {
        window.localStorage.setItem('strapiToken', token)
      }
      onDrawerOk()
    } else {
      console.log('window is undefined')
      Message.error({
        icon: <IconFont type='icon-error' />,
        content: 'Error'
      })
      onDrawerOk()
    }
  }

  return (
    <div className={'h-full w-full'}>
      <Drawer
        width={332}
        title={<span>{language.i18n.setting}</span>}
        visible={visible}
        onOk={() => {
          Submit()
        }}
        onCancel={() => {
          onDrawerCancel()
        }}
      >
          <Form form={form} layout='vertical'>
              <Form.Item label={language.i18n.language} field='language'>
                  <Select
                      placeholder={String(language.language) === 'zh' ? '中文' : 'English'}
                      options={['English', '中文']}
                      onChange={(value) => {
                        if (value === 'English') {
                          setLangs('en')
                        } else {
                          setLangs('zh')
                        }
                      }}
                  />
              </Form.Item>
              <Form.Item label={language.i18n.apiPrefix} field='api'>
                  <Input
                        placeholder={apip.hasApiPrefix ? apip.apiPrefix : 'example: https://oss.yourdomain.com'}
                        onChange={(value) => {
                          setApiPrefix(value)
                        }}
                  />
              </Form.Item>
              <Form.Item label='TOKEN' field='token'>
                  <Input.Password
                      placeholder={tokens.hasToken ? tokens.token : 'example: 1234567890'}
                      type={'password'}
                    onChange={(value) => {
                      setToken(value)
                    }}
                  />
              </Form.Item>
          </Form>
      </Drawer>
    </div>
  )
}
