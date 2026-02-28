const service = require('./company.service');
const { isEmail, isUrl, requireFields } = require('../../utils/validate');
const { ok, fail } = require('../../utils/response');

const getCompany = async (req, res) => {
  const data = await service.get();
  return ok(res, data ?? null);
};

const upsertCompany = async (req, res) => {
  const missing = requireFields(req.body, ['name', 'website', 'email', 'phone', 'location', 'about']);
  if (missing.length) return fail(res, `Missing fields: ${missing.join(', ')}`);

  if (!isEmail(req.body.email)) return fail(res, 'Invalid email');
  if (!isUrl(req.body.website)) return fail(res, 'Invalid website URL');

  const logo = req.file ? `/uploads/${req.file.filename}` : req.body.logo || null;
  const saved = await service.upsert({ ...req.body, logo });
  return ok(res, saved);
};

module.exports = { getCompany, upsertCompany };

