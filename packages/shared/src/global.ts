// reference https://mathiasbynens.be/notes/globalthis
// @ts-nocheck
;(function(Object) {
  if (typeof globalThis === 'object') return
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function() {
      return this
    },
    configurable: true
  })
  __magic__.globalThis = __magic__ 
  delete Object.prototype.__magic__
})(Object)
export const globalThisPolyfill = globalThis
