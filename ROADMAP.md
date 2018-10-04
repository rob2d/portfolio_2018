
# ROADMAP #
## [All the things] ##
------------------------------

- replace instances of `withStyles` of `MaterialUI` with `injectJSS` and simpy pull theme directly using Redux in all cases-- this would reduce bundle size a bit (+ consistency is an amazing thing).

- go through components and determine `recompose/pure` usage to be sure the hierarchy is best for rendering efficiency.