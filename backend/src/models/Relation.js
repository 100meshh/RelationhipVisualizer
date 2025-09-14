import mongoose from 'mongoose';

const relationSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    relation: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Relation = mongoose.model('Relation', relationSchema);


