const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const adminRoutes = require('./routes/admin');
const standardRoutes = require('./routes/standard');
const subjectRoutes = require('./routes/subject');

// database
db();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Student LMS API running' });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/standards', standardRoutes);
app.use('/api/subjects', subjectRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
