# Concurrency primitives 

- Look on tests to see usage

### Mutex

`class Mutex {`
`  constructor(buffer: SharedArrayBuffer, offset?: number);`
`  enter(): void;`
`  leave(): void;`
`  isolate(fn: (...args: any) => void, ...args: any[]): void;`
`  size: number;`
`}`

### Semaphore 

`interface SemaphoreOptions {`
`  offset?: number;`
`  concurrency?: number;`
`}`

`class Semaphore {`
`  constructor(buffer: SharedArrayBuffer, options: SemaphoreOptions);
`  enter(): void;`
`  leave(): void;`
`  size: number;`
`}`

### Exclusive Semaphore

`class ExclusiveSemaphore extends Semaphore {`
`  exclusive(): void;`
`  leaveExclusive(): void;`
`}`
