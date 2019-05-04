import { Ministry } from './ministry.model';

export const createMinistry = async (req, res) => {
  const createdBy = req.user._id;
  try {
    const doc = await Ministry.create({ ...req.body, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateMinistry = async (req, res) => {
  try {
    const updatedDoc = await Ministry.findOneAndUpdate(
      {
        _id: req.params.id,
        admins: req.user._id
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) return res.status(400).end();

    return res
      .status(200)
      .json({ data: updatedDoc })
      .send();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
