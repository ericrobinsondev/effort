import { Group } from './group.model';
import { sendErrorMessage, weekEnd } from '../../utils/helpers';
import { subDays } from 'date-fns';
import { Report } from '../report/report.model';
import { Response } from '../response/response.model';

export const createGroup = async (req, res) => {
  try {
    const doc = await Group.create({ ...req.body, admins: [req.user] });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getGroup = async (req, res) => {
  try {
    const doc = await Group.find({
      _id: req.params.id,
      $or: [{ admins: { $in: [req.user] } }, { coaches: { $in: [req.user] } }]
    })
      .populate('members', ['firstName', 'lastName'])
      .populate('admins', ['firstName', 'lastName'])
      .populate('coaches', ['firstName', 'lastName'])
      .lean()
      .exec();

    if (!doc.length) throw Error('Unauthorized');
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    sendErrorMessage(e, res);
  }
};

export const updateGroup = async (req, res) => {
  try {
    const doc = await Group.findOneandUpdate(
      {
        _id: req.params.id,
        admins: { $in: [req.user] }
      },
      req.body,
      { new: true }
    );
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getGroupWeek = async (req, res) => {
  try {
    // Get current week's report if one not specified
    if (!req.params.reportId) {
      const dueDate = weekEnd(Date.now());
      const report = await Report.findOne({
        dueDate: {
          $lte: dueDate,
          $gt: subDays(dueDate, 6)
        },
        group: req.params.id,
        $or: [
          { group: req.user.group },
          { group: { $in: [req.user.coachOfGroups] } }
        ]
      });
      req.params.reportId = report._id;
    }

    const groupDoc = await Group.findOne({
      _id: req.params.id,
      $or: [
        { admins: { $in: [req.user] } },
        { coaches: { $in: [req.user] } },
        { members: { $in: [req.user] } }
      ]
    })
      .lean()
      .exec();

    if (!groupDoc) throw Error('Unauthorized');

    const responseDoc = await Response.find({
      report: {
        _id: req.params.reportId,
        createdBy: { $in: [req.user._id, ...req.user.coachOfGroups] },
        group: req.params.id
      }
    })
      .select('_id totalPointsEarned createdBy')
      .populate('createdBy', ['firstName', 'lastName'])
      .lean()
      .exec();

    if (!responseDoc) throw Error('Unauthorized');

    res.status(200).json({ data: { group: groupDoc, responses: responseDoc } });
  } catch (e) {
    console.error(e.message);
    sendErrorMessage(e, res);
  }
};
