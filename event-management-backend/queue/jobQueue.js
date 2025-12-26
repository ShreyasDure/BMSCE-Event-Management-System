const Job = require('../models/Job');

const enqueueJob = async ({ type, payload = {}, runAt = new Date() }) => {
  const job = await Job.create({
    type,
    payload,
    runAt,
    status: 'queued'
  });

  return job;
};

module.exports = { enqueueJob };
