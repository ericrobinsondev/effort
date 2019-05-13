import { startOfWeek, endOfWeek, format } from 'date-fns';

export const weekStart = date => {
  return startOfWeek(date, { weekStartsOn: 1 });
};

export const weekEnd = date => {
  return endOfWeek(date, { weekStartsOn: 1 });
};

export const dateInWords = date => {
  return format(date, 'MMM D');
};

export const weekRangeInWords = date => {
  return (
    dateInWords(weekStart(date)) +
    String.fromCharCode(8212) +
    dateInWords(weekEnd(date))
  );
};
