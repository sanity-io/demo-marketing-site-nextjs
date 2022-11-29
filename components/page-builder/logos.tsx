import Image from 'next/image'
import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import Container from '../container'

export default function PageBuilderLogos(props: KeyedObject & TypedObject) {
  const logos = [289, 284, 259, 236, 219]

  return (
    <Container className="my-10 flex flex-wrap items-center justify-center gap-10 bg-cyan py-10 md:py-20">
      {logos.map((logo) => (
        <div key={logo}>
          <Image
            alt=""
            src={`https://img.logoipsum.com/${logo}.png`}
            width={200}
            height={80}
            className="h-10 w-auto"
          />
        </div>
      ))}
    </Container>
  )
}
