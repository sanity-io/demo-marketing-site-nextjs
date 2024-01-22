import {Card, Flex} from '@sanity/ui'
import React from 'react'
import Twemoji from 'react-twemoji'

import {Market} from '../../lib/constants'

export default function Icon(props: Market) {
  return (
    <Card
      tone="primary"
      height="fill"
      padding={1}
      style={{background: 'transparent'}}
    >
      <Flex align="center" justify="center" height="fill">
        <Twemoji>{props.flag ?? `🌐`}</Twemoji>
      </Flex>
    </Card>
  )
}
