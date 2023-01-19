import React from 'react'

import PostTitle from './post-title'

export default function Loading() {
  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen animate-pulse items-center justify-center">
      <PostTitle>Loading…</PostTitle>
    </div>
  )
}
