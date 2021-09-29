export const ReservedProperties = {
  form: true,
  parent: true,
  props: true,
  caches: true,
  requests: true,
  disposers: true,
  heart: true,
  graph: true,
  indexes: true,
  fields: true,
  lifecycles: true,
  originValues: true,
  componentType: true,
  componentProps: true,
  decoratorType: true,
  decoratorProps: true,
}

export const RESPONSE_REQUEST_DURATION = 100

export const GlobalState = {
  lifecycles: [],
  context: [],
  effectStart: false,
  effectEnd: false,
  initializing: false,
}

export const NumberIndexReg = /^\.(\d+)/
