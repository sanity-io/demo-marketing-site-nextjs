import React from 'react'
import { Composition, Folder } from 'remotion'

import { LongComposition, ShortComposition } from './Composition'
export const RemotionRoot: React.FC = () => {
  const durationInFrames = 60 * 5
  return (
    <>
      <Composition
        id="YouTubeAd"
        component={LongComposition}
        durationInFrames={durationInFrames}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="TikTokAd"
        component={ShortComposition}
        durationInFrames={durationInFrames}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  )
}
