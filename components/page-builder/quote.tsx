import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

export default function PageBuilderQuote(props: KeyedObject & TypedObject) {
  const { _type, quote } = props

  return (
    <div className="flex flex-col gap-2 bg-black p-4 text-white">
      <h2 className="text-3xl font-bold italic leading-tight tracking-tighter">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        "{String(quote ?? _type)}"
      </h2>
      <hr />
      <span className="font-mono">{_type}</span>
    </div>
  )
}
