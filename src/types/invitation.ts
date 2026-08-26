export interface FamilySide {
  grandparentsLabel: string;
  father: string;
  mother: string;
  address: string;
}

export interface CouplePerson {
  roleLabel: string;
  shortName: string;
  fullName: string;
  photo: string;
  frame: string;
}

export interface CeremonyInfo {
  announcement: string;
  ceremonyTitle: string;
  heldAtLabel: string;
  heldAt: string;
  timeLabel: string;
  time: string;
  weekday: string;
  day: string;
  monthLabel: string;
  year: string;
  lunar: string;
}

export interface ReceptionInfo {
  heading: string;
  timeIntro: string;
  time: string;
  weekday: string;
  day: string;
  monthLabel: string;
  year: string;
  lunar: string;
  startLabel: string;
  startTime: string;
  calendarMonthLabel: string;
  highlightDay: number;
  yearNum: number;
  monthNum: number;
}

export interface TimelineItem {
  time: string;
  label: string;
}

export interface Wish {
  id: string;
  author: string;
  at: string;
  message: string;
}

export interface InvitationContent {
  /** Placeholder demo fields — swap later without touching components. */
  isPlaceholderEventDetails: true;
  groom: CouplePerson;
  bride: CouplePerson;
  envelopeDate: string;
  envelopeInvite: string;
  envelopeCta: string;
  heroTitle: string;
  ceremonyHeading: string;
  groomFamily: FamilySide;
  brideFamily: FamilySide;
  ceremony: CeremonyInfo;
  albumHeading: string;
  album: string[];
  receptionHeading: string;
  reception: ReceptionInfo;
  venueHeading: string;
  venue: string;
  mapUrl: string;
  timelineHeading: string;
  timeline: TimelineItem[];
  guestbookHeading: string;
  guestbookEmpty: string;
  guestbookNamePlaceholder: string;
  guestbookMessagePlaceholder: string;
  guestbookSubmit: string;
  rsvpLabel: string;
  addToCalendarLabel: string;
  thanksLine: string;
  seededWishes: Wish[];
}
