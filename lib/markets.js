// In this format so ./next.config.js can consume them
const markets = [
  {
    flag: `🇺🇸`,
    name: `US`,
    title: `USA`,
    languages: [{id: `en`, title: `English`}],
  },
  {
    flag: `🇨🇦`,
    name: `CA`,
    title: `Canada`,
    languages: [
      {id: `en`, title: `English`},
      {id: `fr`, title: `French`},
    ],
  },
  {
    flag: `🇬🇧`,
    name: `UK`,
    title: `United Kingdom`,
    languages: [{id: `en`, title: `English`}],
  },
  {
    flag: `🇮🇳`,
    name: `IN`,
    title: `India`,
    languages: [
      {id: `en`, title: `English`},
      {id: `hi`, title: `Hindi`},
    ],
  },
  {
    flag: `🇯🇵`,
    name: `JP`,
    title: `Japan`,
    languages: [
      {id: `jp`, title: `Japanese`},
      {id: `en`, title: `English`},
    ],
  },
]

exports.markets = markets

exports.uniqueLanguages = Array.from(
  new Set(
    markets
      .map((market) =>
        market.languages.map((language) => [language.id, market.name].join(`-`))
      )
      .flat()
  )
)
