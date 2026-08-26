# Page Topology — Hoạ Tình Đỏ

URL: https://chungdoi.com/vi/mau-thiep/hoa-tinh-do/demo

Two layers on a single route:

1. **Envelope overlay** (`position: fixed; inset: 0; z-index: 50`) — click-driven. Cover until "Mở thiệp".
2. **Invitation scroll** (`min-h-screen`, ~6700px) — native document scroll. Visible under/after overlay.

## Overlay (click-driven)

- Full-viewport red gradient + 12 floating 囍 (`ambient-rise`)
- Centered white card (600px desktop / 310px mobile)
- Interaction: click **Mở thiệp** → `envelope-away` (~1s) then unmount overlay
- Query `?open=1` skips overlay

## Inner sections (top → bottom)

| # | Name | Interaction |
|---|---|---|
| 1 | Hero (OUR ENGAGEMENT + comic photos) | static / decorative |
| 2 | Ceremony info | static |
| 3 | Photo album | click carousel + lightbox |
| 4 | Reception info + calendar | click add-to-calendar, RSVP |
| 5 | Venue | static |
| 6 | Timeline | static |
| 7 | Guestbook | click submit (mock) |
| 8 | Gift box | click to reveal QR |
| 9 | Thanks | static |

## Out of clone

- Chungdoi site nav, chat widget, analytics, `♡ chungdoi.com`
