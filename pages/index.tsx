import React, { useState } from 'react'
import Head from 'next/head'
import { Header, Upload, Files } from '@/components'

export default function Home (): JSX.Element {
  return (
    <>
      <Head>
        <title>Strapi OSS</title>
        <meta name="description" content="Upload Files to Strapi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={'bg-purple-500 h-96 w-96 fixed -bottom-20 -left-10 -z-10 opacity-20 blur-3xl'}></div>
      <div className={'min-h-screen h-screen w-full grid grid-cols-2 grid-rows-6 px-24 z-20'}>
          <div className={'col-span-2 w-full h-full row-span-1'}>
              <Header />
          </div>
          <div className={'col-span-2 grid grid-cols-3 gap-10 h-full row-span-5'}>
              <div className={'col-span-1 h-full'}>
                  <Upload />
              </div>
              <div className={'col-span-1 h-full overflow-hidden'}>
                  <Files />
              </div>
          </div>
      </div>
    </>
  )
}
