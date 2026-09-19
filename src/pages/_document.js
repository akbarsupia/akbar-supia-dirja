import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
          <link rel="stylesheet" href="/styles.css" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <meta name="theme-color" content="#1b1b1b" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
