/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-anonymous-default-export */
import {ImageResponse} from '@vercel/og'
import {NextRequest} from 'next/server'
import * as React from 'react'

import {urlForImage} from '../../sanity/sanity'

export const config = {
  runtime: 'experimental-edge',
}

const WIDTH = 1200
const HEIGHT = 1200

// Make sure the font exists in the specified path:
const font700 = fetch(
  new URL('../../assets/Inter-Bold.woff', import.meta.url)
).then((res) => res.arrayBuffer())
const font700Italic = fetch(
  new URL('../../assets/Inter-BoldItalic.woff', import.meta.url)
).then((res) => res.arrayBuffer())
const font400 = fetch(
  new URL('../../assets/Inter-Regular.woff', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function (req: NextRequest) {
  const fontData400 = await font400
  const fontData700 = await font700
  const fontData700Italic = await font700Italic

  const {searchParams} = new URL(req.url)

  const quote = searchParams.get('quote')
  const name = searchParams.get('name')
  const title = searchParams.get('title')
  const picture = searchParams.get('picture')
  const pictureUrl = urlForImage(JSON.parse(picture))
    .width(300)
    .height(300)
    .fit('crop')
    .url()

  const companyName = searchParams.get('company.name')
  const logo = searchParams.get('logo')
  const siteTitle = searchParams.get('siteTitle')

  const logoUrl = urlForImage(JSON.parse(logo)).width(300).url()

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: `white`,
          width: WIDTH,
          height: HEIGHT,
          position: 'relative',
          display: 'flex',
          padding: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              color: '#ea5fb1',
              fontSize: 100,
              fontWeight: 700,
              fontFamily: `Inter`,
              letterSpacing: `-0.04em`,
              lineHeight: 1,
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'flex-end',
              width: `100%`,
            }}
          >
            {siteTitle}
          </div>
          <div
            style={{
              paddingTop: 50,
              paddingBottom: 50,
              fontSize: 140,
              fontWeight: 700,
              fontFamily: `Inter`,
              letterSpacing: `-0.04em`,
              lineHeight: 1,
              fontStyle: `italic`,
            }}
          >
            {quote}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={pictureUrl}
              alt=""
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                marginLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 50,
                marginTop: 50,
                borderTop: `1px solid #000`,
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  fontFamily: `Inter`,
                  letterSpacing: `-0.04em`,
                  lineHeight: 1,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  color: `#666`,
                  fontSize: 64,
                  fontWeight: 400,
                  fontFamily: `Inter`,
                  letterSpacing: `-0.04em`,
                  lineHeight: 1,
                  display: 'flex',
                }}
              >
                <span>{title},</span>
              </div>
              <div
                style={{
                  color: `#666`,
                  fontSize: 64,
                  fontWeight: 400,
                  fontFamily: `Inter`,
                  letterSpacing: `-0.04em`,
                  lineHeight: 1,
                  display: 'flex',
                }}
              >
                {companyName}
              </div>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <img
              alt=""
              src={logoUrl}
              style={{
                width: 200,
                height: 'auto',
              }}
            />
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
          data: fontData400,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: fontData700,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: fontData700Italic,
          style: 'italic',
          weight: 700,
        },
      ],
    }
  )
}
