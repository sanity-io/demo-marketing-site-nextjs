import React from 'react'

export default function Grid() {
  return (
    <div className="fixed inset-0 h-screen w-screen pointer-events-none">
      <div className="container mx-auto flex h-screen relative">
        {/* Central gutter */}
        <div className='absolute w-10 left-1/2 -ml-10 h-screen border-r border-l border-red-500/50 border-dashed' />
        <div className='absolute w-10 left-1/2 h-screen border-r border-red-500/50 border-dashed' />
        {/* 5-column grid with w-10 outer borders */}
        <div className="w-5 md:w-10 md:border-l border-r border-red-500/50" />
        <div className="flex flex-1">
          <div className="w-1/5 border-r border-red-500/50" />
          <div className="w-1/5 border-r border-red-500/50" />
          <div className="w-1/5 border-r border-red-500/50" />
          <div className="w-1/5 border-r border-red-500/50" />
        </div>
        <div className="w-5 md:w-10 border-l md:border-r border-red-500/50" />
      </div>
    </div>
  )
}
