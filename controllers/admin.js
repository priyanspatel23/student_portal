const User = require('../models/user');
const Subject = require('../models/subject');
const Standard = require('../models/standard');

const dashboard = async (req, res) => {
  try {

    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalStandards = await Standard.countDocuments();
    const totalSubjects = await Subject.countDocuments();

    res.status(200).json({
      success: true,
      admin: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      },
      stats: {
        totalStudents,
        totalTeachers,
        totalStandards,
        totalSubjects
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { dashboard };
