import {Head, Html, Main, NextScript} from 'next/document'
import * as React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white font-medium text-black selection:bg-magenta-500 selection:text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
