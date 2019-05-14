import { User } from './user.model';
import { Response } from '../response/response.model';
import { sendErrorMessage } from '../../utils/helpers';

export const getUser = async (req, res) => {
  try {
    const userDoc = await User.findOne({
      _id: req.params.id
    })
      .select('firstName lastName email group')
      .lean()
      .exec();

    if (!userDoc) throw Error('User not found');

    if (req.params.id != req.user._id) {
      req.user = await User.findById(req.user._id)
        .populate('coachOfGroups', 'members')
        .lean()
        .exec();
      if (
        req.user.coachOfGroups[0] &&
        req.user.coachOfGroups[0].members.some(
          member => member._id == req.params.id
        )
      ) {
      } else if (req.user.group == userDoc.group) {
      } else {
        throw Error('Unauthorized');
      }
    }

    const responseDoc = await Response.find({
      createdBy: req.params.id
    })
      .select('dueDate totalPointsEarned report')
      .lean()
      .exec();

    res.status(200).json({ data: { user: userDoc, responses: responseDoc } });
  } catch (e) {
    console.error(e);
    sendErrorMessage(e, res);
  }
};
