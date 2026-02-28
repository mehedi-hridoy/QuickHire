const { getDB } = require('../../config/db');

const col = () => getDB().collection('company');

module.exports = {
  get: () => col().findOne({}),
  upsert: (data) => col().findOneAndUpdate({}, { $set: { ...data } }, { upsert: true, returnDocument: 'after' }),
};
