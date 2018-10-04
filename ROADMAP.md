
# ROADMAP #
## [All the things] ##
------------------------------

## Systematic fixes

- replace instances of `withStyles` of `MaterialUI` with `injectJSS` and simpy pull theme directly using Redux in all cases-- this would reduce bundle size a bit (+ consistency is an amazing thing).

- go through components and determine `recompose/pure` usage to be sure the hierarchy is best for rendering efficiency.

## MediaReel

- preload images and also provide medium sized image gallery versions to save bandwidth

- cache instances of YouTube player while parent still mounted so that there's no need to reload iframe