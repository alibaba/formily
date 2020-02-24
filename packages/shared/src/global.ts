// reference https://mathiasbynens.be/notes/globalthis
;(function(Object) {
  if (typeof globalThis === 'object') return
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function() {
      return this
    },
    configurable: true // This makes it possible to `delete` the getter later.
  })
  __magic__.globalThis = __magic__ // lolwat
  delete Object.prototype.__magic__
})(Object)
export const globalThisPolyfill = globalThis
