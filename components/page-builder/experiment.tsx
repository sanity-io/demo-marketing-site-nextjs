import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

export default function PageBuilderExperiment(
  props: KeyedObject & TypedObject
) {
  const { title, _type } = props

  return (
    <div className="flex flex-col gap-2 bg-black p-4 text-white">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter">
        {String(title ?? _type)}
      </h2>
      <hr />
      <span className="font-mono">{_type}</span>
    </div>
  )
}
