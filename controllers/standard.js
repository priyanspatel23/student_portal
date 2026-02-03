const Standard = require('../models/standard');

const create = async (req, res) => {
    try {
        const { name } = req.body;

        const standard = await Standard.create({
            name,
            createdby: req.user._id
        });
        res.status(201).json({
            message: 'Standard created successfully 🎉',
            standard,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = { create };
