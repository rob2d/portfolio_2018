# ROADMAP #
## [ Roadmap All the Things ™ ] ##

Since this is just a one-man free-for-all on my free time here, just listing things that are less-than-ideal which I plan to get around to in the near future term.

## About
- complete new layout + re-add 3D skills orbit and overview component to layout.
- scroller for text as current format is TMI for certain types
of users.

## Project Details
- Use vertical space a bit better in the layout on wide screens.
- cache instances of YouTube player while parent still mounted so that there's no need to reload iframe
- fix some issues with YouTube player responsiveness on some mobile devices.

## CV
- replace PDF viewer lib with non deprecated version
- use smoother transitions from different themes when we don't need to blit away CV div

## Misc Refactors
- deprecate `/strings` and React Localization library -- Chrome translate has gotten pretty good since starting this, and no need for the maintainanace overhead with that.
- remove Redux `connect` HOC and fade transitions in favor of hooks API for speed + consistency; if those are slower due
to getting rid of the PureComponent wrappers + re-render,
cut down with `useMemo`/`useCallback`
- use new syntax conventions consistently: no lined-up colons, semicolons on imports, `export default function` for components, etc **(W.I.P.)**

## Nice-to-haves

- allow filtering of techs in Projects view.
- Add a React hook for routing + classNames to create nice section scroll left/right transitions.