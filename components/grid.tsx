import React from 'react'

export default function Grid() {
  const [display, setDisplay] = React.useState(true)
  React.useEffect(() => {
    function toggleDisplay() {
      setDisplay((display) => !display)
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'g') {
        toggleDisplay()
      }
    })

    return () => {
      document.removeEventListener('keydown', toggleDisplay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!display) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-screen w-screen">
      <div className="container relative mx-auto flex h-screen">
        {/* Outer left */}
        <div className="absolute left-0 h-screen w-4 border-dashed border-blue-500/40 md:w-7 md:border-l" />
        {/* Inner left */}
        <div className="absolute left-4 h-screen w-4 border-r border-dashed border-blue-500/40 md:left-7 md:w-5" />
        {/* Central gutter */}
        <div className="absolute left-1/2 -ml-5 h-screen w-5 border-l border-dashed border-blue-500/40" />
        <div className="absolute left-1/2 h-screen w-5 border-r border-dashed border-blue-500/40" />
        {/* 4-column grid with w-7 outer borders */}
        <div className="flex flex-1 px-4 md:px-7">
          <div className="w-1/4 border-l border-blue-500/40" />
          <div className="w-1/4 border-l border-r border-blue-500/40 opacity-0 md:opacity-100" />
          <div className="w-1/4 border-r border-blue-500/40 opacity-0 md:opacity-100" />
          <div className="w-1/4 border-r border-blue-500/40" />
        </div>
        {/* Inner right */}
        <div className="absolute right-4 h-screen w-4 border-l border-dashed border-blue-500/40 md:right-7 md:w-5" />
        {/* Outer right */}
        <div className="absolute right-0 h-screen w-4 border-dashed border-blue-500/40 md:w-7 md:border-r" />
      </div>
    </div>
  )
}
