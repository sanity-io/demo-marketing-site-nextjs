/** @type {import('next').NextConfig} */

const { markets } = require('./lib/markets')

function createLocalesFromSingleMarket(market) {
  return market.languages.map((language) => [language, market.name].join(`-`))
}

function createAllLocalesFromMarkets(markets) {
  return markets.map((market) => createLocalesFromSingleMarket(market)).flat()
}

const i18n = {
  localeDetection: false,
  locales: createAllLocalesFromMarkets(markets),
  defaultLocale: createAllLocalesFromMarkets(markets)[0],
  domains: markets.map((market) => ({
    domain:
    // We run the app on localhost:80 (http://localhost) for development
    // Requiring a port number creates a redirect loop in the /studio route
    // It's an issue with Next.js + i18n Routing + Catch all routes
      market.name === `US`
        ? `localhost`
        : `${market.name.toLowerCase()}.localhost`,
    defaultLocale: createLocalesFromSingleMarket(market)[0],
    // Locales here have to be *globally* unique, so
    // these functions create ISO 639-1 like language-market pairs
    // For example: `en-CA` and `fr-CA`
    locales: createLocalesFromSingleMarket(market),
    http: process.env.NODE_ENV === `development`,
  })),
}

module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  i18n,
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
}
