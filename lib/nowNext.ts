type Show = {
  title: string;
  host?: string;
  days: string[];           // e.g. ["Mon","Tue"]
  start: string;            // "09:00"
  end: string;              // "11:00"
  slug?: string;
};
export type Schedule = { shows: Show[] };

export function getNowNext(schedule: Schedule, nowDate = new Date()) {
  const tzNow = nowDate; // assume local dev tz
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const today = dayNames[tzNow.getDay()];

  const toMinutes = (hhmm: string) => {
    const [h,m] = hhmm.split(":").map(Number);
    return h*60 + m;
  };
  const nowMin = tzNow.getHours()*60 + tzNow.getMinutes();

  const todays = schedule.shows.filter(s => s.days.includes(today)).map(s => ({
    ...s, startMin: toMinutes(s.start), endMin: toMinutes(s.end)
  })).sort((a,b)=>a.startMin-b.startMin);

  const current = todays.find(s => nowMin >= s.startMin && nowMin < s.endMin) || null;
  const upcoming = todays.find(s => s.startMin > nowMin) || null;

  return { current, next: upcoming };
}
