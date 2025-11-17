import mongoose, { Schema } from 'mongoose';

const contentItemSchema = new Schema(
  {
    isActive: { type: Boolean, default: true },
    sectionUid: { type: String, required: true },
    serialNo: { type: Number, required: true },
    data: { type: Schema.Types.Mixed, required: false },
  },
  { _id: true, timestamps: false },
);
const subPageSchema = new Schema({}, { _id: true });

subPageSchema.add({
  pageTitle: { type: String, required: true },
  pagePath: { type: String, required: true },
  content: { type: [contentItemSchema], default: [] },
  isActive: { type: Boolean, default: true },
});

const pageBuilderSchema = new Schema(
  {
    pageTitle: { type: String, required: true },
    pagePath: { type: String, required: true, unique: true },
    content: { type: [contentItemSchema], default: [] },
    subPage: { type: [subPageSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { _id: true, timestamps: true },
);

export default mongoose.models.PageBuilder || mongoose.model('PageBuilder', pageBuilderSchema);
