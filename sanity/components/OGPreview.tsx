import { CopyIcon } from '@sanity/icons'
import { Button, Card, Flex, Stack, Text } from '@sanity/ui'
import React from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

export default function OGPreview(props) {
  const document = props.document.displayed

  const imageUrl = React.useMemo(
    () => props.options.url(document),
    [document, props.options]
  )

  const [, setCopiedText] = useCopyToClipboard()

  const handleCopy = React.useCallback(() => {
    setCopiedText(imageUrl)
  }, [imageUrl, setCopiedText])

  return (
    <Flex align="center" justify="center" height="fill" padding={5}>
      <Stack space={4}>
        <Card shadow={3}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" width={1200} height={630} />
          <Stack space={4} padding={4}>
            <Text size={3} weight="bold">
              {document?.seo?.title ?? document?.title}
            </Text>
            <Text muted>{document?.seo?.description}</Text>
          </Stack>
        </Card>
        <Card radius={2} border>
          <Flex gap={3} align="center" padding={3}>
            <Button
              onClick={handleCopy}
              text="Copy"
              tone="primary"
              icon={CopyIcon}
            />
            <Card style={{ overflow: `hidden` }}>
              <pre style={{ opacity: 0.5 }}>{imageUrl}</pre>
            </Card>
          </Flex>
        </Card>
      </Stack>
    </Flex>
  )
}
