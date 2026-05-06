# RiseON Design Analysis

Source reviewed: `design.md`, alongside `business overiew.md`.

## Quick Read

The pasted `design.md` contains a useful CSS foundation: brand variables, reset rules, container sizing, animation utilities, and button styles. It also includes a color audit/export showing actual colors used across a design or codebase.

The foundation is workable, but it is not yet a complete developer-ready page design. It needs cleanup, token consolidation, accessibility checks, and stronger alignment with RiseON's conversion goals.

## What Is Working

- The base token system is a good start: colors, typography, radii, shadows, easing, max width, and horizontal padding are defined in `:root`.
- `Inter` is a practical font choice for a SaaS/career platform because it is readable, modern, and familiar.
- The primary brand blue `#0571BE` gives RiseON a clear action color for CTAs and interactive states.
- Button variants are already defined for primary, outline, white, large, full-width, and pill styles.
- The reset and utility styles are simple and predictable.
- Animations are restrained enough for a professional product, provided they are used lightly.

## Main Issues

### 1. Design File Is Mixed-Format

The file starts as CSS, then abruptly switches into a raw color export:

- `Brand / Accent`
- `Background Methods`
- `Typography Colors`
- `Border Colors`
- `All Colors`

This makes `design.md` hard to use directly. Developers need either a clean CSS file or a structured design guideline, not both mixed together.

Recommended split:

- `tokens.css` or `styles.css` for actual CSS variables and reusable classes.
- `design_analysis.md` or `brand_guidelines.md` for explanation, color usage, and page rules.

### 2. Font System Is Fragmented

The font audit shows 8 detected font entries:

- `Roboto` with weights 400, 500, 600, 700
- `Lora` with weights 400, 700
- `ui-sans-serif` with weight 400
- lowercase `roboto` with weights 400, 500, 600
- `JetBrains Mono` with weight 400
- lowercase `lora` with weight 400
- `lato` with weight 400
- `DM Sans` with weight 400

This is too many fonts for a conversion-focused SaaS/career product. It can make the landing pages feel assembled from different sources and may increase page weight. The duplicate casing for `Roboto`/`roboto` and `Lora`/`lora` should also be normalized.

Recommended typography system:

- Primary UI font: `Roboto`
- Optional editorial/accent font: `Lora`, only for testimonials, quotes, or small brand moments
- Monospace font: `JetBrains Mono`, only for code-like labels, AI prompt examples, or technical snippets
- Remove or avoid: `Lato`, `DM Sans`, and generic `ui-sans-serif` as active design choices

Recommended CSS token:

```css
:root {
  --font-sans: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Lora', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
}
```

Recommended type scale for the two landing pages:

- Hero heading: 48-56px desktop, 34-40px mobile, weight 700
- Section heading: 32-40px desktop, 28-32px mobile, weight 700
- Card heading: 20-24px, weight 600 or 700
- Body text: 16-18px, weight 400
- Supporting/meta text: 14px, weight 400 or 500
- Micro labels: 12px, weight 500

Avoid using too many nearby sizes such as 30px, 32px, and 34px without a clear hierarchy. Pick fewer steps and reuse them consistently.

### 3. Brand Colors Are Inconsistent

The CSS variables define:

- `--blue: #0571BE`
- `--dark: #000321`
- `--text: #565A7C`
- `--bg-light: #FBF9F8`

But the color export shows heavy use of:

- `#2C3E50`
- `#3498DB`
- `#000000`
- `#3F3F3F`
- `#FF0000`
- `#FF9B00`
- `#F97316`

This suggests the actual design/code is using multiple competing palettes. For a conversion-focused career SaaS product, this can make the interface feel less trustworthy and less mature.

Recommended normalized palette:

- Primary action: `#0571BE`
- Primary hover: `#0462A8`
- Dark headline/nav: `#000321`
- Body text: `#565A7C`
- Muted border: `#E5E7EB`
- Surface: `#FFFFFF`
- Soft section background: `#FBF9F8`
- Success/accent: use sparingly, only for proof points or positive status
- Warning/orange/red: reserve for warnings, discounts, validation, or urgency

### 4. Too Much Black In Typography

The export shows `#000000` used 241 times and typography black used 234 times. That may create a harsh visual system, especially alongside a career platform that should feel supportive, guided, and premium.

Recommended typography usage:

- Use `#000321` for primary headings.
- Use `#565A7C` for body copy.
- Use a darker neutral like `#2C3E50` only if it replaces `#000321`, not alongside it.
- Avoid pure black for most interface text unless needed for contrast in tiny text.

### 5. CTA System Needs Conversion Hierarchy

The button classes are clean, but the business goal needs a clearer hierarchy:

- Primary CTA for job seekers: `Create My Profile` or `Start Free`
- Secondary CTA: `Watch Demo` or `See How It Works`
- Pricing CTA: `Start Free Demo` / `Choose Plan`
- Employer CTA: `Post a Job` / `Book a Meeting`

Avoid using too many equally prominent buttons. The home page should make one dominant path obvious for job seekers, with employer actions available but visually secondary.

### 6. Border Radius May Be Too Rounded For Tool UI

The token set includes large radii up to `1.5rem` and pill buttons. This can work for marketing CTAs, but the actual product-facing sections should feel efficient and credible.

Recommended usage:

- Buttons: `0.5rem` or pill only for high-emphasis marketing CTAs.
- Cards/tool previews: `0.5rem` to `0.75rem`.
- Dashboards/forms/tables: `0.375rem` to `0.5rem`.
- Avoid nesting rounded cards inside other rounded cards.

### 7. Animations Should Respect Accessibility

The animation utilities are fine, but they should include reduced-motion support.

Recommended addition:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8. Design Does Not Yet Express The Full Business

The business overview shows RiseON is not just a resume builder. It is a career operating system with:

- Interactive profiles
- Resume/profile creation
- Mock interviews
- Cover letters
- Career counselling
- Job boards
- Personal branding
- Analytics
- Employer hiring tools

The visual system should support this suite positioning. The home page should avoid looking like a single-feature resume site.

## Recommended Page Design Direction

### Home Page

Use the home page to communicate: "Create your AI-powered professional profile, prepare for interviews, and apply smarter from one place."

Recommended structure:

1. Hero with a concrete job-seeker outcome.
2. Product preview showing profile, resume, interview, and job-match workflow.
3. Metrics/trust strip with verified numbers.
4. Core workflow: build profile, prepare, apply, track.
5. Feature suite grouped by user goal, not product names first.
6. Testimonials with role-specific proof.
7. Pricing/demo CTA.
8. Employer pathway as a secondary band.

### Pricing Page

The current business gap is pricing clarity. The pricing page should make plan comparison obvious.

Recommended structure:

1. Hero: "Start building your career profile today."
2. Monthly/yearly toggle if applicable.
3. Clear plan cards with feature limits.
4. Feature comparison table.
5. FAQ focused on risk, renewal, profile publishing, free trial, and premium expiry.
6. Final CTA with demo/no-card reassurance.

## Developer Notes

- Clean `design.md` before handing it to developers. Remove raw export text from executable CSS.
- Normalize font names and reduce the active font stack to Roboto, optional Lora, and optional JetBrains Mono.
- Decide whether `#0571BE` or `#3498DB` is the real brand blue. Do not use both as primary blues.
- Convert repeated colors into semantic variables: `--color-primary`, `--color-text`, `--color-border`, `--color-surface`, `--color-danger`.
- Add focus states for buttons and links.
- Add `prefers-reduced-motion`.
- Make CTA labels business-specific instead of generic.
- Ensure mobile layouts keep the hero CTA, proof, and product value visible without long scrolling before action.

## Priority Fixes

1. Separate CSS tokens from the pasted color audit.
2. Reduce the font system to one primary sans font plus tightly scoped optional fonts.
3. Normalize the palette around one primary blue and one dark text color.
4. Replace generic CTA copy with conversion-focused action copy.
5. Add accessibility states: focus, reduced motion, and contrast validation.
6. Design pages around the RiseON career workflow, not just individual product cards.
