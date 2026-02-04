const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getAll,
  dashboard
} = require('../controllers/student');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

router.get('/dashboard', protect, authorize('student', 'teacher', 'admin'), dashboard);

router.get('/', protect, authorize('admin'), getAll);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
