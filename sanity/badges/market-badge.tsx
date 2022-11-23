import {DocumentBadgeDescription, DocumentBadgeProps} from 'sanity'

import { Market } from '../../lib/constants'

export function marketBadge(
  props: DocumentBadgeProps,
  supportedMarkets: Market[],
  marketField: string
): DocumentBadgeDescription | null {
  const source = props?.draft || props?.published
  const marketName = source?.[marketField]
  const market = supportedMarkets?.find((l) => l.name === marketName)

  if (!market) {
    return null
  }

  return {
    label: market.name,
    title: market.title,
    color: `primary`,
  }
}
