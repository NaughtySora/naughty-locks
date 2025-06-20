
type Callback<T> = (...args: T[]) => any;

export class Mutex {
  constructor(buffer: SharedArrayBuffer, offset?: number);
  enter(): void;
  leave(): void;
  isolate<T>(fn: Callback<T>, ...args: T[]): void;
  size: number;
}

interface SemaphoreOptions {
  offset?: number;
  concurrency?: number;
}

export class Semaphore {
  constructor(buffer: SharedArrayBuffer, options: SemaphoreOptions);
  enter(): void;
  leave(): void;
  size: number;
}

export class ExclusiveSemaphore extends Semaphore {
  exclusive(): void;
  leaveExclusive(): void;
}
