# ROADMAP #
## [ Roadmap All the Things ™ ] ##
------------------------------

## Systematic fixes

- replace instances of `withStyles` of `MaterialUI` with `injectJSS` and simpy pull theme directly using Redux in all cases-- this would reduce bundle size a bit (+ consistency is an amazing thing).
[Random thought: could be simplified with a custom HOC linking to `core.theme`]
(this is in progress)

- go through components and determine `recompose/pure` usage to be sure the hierarchy is best for rendering efficiency.

- consider creating a separate `view` state slice so that variables related to responsive view 
(e.g. is landscape or portrait on smaller devices) don't need to be re-checked over and over during re-render. This would also conveniently house viewportWidth/viewportHeight in something more domain-specific than `core`

## MediaReel

- cache instances of YouTube player while parent still mounted so that there's no need to reload iframe

## Technologies
- Create Custom monochrome SVGs to substitute tech text

- Allow filtering of techs in Projects view

- When a project card fades into a title, it should retain a banner that is faded from white; this should make ProjectDescription views a lot less depressing for people who aren't me.
