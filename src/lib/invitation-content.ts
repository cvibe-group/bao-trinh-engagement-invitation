import type { InvitationContent } from "@/types/invitation";

/**
 * Event details (date, venue, family, bank, photos) are DEMO PLACEHOLDERS
 * from the Hoạ Tình Đỏ sample. Replace values here when real data is ready.
 * Couple display names are Gia Bảo & Phương Trinh as requested.
 */
export const invitation: InvitationContent = {
  isPlaceholderEventDetails: true,
  groom: {
    roleLabel: "Quý Công Tử",
    shortName: "Gia Bảo",
    fullName: "Gia Bảo",
    photo: "/images/photos/groom.jpg",
    frame: "/images/themes/love-art/groom-frame.webp",
  },
  bride: {
    roleLabel: "Đại Tiểu Thư",
    shortName: "Phương Trinh",
    fullName: "Phương Trinh",
    photo: "/images/photos/bride.jpg",
    frame: "/images/themes/love-art/bride-frame.webp",
  },
  envelopeDate: "16 tháng 9, 2026",
  envelopeInvite: "Thân Mời",
  envelopeCta: "Mở thiệp",
  heroTitle: "Lễ Đính Hôn",
  ceremonyHeading: "THÔNG TIN LỄ ĐÍNH HÔN",
  groomFamily: {
    grandparentsLabel: "Ông Bà",
    father: "Trương Hoàng Dũng",
    mother: "Lưu Kiều Phượng",
    address: "Khu phố 1, Phường Mỹ Phước Tây, Tỉnh Đồng Tháp",
  },
  brideFamily: {
    grandparentsLabel: "Bà",
    father: "",
    mother: "Dương Thị Bé Hai",
    address: "Ấp 7, Xã Bình Phú, Tỉnh Đồng Tháp",
  },
  ceremony: {
    announcement: "TRÂN TRỌNG BÁO TIN",
    ceremonyTitle: "LỄ ĐÍNH HÔN CỦA CON CHÚNG TÔI",
    heldAtLabel: "LỄ ĐÍNH HÔN ĐƯỢC CỬ HÀNH TẠI",
    heldAt: "TƯ GIA",
    timeLabel: "VÀO LÚC",
    time: "09:00",
    weekday: "THỨ TƯ",
    day: "16",
    monthLabel: "THÁNG 09",
    year: "2026",
    lunar: "(Tức ngày 6 tháng 8 năm Bính Ngọ)",
  },
  albumHeading: "Album Ảnh",
  album: [
    "/images/photos/album-01.jpg",
    "/images/photos/album-02.jpg",
    "/images/photos/album-03.jpg",
    "/images/photos/album-04.jpg",
    "/images/photos/album-05.jpg",
    "/images/photos/album-06.jpg",
    "/images/photos/album-07.jpg",
    "/images/photos/album-09.jpg",
  ],
  receptionHeading: "THÔNG TIN TIỆC ĐÍNH HÔN",
  reception: {
    heading: "THÔNG TIN TIỆC ĐÍNH HÔN",
    timeIntro: "Tiệc đính hôn sẽ diễn ra vào lúc:",
    time: "09:00",
    weekday: "THỨ TƯ",
    day: "16",
    monthLabel: "THÁNG 09",
    year: "2026",
    lunar: "(Tức ngày 6 tháng 8 năm Bính Ngọ)",
    startLabel: "Nhập tiệc",
    startTime: "10:30",
    calendarMonthLabel: "Tháng 9 / 2026",
    highlightDay: 16,
    yearNum: 2026,
    monthNum: 9,
  },
  venueHeading: "TIỆC ĐÍNH HÔN SẼ TỔ CHỨC TẠI",
  venue: "Cầu Tham Rôn, Bình Phú, Đồng Tháp (Đối Diện Tạp Hoá Phúc Khang)",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1207.235581408615!2d106.07359226961701!3d10.383895318499446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDIzJzAyLjAiTiAxMDbCsDA0JzI3LjMiRQ!5e1!3m2!1svi!2s!4v1787726621079!5m2!1svi!2s",
  timelineHeading: "LỊCH TRÌNH NGÀY ĐÍNH HÔN",
  timeline: [
    { time: "08:30", label: "Đón Khách" },
    { time: "09:00", label: "Lễ Gia Tiên" },
    { time: "10:00", label: "Lễ Sân Khấu" },
    { time: "10:30", label: "Nhập Tiệc" },
    { time: "12:00", label: "Kết Thúc Tiệc" },
  ],
  guestbookHeading: "Sổ lưu bút",
  guestbookEmpty: "Chưa có lời chúc nào. Hãy là người đầu tiên!",
  guestbookNamePlaceholder: "Nhập tên của bạn*",
  guestbookMessagePlaceholder: "Nhập lời chúc của bạn*",
  guestbookSubmit: "GỬI LỜI CHÚC",
  rsvpLabel: "XÁC NHẬN THAM DỰ",
  addToCalendarLabel: "Thêm vào lịch",
  thanksLine:
    "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
  seededWishes: [

  ],
};

export function googleCalendarUrl(content: InvitationContent): string {
  const text = encodeURIComponent(
    `Lễ đính hôn ${content.groom.fullName} & ${content.bride.fullName}`,
  );
  const dates = "20260916T030000Z/20260916T060000Z";
  const details = encodeURIComponent(
    `Tiệc đính hôn của ${content.groom.fullName} & ${content.bride.fullName} tại ${content.venue}`,
  );
  const location = encodeURIComponent(content.venue);
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&ctz=Asia/Ho_Chi_Minh&details=${details}&location=${location}`;
}
