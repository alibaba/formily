function globalThis() {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  return Function('return this')()
}
export const globalThisPolyfill = globalThis()
