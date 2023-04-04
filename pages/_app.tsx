import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import '@arco-design/web-react/dist/css/arco.css'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
