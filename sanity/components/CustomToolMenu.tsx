import { HomeIcon } from '@sanity/icons'
import { Box, Button, Flex } from '@sanity/ui'
import Link from 'next/link'

export default function CustomToolMenu(props) {
  return (
    <Flex direction={['column', 'column', 'row']} gap={[4, 4, 0]}>
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Button as={Link} href="/" icon={HomeIcon} text="Home" mode="ghost" />
    </Flex>
  )
}
