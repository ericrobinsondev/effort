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
  try {
    const doc = await Report.findOne({
      _id: req.params.id,
      $or: [{ group: req.user.group }, { coaches: { $in: [req.user] } }]
    });
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getCurrentReport = async (req, res) => {
  const dueDate = weekEnd(Date.now());

  try {
    let doc = await Report.findOne({
      dueDate: {
        $lte: dueDate,
        $gt: subDays(dueDate, 6)
      },
      $or: [
        { group: req.user.group },
        { group: { $in: [req.user.coachOfGroups] } }
      ]
    });

    if (!doc) {
      doc = await Report.findOne({
        dueDate: {
          $lte: dueDate,
          $gt: subDays(dueDate, 13)
        },
        $or: [
          { group: req.user.group },
          { group: { $in: [req.user.coachOfGroups] } }
        ]
      });

      if (doc) {
        var copiedCurrentReport = new Report(doc);
        copiedCurrentReport._id = mongoose.Types.ObjectId();
        copiedCurrentReport.dueDate = dueDate;
        doc = await Report.create(
          copiedCurrentReport.toObject({ minimize: false })
        );
      } else {
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
