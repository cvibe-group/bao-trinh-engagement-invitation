import type { InvitationContent } from "@/types/invitation";

/**
 * Event details (date, venue, family, bank, photos) are DEMO PLACEHOLDERS
 * from the Hoạ Tình Đỏ sample. Replace values here when real data is ready.
 * Couple display names are Gia Bảo & Phương Trinh as requested.
 */
export const invitation: InvitationContent = {
  isPlaceholderEventDetails: true,
  groom: {
    roleLabel: "Trưởng Nam",
    shortName: "Gia Bảo",
    fullName: "Gia Bảo",
    photo: "/images/photos/groom.jpg",
    frame: "/images/themes/love-art/groom-frame.webp",
  },
  bride: {
    roleLabel: "Thứ Nữ",
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
    father: "Lê Văn Bình",
    mother: "Trần Thị Hằng",
    address: "Số 3, Xóm 1, Xã Ninh Nhất, TP. Ninh Bình",
  },
  brideFamily: {
    grandparentsLabel: "Ông Bà",
    father: "Nguyễn Văn Lợi",
    mother: "Vũ Thị Thanh",
    address: "Tổ 5, Phường Nam Thành, TP. Ninh Bình",
  },
  ceremony: {
    announcement: "TRÂN TRỌNG BÁO TIN",
    ceremonyTitle: "LỄ ĐÍNH HÔN CỦA CON CHÚNG TÔI",
    heldAtLabel: "LỄ ĐÍNH HÔN ĐƯỢC CỬ HÀNH TẠI",
    heldAt: "TƯ GIA",
    timeLabel: "VÀO LÚC",
    time: "08:00",
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
    "/images/photos/album-08.jpg",
    "/images/photos/album-09.jpg",
  ],
  receptionHeading: "THÔNG TIN TIỆC ĐÍNH HÔN",
  reception: {
    heading: "THÔNG TIN TIỆC ĐÍNH HÔN",
    timeIntro: "Tiệc đính hôn sẽ diễn ra vào lúc:",
    time: "10:00",
    weekday: "THỨ TƯ",
    day: "16",
    monthLabel: "THÁNG 09",
    year: "2026",
    lunar: "(Tức ngày 6 tháng 8 năm Bính Ngọ)",
    startLabel: "Nhập tiệc",
    startTime: "10:00",
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
    { time: "07:30", label: "Đón khách" },
    { time: "08:00", label: "Làm lễ" },
    { time: "10:00", label: "Nhập tiệc" },
    { time: "12:30", label: "Kết thúc tiệc" },
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
    {
      id: "1",
      author: "Gia đình cô Lan",
      at: "10:58:41 30/7/2026",
      message: "Chúc hai cháu trăm năm hạnh phúc, sớm sinh quý tử!",
    },
    {
      id: "2",
      author: "Bạn thân của cô dâu",
      at: "10:58:41 29/7/2026",
      message:
        "Chúc mừng hai bạn về chung một nhà. Mong hai bạn luôn yêu thương nhau như ngày đầu!",
    },
    {
      id: "3",
      author: "Anh Minh",
      at: "10:58:41 28/7/2026",
      message: "Nhìn thiệp mà thấy ấm áp ghê. Chúc lễ đính hôn thật trọn vẹn nhé!",
    },
    {
      id: "4",
      author: "Chị Hương",
      at: "10:58:41 27/7/2026",
      message: "Chúc cô dâu chú rể trăm năm hảo hợp, gia đình luôn đầm ấm.",
    },
    {
      id: "5",
      author: "Tập thể lớp 12A",
      at: "10:58:41 26/7/2026",
      message:
        "Mừng hạnh phúc hai bạn! Chúc hai bạn luôn nắm tay nhau đi hết chặng đường dài.",
    },
    {
      id: "6",
      author: "Bác Tuấn",
      at: "10:58:41 25/7/2026",
      message:
        "Chúc hai cháu một lễ đính hôn thật vui và một cuộc sống thật bình yên.",
    },
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
