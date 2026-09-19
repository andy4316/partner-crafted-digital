# Site-wide floating artifact collision audit

## What will change
- Inventory every floating browser, code, CSS, and terminal card on Home, About, Services, Work, ISO, and Contact, including shared hero cards.
- Record each card’s section, absolute offsets, stacking level, and desktop visibility threshold.
- Measure rendered card and content bounds at every 10px viewport step from 1100px through 1920px, including hero entry and section reveal states.
- Check cards against other cards, headings, paragraphs, buttons, forms, statistics, and adjacent section boundaries.
- Reposition each collision with at least 24px rendered clearance; remove a card where the section cannot safely accommodate it.
- Standardize the desktop-only visibility rule so every floating card is fully hidden at 1100px and below without clipped remnants.

## Verification
- Run the collision scanner on all six pages across the full width range, with extra review from 1100px to 1300px.
- Slowly resize each page from 1920px to 1100px in the browser and capture representative checks at 1100px, 1200px, 1300px, and 1920px.
- Confirm no build, runtime, console, overflow, or breakpoint visibility errors remain.
- Provide a page-by-page inventory and concise before/after collision report.

## Technical details
- Reuse the existing artifact components and animation system; no visual redesign or new card variants.
- Add stable selectors or data attributes only where needed for automated geometry checks.
- Treat the animated float range as part of each card’s collision box, not only its resting rectangle.
- Keep non-artifact page content and existing responsive layouts unchanged.