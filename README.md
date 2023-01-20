# Multi-tenant, multi-lingual Marketing Next.js website with Page Builder powered by Sanity.io

## Multi-tenant

Throughout the schema is a required `market` field which is hidden once it has a value, and should be populated by Initial Value Templates.

This allows authors to create content specifically relevant to only their market, within the constraints of globally-relevant schema.

Reference fields rely on this market field to scope references. So for example a `company` document with the `market` field set to `US` can only be linked to a `person` document with the same value.

For every "Market" in `./lib/markets.js` there is a corresponding Studio Config, plus a global config that shows documents from all Markets. With Custom Access Controls users could be limited to view only their Market, while Administrators could see the global view.

Idea: This setup for "Markets" could instead be adapted to "Brands".

## Multi-lingual

The default Market (US) only has one language (English). But some other markets have multiple languages.

For these Markets, the Document Internationalization and Language Filter plugins improve the Sanity Studio experience and allow authors to create content in multiple languages.

Document-level localization requires a hidden `language` field to be filled in by the plugin.

Languages are defined in `./lib/markets.js` and are also used in `next.config.js` to create market and locale-specific routes. Local development runs at `http://localhost:80` to ensure localized routes render correctly.

## Next.js

The Sanity Studio installed in this application can be accessed at `/studio` and is set up with Live Preview.

## Page Builder

The Page Builder in this Studio is set up as a demonstration of how content can drive design. It deliberately excludes fields for design choices like colors, fonts, spacing and columns. It allows content editors to focus on content creation while the website's design takes care of itself.

For example, the first "Article" will render as a Hero with the heading in a H1. Two Articles in succession may render in columns. "Quote" blocks can break up Articles.

It also heavily relies on References instead of objects to promote the reuse of content in multiple locations.

Blocks are "Articles" which may render into pages in their own right. So what starts as a small block on one Page could grow into a full Article.

An "Experiment" block allows you to A/B test different "Articles". The logic for this is deliberately kept basic, a more production-ready rollout would likely be integrated with some service that keeps track of the success of the experiment.

An "Article" can also have "Display from" and "Display until" settings. This implementation is only secure if your dataset is set to Private.
