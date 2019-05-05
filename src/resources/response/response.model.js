import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'report',
      required: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    totalPointsEarned: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    answers: [
      {
        questionTitle: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          min: 0,
          required: true
        },
        comment: {
          type: String,
          trim: true
        },
        pointsEarned: {
          type: Number,
          min: 0,
          required: true
        }
      }
    ],
    coachComment: {
      type: String,
      required: true,
      default: ''
    }
  },
  { timestamps: true }
);

responseSchema.index({ createdBy: 1, report: 1 }, { unique: true });

export const Response = mongoose.model('response', responseSchema);
