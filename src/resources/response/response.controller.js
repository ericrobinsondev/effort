import { Response } from './response.model';
import { sendErrorMessage } from '../../utils/helpers';
import { User } from '../user/user.model';

export const createResponse = async (req, res) => {
  try {
    const doc = await Response.create({
      ...req.body,
      createdBy: req.user,
      group: req.user.group
    });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getResponse = async (req, res) => {
  try {
    const doc = await Response.findOne({
      report: req.params.id,
      createdBy: req.params.userId
    }).populate('createdBy', 'firstName lastName');

    if (doc) {
      res.status(200).json({ data: doc });
    } else {
      const userDoc = await User.findOne({
        _id: req.params.userId
      }).select('firstName lastName');

      res
        .status(404)
        .json({ message: 'No response created yet', data: { user: userDoc } });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Couldn't save." });
  }
};

export const getAllResponses = async (req, res) => {
  try {
    const doc = await Response.find({
      report: {
        _id: req.params.id,
        coaches: { $in: [req.user.id] }
      }
    })
      .populate('report', ['coaches'])
      .lean()
      .exec();

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    sendErrorMessage(e, res);
  }
};

export const updateResponse = async (req, res) => {
  try {
    const doc = await Response.findOneAndUpdate(
      {
        _id: req.params.responseID,
        createdBy: req.user
      },
      req.body,
      { new: true }
    );

    if (!doc) throw Error('Unauthorized');
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    sendErrorMessage(e, res);
  }
};
