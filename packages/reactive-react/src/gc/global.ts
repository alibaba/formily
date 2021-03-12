export {}
declare global {
  export class FinalizationRegistry<T> {
    constructor(cleanup: (cleanupToken: T) => void)
    register(object: object, cleanupToken: T): void
    unregister(object: object): void
  }
}
