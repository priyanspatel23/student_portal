const Student = require('../models/user');
const bcrypt = require('bcryptjs'); // Changed to bcryptjs
const generateToken = require('../utils/token');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student'
        });


        res.status(201).json({
            message: 'Student admitted successfully 🏫',
            token: generateToken(student._id),
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                rollNo: student.rollNo,
                class: student.class
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful 🎉',
            token: generateToken(student._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const dashboard = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Welcome to Student Dashboard 🎓',
            student: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getAll,
    dashboard
}
