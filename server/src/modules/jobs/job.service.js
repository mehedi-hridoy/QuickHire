const { getDB } = require('../../config/db');
const { ObjectId } = require('mongodb');

const col = () => getDB().collection('jobs');

const safeParseTags = (tags) => {
  if (!tags) return [];
  try { return JSON.parse(tags); } catch { return tags.split(',').map((t) => t.trim()); }
};

module.exports = {
  create: (data) => col().insertOne({ ...data, tags: safeParseTags(data.tags), createdAt: new Date() }),
  getAll: () => col().find().sort({ createdAt: -1 }).toArray(),
  getById: (id) => col().findOne({ _id: new ObjectId(id) }),
  update: (id, data) =>
    col().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, ...(data.tags && { tags: safeParseTags(data.tags) }) } },
      { returnDocument: 'after' }
    ),
  remove: (id) => col().deleteOne({ _id: new ObjectId(id) }),
};
