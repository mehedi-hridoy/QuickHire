const { Router } = require('express');
const ctrl = require('./application.controller');
const asyncHandler = require('../../utils/asyncHandler');

const router = Router();

router.route('/').get(asyncHandler(ctrl.listApplications)).post(asyncHandler(ctrl.createApplication));

module.exports = router;
