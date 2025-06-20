"use strict";

const threads = require("node:worker_threads");
const Mutex = require("../lib/Mutex/index.js");
const os = require("node:os");
const { Worker, workerData, isMainThread, threadId } = threads;
const { range, sequentially } = require('../util/index.js');

// tested about 2 hours couple of times;
// to cause sync violation comment mutex in any position

if (!isMainThread) {
  const mutex = new Mutex(workerData);
  const array = new Uint8Array(workerData, 4);
  const mod = threadId % 2 === 0;
  if (mod) {
    const timer = setTimeout(() => {
      mutex.enter();
      console.log("read", threadId, array);
      sequentially(array);
      mutex.leave();
      timer.refresh();
    }, 0);
  } else {
    let value = 1;
    const timer = setTimeout(() => {
      mutex.enter();
      for (let i = 0; i < 4; i++) array[i] += value;
      mutex.leave();
      timer.refresh();
      value = -value;
    }, 0);
  }
}

module.exports = () => {
  if (isMainThread) {
    const limit = os.availableParallelism();
    const workers = new Map();
    const buffer = new SharedArrayBuffer(8);

    const spawn = () => {
      const worker = new Worker(__filename, { workerData: buffer });
      const id = worker.threadId;
      workers.set(id, worker);

      worker.on("error", (error) => {
        console.error(`Worker Error: `, error);
        console.log(`Worker ${id} terminated`);
        workers.delete(id);
        process.exit(1);
      });

      worker.on("exit", () => {
        console.log(`Worker exit ${id}`);
        workers.delete(id);
      });
    };

    process.on("SIGINT", () => {
      Iterator.prototype.forEach.call(
        workers.values(),
        (worker) => worker.terminate()
      );
      process.exit(0);
    });

    Iterator.prototype.forEach.call(range(limit), spawn);
  }
};
