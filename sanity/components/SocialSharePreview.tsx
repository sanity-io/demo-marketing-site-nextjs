import { CopyIcon } from '@sanity/icons'
import { Button, Card, Flex, Stack, Text } from '@sanity/ui'
import React, { useEffect } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

export default function OGPreview(props) {
  const document = props.document.displayed
  const [imageUrl, setImageUrl] = React.useState(null)
  useEffect(() => {
    async function fetchImageUrl() {
      const result = await props.options.url(document)
      setImageUrl(result)
    }
    if (document.quote) {
      fetchImageUrl()
    }
  }, [document, imageUrl, props.options])

  const [, setCopiedText] = useCopyToClipboard()

  const handleCopy = React.useCallback(() => {
    setCopiedText(imageUrl)
  }, [imageUrl, setCopiedText])

  return (
    <Flex align="center" justify="center" height="fill" padding={5}>
      <Stack space={4}>
        <Card shadow={3}>
          <Flex align="center" justify="center">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" width={1200 / 3} height={1200 / 3} />
            ) : null}
          </Flex>
        </Card>
        <Card radius={2} border>
          <Flex gap={3} align="center" padding={3}>
            <Button
              onClick={handleCopy}
              text="Copy"
              tone="primary"
              icon={CopyIcon}
              disabled={!imageUrl}
            />
            <Card style={{ overflow: `hidden` }}>
              {imageUrl ? <pre style={{ opacity: 0.5 }}>{imageUrl}</pre> : null}
            </Card>
          </Flex>
        </Card>
      </Stack>
    </Flex>
  )
}
