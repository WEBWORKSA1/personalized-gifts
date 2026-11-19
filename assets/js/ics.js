// Calendar files (.ics) for the visitor's own calendar. All-day events with a reminder.
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
const escText = (s) => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** events: [{ title, date (UTC Date), yearly, note, remindDays }] */
export function buildICS(events, calendarName = 'Gift dates') {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Personalized.Gifts//Gift dates//EN', 'CALSCALE:GREGORIAN', `X-WR-CALNAME:${escText(calendarName)}`];
  events.forEach((e, i) => {
    const end = new Date(e.date.getTime() + 864e5);
    lines.push('BEGIN:VEVENT', `UID:${ymd(e.date)}-${i}-${Math.random().toString(36).slice(2, 10)}@personalized.gifts`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(e.date)}`, `DTEND;VALUE=DATE:${ymd(end)}`, `SUMMARY:${escText(e.title)}`);
    if (e.note) lines.push(`DESCRIPTION:${escText(e.note)}`);
    if (e.yearly) lines.push('RRULE:FREQ=YEARLY');
    lines.push('TRANSP:TRANSPARENT', 'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${escText(e.title)}`, `TRIGGER:-P${e.remindDays ?? 14}D`, 'END:VALARM', 'END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
}
