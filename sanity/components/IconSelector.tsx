import { Icon, icons, IconSymbol } from '@sanity/icons'
import { Autocomplete, Box, Flex, Label, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { set, StringInputProps, unset } from 'sanity'

const options = Object.keys(icons)
  .filter((key) => key !== 'unknown')
  .map((key) => ({ value: key }))

export default function IconSelector(props: StringInputProps) {
  const { onChange, readOnly, value } = props

  const handleChange = useCallback(
    (value) => {
      onChange(value ? set(value) : unset())
    },
    [onChange]
  )

  return (
    <Flex gap={3} align="center">
      <Box flex={1}>
        <Autocomplete
          id="icon-selector"
          openButton
          placeholder="Search for an icon"
          options={options}
          icon={
            value ? (
              <Icon symbol={value as IconSymbol} />
            ) : (
              <Icon symbol="unknown" />
            )
          }
          value={value}
          readOnly={readOnly}
          onChange={handleChange}
          renderOption={({ value }: { value: IconSymbol }) => (
            <Flex padding={3} align="center" gap={4}>
              <Text size={4}>
                <Icon symbol={value} />
              </Text>
              <Label>{value}</Label>
            </Flex>
          )}
        />
      </Box>
    </Flex>
  )
}
