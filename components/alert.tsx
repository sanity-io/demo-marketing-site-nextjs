import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactHTMLElement } from 'react'
import React from 'react'

import { LayoutProps } from './layout'

const AUDIENCES = {
  0: 'A',
  1: 'B',
}

type AlertProps = LayoutProps

export default function Alert(props: AlertProps) {
  const { preview, queryParams } = props

  const toggleAudienceUrl = new URLSearchParams()
  toggleAudienceUrl.set('slug', String(queryParams.slug))
  toggleAudienceUrl.set('audience', String(queryParams?.audience === 0 ? 1 : 0))
  toggleAudienceUrl.set('date', String(queryParams.date ?? ``))

  const [targetDate, setTargetDate] = React.useState(
    queryParams.date ?? new Date().toISOString()
  )
  const [labelDate, setLabelDate] = React.useState(`Now`);
  const handleDateChange = React.useCallback(
    (e) => {
      setTargetDate(
        e.target.value
          ? new Date(e.target.value).toISOString()
          : queryParams.date
      )
      setLabelDate(`Update`)
    },
    [queryParams.date]
  )

  const updateTimeUrl = new URLSearchParams()
  updateTimeUrl.set('slug', String(queryParams.slug))
  updateTimeUrl.set('audience', String(queryParams?.audience))
  updateTimeUrl.set('date', targetDate)

  const nowTimeUrl = new URLSearchParams()
  nowTimeUrl.set('slug', String(queryParams.slug))
  nowTimeUrl.set('audience', String(queryParams?.audience))
  nowTimeUrl.set('date', ``)

  if (!preview) {
    return null
  }

  return (
    <div className="pointer-events-none bg-black text-white">
      <div className="fixed inset-0 z-50 flex h-screen w-screen items-end justify-center">
        <div className="pointer-events-auto flex overflow-hidden rounded-t-lg bg-black">
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
            <strong>{AUDIENCES[queryParams.audience] ?? `Unknown`}</strong>
          </Link>

          <Link
            href={
              !queryParams.date && targetDate
                ? `/api/preview?${updateTimeUrl.toString()}`
                : `/api/preview?${nowTimeUrl.toString()}`
            }
            className="py-2 px-4 transition-colors duration-200 hover:bg-cyan hover:text-black"
          >
            Time:{` `}
            <strong>
              {!queryParams.date ? labelDate : targetDate.split(`T`).shift()}
            </strong>
          </Link>
          <div>
            <input
              type="date"
              className="border-l border-gray-800 bg-black py-2 px-4 text-white transition-colors duration-200 hover:bg-cyan hover:text-black"
              onChange={handleDateChange}
              value={targetDate ? targetDate.split(`T`).shift() : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
