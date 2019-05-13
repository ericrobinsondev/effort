import { User } from './user.model';
import { Response } from '../response/response.model';
import { sendErrorMessage } from '../../utils/helpers';

export const getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.user._id);
    if (req.params.id != req.user._id) {
      if (
        req.user.coachOfGroups[0] &&
        req.user.coachOfGroups[0].members.includes(req.params.id)
      ) {
      } else {
        throw Error('Unauthorized');
      }
    }

    const userDoc = await User.findOne({
      _id: req.params.id
    })
      .select('firstName lastName email group')
      .lean()
      .exec();

    if (!userDoc) throw Error('User not found');

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
