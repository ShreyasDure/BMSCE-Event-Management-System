require('dotenv').config();
const mongoose = require('mongoose');

const Job = require('../models/Job');
const { jobHandlers } = require('./jobHandlers');

const MONGO_URI = process.env.MONGODB_URI ||
  "mongodb+srv://ShreyasDure:mangodb6@cluster0.ds3cs50.mongodb.net/BMSCEEventManagement?retryWrites=true&w=majority&appName=Cluster0";

const POLL_INTERVAL_MS = Number(process.env.JOB_WORKER_POLL_MS || 2000);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const lockNextJob = async () => {
  const now = new Date();

  return Job.findOneAndUpdate(
    {
      status: 'queued',
      runAt: { $lte: now }
    },
    {
      $set: { status: 'processing', lockedAt: now },
      $inc: { attempts: 1 }
    },
    { sort: { runAt: 1 }, new: true }
  );
};

const markCompleted = async (job) => {
  job.status = 'completed';
  job.completedAt = new Date();
  await job.save();
};

const markFailed = async (job, err) => {
  job.lastError = err && err.message ? err.message : String(err);

  if (job.attempts >= job.maxAttempts) {
    job.status = 'failed';
  } else {
    job.status = 'queued';
    job.runAt = new Date(Date.now() + 30 * 1000);
  }

  await job.save();
};

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Worker connected to MongoDB');

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const job = await lockNextJob();

    if (!job) {
      await sleep(POLL_INTERVAL_MS);
      continue;
    }

    const handler = jobHandlers[job.type];
    if (!handler) {
      await markFailed(job, new Error(`No handler for job type: ${job.type}`));
      continue;
    }

    try {
      await handler(job);
      await markCompleted(job);
    } catch (err) {
      console.error('Job failed:', job.type, job._id.toString(), err);
      await markFailed(job, err);
    }
  }
};

run().catch((err) => {
  console.error('Worker crashed:', err);
  process.exit(1);
});
