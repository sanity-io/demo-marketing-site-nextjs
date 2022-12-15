'use client'
import MuxPlayer from '@mux/mux-player-react'
import * as React from 'react'

import styles from './bg-video.module.css'
import {SanityMuxVideoAsset} from './types'

export function BgVideo(props: {asset: SanityMuxVideoAsset}) {
  const {asset} = props

  return (
    <MuxPlayer
      autoPlay
      className={styles.root}
      loop
      muted
      playbackId={asset.playbackId}
    />
  )
}
