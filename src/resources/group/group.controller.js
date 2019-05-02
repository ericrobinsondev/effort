import { Group } from './group.model';

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
      admins: { $in: [req.user] }
    });
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
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
