import { createReport } from '../report.controller';
import mongoose from 'mongoose';

describe('Report Controller:', () => {
  describe('createReport', () => {
    test('creates report correctly', async () => {
      expect.assertions(2);

      const req = {
        body: {
          group: mongoose.Types.ObjectId(),
          ministry: mongoose.Types.ObjectId(),
          dueDate: Date.now(),
          pointsExpected: 100,
          questions: []
        },
        user: {
          _id: mongoose.Types.ObjectId()
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        json(result) {
          expect(typeof result.data).toBe('object');
        }
      };

      await createReport(req, res);
    });

    test('returns 400 on createReport error', async () => {
      const req = {
        body: {
          group: mongoose.Types.ObjectId(),
          ministry: mongoose.Types.ObjectId(),
          dueDate: Date.now(),
          pointsExpected: 100,
          questions: []
        },
        user: {
          _id: mongoose.Types.ObjectId()
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBeTruthy();
        }
      };

      await createReport(req, res);
    });
  });
});
