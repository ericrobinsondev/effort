import { Group } from './group.model';
import { sendErrorMessage } from '../../utils/helpers';

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
