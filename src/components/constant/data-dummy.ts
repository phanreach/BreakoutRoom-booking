export const upcomingBookings = [
  {
    id: 1,
    room: "Study Room 3B - Main Library",
    date: "Today, 2:00 PM",
    duration: "2 Hours",
    image:
      "https://www.uaa.alaska.edu/academics/college-of-engineering/facilities/_images/ECB-205-sq.jpg",
    status: "Starts in 45 mins",
  },
  {
    id: 2,
    room: "Tech Lab 12 - Engineering Wing",
    date: "Thu, 10:00 AM",
    duration: "3 Hours",
    image:
      "https://www.conferencecentre.cuhk.edu.hk/wp-content/uploads/facilities/210-211.jpg",
    status: "Scheduled",
  },
];

export const quickRooms = [
  {
    id: 1,
    name: "Seminar Room C",
    capacity: 8,
  },
  {
    id: 2,
    name: "Focus Pod 04",
    capacity: 1,
  },
];

export const recentActivity = [
  {
    id: 1,
    title: "Booking Confirmed",
    desc: "Tech Lab 12 for Thursday",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Profile Updated",
    desc: "Changed notification preferences",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Booking Cancelled",
    desc: "Library 4A - Room unavailable",
    time: "Feb 12, 2024",
  },
];

export const dummyData = [
  { date: "MON", usage: 5 },
  { date: "TUE", usage: 8 },
  { date: "WED", usage: 4 },
  { date: "THU", usage: 10 },
  { date: "FRI", usage: 6 },
  { date: "SAT", usage: 7 },
  { date: "SUN", usage: 3 },
];

// If you want to compare multiple rooms:
export const dummyDataMulti = [
  { date: "MON", RoomA: 5, RoomB: 3 },
  { date: "TUE", RoomA: 8, RoomB: 6 },
  { date: "WED", RoomA: 4, RoomB: 7 },
  { date: "THU", RoomA: 10, RoomB: 2 },
  { date: "FRI", RoomA: 6, RoomB: 5 },
  { date: "SAT", RoomA: 7, RoomB: 4 },
  { date: "SUN", RoomA: 3, RoomB: 6 },
];
