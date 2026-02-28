const { Router } = require('express');
const ctrl = require('./stats.controller');
const asyncHandler = require('../../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(ctrl.getStats));

module.exports = router;
