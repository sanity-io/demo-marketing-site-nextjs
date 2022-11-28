import React from 'react'

export default function Grid() {
  return (
    <div className="pointer-events-none fixed inset-0 h-screen w-screen">
      <div className="container relative mx-auto flex h-screen">
        {/* Central gutter */}
        <div className="absolute left-1/2 -ml-10 h-screen w-10 border-r border-l border-dashed border-red-500/50" />
        <div className="absolute left-1/2 h-screen w-10 border-r border-dashed border-red-500/50" />
        {/* 5-column grid with w-10 outer borders */}
        <div className="w-5 border-r border-red-500/50 md:w-10 md:border-l" />
        <div className="flex flex-1">
          <div className="w-1/5 border-r border-red-500/50" />
          <div className="w-1/5 border-r border-red-500/50" />
          <div className="w-1/5 border-r border-red-500/50" />
          <div className="w-1/5 border-r border-red-500/50" />
        </div>
        <div className="w-5 border-l border-red-500/50 md:w-10 md:border-r" />
      </div>
    </div>
  )
}
