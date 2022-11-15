import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

export default function PageBuilderLogos(props: KeyedObject & TypedObject) {
  const { _type } = props

  return (
    <div className="flex flex-col gap-2 bg-black p-4 text-white">
      <span className="font-mono">{_type}</span>
    </div>
  )
}
