const service = require('./job.service');

const createJob = async (req, res) => {
  const logo = req.file ? `/uploads/${req.file.filename}` : null;
  const result = await service.create({ ...req.body, logo });
  res.status(201).json({ success: true, data: { ...req.body, logo, _id: result.insertedId } });
};

const getAllJobs = async (req, res) => {
  const data = await service.getAll();
  res.json({ success: true, data });
};

const getJob = async (req, res) => {
  const data = await service.getById(req.params.id);
  if (!data) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, data });
};

const updateJob = async (req, res) => {
  const logo = req.file ? `/uploads/${req.file.filename}` : undefined;
  const data = await service.update(req.params.id, { ...req.body, ...(logo && { logo }) });
  res.json({ success: true, data });
};

const deleteJob = async (req, res) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Job deleted' });
};

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
