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
  componentType: true,
  componentProps: true,
  decoratorType: true,
  decoratorProps: true,
}

export const ReadOnlyProperties = {
  address: true,
  path: true,
  valid: true,
  invalid: true,
  selfValid: true,
  selfInvalid: true,
  errors: true,
  successes: true,
  warnings: true,
  validateStatus: true,
}

const SELF_DISPLAY = 'selfDisplay'
const SELF_PATTERN = 'selfPattern'

export const MutuallyExclusiveProperties = {
  pattern: SELF_PATTERN,
  editable: SELF_PATTERN,
  readOnly: SELF_PATTERN,
  readPretty: SELF_PATTERN,
  disabled: SELF_PATTERN,
  display: SELF_DISPLAY,
  hidden: SELF_DISPLAY,
  visible: SELF_DISPLAY,
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
