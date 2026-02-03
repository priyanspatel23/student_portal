const express = require('express');
const router = express.Router();

const { dashboard } = require('../controllers/teacher');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/dashboard', protect, authorize('teacher', 'admin'), dashboard);

module.exports = router;
