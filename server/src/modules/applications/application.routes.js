const { Router } = require('express');
const ctrl = require('./application.controller');
const asyncHandler = require('../../utils/asyncHandler');

const router = Router();

router.route('/').get(asyncHandler(ctrl.listApplications)).post(asyncHandler(ctrl.createApplication));
router.route('/:id').get(asyncHandler(ctrl.getApplication)).delete(asyncHandler(ctrl.deleteApplication));

module.exports = router;
