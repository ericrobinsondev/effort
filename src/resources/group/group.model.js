import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    ministry: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ministry',
      required: true
    },
    reports: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'report'
      }
    ],
    admins: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      }
    ],
    coaches: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ],
    members: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ]
  },
  { timestamps: true }
);

groupSchema.index({ ministry: 1, name: 1 }, { unique: true });

export const Group = mongoose.model('group', groupSchema);
