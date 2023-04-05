import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Header, Upload, Files } from '@/components'

const colors = [
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500'
]

export default function Home (): JSX.Element {
  //  随机颜色
  const [color] = useState(colors[Math.floor(Math.random() * colors.length)])
  return (
    <>
      <Head>
        <title>Strapi OSS</title>
        <meta name="description" content="Upload Files to Strapi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${color} h-96 w-96 fixed -bottom-20 -left-10 -z-10 opacity-10 blur-3xl`}></div>
      <div className={'min-h-screen h-screen w-full grid grid-cols-2 grid-rows-6 px-12 lg:px-24 z-20'}>
          <div className={'col-span-2 w-full h-full row-span-1'}>
              <Header />
          </div>
          <div className={'col-span-2 grid grid-cols-3 gap-10 h-full w-full row-span-5 overflow-auto'}>
              <div className={'col-span-1 h-full'}>
                  <Upload />
              </div>
              <div className={'col-span-2 h-full w-full'}>
                  <Files />
              </div>
          </div>
      </div>
    </>
  )
}
