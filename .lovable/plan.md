# Docking pill navigation

## Goal
Turn the existing site-wide header into one continuous navigation element that morphs from a full-width top bar into a compact floating pill after scrolling.

## Changes
- Keep the top state flush to the viewport, transparent, square-cornered, and visually integrated with each page.
- After roughly 70px of scrolling, animate the same header to a centered 85–90% width pill with a top gap, opaque themed surface, full rounding, softer height, border, blur, and shadow.
- Preserve the current logo, centered menu, theme toggle, project button, and mobile menu behavior.
- Give small screens a near-full-width pill while retaining visible inset, rounded corners, and elevation.
- Use a smooth 350ms ease-in-out transition and respect reduced-motion settings.

## Validation
- Check top and scrolled states on mobile, tablet, and desktop.
- Confirm both light and dark themes, mobile menu positioning, reverse transition, and no content overlap.
- Confirm the site remains error-free.

## Technical details
- Update the shared header only so every page inherits the behavior.
- Transition header inset, top position, width, radius, background, border, shadow, and internal spacing from the existing scroll state.
