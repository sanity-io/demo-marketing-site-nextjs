import type {PropsWithChildren} from 'react'
import * as React from 'react'

import {GlobalDataProps, PageQueryParams} from '../../types'
import Alert from '../Alert'
import {DebugProvider} from '../Debug/DebugProvider'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

export type LayoutProps = {
  preview: boolean
  queryParams?: PageQueryParams
  globalData?: GlobalDataProps
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const {preview, queryParams, children} = props
  const {settings, menus} = props.globalData || {}

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
