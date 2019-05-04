import mongoose from 'mongoose';

const ministrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    groups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'group'
      }
    ],
    admins: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ],
    coaches: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ],
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ]
  },
  { timestamps: true }
);

export const Ministry = mongoose.model('ministry', ministrySchema);
