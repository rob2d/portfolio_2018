# ROADMAP #
## [ Roadmap All the Things ™ ] ##
------------------------------

Since this is just a one-man free-for-all on my free time here, just listing
things that are less-than-ideal which I plan to get around to in the near future term.

## About
- complete new layout + re-add 3D skills and overview component to layout.

## Project Details
- Use vertical space a bit better in the layout on wide screens.
- cache instances of YouTube player while parent still mounted so that there's no need to reload iframe
- fix some issues with YouTube player responsiveness on some mobile devices.

## Misc Refactors

- inline SVG components from mdi library -- decreased page size + responsiveness.
- remove Redux `connect` HOC and fade transitions in favor of hooks for speed + consistency.

## Nice-to-haves

- allow filtering of techs in Projects view.
- Add a React hook for routing + classNames to create nice section scroll left/right transitions.