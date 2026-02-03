const express = require('express');
const router = express.Router();

const { assign, getForTeacher } = require('../controllers/subject');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/mySubjects', protect, authorize('teacher', 'admin'), getForTeacher);

router.post('/', protect, authorize('admin'), assign);

module.exports = router;
