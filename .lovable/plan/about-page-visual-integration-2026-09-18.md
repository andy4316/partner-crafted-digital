# About page visual integration

## What will change
- Apply the existing `Section` grid texture to Principles, Boundaries, Build Note, and Operating Notes.
- Alternate section backgrounds consistently: exploded view on base, Principles alternate, Boundaries base, Build Note alternate, Operating Notes base, then the dark closing section.
- Reuse the existing floating artifact components in Principles and Operating Notes, positioning them outside reading areas and limiting them responsively.
- Recompose Build Note as a full-width textured band with tighter vertical spacing, a small nameplate label, readable unboxed copy, and a restrained logo mark.
- Keep all wording and page order unchanged.

## Responsive verification
- Check the complete About page at mobile, tablet, and desktop widths.
- Confirm artifact cards never cover text, backgrounds alternate cleanly, and reduced-motion behavior remains intact.
- Confirm the live preview has no build, runtime, or console errors.

## Technical details
- Reuse `Section`, `GridTexture`, `BrowserArtifact`, `CodeArtifact`, `TerminalArtifact`, and `Mark`; no new visual variants or dependencies.
- Keep artifacts absolutely positioned within their section boundaries with breakpoint-specific visibility.
