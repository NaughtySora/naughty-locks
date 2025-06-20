"use strict";

const fs = require('node:fs');
const threads = require('node:worker_threads');
const { Semaphore } = require("../lib/Semaphore/index.js");
const path = require("node:path");
const os = require("node:os");
const { isMainThread, workerData, threadId, Worker } = threads;

// Change concurrency Semaphore property in MainThread to see difference.

if (!isMainThread) {
  const semaphore = new Semaphore(workerData);
  const REPEAT_COUNT = 1000000;
  const file = path.resolve(`${__dirname}/bin/file-${threadId}.dat`);
  const data = `Data from ${threadId}`.repeat(REPEAT_COUNT);
  semaphore.enter();
  setTimeout(() => {
    fs.writeFile(file, data, () => {
      setTimeout(() => {
        fs.unlink(file, () => {
          console.log(workerData, threadId);
          semaphore.leave();
        });
      }, 500);
    });
  });
}

module.exports = () => {
  if (isMainThread) {
    const limit = os.availableParallelism();
    const buffer = new SharedArrayBuffer(4);
    new Semaphore(buffer, { concurrency: 1 });
    for (let i = 0; i < limit; i++) {
      new Worker(__filename, { workerData: buffer });
    }
  }
};
