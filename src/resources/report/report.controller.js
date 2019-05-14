import { Report } from './report.model';
import { weekEnd } from '../../utils/helpers';
import { subDays } from 'date-fns';
import mongoose from 'mongoose';

export const createReport = async (req, res) => {
  try {
    const doc = await Report.create({ ...req.body, coaches: [req.user._id] });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
export const getReport = async (req, res) => {
  const dueDate = weekEnd(Date.now());
  const reportQuery =
    req.params.id == 'current'
      ? {
          dueDate: {
            $lte: dueDate,
            $gt: subDays(dueDate, 6)
          }
        }
      : { _id: req.params.id };

  try {
    let doc = await Report.findOne({
      ...reportQuery,
      $or: [
        { group: req.user.group },
        { group: { $in: [req.user.coachOfGroups] } }
      ]
    });

    if (!doc && req.params.id == 'current') {
      const previousReportDoc = await Report.findOne({
        dueDate: {
          $lte: dueDate,
          $gt: subDays(dueDate, 13)
        },
        $or: [
          { group: req.user.group },
          { group: { $in: [req.user.coachOfGroups] } }
        ]
      });

      if (previousReportDoc) {
        var copiedCurrentReport = new Report(previousReportDoc);
        copiedCurrentReport._id = mongoose.Types.ObjectId();
        copiedCurrentReport.dueDate = dueDate;
        doc = await Report.create(
          copiedCurrentReport.toObject({ minimize: false })
        );
      } else if (!doc) {
        throw Error('Could not find current or previous report');
      }
    }
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateReport = async (req, res) => {
  const user = req.user;

  try {
    const updatedReport = await Report.findOneAndUpdate(
      {
        _id: req.params.id,
        coaches: { $in: [user] }
      },
      req.body,
      { new: true }
    );

    res.status(200).json({ data: updatedReport });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// export const updateReportResponse = async (req, res) => {
//   const user = req.user;

//   try {
//     const updatedReportResponse = await Report.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         responses: {
//           createdBy: { $in: [user] }
//         }
//       },
//       req.body,
//       { new: true }
//     );
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };
