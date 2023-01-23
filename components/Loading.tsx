import React from 'react'

import Title from './Title'

export default function Loading() {
  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen animate-pulse items-center justify-center">
      <Title title="Loading…" />
    </div>
  )
}
