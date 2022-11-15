import type { PropsWithChildren } from 'react'

import { PageQueryParams } from '../types'
import Alert from './alert'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

export type LayoutProps = {
  preview: boolean
  queryParams?: PageQueryParams
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { preview, queryParams, children } = props

  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header />
        {preview && <Alert preview={preview} queryParams={queryParams} />}
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
