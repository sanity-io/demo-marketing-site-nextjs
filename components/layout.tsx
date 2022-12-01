import type { PropsWithChildren } from 'react'

import { GlobalDataProps, PageQueryParams } from '../types'
import Alert from './alert'
import { DebugProvider } from './debug/debug-provider'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

export type LayoutProps = {
  preview: boolean
  queryParams?: PageQueryParams
  globalData?: GlobalDataProps
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { preview, queryParams, children } = props
  const { settings, menus } = props.globalData || {}

  return (
    <DebugProvider>
      <Meta />
      <div className="min-h-screen">
        <Header title={settings?.title} headerPrimary={menus?.headerPrimary} />
        {preview && queryParams?.slug ? (
          <Alert preview={preview} queryParams={queryParams} />
        ) : null}
        <main>{children}</main>
        <Footer title={settings?.title} />
      </div>
    </DebugProvider>
  )
}
