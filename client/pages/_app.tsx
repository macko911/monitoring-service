import React from 'react'
import Head from 'next/head'
import '../styles.css'

import { Layout } from '../components'

// eslint-disable-next-line react/prop-types
export default function App({Component, pageProps}) {
  return  (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
