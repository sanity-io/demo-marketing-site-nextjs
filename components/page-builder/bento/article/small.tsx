import { Icon, IconSymbol } from '@sanity/icons'
import Image from 'next/image'
import { KeyedObject } from 'sanity'

import { urlForImage } from '../../../../sanity/sanity'
import { ArticleStub } from '../../../../types'
import { useDebug } from '../../../debug/debug-provider'
import { StyledPortableText } from '../../portable-text/StyledPortableText'

export default function BentoArticleSmall(props: {
  article: ArticleStub & KeyedObject
}) {
  const { article } = props
  const { grid } = useDebug()
  const { icon, image, title, subtitle } = article
  const summary = article.summary || []
  const hasText = Boolean(title || subtitle || summary.length)

  return (
    <div className="flex w-full flex-row items-center">
      {hasText && (
        <div className="flex-1 sm:py-3 md:py-5 lg:py-7">
          <div
            className={
              // prettier-ignore
              `p-4 text-container sm:p-5 ${grid ? `outline` : ``}`
            }
          >
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
                  `text-3xl font-extrabold leading-tighter tracking-tight md:text-2xl lg:text-3xl my-4 ${grid ? `outline` : ``}`
                }
              >
                {title}
              </h2>
            )}

            {summary.length > 0 && (
              <div className="text-md max-w-xl text-gray-700 dark:text-gray-400 md:text-lg">
                <StyledPortableText value={summary} />
              </div>
            )}
          </div>
        </div>
      )}

      {image && (
        <div className="flex w-full flex-1 items-stretch justify-items-stretch self-stretch sm:py-3 md:py-5 lg:py-7">
          <div
            className="m-auto flex items-stretch justify-items-stretch self-stretch p-2"
            style={{ height: 276 }}
          >
            <Image
              src={urlForImage(image).width(276).height(227).url()}
              width={276}
              height={227}
              alt={title ?? ``}
              className="h-full w-full rounded object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}
