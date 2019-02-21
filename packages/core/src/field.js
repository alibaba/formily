import {
  Broadcast,
  publishFieldState,
  isEqual,
  clone,
  isFn,
  toArr,
  isStr,
  hasRequired,
  resolveFieldPath
} from './utils'
import produce, { setAutoFreeze } from 'immer'

const filterSchema = (_, key) => key !== 'properties' && key !== 'items'

setAutoFreeze(false)

const isValid = val => val !== undefined

export class Field {
  constructor(context, options) {
    this.fieldbrd = new Broadcast()
    this.context = context
    this.dirty = false
    this.pristine = true
    this.valid = true
    this.invalid = false
    this.visible = true
    this.destructed = false
    this.loading = false
    this.errors = []
    this.effectErrors = []
    this.initialized = false
    this.initialize(options)
    this.initialized = true
  }

  initialize(options) {
    if (this.initialized) {
      this.value = options.value
      if (isValid(options.initialValue)) {
        this.initialValue = clone(options.initialValue)
      }
    } else {
      this.value = options.value
      this.initialValue = options.initialValue
    }
    this.name = isValid(options.name) ? options.name : this.name
    this.namePath = resolveFieldPath(this.name)
    this.editable = this.getEditable(options.editable)
    this.path = resolveFieldPath(
      isValid(options.path) ? options.path : this.path
    )
    this.rules = isValid(options.rules) ? clone(options.rules) : this.rules
    this.required = hasRequired(this.rules)

    this.props = clone(
      isValid(options.props) ? options.props : this.props,
      filterSchema
    )

    if (isFn(options.onChange)) {
      this.onChange(options.onChange)
    }
  }

  getEditable(editable) {
    if (isFn(editable)) return editable(this.name)
    return editable
  }

  onChange(fn) {
    if (isFn(fn)) {
      if (this.unSubscribeOnChange) this.unSubscribeOnChange()
      fn(this.publishState())
      this.unSubscribeOnChange = this.subscribe(fn)
    }
  }

  pathEqual(path) {
    if (isStr(path)) {
      if (path === this.name) return true
    }

    path = resolveFieldPath(path)

    if (path.length === this.path.length) {
      for (let i = 0; i < path.length; i++) {
        if (path[i] !== this.path[i]) return false
      }
      return true
    } else if (path.length === this.namePath.length) {
      for (let i = 0; i < path.length; i++) {
        if (path[i] !== this.namePath[i]) return false
      }
      return true
    }

    return false
  }

  publishState() {
    return publishFieldState(this)
  }

  subscribe(callback) {
    return this.fieldbrd.subscribe(callback)
  }

  notify(force) {
    if (!this.dirty && !force) return
    this.fieldbrd.notify(this.publishState())
    this.dirty = false
    this.dirtyType = ''
  }

  unsubscribe() {
    this.fieldbrd.unsubscribe()
  }

  changeEditable(editable) {
    editable = this.getEditable(editable)
    if (editable !== undefined && this.editable !== editable) {
      this.editable = editable
      this.dirty = true
      this.notify()
    }
  }

  changeRules(rules) {
    let lastRules = this.rules
    if (!isEqual(lastRules, rules)) {
      this.rules = clone(rules)
      this.dirty = true
      this.notify()
    }
  }

  changeProps(props, force) {
    let lastProps = this.props
    if (force || !isEqual(lastProps, props, filterSchema)) {
      this.props = clone(props, filterSchema)
      this.dirty = true
      this.notify()
    }
  }

  changeValue(value) {
    this.context.setValue(this.name, value)
  }

  setInitalValue() {
    const lastValue = this.context.getValue(this.name)
    if (
      this.initialValue !== undefined &&
      !isEqual(lastValue, this.initialValue)
    ) {
      const initialValue = clone(this.initialValue)
      this.context.setIn(this.name, initialValue)
      this.value = initialValue
    }
  }

  removeValue() {
    this.value = undefined
    if (!this.context) return
    this.context.deleteIn(this.name)
    if (typeof this.value === 'object') {
      this.context.updateChildrenVisible(this, false)
    }
  }

  resetValue() {
    if (this.initialValue !== undefined) {
      const lastValue = this.value
      if (!isEqual(lastValue, this.initialValue)) {
        this.value = clone(this.initialValue)
        this.context.setIn(this.name, this.value)
        this.dirty = true
      }
    }
  }

  checkState(published = this.publishState()) {
    if (!isEqual(published.value, this.value)) {
      this.value = published.value
      this.pristine = false
      this.context.setIn(this.name, this.value)
      this.context.updateChildrenValue(this)
      this.dirtyType = 'value'
      this.dirty = true
    }

    if (!isEqual(published.initialValue, this.initialValue)) {
      this.initialValue = published.initialValue
      this.context.setInitialValueIn(this.name, this.value)
      this.context.updateChildrenInitalValue(this)
      this.dirtyType = 'initialValue'
      this.dirty = true
    }

    const editable = this.getEditable(published.editable)
    if (!isEqual(editable, this.editable)) {
      this.editable = editable
      this.dirtyType = 'editable'
      this.dirty = true
    }

    published.errors = toArr(published.errors).filter(v => !!v)

    if (!isEqual(published.errors, this.effectErrors)) {
      this.effectErrors = published.errors
      this.valid = this.effectErrors.length > 0 && this.errors.length > 0
      this.invalid = !this.valid
      this.dirtyType = 'errors'
      this.dirty = true
    }

    if (!isEqual(published.rules, this.rules)) {
      this.rules = published.rules
      this.errors = []
      this.valid = true
      this.invalid = false
      this.dirtyType = 'rules'
      this.dirty = true
    }

    if (!isEqual(published.required, this.required)) {
      this.required = published.required
      if (this.required) {
        if (!hasRequired(this.rules)) {
          this.rules = toArr(this.rules).concat({
            required: true
          })
        }
      } else {
        this.rules = toArr(this.rules).filter(rule => {
          if (rule && rule.required) return false
          return true
        })
      }
      this.dirty = true
    }

    if (published.loading !== this.loading) {
      this.loading = published.loading
      this.dirtyType = 'loading'
      this.dirty = true
    }

    if (!isEqual(published.visible, this.visible)) {
      this.visible = published.visible
      if (this.visible) {
        this.value =
          this.value !== undefined ? this.value : clone(this.initialValue)
        if (this.value !== undefined) this.context.setIn(this.name, this.value)
        this.context.updateChildrenVisible(this, true)
      } else {
        this.context.deleteIn(this.name)
        this.context.updateChildrenVisible(this, false)
      }
      this.dirtyType = 'visible'
      this.dirty = true
    }

    if (!isEqual(published.props, this.props, filterSchema)) {
      this.props = clone(published.props, filterSchema)
      this.dirtyType = 'props'
      this.dirty = true
    }
  }

  updateState(reducer) {
    if (!isFn(reducer)) return
    const published = produce(
      {
        name: this.name,
        path: this.path,
        props: clone(this.props, filterSchema),
        value: clone(this.value),
        initialValue: clone(this.initialValue),
        valid: this.valid,
        loading: this.loading,
        invalid: this.invalid,
        pristine: this.pristine,
        rules: clone(this.rules),
        errors: clone(this.effectErrors),
        visible: this.visible,
        required: this.required
      },
      reducer
    )
    this.checkState(published)
  }

  destructor() {
    if (this.destructed) return
    this.destructed = true
    if (this.value !== undefined) {
      this.value = undefined
      this.context.deleteIn(this.name)
    }
    this.context.updateChildrenVisible(this, false)
    delete this.context
    this.unsubscribe()
    delete this.fieldbrd
  }
}
