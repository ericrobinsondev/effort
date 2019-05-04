import { Report } from './report.model';

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
    const doc = await Report.find({
      _id: req.params.id,
      $or: [{ group: req.user.group }, { coaches: { $in: [req.user] } }]
    });
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
