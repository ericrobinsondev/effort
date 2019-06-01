import {
  sendErrorMessage,
  weekStart,
  weekEnd,
  dateInWords,
  startOfWeek
} from '../helpers';

describe('Helpers:', () => {
  describe('sendErrorMessage', () => {
    test('sends 401 error message', async () => {
      expect.assertions(2);

      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        json(result) {
          expect(typeof result.error).toBe('string');
        }
      };

      const error = new Error('Unauthorized');

      await sendErrorMessage(error, res);
    });

    test('sends 400 error message', async () => {
      expect.assertions(2);

      const end = jest.fn();

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end
      };

      const error = new Error('Error message');

      await sendErrorMessage(error, res);
      expect(end).toHaveBeenCalled();
    });
  });

  describe('Date functions', () => {
    test('dateInWords formats date correctly', () => {
      const date = new Date(1559248763970);

      expect(dateInWords(date)).toBe('May 30');
    });
  });
});
