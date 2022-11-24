import { randomKey } from '@sanity/block-tools'
import { AddIcon } from '@sanity/icons'
import { Autocomplete, Box, Button, Grid, Stack } from '@sanity/ui'
import React from 'react'
import { ArrayOfObjectsInputProps, insert } from 'sanity'

export default function ArrayAutocompleteAddItem(
  props: ArrayOfObjectsInputProps
) {
  const { onChange } = props

  const options = React.useMemo(
    () =>
      props.schemaType.of.map((item) => ({ value: item.name, payload: item })),
    [props.schemaType]
  )

  const handleSelect = React.useCallback(
    (typeName: string) => {
      const newValue = {
        _key: randomKey(12),
        _type: typeName,
      }

      onChange(insert([newValue], 'after', props.path))
    },
    [onChange, props.path]
  )

  return (
    <Stack space={4}>
      {props.renderDefault(props)}
      <Box>
        <Autocomplete
          onSelect={handleSelect}
          icon={AddIcon}
          id="array-autocomplete-add-item"
          options={options}
          placeholder="Add item..."
          filterOption={(query, option) =>
            option.payload.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          }
          openButton
          renderOption={(option) => (
            <Grid>
              <Button
                icon={option.payload.icon}
                text={option.payload.title}
                mode="ghost"
              />
            </Grid>
          )}
          // custom value render function
          renderValue={(value, option) => option?.payload.name || value}
        />
      </Box>
    </Stack>
  )
}
