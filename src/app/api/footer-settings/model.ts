import mongoose, { Schema } from 'mongoose';

const FooterSchema: Schema = new Schema(
  {
    footerUId: String,
    isActive: Boolean,
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);
export default mongoose.models.Footer || mongoose.model('Footer', FooterSchema);
