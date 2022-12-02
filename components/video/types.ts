export interface SanityMuxVideo {
  _type: 'mux.video'
  asset: SanityMuxVideoAsset
}

export interface SanityMuxVideoAsset {
  _type: 'mux.videoAsset'
  status: 'ready'
  assetId: string
  uploadId: string
  playbackId: string
  data: {
    created_at: string
    aspect_ratio: string
    duration: number
    id: string
    master_access: 'none'
    max_stored_frame_rate: number
    max_stored_resolution: 'SD'
    mp4_support: 'standard'
    passthrough: string
    playback_ids: {
      id: string
      policy: 'public'
    }[]
    static_renditions: {
      files: {
        bitrate: number
        ext: 'mp4'
        filesize: string
        height: number
        name: string
        width: number
      }[]
      status: 'ready'
    }[]
    status: 'ready'
    test: boolean
    tracks: {
      duration: number
      id: string
      max_frame_rate: number
      max_height: number
      max_width: number
      type: 'video'
    }[]
    upload_id: string
  }
}
