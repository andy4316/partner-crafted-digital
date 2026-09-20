# ISO Consultancy Page Rebuild

## Scope
Replace the current ISO Consultancy page completely while preserving the shared header, footer, typography, grid texture, card language, motion restraint, and ISO contact preselection.

## Page structure
1. Rebuild the hero with the supplied accreditation badge, headline, supporting copy, and ISO-preselected CTA.
2. Add the three-paragraph ISO certification explainer as a spacious editorial section.
3. Build the six-standard hub-and-spoke diagram with a rotating wireframe globe, evenly positioned cards, staggered travelling dots, a mobile/tablet fallback layout, and reduced-motion handling.
4. Add the plain-language versus technical benefits comparison.
5. Add three ISO service tier cards, highlighting the middle tier and routing every CTA to the ISO-preselected contact form.
6. Add the dark assurance section with supplied copy and three statistics.
7. Add the six-question accessible accordion and matching FAQ structured data.
8. Finish with the closing ISO CTA.

## Visual direction
- Scope the page accent to ISO red `#C8102E`; normal site pages remain blue.
- Reuse existing semantic colors, grid texture, bordered cards, section rhythm, reveal behavior, button styling, and typography.
- Keep the page restrained and premium: red is an accent, not a dominant background.
- Alternate base and subtle secondary section backgrounds for continuity.

## Technical details
- Add the supplied route-specific title, description, Open Graph, Twitter, canonical, and FAQ JSON-LD metadata.
- Build the globe using semantic HTML/CSS and decorative SVG line art; no external media or new dependency is required.
- Use exact 60-degree card placement on wide screens and an ordered card grid below that layout threshold.
- Disable globe rotation, travelling dots, and existing reveals when `prefers-reduced-motion` is enabled.
- Keep all accreditation language tied to certificates being issued through an IAF-accredited certification body.

## Verification
- Check the complete page at mobile, tablet, 1100–1300px, and wide desktop widths.
- Verify no diagram/card/content collisions, all six FAQ items, keyboard accordion behavior, ISO preselection, reduced motion, metadata, heading order, and a clean build/runtime.
