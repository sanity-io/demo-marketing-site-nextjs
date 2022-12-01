import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black selection:bg-theme selection:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
