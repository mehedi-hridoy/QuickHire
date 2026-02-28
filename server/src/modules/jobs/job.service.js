const { getDB } = require('../../config/db');
const { ObjectId } = require('mongodb');
const { endOfDay } = require('../../utils/dateUtils');

const col = () => getDB().collection('jobs');

const safeParseTags = (tags) => {
  if (!tags) return [];
  try {
    return JSON.parse(tags);
  } catch {
    return tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
};

const buildQuery = ({ search, location, category, from, to }) => {
  const query = {};
  if (search)
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  if (location) query.location = location;
  if (category) query.category = category;
  if (from || to)
    query.createdAt = {
      ...(from && { $gte: new Date(from) }),
      ...(to && { $lte: endOfDay(to) }),
    };
  return query;
};

module.exports = {
  create: (data) => col().insertOne({ ...data, tags: safeParseTags(data.tags), createdAt: new Date() }),
  getAll: (filters) => {
    const sort = filters?.sort === 'asc' ? 1 : -1;
    const limit = filters?.limit ? parseInt(filters.limit, 10) : 0;
    const skip  = filters?.skip  ? parseInt(filters.skip,  10) : 0;
    const cursor = col().find(buildQuery(filters)).sort({ createdAt: sort }).skip(skip);
    return limit > 0 ? cursor.limit(limit).toArray() : cursor.toArray();
  },
  getById: (id) => col().findOne({ _id: new ObjectId(id) }),
  update: (id, data) =>
    col().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, ...(data.tags && { tags: safeParseTags(data.tags) }) } },
      { returnDocument: 'after' }
    ),
  remove: (id) => col().deleteOne({ _id: new ObjectId(id) }),
};
