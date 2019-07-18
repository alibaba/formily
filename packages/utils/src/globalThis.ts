export const globalThisPolyfill =
  self || window || global || Function('return this')()
