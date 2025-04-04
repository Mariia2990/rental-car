export function getMonthName(year, monthIndex) {
  return new Date(year, monthIndex, 1).toLocaleString('en-GB', {
    month: 'long',
  });
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

export function generateCalendarDays(month, year) {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const days = [];

  const prevMonthDays =
    month === 0
      ? getDaysInMonth(11, year - 1)
      : getDaysInMonth(month - 1, year);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }

  const totalDays = 42;
  while (days.length < totalDays) {
    days.push({
      day: days.length - daysInMonth - firstDay + 2,
      isCurrentMonth: false,
    });
  }

  return days;
}
