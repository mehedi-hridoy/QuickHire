const { ObjectId } = require('mongodb');
const service = require('./application.service');
const { isEmail, isUrl, requireFields } = require('../../utils/validate');
const { ok, fail } = require('../../utils/response');

const createApplication = async (req, res) => {
  const missing = requireFields(req.body, ['jobId', 'name', 'email', 'resumeLink', 'coverNote']);
  if (missing.length) return fail(res, `Missing fields: ${missing.join(', ')}`);

  if (!ObjectId.isValid(req.body.jobId)) return fail(res, 'Invalid jobId');
  if (!isEmail(req.body.email)) return fail(res, 'Invalid email');
  if (!isUrl(req.body.resumeLink)) return fail(res, 'Invalid resume link');

  const payload = { ...req.body, jobId: new ObjectId(req.body.jobId) };
  const { insertedId } = await service.create(payload);
  return ok(res, { ...payload, _id: insertedId }, 201);
};

const listApplications = async (req, res) => {
  const data = await service.listWithJob();
  return ok(res, data);
};

module.exports = { createApplication, listApplications };
