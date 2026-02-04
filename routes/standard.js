const express = require('express');
const router = express.Router();

const { create } = require('../controllers/standard');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.post('/', protect, authorize('admin'), create);

module.exports = router;
