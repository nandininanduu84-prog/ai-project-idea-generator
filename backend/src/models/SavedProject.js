import mongoose from 'mongoose';

const savedProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: '',
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SavedProject = mongoose.model('SavedProject', savedProjectSchema);
export default SavedProject;
