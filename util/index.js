"use strict";

const sequentially = (array) => {
  const copy = array.slice(0);
  let next = copy[0];
  for (const element of copy) {
    if (next !== element) throw new Error("Array is not equal: " + copy.toString());
  }
};

function* range(count) {
  let i = 0;
  while (i++ < count) yield i;
}

module.exports = { sequentially, range };