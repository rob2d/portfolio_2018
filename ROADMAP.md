# ROADMAP #
## [ Roadmap All the Things ™ ] ##

Since this is just a one-man free-for-all on my free time here, just listing things that are less-than-ideal which I plan to get around to in the near future term.

## About
- complete new layout + re-add 3D skills orbit and overview component to layout.
- scroller for text as current format is TMI for certain types
of users.

## Projects
- centralize/simplify project data layouts... which has been overdue for about 2 years now ☠ (actually now W.I.P. in `refactors/merge-and-simplify-projects` locally)
- Use vertical space a bit better in the Details layout on wide screens.
- cache instances of YouTube player while parent still mounted so that there's no need to reload iframe
- fix some issues with YouTube player responsiveness on some mobile devices.

## CV
- keep track of height after first render (if vpW hasn't changed) in order to keep height from flitting around on page change.

## Misc
- deprecate `/strings` and React Localization library -- Chrome translate has gotten pretty good since starting this, and no need for the maintainanace overhead with that. (W.I.P. -- just need to use new simple Projects data format).
- auto-generate sitemap.xml using react-router library.
- generate meta data for content on serverside (possibly integrated with point right above).

## Nice-to-haves

- allow filtering of techs in Projects view.
- Add a React hook for routing + classNames to create nice section
scroll left/right transitions.
- Testing (!). At least some basic coverage once current W.I.P. list is about 50% complete -- but thankfully I'm not insane and indeed regression test manually/visually inspect before any deployments.