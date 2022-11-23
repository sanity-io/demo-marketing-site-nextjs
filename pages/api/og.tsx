/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { urlForImage } from '../../sanity/sanity'

export const config = {
  runtime: 'experimental-edge',
}

const WIDTH = 1200
const HEIGHT = 630

// Make sure the font exists in the specified path:
const font = fetch(
  new URL('../../assets/Inter-Bold.woff', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function (req: NextRequest) {
  const fontData = await font

  const { searchParams } = new URL(req.url)

  const siteTitle = searchParams.get('siteTitle')
  const title = searchParams.get('title')
  const image = JSON.parse(searchParams.get('image'))
  const imageUrl = urlForImage(image)
    .width(WIDTH)
    .height(HEIGHT)
    .fit('crop')
    .url()

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(-45deg, cyan, black)',
          width: WIDTH,
          height: HEIGHT,
          position: 'relative',
          display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          width={WIDTH / 2}
          height={HEIGHT}
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            backgroundImage:
              'linear-gradient(-45deg, rgba(0,0,0,1), rgba(0,0,0,0.5) )',
            position: 'absolute',
            zIndex: `2`,
            top: 50,
            left: 50,
            right: 50,
            bottom: 50,
            color: 'white',
            width: WIDTH - 100,
            height: HEIGHT - 100,
            borderRadius: 40,
            padding: 50,
            paddingLeft: 150,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 64,
              color: 'cyan',
              fontWeight: 700,
              fontFamily: `Inter`,
              letterSpacing: `-0.04em`,
              lineHeight: 1,
            }}
          >
            {siteTitle}
          </div>
          <div
            style={{
              border: `1px solid white`,
              marginTop: 20,
              marginBottom: 20,
              height: 1,
              width: `50%`,
            }}
          />
          <div
            style={{
              fontSize: 128,
              fontWeight: 700,
              fontFamily: `Inter`,
              letterSpacing: `-0.04em`,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
