---
name: Faras Quran AI
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdada'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#45483c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#75796b'
  outline-variant: '#c5c8b8'
  surface-tint: '#50652a'
  primary: '#3e5219'
  on-primary: '#ffffff'
  primary-container: '#556b2f'
  on-primary-container: '#d0eba1'
  inverse-primary: '#b6d088'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#344d6f'
  on-tertiary: '#ffffff'
  tertiary-container: '#4c6589'
  on-tertiary-container: '#d2e2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2eca2'
  primary-fixed-dim: '#b6d088'
  on-primary-fixed: '#131f00'
  on-primary-fixed-variant: '#394d14'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#afc8f0'
  on-tertiary-fixed: '#001c3a'
  on-tertiary-fixed-variant: '#2f486a'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  parent-display:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 24px
  container-padding-desktop: 64px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is built upon the philosophy of "Cinematic Serenity." It balances high-end educational technology with a warm, inviting atmosphere designed specifically for children and their parents. The objective is to move away from the high-energy, chaotic aesthetics often found in kids' apps, favoring instead a grounded, premium experience that evokes focus and reverence.

The style is a blend of **Minimalism** and **Tactile Modernism**. It utilizes soft, organic forms, expansive whitespace, and depth-of-field effects to create a focused learning environment. Visuals should feel "lit from within," mimicking the warmth of golden hour, ensuring the interface feels like a high-quality physical tool rather than a digital distraction.

## Colors

The palette is rooted in nature and prestige. 
- **Ivory White (#FCFAFA)** serves as the primary canvas, providing a breathable, airy background that feels softer and more premium than pure white.
- **Olive Green (#556B2F)** is used for primary actions, progress indicators, and "Success" states, symbolizing growth and tranquility.
- **Soft Gold (#D4AF37)** is reserved for moments of achievement, rewards, and 3D accents, creating a sense of value and cinematic warmth.
- **Deep Navy Blue (#001F3F)** provides the necessary weight for typography and sophisticated parent-facing dashboards, ensuring high legibility and a sense of trust.

## Typography

This design system employs a dual-typeface strategy to distinguish between the child’s learning journey and the parent’s administrative experience. 

- **Plus Jakarta Sans** is the primary typeface for children. Its soft, rounded terminals and open apertures make it exceptionally friendly and legible for early readers. 
- **Source Serif 4** is introduced in parent dashboards and high-level headings to provide an authoritative, scholarly, and premium feel, reinforcing the educational depth of the platform.

Arabic script rendering should utilize a high-quality Naskh-style typeface, ensuring diacritics are clear and vertically spaced to prevent crowding.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with generous safe areas. For the children's interface, content should be centered and grouped into digestible "islands" to maintain focus.

- **Mobile/Tablet:** Use a 4 or 8 column grid with 24px margins. Elements should be large and easily tappable.
- **Desktop (Parent Dashboard):** Use a 12-column grid with 64px side margins. 
- **Spacing Rhythm:** Use an 8px base unit. Vertical stack spacing should be expansive (minimum 32px between major sections) to preserve the "airy" and "frictionless" feel. Avoid dense clusters of information.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Cinematic Lighting**. 

- **Soft Depth:** Instead of harsh drop shadows, use large-radius, low-opacity (5-10%) shadows tinted with Deep Navy Blue to lift cards off the Ivory background.
- **Backdrop Blurs:** Use semi-transparent overlays (70% opacity) for modals to create a shallow depth-of-field effect, blurring the background content to keep the child focused on the task at hand.
- **3D Elements:** Icons and achievement badges should use subtle inner glows and gradients to mimic "Golden Hour" lighting, appearing as if they are physical objects resting on the screen.

## Shapes

The shape language is defined by extreme softness and safety. 

- **Cards & Containers:** Use a 24px corner radius (`rounded-xl`) to create a friendly, organic appearance. 
- **Interactive Elements:** Buttons and input fields should utilize a 16px radius.
- **Circular Elements:** Progress rings and profile avatars should remain perfectly circular to contrast with the soft-rectilinear card system.
- **Avoid:** Any sharp 90-degree angles, which are perceived as "clinical" or "hostile" in this context.

## Components

### Buttons
- **Primary:** Olive Green background with Ivory text. Use a subtle "squishy" press animation (scale 0.95) to provide tactile feedback.
- **Achievement/Gold:** Use for "Claim Reward" actions. Features a soft gradient from #D4AF37 to a lighter tint, with a faint golden outer glow.

### Cards
- Surfaces should be Ivory White. For the Parent Dashboard, use thin (1px) borders in a muted Navy (10% opacity) instead of shadows for a cleaner, professional look.

### Progress Indicators
- Use thick, rounded strokes for progress bars. The background track should be a very pale version of the Olive Green (10% opacity).

### Input Fields
- Inputs should have a 16px radius and an Ivory background. On focus, the border should transition to a 2px Olive Green stroke.

### Learning Chips
- Small, pill-shaped tags used for Ayah numbering or categories. Use Deep Navy for text on a very light Olive tint to keep them readable but secondary.

### 3D Achievement Badges
- These are the centerpiece of the gamification. They should utilize high-gloss finishes and be presented in a carousel with significant padding to emphasize their value.