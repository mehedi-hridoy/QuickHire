const { getDB } = require('../../config/db');
const { lastDays, toDateKey } = require('../../utils/dateUtils');

const jobsCol = () => getDB().collection('jobs');
const appsCol = () => getDB().collection('applications');

const aggregateByDay = async (col, days) => {
  const start = days[0];
  const rows = await col
    .aggregate([
      { $match: { createdAt: { $gte: start } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    ])
    .toArray();

  const map = new Map(rows.map((r) => [r._id, r.count]));
  return days.map((d) => ({ date: toDateKey(d), count: map.get(toDateKey(d)) || 0 }));
};

const getApplicationsByType = async () => {
  const rows = await appsCol()
    .aggregate([
      { $lookup: { from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'job' } },
      { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },
      { $group: { _id: '$job.type', count: { $sum: 1 } } },
    ])
    .toArray();

  const map = new Map(rows.map((r) => [r._id ?? 'Unknown', r.count]));
  const types = ['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract'];
  return types.map((t) => ({ type: t, count: map.get(t) ?? 0 }));
};

module.exports = {
  getStats: async () => {
    const days = lastDays(7);
    const [totalJobs, totalApplications, jobsByDay, applicationsByDay, applicationsByType] = await Promise.all([
      jobsCol().countDocuments(),
      appsCol().countDocuments(),
      aggregateByDay(jobsCol(), days),
      aggregateByDay(appsCol(), days),
      getApplicationsByType(),
    ]);

    const [recentJobs, recentApplications] = await Promise.all([
      jobsCol().find().sort({ createdAt: -1 }).limit(5).project({ title: 1, company: 1, location: 1, createdAt: 1 }).toArray(),
      appsCol()
        .aggregate([
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          { $lookup: { from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'job' } },
          { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },
          { $project: { name: 1, createdAt: 1, jobTitle: '$job.title' } },
        ])
        .toArray(),
    ]);

    const jobsThisWeek = jobsByDay.reduce((s, d) => s + d.count, 0);
    const applicationsThisWeek = applicationsByDay.reduce((s, d) => s + d.count, 0);

    return {
      totalJobs,
      totalApplications,
      jobsThisWeek,
      applicationsThisWeek,
      jobsByDay,
      applicationsByDay,
      applicationsByType,
      recentJobs,
      recentApplications,
    };
  },
};
