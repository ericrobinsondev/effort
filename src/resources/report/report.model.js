import mongoose from 'mongoose';
import { Group } from '../group/group.model';

const reportSchema = new mongoose.Schema(
  {
    coaches: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ],
    group: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'group',
      required: true
    },
    ministry: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ministry',
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    questions: [
      {
        title: {
          type: String,
          required: true,
          trim: true
        },
        countsTowardsPoints: Boolean,
        pointsEach: Number,
        creditForEach: {
          type: Boolean
        },
        pointsExpected: Number
      }
    ],
    pointsExpected: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

reportSchema.index({ group: 1, dueDate: 1 }, { unique: true });

reportSchema.post('save', async function(doc) {
  try {
    const groupDoc = await Group.findOneAndUpdate(doc.group, {
      $addToSet: { reports: [doc._id] }
    });
  } catch (e) {
    console.error(e);
  }
});

export const Report = mongoose.model('report', reportSchema);
