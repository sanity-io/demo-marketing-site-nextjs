import { Config } from 'remotion'

import { enableTailwind } from './remotion/enable-tailwind'

Config.Bundling.overrideWebpackConfig(enableTailwind)
