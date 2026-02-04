const Subject = require('../models/subject');

const dashboard = async (req, res) => {
  try {

    const totalSubjects = await Subject.countDocuments({
      teacher: req.user._id
    });

    res.status(200).json({
      success: true,
      teacher: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      },
      stats: {
        totalSubjects
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { dashboard };
