const { getDB } = require('../../config/db');
const { ObjectId } = require('mongodb');

const col = () => getDB().collection('applications');

const listWithJob = () =>
  col()
    .aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job',
        },
      },
      { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: 1,
          email: 1,
          resumeLink: 1,
          coverNote: 1,
          createdAt: 1,
          jobId: 1,
          jobTitle: '$job.title',
          company: '$job.company',
        },
      },
    ])
    .toArray();

module.exports = {
  create: (data) => col().insertOne({ ...data, createdAt: new Date() }),
  listWithJob,
  getById: (id) => col().findOne({ _id: new ObjectId(id) }),
  remove: (id) => col().deleteOne({ _id: new ObjectId(id) }),
};
