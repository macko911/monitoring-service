import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'

import { Layout } from '../components'
import { store } from '../store'

import '../styles.css'

// eslint-disable-next-line react/prop-types
function App({Component, pageProps}) {
  return  (
    <Provider store={store}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <title>Digitoo monitoring service</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
