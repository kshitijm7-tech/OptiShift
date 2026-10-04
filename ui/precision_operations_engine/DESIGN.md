---
name: Precision Operations Engine
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#404940'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#707a6f'
  outline-variant: '#bfc9bd'
  surface-tint: '#1f6c3a'
  primary: '#004c22'
  on-primary: '#ffffff'
  primary-container: '#166534'
  on-primary-container: '#93e0a2'
  inverse-primary: '#8bd79b'
  secondary: '#2d6a48'
  on-secondary: '#ffffff'
  secondary-container: '#b0f1c7'
  on-secondary-container: '#33704e'
  tertiary: '#004b1f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00662d'
  on-tertiary-container: '#81e394'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f4b5'
  primary-fixed-dim: '#8bd79b'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#b0f1c7'
  secondary-fixed-dim: '#95d4ac'
  on-secondary-fixed: '#002111'
  on-secondary-fixed-variant: '#0f5132'
  tertiary-fixed: '#95f8a7'
  tertiary-fixed-dim: '#79db8d'
  on-tertiary-fixed: '#00210a'
  on-tertiary-fixed-variant: '#005323'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  metric-display:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system establishes an institutional, high-precision visual environment engineered for enterprise operations planners, dispatch controllers, and workforce analysts. The aesthetic is grounded in rational functionalism, data legibility, and quiet authority. It rejects gratuitous decorative patterns, neon AI glows, and speculative design tropes in favor of crisp boundaries, deliberate alignment, and micro-typographic discipline.

The visual tone communicates reliability, algorithmic certainty, and operational control. Interfaces prioritize sustained scan-rate and rapid cognitive parsing across data-dense views: multi-lane gantt charts, constraint matrices, capacity balancing tables, and financial impact metrics.

## Colors

The palette balances clinical precision with organic stability:

- **Primary & Brand Accents:** Deep mineral green (`#166534`) serves as the primary anchor for committed actions, key state triggers, and selected entities. Deep forest green (`#0F5132`) provides high-contrast brand authority in headers and hero metrics. Light sage tint (`#ECFDF5`) acts as a soft foundational wash for selected rows, positive deltas, and optimal state tags, paired with `#15803D` for readable text.
- **Surfaces & Canvases:** Canvas grounds are constructed from warm off-white tones (`#F8F9FA` and `#F3F4F6`), creating structural distinction against pure white (`#FFFFFF`) component cards and schedule panels. Hairline dividers use neutral slates (`#E5E7EB` and `#E2E8F0`).
- **Typography & Ink:** Deep charcoal (`#111827`) for high-order headlines and metric outputs, balanced by slate mid-tones (`#374151` for labels and descriptive copy; `#6B7280` for secondary metadata and table header labels).
- **Semantics:** Restrained status indicators avoid visual vibration. Error states employ deep crimson (`#B91C1C`) over soft rose (`#FEE2E2`). Warning states use disciplined amber (`#B45309`) with warm flax (`#FEF3C7`). Information cues rely on muted corporate cobalt (`#1D4ED8`) against light ice (`#EFF6FF`). Success aligns with the brand’s mineral tone (`#166534` over `#DCFCE7`).

## Typography

Inter provides the structural foundation across all text roles. Visual hierarchy relies on tight tracking adjustments, controlled weight shifts (400, 500, and 600), and disciplined line heights rather than large font size deltas.

All numerical outputs, financial indicators, shift hours, and capacity ratios must enforce tabular figure alignment using OpenType features (`font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1, "cv05" 1`). This ensures currency values, percentages, and duration meters maintain vertical alignment across comparison matrices and dynamic time-series tables.

## Layout & Spacing

The layout model is built upon a 12-column fluid grid tailored for high-density dashboard layouts, alongside persistent structural panes: a 240px collapsable left navigation bar, a persistent central scheduling canvas, and an optional 360px contextual constraint inspector drawer.

- **Breakpoints:**
  - **Desktop (>= 1280px):** 12-column dynamic grid, 24px gutters, 32px canvas margins. High-density information modules stack horizontally into split panels.
  - **Tablet (768px – 1279px):** 8-column layout, 16px gutters, 16px margins. Contextual inspector panels collapse into right-side overlay flyouts.
  - **Mobile (< 768px):** 4-column flow, 12px gutters, 16px margins. Dense data tables switch to stacked summary card modules with horizontal scroll zones reserved exclusively for timeline views.

Internal layout rhythms strictly follow a 4px/8px modular scale. Spacing tokens correspond to exact component gaps: 4px (`space-xs`) for internal chip paddings and metric badges, 8px (`space-sm`) for form row elements and button icons, 12px (`space-md`) for grouped toolbar clusters, 16px (`space-lg`) for structural panel margins, and 24px (`space-xl`) for macroscopic module demarcation.

## Elevation & Depth

Visual hierarchy is established using low-contrast hairline outlines and tonal layering, rather than noticeable drop shadows. Surfaces sit flat and stable, mimicking industrial tracking instruments.

- **Canvas Ground:** Base application backdrop rendered in `#F8F9FA` or `#F3F4F6`.
- **Level 0 (Flat Container):** Primary working cards, data tables, and schedule grids sit on `#FFFFFF`, framed by a single 1px solid border of `#E5E7EB`.
- **Level 1 (Interactive / Hover):** Transient cards and selectable timeline segments adopt a subtle border accentuation (`#D1D5DB`) paired with a micro-elevation shadow: `0 1px 2px 0 rgba(17, 24, 39, 0.05)`.
- **Level 2 (Popovers, Toolbars & Menus):** Filter dropdowns, context menus, and constraint details windows use pure white backgrounds, `#E5E7EB` border definition, and a disciplined ambient shadow: `0 4px 6px -1px rgba(17, 24, 39, 0.07), 0 2px 4px -2px rgba(17, 24, 39, 0.04)`.
- **Level 3 (Modal Dialogs & Scenarios):** Algorithmic execution runs and solver configuration modals use a focused shadow: `0 10px 15px -3px rgba(17, 24, 39, 0.08), 0 4px 6px -4px rgba(17, 24, 39, 0.04)` over a 40% `#111827` neutral scrim.

## Shapes

The interface embraces a compact, structured shape language based on controlled 6px and 8px radii. Sharp, disciplined curvature communicates structural integrity, minimizes wasted spatial buffers, and keeps grid lines visually aligned.

- **Micro elements (Checkboxes, Segment Pills, Status Indicators):** 4px radius.
- **Form Controls & Action Triggers (Inputs, Standard Buttons, Dropdowns):** 6px radius.
- **Macro Components (Panels, Workspace Cards, Inspector Drawers):** 8px radius.
- **Pill Shapes:** Reserved exclusively for categorical state badges, active constraint chips, and live allocation alerts to distinguish transient meta-tags from structural interactive buttons.

## Components

- **Buttons:** 
  - *Primary:* Solid mineral green background (`#166534`), white label (`#FFFFFF`), 6px border radius, height 36px (compact 32px in data toolbars). Hover: `#0F5132`. Active: `#14532D`.
  - *Secondary / Outline:* Crisp white background (`#FFFFFF`), 1px solid `#E5E7EB` border, deep charcoal label (`#374151`). Hover: `#F9FAFB` surface with `#D1D5DB` border.
  - *Ghost / Tertiary:* Transparent background, `#4B5563` text. Hover: `#F3F4F6` fill.

- **Chips & Status Badges:**
  - Standard padding 2px 8px, height 22px, typography `label-sm`.
  - *Success / Met Constraint:* `#ECFDF5` background, `#15803D` text, subtle `#A7F3D0` border.
  - *Warning / Overtime Risk:* `#FEF3C7` background, `#B45309` text, subtle `#FDE68A` border.
  - *Error / Hard Violation:* `#FEE2E2` background, `#B91C1C` text, subtle `#FECACA` border.
  - *Informational / Unassigned:* `#EFF6FF` background, `#1D4ED8` text, subtle `#BFDBFE` border.

- **Form Inputs & Selectors:**
  - Height 36px, background `#FFFFFF`, border 1px solid `#D1D5DB`, 6px corner radius.
  - Text typography `body-md` (`#111827`), placeholder in `#9CA3AF`.
  - Focused state: 1px border `#166534` accompanied by a 2px outer ring in `#DCFCE7` (zero blur).

- **Data Tables & Shift Grids:**
  - Header rows: 32px height, `#F9FAFB` fill, 1px bottom border `#E5E7EB`, typography `label-sm` uppercase (`#6B7280`).
  - Table rows: 40px fixed height, `#FFFFFF` default, alternating/hover state `#F9FAFB`. Bottom hairline divider `#F3F4F6`.
  - Numerical cells: Right-aligned with tabular figures enabled.

- **Cards & Workspace Panels:**
  - Background `#FFFFFF`, 1px solid hairline border `#E5E7EB`, 8px radius. Padding 16px (`space-lg`). Header zone separated by a hairline 1px `#F3F4F6` border when containing complex action groups.

- **Specialized Metric Tile:**
  - Background `#FFFFFF`, border `#E5E7EB`, 6px radius. Displays uppercase micro-label (`label-sm`), prominent metric value in `metric-display`, and immediate inline comparison badge showing operational delta.