import { createReport, getReport, updateReport } from '../report.controller';
import { Report } from '../report.model';
import { User } from '../../user/user.model';
import { subWeeks } from 'date-fns';
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

  describe('getReport', () => {
    test('should return requested report by ID if it exists', async () => {
      expect.assertions(2);

      const groupObjectId = mongoose.Types.ObjectId();

      await new Report({
        group: groupObjectId,
        ministry: mongoose.Types.ObjectId(),
        dueDate: Date.now(),
        pointsExpected: 100
      }).save();

      var report = await Report.findOne({ group: groupObjectId });

      const req = {
        params: {
          id: report._id
        },
        user: {
          group: groupObjectId
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(typeof result.data).toBe('object');
        }
      };

      await getReport(req, res);
    });

    test('should return 400 error if report does not exist', () => {
      const req = {
        params: {
          id: 'current'
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

      getReport(req, res);
    });

    test('should return report for this week when current report requested', async () => {
      expect.assertions(2);

      const groupObjectId = mongoose.Types.ObjectId();

      await new Report({
        group: groupObjectId,
        ministry: mongoose.Types.ObjectId(),
        dueDate: Date.now(),
        pointsExpected: 100
      }).save();

      var report = await Report.findOne({ group: groupObjectId });

      const req = {
        params: {
          id: 'current'
        },
        user: {
          group: groupObjectId
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(typeof result.data).toBe('object');
        }
      };

      await getReport(req, res);
    });

    test('should create new report based on previous week if current does not exist', async () => {
      expect.assertions(2);

      const groupObjectId = mongoose.Types.ObjectId();

      await new Report({
        group: groupObjectId,
        ministry: mongoose.Types.ObjectId(),
        dueDate: subWeeks(Date.now(), 1),
        pointsExpected: 100
      }).save();

      var report = await Report.findOne({ group: groupObjectId });

      const req = {
        params: {
          id: report._id
        },
        user: {
          group: groupObjectId
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(typeof result.data).toBe('object');
        }
      };

      await getReport(req, res);
    });
  });

  describe('updateReport', () => {
    test('should return 400 error if report not found', async () => {
      expect.assertions(2);

      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        },
        user: {}
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

      await updateReport(req, res);
    });

    test('should return 400 error if lacking permission to update report', async () => {
      expect.assertions(4);

      const groupObjectId = mongoose.Types.ObjectId();

      await new Report({
        group: groupObjectId,
        ministry: mongoose.Types.ObjectId(),
        dueDate: Date.now(),
        pointsExpected: 100,
        coaches: [mongoose.Types.ObjectId()]
      }).save();

      const report = await Report.findOne({ group: groupObjectId });

      const req = {
        params: {
          id: report._id
        },
        body: {
          pointsExpected: 50
        },
        user: mongoose.Types.ObjectId()
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

      await updateReport(req, res);

      const nonUpdatedReport = await Report.findOne({ group: groupObjectId });
      expect(nonUpdatedReport.pointsExpected).toEqual(100);
    });

    test('should update report when permission to do so', async () => {
      expect.assertions(3);

      const groupObjectId = mongoose.Types.ObjectId();

      await new User({
        email: 'test@test.com',
        password: 'password',
        firstName: 'Coach',
        lastName: 'User',
        coachOfGroups: [groupObjectId]
      }).save();

      const coach = await User.findOne({ email: 'test@test.com' });

      await new Report({
        group: groupObjectId,
        ministry: mongoose.Types.ObjectId(),
        dueDate: Date.now(),
        pointsExpected: 100,
        coaches: [coach._id]
      }).save();

      var report = await Report.findOne({ group: groupObjectId });

      const req = {
        params: {
          id: report._id
        },
        body: {
          pointsExpected: 50
        },
        user: coach
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(typeof result.data).toBe('object');
          expect(result.data.pointsExpected).toEqual(50);
        }
      };

      await updateReport(req, res);
    });
  });
});
