# Website finishing pass

## Goal
Polish the shared visual system across every page using the selected **Technical minimalism refinement** direction: clearer typography, intentional spacing, substantial technical accents, structured service cards, and compact fixed contact/navigation controls.

## Changes
- **Header:** Rebuild the desktop header as three balanced zones so the logo, centered navigation, and right controls share the width without dead gaps. Set the wordmark to 600, navigation to 500, and keep the mobile header compact and readable.
- **Floating technical cards:** Increase card surface opacity to 90–95%, strengthen borders and shadows, and darken the content. Keep their slow motion, limit mobile noise, and adjust tablet placement to protect reading areas.
- **What we do:** Replace the seven divided rows with a responsive two-column card grid. Each bordered 8px card will contain a tinted square icon, title, and summary.
- **Work glimpse:** Remove the CSS snippet from this section so the statistics panel always has clear space.
- **Footer:** Rebalance the four columns, strengthen the brand and copyright typography, and add the existing free-sample invitation to the contact column rather than inventing business hours.
- **Fixed controls:** Replace the footer text link with a circular scroll-progress button containing an up arrow. Position it beside, not over, a branded WhatsApp button using the recognizable speech-bubble handset glyph.

## Responsive verification
Check the homepage and shared layout at mobile, tablet, and desktop sizes. Confirm headers do not collide, cards stay readable, fixed controls remain separated, footer columns have no dead gaps, and all interactive controls work.

## Technical details
- Reuse the existing semantic color tokens and add only shared tokens needed for artifact surfaces or progress controls.
- Implement scroll progress with a lightweight shared React component and an accessible button label.
- Preserve smooth scrolling and reduced-motion behavior.
- Validate the live preview, console, and latest build diagnostics after implementation.
