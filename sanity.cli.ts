import {loadEnvConfig} from '@next/env'
import {defineCliConfig} from 'sanity/cli'

import {config} from './lib/config'

const dev = config.env !== 'production'
loadEnvConfig(__dirname, dev, {info: () => null, error: console.error})

const projectId = config.sanity.projectId
const dataset = config.sanity.dataset

export default defineCliConfig({api: {projectId, dataset}})
