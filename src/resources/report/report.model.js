import mongoose from 'mongoose';

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

export const Report = mongoose.model('report', reportSchema);
