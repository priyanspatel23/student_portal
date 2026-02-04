const Standard = require('../models/standard');

const create = async (req, res) => {
  try {

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Standard name is required' });
    }

    const exists = await Standard.findOne({ name });

    if (exists) {
      return res.status(400).json({ message: 'Standard already exists' });
    }

    const standard = await Standard.create({
      name,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      standard
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create };
