import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    suitability: {
      type: String,
      required: true,
    },
    targetUsers: {
      type: String,
      required: true,
    },
    keyFeatures: [{
      type: String,
    }],
    aiFeatures: [{
      type: String,
    }],
    techStack: {
      frontend: [String],
      backend: [String],
      database: [String],
      apis: [String],
    },
    architecture: {
      type: String,
      required: true,
    },
    databaseDesign: {
      type: String,
      required: true,
    },
    apiRequirements: [String],
    developmentRoadmap: [
      {
        phase: String,
        tasks: [String],
        duration: String,
      },
    ],
    estimatedDuration: {
      type: String,
      enum: ['2 weeks', '1 month', '2 months', '3+ months'],
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    teamResponsibilities: [
      {
        role: String,
        responsibilities: [String],
      },
    ],
    futureEnhancements: [String],
    expectedLearning: [String],
    branch: String,
    year: String,
    projectType: String,
    skills: [String],
    interests: [String],
    teamSize: Number,
    isRefined: {
      type: Boolean,
      default: false,
    },
    refinementHistory: [
      {
        refinementType: String,
        timestamp: Date,
        changes: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
