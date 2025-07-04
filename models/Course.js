import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  objectives: [{
    type: String
  }],
  videoKeywords: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  chapters: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  includeVideos: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Programming', 'Business', 'Marketing', 'Design', 'Health', 'Education', 'Science', 'Arts', 'Language']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  generatedChapters: [chapterSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true
});

courseSchema.index({ name: 'text', description: 'text' });

const Course = mongoose.model('Course', courseSchema);

export default Course; 