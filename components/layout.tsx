import Alert from './alert'
import Meta from './meta'

export default function Layout({ preview, queryParams, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <Alert preview={preview} queryParams={queryParams} />}
        <main>{children}</main>
      </div>
    </>
  )
}
