"use strict";

const Mutex = require("./lib/Mutex/index.js");
const { ExclusiveSemaphore, Semaphore } = require("./lib/Semaphore/index.js");

module.exports = { Mutex, ExclusiveSemaphore, Semaphore };
