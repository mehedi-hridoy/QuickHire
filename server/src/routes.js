const { Router } = require('express');
const jobRoutes = require('./modules/jobs/job.routes');
const applicationRoutes = require('./modules/applications/application.routes');
const companyRoutes = require('./modules/company/company.routes');
const statsRoutes = require('./modules/stats/stats.routes');

const router = Router();

router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/company', companyRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
