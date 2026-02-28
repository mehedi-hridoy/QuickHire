const { Router } = require('express');
const ctrl = require('./job.controller');
const upload = require('../../utils/upload');
const asyncHandler = require('../../utils/asyncHandler');

const router = Router();

router
  .route('/')
  .get(asyncHandler(ctrl.getAllJobs))
  .post(upload.single('logo'), asyncHandler(ctrl.createJob));

router
  .route('/:id')
  .get(asyncHandler(ctrl.getJob))
  .put(upload.single('logo'), asyncHandler(ctrl.updateJob))
  .delete(asyncHandler(ctrl.deleteJob));

module.exports = router;
