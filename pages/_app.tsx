import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../src/components/layout/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
