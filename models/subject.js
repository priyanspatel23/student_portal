const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    standard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Standard',
      required: true
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

subjectSchema.index({ name: 1, standard: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);
