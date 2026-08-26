import mongoose from 'mongoose';

const generationHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    generationParams: {
      branch: String,
      year: String,
      skills: [String],
      interests: [String],
      projectType: String,
      difficulty: String,
      teamSize: Number,
      duration: String,
      preferredTechs: [String],
      numberOfIdeas: Number,
    },
    generatedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    error: {
      type: String,
      default: null,
    },
    tokensUsed: {
      type: Number,
      default: 0,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const GenerationHistory = mongoose.model('GenerationHistory', generationHistorySchema);
export default GenerationHistory;
