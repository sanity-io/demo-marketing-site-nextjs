import type { PropsWithChildren } from 'react'

import { PageQueryParams, WebsiteSettingsProps } from '../types'
import Alert from './alert'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

export type LayoutProps = {
  preview: boolean
  queryParams?: PageQueryParams
  websiteSettings?: WebsiteSettingsProps
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { preview, queryParams, children, websiteSettings } = props

  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header title={websiteSettings?.title} />
        {preview && queryParams?.slug ? (
          <Alert preview={preview} queryParams={queryParams} />
        ) : null}
        <main>{children}</main>
        <Footer title={websiteSettings?.title} />
      </div>
    </>
  )
}
