const Subject = require('../models/subject');

const assign = async (req, res) => {
  try {

    const { name, standardId, teacherId } = req.body;

    if (!name || !standardId || !teacherId) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const subject = await Subject.create({
      name,
      standard: standardId,
      teacher: teacherId,
      assignedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      subject
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Subject already assigned for this class' });
    }
    res.status(500).json({ message: error.message });
  }
};


const getForTeacher = async (req, res) => {
  try {

    const filter = {};

    if (req.user.role === 'teacher') {
      filter.teacher = req.user._id;
    }

    const subjects = await Subject.find(filter)
      .populate('standard', 'name')
      .populate('teacher', 'name email')
      .populate('assignedBy', 'name email');

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assign, getForTeacher };
