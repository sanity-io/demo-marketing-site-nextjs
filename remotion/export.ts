import { loadEnvConfig } from '@next/env'

import { getClient } from '../sanity/sanity.server'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(process.cwd(), dev, {
  info: () => null,
  error: console.error,
})

async function main({ argv }) {
  console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

  const client = getClient(true)

  console.log(await client.fetch(`count(*)`))
}

main(process)
  // @ts-expect-error
  .then(process.exit)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
