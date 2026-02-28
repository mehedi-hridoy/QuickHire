const service = require('./stats.service');
const { ok } = require('../../utils/response');

const getStats = async (req, res) => {
  const data = await service.getStats();
  return ok(res, data);
};

module.exports = { getStats };
