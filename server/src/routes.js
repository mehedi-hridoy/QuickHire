const { Router } = require('express');
const jobRoutes = require('./modules/jobs/job.routes');

const router = Router();

router.use('/jobs', jobRoutes);

module.exports = router;
