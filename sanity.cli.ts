import {loadEnvConfig} from '@next/env'
import {defineCliConfig} from 'sanity/cli'

import {env} from './lib/utils/env'

const dev = env('NODE_ENV') !== 'production'
loadEnvConfig(__dirname, dev, {info: () => null, error: console.error})

const projectId = env('NEXT_PUBLIC_SANITY_PROJECT_ID')
const dataset = env('NEXT_PUBLIC_SANITY_DATASET')

export default defineCliConfig({api: {projectId, dataset}})
