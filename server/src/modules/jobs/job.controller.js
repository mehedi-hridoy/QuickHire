const service = require('./job.service');
const { requireFields } = require('../../utils/validate');
const { ok, fail } = require('../../utils/response');

const createJob = async (req, res) => {
  const missing = requireFields(req.body, ['title', 'company', 'location', 'category', 'description', 'type']);
  if (missing.length) return fail(res, `Missing fields: ${missing.join(', ')}`);

  if (!['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract'].includes(req.body.type))
    return fail(res, 'Invalid job type');

  const logo = req.file ? `/uploads/${req.file.filename}` : null;
  const { insertedId } = await service.create({ ...req.body, logo });
  const job = await service.getById(insertedId.toString());
  return ok(res, job, 201);
};

const getAllJobs = async (req, res) => {
  const data = await service.getAll(req.query);
  return ok(res, data);
};

const getJob = async (req, res) => {
  const data = await service.getById(req.params.id);
  if (!data) return fail(res, 'Job not found', 404);
  return ok(res, data);
};

const updateJob = async (req, res) => {
  const logo = req.file ? `/uploads/${req.file.filename}` : undefined;
  const updated = await service.update(req.params.id, { ...req.body, ...(logo && { logo }) });
  if (!updated) return fail(res, 'Job not found', 404);
  return ok(res, updated);
};

const deleteJob = async (req, res) => {
  const result = await service.remove(req.params.id);
  if (!result.deletedCount) return fail(res, 'Job not found', 404);
  return ok(res, { message: 'Job deleted' });
};

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };

