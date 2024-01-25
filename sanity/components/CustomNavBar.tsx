import {HomeIcon} from '@sanity/icons'
import {Box, Button, Card, Flex} from '@sanity/ui'
import Link from 'next/link'
import * as React from 'react'
import type {NavbarProps} from 'sanity'

export default function CustomNavBar(props: NavbarProps) {
  return (
    <Flex align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Card paddingRight={2} borderBottom height="fill" display="flex">
        <Button as={Link} href="/" icon={HomeIcon} mode="bleed" text="Home" />
      </Card>
    </Flex>
  )
}
