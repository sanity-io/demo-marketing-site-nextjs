import './font.css'
import '../styles/index.css'

import { AbsoluteFill, Audio } from 'remotion'

export const LongComposition = () => {
  return (
    <AbsoluteFill>
      <Audio startFrom={60} src="https://cdn.sanity.io/files/ppsg7ml5/test/4cd5ea06712b23b603c3c6098f944cec69a05279.mp3" />
    </AbsoluteFill>
  )
}

export const ShortComposition = () => {
  return <AbsoluteFill className='relative flex flex-col items-center gap-4 py-5 text-center bg-black md:py-8'><h1 className='text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl text-magenta-500'>Test?</h1></AbsoluteFill>
}
