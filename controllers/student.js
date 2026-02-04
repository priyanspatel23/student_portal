const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/token');

const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });

    res.status(201).json({
      success: true,
      token: generateToken(student._id),
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const student = await User.findOne({ email, role: 'student' });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      token: generateToken(student._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAll = async (req, res) => {
  try {

    const students = await User
      .find({ role: 'student' })
      .select('-password');

    res.status(200).json({
      success: true,
      count: students.length,
      students
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const dashboard = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      student: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getAll, dashboard };
