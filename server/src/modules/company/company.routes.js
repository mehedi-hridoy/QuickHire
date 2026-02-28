const { Router } = require('express');
const ctrl = require('./company.controller');
const upload = require('../../utils/upload');
const asyncHandler = require('../../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(ctrl.getCompany));
router.put('/', upload.single('logo'), asyncHandler(ctrl.upsertCompany));

module.exports = router;
