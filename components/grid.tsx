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
        {/* Left borders */}
        <div className="absolute left-0 h-screen w-7 border-l border-dashed border-magenta-500/50" />
        <div className="absolute left-7 h-screen w-5 border-r border-dashed border-magenta-500/50" />
        {/* Central gutter */}
        <div className="absolute left-1/2 -ml-5 h-screen w-5 border-l border-dashed border-magenta-500/50" />
        <div className="absolute left-1/2 h-screen w-5 border-r border-dashed border-magenta-500/50" />
        {/* 4-column grid with w-7 outer borders */}
        <div className="flex flex-1 px-7">
          <div className="w-1/4 border-l border-r border-magenta-500/50" />
          <div className="w-1/4 border-r border-magenta-500/50" />
          <div className="w-1/4 border-r border-magenta-500/50" />
          <div className="w-1/4 border-r border-magenta-500/50" />
        </div>
        <div className="absolute right-0 h-screen w-7 border-r border-dashed border-magenta-500/50" />
        <div className="absolute right-7 h-screen w-5 border-l border-dashed border-magenta-500/50" />
      </div>
    </div>
  )
}
