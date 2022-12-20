import {Icon, icons, IconSymbol} from '@sanity/icons'
import {Autocomplete, Box, Flex, Label, Text} from '@sanity/ui'
import {useCallback} from 'react'
import * as React from 'react'
import {set, StringInputProps, unset} from 'sanity'

const options = Object.keys(icons)
  .filter((key) => key !== 'unknown')
  .map((key) => ({value: key}))

const renderOption = (props) => (
  <Flex padding={3} align="center" gap={4}>
    <Text size={4}>
      <Icon symbol={props.value} />
    </Text>
    <Label>{props.value}</Label>
  </Flex>
)

export default function IconSelector(props: StringInputProps) {
  const {onChange, readOnly, value} = props

  const handleChange = useCallback(
    (newValue) => {
      onChange(newValue ? set(newValue) : unset())
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
          renderOption={renderOption}
        />
      </Box>
    </Flex>
  )
}
