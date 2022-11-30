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
        {/* Central gutter */}
        <div className="absolute left-10 h-screen w-10 border-r border-dashed border-red-500/50" />
        <div className="absolute right-10 h-screen w-10 border-l border-dashed border-red-500/50" />
        <div className="absolute left-1/2 -ml-10 h-screen w-10 border-r border-l border-dashed border-red-500/50" />
        <div className="absolute left-1/2 h-screen w-10 border-r border-dashed border-red-500/50" />
        {/* 5-column grid with w-10 outer borders */}
        <div className="w-5 border-r border-red-500/50 md:w-10 md:border-l" />
        <div className="flex flex-1">
          <div className="w-1/4 border-r border-blue-500/50" />
          <div className="w-1/4 border-r border-blue-500/50" />
          <div className="w-1/4 border-r border-blue-500/50" />
        </div>
        <div className="w-5 border-l border-red-500/50 md:w-10 md:border-r" />
      </div>
    </div>
  )
}
