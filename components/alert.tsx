import cn from 'classnames'
import Link from 'next/link'

import Container from './container'

const AUDIENCES = {
  0: 'A',
  1: 'B',
}

export default function Alert({ preview, queryParams }) {
  const toggleAudienceUrl = new URLSearchParams()
  toggleAudienceUrl.set('slug', String(queryParams?.slug))
  toggleAudienceUrl.set('audience', String(queryParams?.audience === 0 ? 1 : 0))
  toggleAudienceUrl.set('date', String(queryParams?.date ?? ``))

  const updateTimeUrl = new URLSearchParams()
  updateTimeUrl.set('slug', String(queryParams?.slug))
  updateTimeUrl.set('audience', String(queryParams?.audience))
  updateTimeUrl.set(
    'date',
    queryParams?.date
      ? // Reset to use `now()`
        ``
      : // now plus one month
        // (TODO: Replace with datetime picker)
        new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
  )

  return (
    <div
      className={cn('border-b', {
        'border-accent-7 bg-accent-7 text-white': preview,
        'border-accent-2 bg-accent-1': !preview,
      })}
    >
      <div className="fixed flex h-screen w-screen items-end justify-center">
        {preview && (
          <div className="flex overflow-hidden rounded-t-lg bg-black">
            <Link
              href="/api/exit-preview"
              className="py-2 px-4 transition-colors duration-200 hover:bg-cyan hover:text-black"
            >
              Preview: <strong>Enabled</strong>
            </Link>
            <Link
              href={`/api/preview?${toggleAudienceUrl.toString()}`}
              className="py-2 px-4 transition-colors duration-200 hover:bg-cyan hover:text-black"
            >
              Audience:{' '}
              <strong>{AUDIENCES[queryParams?.audience] ?? `Unknown`}</strong>
            </Link>
            <Link
              href={`/api/preview?${updateTimeUrl.toString()}`}
              className="py-2 px-4 transition-colors duration-200 hover:bg-cyan hover:text-black"
            >
              Time:{' '}
              <strong>
                {queryParams?.date
                  ? new Date(queryParams?.date).toLocaleDateString()
                  : `Now`}
              </strong>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
