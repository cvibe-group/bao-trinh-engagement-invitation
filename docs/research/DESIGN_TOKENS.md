# Design Tokens — Hoạ Tình Đỏ

Source: https://chungdoi.com/vi/mau-thiep/hoa-tinh-do/demo (getComputedStyle)

## Colors

| Token | Value | Usage |
|---|---|---|
| invitation-red | `#D70C1B` / `rgb(215, 12, 27)` | Names, buttons, accents |
| invitation-red-deep | `#8B0000` | Overlay gradient ends |
| invitation-red-mid | `#C41230` | Overlay gradient mid |
| gold | `#FFC107` / `#FFD700` / `#FFE066` | Floating 囍 |
| gold-coral | `#FF6B6B` | Some 囍 particles |
| card-gradient | `linear-gradient(to right bottom, #fff, #FFF5F5, #fff)` | Envelope card |
| overlay-gradient | `linear-gradient(165deg, #8B0000 0%, #C41230 45%, #8B0000 100%)` | Envelope bg |
| ink | `#000000` | Body headings |
| muted | `#6b7280` | Captions |

## Typography

- **Couple names (envelope):** Patrick Hand, 36px (sm: 30px / md: 36px), weight 400, color `#D70C1B`
- **Ampersand:** Baskerville / Times New Roman, 20px, `#D70C1B`
- **Open button:** Lora, 18px, weight 500, white on `#D70C1B`
- **Section titles:** Plus Jakarta Sans, extra-bold, black, uppercase
- **Body / handwritten labels:** Patrick Hand
- **Date / "Thân Mời":** Lora serif, `#D70C1B`

## Spacing & elevation

- Envelope card: 310 / 340 / 520 / 600px wide, ~410px tall, `border-radius: 8px`
- Card shadow: `0 25px 60px -12px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2), 0 0 40px rgba(215,12,27,0.15)`
- Button: padding `10px 32px`, pill, shadow `0 4px 14px rgba(215,12,27,0.35)`
- 囍 emblem: 64px circle, glow `0 5.5px 32px rgba(215,12,27,0.5)`

## Motion

```
@keyframes envelope-away {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  15% { transform: translateY(10px) rotate(0.5deg); opacity: 1; }
  100% { transform: translateY(-120vh) rotate(-2deg); opacity: 0; }
}
@keyframes ambient-rise {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: var(--particle-opacity, 0.4); }
  90% { opacity: var(--particle-opacity, 0.4); }
  100% { transform: translateY(-110vh) rotate(12deg); opacity: 0; }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```
