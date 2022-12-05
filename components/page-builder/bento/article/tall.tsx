import { Icon, IconSymbol } from '@sanity/icons'
import Image from 'next/image'

import { urlForImage } from '../../../../sanity/sanity'
import { ArticleStub } from '../../../../types'
import { useDebug } from '../../../debug/debug-provider'
import { StyledPortableText } from '../../portable-text/StyledPortableText'
import { BentoSubtitle } from '../bento-1/BentoSubtitle'
import { BentoTitle } from '../bento-1/BentoTitle'

export default function BentoArticleTall(props: { article: ArticleStub }) {
  const { article } = props
  const { grid } = useDebug()
  const { icon, image, title, subtitle } = article
  const summary = article.summary || []
  const hasText = title || subtitle || summary?.length > 0

  return (
    <div className="flex w-full flex-col md:flex-row">
      {image && (
        <div className="flex-1">
          <div className="p-2 sm:py-3 md:py-5 lg:py-7">
            <Image
              src={urlForImage(image)
                .width(hasText ? 262 : 276 * 2)
                .height(642)
                .url()}
              width={hasText ? 262 : 276 * 2}
              height={642}
              alt={title ?? ``}
              className="h-full w-full rounded object-cover"
            />
          </div>
        </div>
      )}

      {hasText && (
        <div className="flex-1">
          <div className="text-container p-4 sm:py-3 md:py-5 lg:py-7">
            {subtitle && <p className="text-magenta-400">{subtitle}</p>}

            {icon && (
              <div className="text-4xl">
                <Icon symbol={icon as IconSymbol} />
              </div>
            )}

            {title && (
              <h2
                className={
                  // prettier-ignore
                  `${grid ? `outline` : ``} text-3xl font-extrabold leading-tighter tracking-tight md:text-2xl lg:text-3xl my-4`
                }
              >
                {title}
              </h2>
            )}

            {summary.length > 0 && (
              <div
                className={
                  // prettier-ignore
                  `text-md max-w-xl text-gray-700 dark:text-gray-400 md:text-lg ${grid ? `outline` : ``}}`
                }
              >
                <StyledPortableText value={summary} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
