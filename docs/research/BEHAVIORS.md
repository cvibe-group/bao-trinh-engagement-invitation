# Behaviors — Hoạ Tình Đỏ

## Envelope

- **INTERACTION MODEL:** click-driven
- Trigger: click "Mở thiệp"
- Animation: `envelope-away` 1s ease-in — dip down 10px then fly `-120vh` with slight rotate
- Particles: 囍 rise continuously (`ambient-rise` 18–26s infinite, random left/size/color/opacity)
- Body scroll locked while overlay visible

## Album

- **INTERACTION MODEL:** click-driven
- Prev/next arrows cycle 9 photos
- Click photo opens lightbox (full-bleed, arrows, close, counter `n / 9`)
- Thumbnails in lightbox

## RSVP

- **INTERACTION MODEL:** click-driven modal
- Original posts to Chungdoi API — clone uses client state + success toast

## Guestbook

- Form: name + message required
- Submit appends to in-memory/localStorage list (no API)
- Empty copy: "Chưa có lời chúc nào. Hãy là người đầu tiên!" (we seed demo wishes)

## Gift box

- Default: two envelopes illustration + "Nhấn để mở"
- Click expands bank cards (groom / bride) with QR + "Lưu QR"

## Music FAB

- Fixed bottom-right, red circle, music note
- Toggles looping `/music/xung-doi-cuoi-thoi.mp3`
- Original audio `loop: false` but FAB implies toggle; clone loops while playing

## Responsive

- Overlay card: 310px → 340px (sm) → 520px (md) → 600px (lg)
- Inner invitation is a centered column, max ~560–720px comic layout, mobile-first
- Hero photos overlap and rotate; stack spacing tightens on 390px
