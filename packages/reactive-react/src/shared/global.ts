/* istanbul ignore next */
function globalSelf() {
  try {
    if (typeof self !== 'undefined') {
      return self
    }
  } catch (e) {}
  try {
    if (typeof window !== 'undefined') {
      return window
    }
  } catch (e) {}
  try {
    if (typeof global !== 'undefined') {
      return global
    }
  } catch (e) {}
  return Function('return this')()
}

export const globalThisPolyfill: Window = globalSelf()
