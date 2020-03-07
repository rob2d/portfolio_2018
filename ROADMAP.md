# ROADMAP #
## [ Roadmap All the Things ™ ] ##

Since this is just a one-man free-for-all on my free time here, just listing things that are less-than-ideal which I plan to get around to in the near future term.

## About
- complete new layout.
- write new SkillOrbs component using hooks to replace older view since page is not very sexy without it.
- scroller for text as current format is TMI for certain types of users.

## Projects
- Use vertical space a bit better in the Details layout on wide screens.
- <del>cache instances of YouTube player while parent still mounted so that there's no need to reload iframe</del>


- <del>fix some issues with YouTube player responsiveness on some mobile devices.</del>

- get rid of YouTube lib currently used for something lighter/hooks-friendly for `MediaViewer`.
- use grid layout for ultrawide monitors like mine at home which cannot in any way use pixel-grid-snapping/zoom to look less awkward.
- add Hebi-Appuru and Bowling Kata so they aren't lost to the sands of time forever.

## CV
- keep track of height after first render (if vpW hasn't changed) in order to keep height from flitting around on page change.
- write resume using react to generate PDFs so I could easily make changes without sacrificing
flow or dumpster diving into Google Doc/MSWord which is terribly outdated for layouts.

## Misc
- auto-generate sitemap.xml using react-router library.
- generate meta data for content on serverside (possibly integrated with point right above).

## Infra
- Mocha + Puppeteer integration test-runner.
- CircleCI and CICD all-the-things (free tier exists now \o/)

## Nice-to-haves

- allow filtering of techs in Projects view.
- Add a React hook for routing + classNames to create nice section.
scroll left/right transitions.
- Set up integration test.
- Code preview button for each section.
