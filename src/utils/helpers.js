import { startOfWeek, endOfWeek, format } from 'date-fns';

export const weekStart = date => {
  return startOfWeek(date, { options: { weekStartsOn: 1 } });
};

export const weekEnd = date => {
  return endOfWeek(date, { options: { weekStartsOn: 1 } });
};

export const dateInWords = date => {
  return format(date, 'MMM D');
};

export const sendErrorMessage = (error, res) => {
  error.message === 'Unauthorized'
    ? res.status(401).json({
        error: "You don't have permission to access."
      })
    : res.status(400).end();
};
