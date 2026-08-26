# EnvelopeOverlay Specification

- **Target file:** `src/components/EnvelopeOverlay.tsx`
- **Interaction model:** click-driven
- Overlay: `fixed inset-0 z-50 flex items-center justify-center overflow-hidden`
- Background: `linear-gradient(165deg, #8B0000 0%, #C41230 45%, #8B0000 100%)`
- 12 囍 particles, color gold/coral, `ambient-rise` 18–26s
- Card: 310/340/520/600px, radius 8px, shadow 25/60/-12 black 0.45
- Inner gradient: `to bottom right, #fff, #FFF5F5, #fff`
- Names: Patrick Hand 36px #D70C1B; `&` Baskerville 20px
- Button: Lora 18px/500, padding 10px 32px, bg #D70C1B, pill, shine sweep
- Open: class `animate-envelope-away` 1.05s then unmount
