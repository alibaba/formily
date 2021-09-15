export const ReservedProperties = new Set([
  'form',
  'parent',
  'props',
  'caches',
  'requests',
  'disposers',
  'heart',
  'graph',
  'indexes',
  'fields',
  'lifecycles',
  'originValues',
  'componentType',
  'componentProps',
  'decoratorType',
  'decoratorProps',
])

export const RESPONSE_REQUEST_DURATION = 100

export const GlobalState = {
  initializing: false,
  lifecycles: [],
  context: [],
  effectStart: false,
  effectEnd: false,
}

export const NumberIndexReg = /^\.(\d+)/
