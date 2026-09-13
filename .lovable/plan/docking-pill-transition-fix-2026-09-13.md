# Docking pill transition fix

## Goal
Make the existing site-wide navigation resize smoothly in both directions and give the docked desktop state a clearly compact pill proportion.

## Changes
- Keep the header fixed and centered in both states; animate only compatible numeric/color properties.
- Move all header-shell transitions into one shared class covering top, width, max-width, radius, background, border, shadow, and blur over 425ms.
- Apply the same 425ms premium easing to the inner horizontal and vertical padding.
- Reduce docked desktop width to 65% with a 940px cap, while retaining a near-full-width inset pill on mobile and a practical tablet width.
- Reduce docked vertical padding so its height is visibly denser than the top state.
- Preserve the current navigation content, mobile menu behavior, theme support, and reduced-motion behavior.

## Validation
- Slowly cross the scroll threshold repeatedly in both directions on desktop and check for jumps, flicker, or delayed properties.
- Confirm top and docked geometry on mobile, tablet, and desktop, including dark mode and the open mobile menu.
- Confirm the site remains error-free.
