import {Badge, Box, Flex} from '@sanity/ui'
import React from 'react'
import {PreviewProps} from 'sanity'

type Status = 'EXPIRED' | 'CURRENT' | 'FUTURE'

function renderStatus(status: Status) {
  switch (status) {
    case 'CURRENT':
      return (
        <Badge mode="outline" tone="positive">
          Current
        </Badge>
      )
    case 'EXPIRED':
      return (
        <Badge mode="outline" tone="caution">
          Expired
        </Badge>
      )
    case 'FUTURE':
      return (
        <Badge mode="outline" tone="primary">
          Future
        </Badge>
      )
    default:
      return null
  }
}

export default function RowDisplay(props: PreviewProps) {
  // TODO: Why does this component receive the document value
  // When the type disagrees?
  // @ts-ignore
  const {displayFrom, displayTo} = props?.visibility || {}
  let status
  const now = new Date()
  const from = new Date(displayFrom)
  const to = new Date(displayTo)

  if (displayFrom && displayTo) {
    if (now > from && now < to) {
      status = 'CURRENT'
    } else if (now > to) {
      status = 'EXPIRED'
    } else {
      status = 'FUTURE'
    }
  } else if (displayFrom && !displayTo) {
    status = now > from ? 'CURRENT' : 'FUTURE'
  } else if (!displayFrom && displayTo) {
    status = now < to ? 'CURRENT' : 'EXPIRED'
  }

  if (status) {
    return (
      <Flex align="center" gap={2}>
        <Box flex={1}>
          {props.renderDefault({
            ...props,
            subtitle: props.schemaType.title,
            // @ts-ignore
            media: props.image ?? props.schemaType.icon,
          })}
        </Box>
        {renderStatus(status)}
      </Flex>
    )
  }

  return props.renderDefault({
    ...props,
    subtitle: props.schemaType.title,
    // @ts-ignore
    media: props.image ?? props.schemaType.icon,
  })
}
