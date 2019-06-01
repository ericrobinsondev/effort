import { Report } from '../report.model';
import { Group } from '../../group/group.model';
import mongoose from 'mongoose';

describe('Report model', () => {
  describe('schema', () => {
    test('group', () => {
      const group = Report.schema.obj.group;
      expect(group).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'group',
        required: true
      });
    });

    test('dueDate', () => {
      const dueDate = Report.schema.obj.dueDate;
      expect(dueDate).toEqual({
        type: Date,
        required: true
      });
    });
  });

  describe('post save', () => {
    test('adds report id to group reports array on report save', async () => {
      await new Group({
        name: 'Test Group',
        ministry: mongoose.Types.ObjectId(),
        admins: [mongoose.Types.ObjectId()],
        reports: []
      }).save();

      var group = await Group.findOne({ name: 'Test Group' });

      await new Report({
        group: group._id,
        ministry: group.ministry,
        dueDate: Date.now(),
        pointsExpected: 100
      }).save();

      var report = await Report.findOne({ group: group._id });
      group = await Group.findOne({ name: 'Test Group' });

      expect(group.reports.length).toEqual(1);
      expect(group.reports).toContain(report._id);
    });
  });
});
