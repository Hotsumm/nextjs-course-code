import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../src/components/layout/Layout';
import Head from 'next/head';
import NotificationContextProvider from '../src/components/context/NotificationContextProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
