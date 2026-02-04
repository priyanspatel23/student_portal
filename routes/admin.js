const express = require('express');
const router = express.Router();

const { dashboard } = require('../controllers/admin');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.get('/dashboard', protect, authorize('admin'), dashboard);

module.exports = router;
