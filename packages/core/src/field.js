import {
  Broadcast,
  publishFieldState,
  isEqual,
  clone,
  isFn,
  isBool,
  toArr,
  isStr,
  hasRequired,
  resolveFieldPath,
  isEmpty
} from './utils'

const filterSchema = (_, key) => key !== 'properties' && key !== 'items'

export class Field {
  constructor(context, options) {
    this.fieldbrd = new Broadcast()
    this.context = context
    this.dirty = false
    this.pristine = true
    this.valid = true
    this.removed = false
    this.invalid = false
    this.visible = true
    this.editable = true
    this.destructed = false
    this.loading = false
    this.errors = []
    this.props = {}
    this.effectErrors = []
    this.initialized = false
    this.initialize(options)
    this.initialized = true
  }

  initialize(options) {
    const rules = this.getRulesFromProps(options.props)
    this.value = !isEmpty(options.value) ? clone(options.value) : this.value
    this.name = !isEmpty(options.name) ? options.name : this.name || ''
    this.namePath = resolveFieldPath(this.name)

    this.path = resolveFieldPath(
      !isEmpty(options.path) ? options.path : this.path || []
    )
    this.rules = !isEmpty(rules) ? rules : this.rules
    this.required = hasRequired(this.rules)

    if (isEmpty(options.props)) {
      this.initialValue = !isEmpty(options.initialValue)
        ? options.initialValue
        : this.initialValue
    } else {
      this.initialValue = !isEmpty(options.initialValue)
        ? options.initialValue
        : !isEmpty(this.initialValue)
          ? this.initialValue
          : this.getInitialValueFromProps(options.props)
      this.props = !isEmpty(this.props)
        ? { ...this.props, ...clone(options.props) }
        : clone(options.props)
      const editable = this.getEditableFromProps(options.props)
      this.editable = !isEmpty(editable) ? editable : this.getContextEditable()
    }

    if (!this.initialized) {
      if (isEmpty(this.value) && !isEmpty(this.initialValue)) {
        this.value = clone(this.initialValue)
        this.context.setIn(this.name, this.value)
        this.context.setInitialValueIn(this.name, this.initialValue)
      }
    }

    if (this.removed) {
      this.removed = false
      this.visible = true
      this.context.triggerEffect('onFieldChange', this.publishState())
    }

    if (isFn(options.onChange)) {
      this.onChange(options.onChange)
    }
  }

  getInitialValueFromProps(props) {
    if (props) {
      if (!isEmpty(props['default'])) {
        return props['default']
      }
    }
  }

  getContextEditable() {
    return this.getEditable(this.context.editable)
  }

  getEditableFromProps(props) {
    if (props) {
      if (!isEmpty(props.editable)) {
        return this.getEditable(props.editable)
      } else {
        if (props['x-props'] && !isEmpty(props['x-props'].editable)) {
          return this.getEditable(props['x-props'].editable)
        }
      }
    }
  }

  getRulesFromProps(props) {
    if (props) {
      const rules = toArr(props['x-rules'])
      if (props.required && !rules.some(rule => rule.required)) {
        rules.push({ required: true })
      }
      return clone(rules)
    }
    return this.rules
  }

  getRequiredFromProps(props) {
    if (!isEmpty(props.required)) return props.required
  }

  getEditable(editable) {
    if (isFn(editable)) return editable(this.name)
    if (isBool(editable)) return editable
    return this.editable
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

  changeProps(props, force) {
    let lastProps = this.props
    if (isEmpty(props)) return
    if (force || !isEqual(lastProps, props, filterSchema)) {
      this.props = clone(props, filterSchema)
      this.editable = this.getEditableFromProps(this.props)
      this.rules = this.getRulesFromProps(this.props)
      this.dirty = true
      this.notify()
    }
  }

  changeEditable(editable) {
    if (!this.props || !isEmpty(this.props.editable)) return
    if (this.props['x-props'] && !isEmpty(this.props['x-props'].editable)) {
      return
    }
    this.editable = this.getEditable(editable)
    this.dirty = true
    this.notify()
  }

  mount() {
    if (this.removed) {
      this.visible = true
      this.removed = false
      this.context.triggerEffect('onFieldChange', this.publishState())
    }
  }

  unmount() {
    this.visible = false
    this.removed = true
    if (!this.context) return
    this.context.deleteIn(this.name)
    if (typeof this.value === 'object') {
      this.context.updateChildrenVisible(this, false)
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
    } else {
      const prevEditable = this.getEditableFromProps(this.props)
      const propsEditable = this.getEditableFromProps(published.props)
      if (
        !isEmpty(propsEditable) &&
        !isEqual(propsEditable, this.editable) &&
        !isEqual(prevEditable, propsEditable)
      ) {
        this.editable = propsEditable
        this.dirtyType = 'editable'
        this.dirty = true
      }
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
      if (hasRequired(this.rules)) {
        this.required = true
        published.required = true
      }
      this.invalid = false
      this.dirtyType = 'rules'
      this.dirty = true
    } else {
      const prePropsRules = this.getRulesFromProps(this.props)
      const propsRules = this.getRulesFromProps(published.props)
      if (
        !isEmpty(propsRules) &&
        !isEqual(prePropsRules, propsRules) &&
        !isEqual(propsRules, this.rules)
      ) {
        this.rules = propsRules
        this.errors = []
        if (hasRequired(this.rules)) {
          this.required = true
          published.required = true
        }
        this.valid = true
        this.invalid = false
        this.dirtyType = 'rules'
        this.dirty = true
      }
    }
    if (!isEqual(published.required, this.required)) {
      this.required = published.required
      if (this.required) {
        if (!hasRequired(this.rules)) {
          this.rules = toArr(this.rules).concat({
            required: true
          })
          this.errors = []
          this.valid = true
          this.invalid = false
        }
      } else {
        this.rules = toArr(this.rules).filter(rule => {
          if (rule && rule.required) return false
          return true
        })
        this.errors = []
        this.valid = true
        this.invalid = false
      }
      this.dirty = true
    } else {
      const propsRequired = this.getRequiredFromProps(published.props)
      if (!isEmpty(propsRequired) && !isEqual(propsRequired, this.required)) {
        this.required = propsRequired
        this.errors = []
        if (this.required) {
          if (!hasRequired(this.rules)) {
            this.rules = toArr(this.rules).concat({
              required: true
            })
            this.errors = []
            this.valid = true
            this.invalid = false
          }
        } else {
          this.rules = toArr(this.rules).filter(rule => {
            if (rule && rule.required) return false
            return true
          })
          this.errors = []
          this.valid = true
          this.invalid = false
        }
        this.dirty = true
      }
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
    if (this.removed) return
    const published = {
      name: this.name,
      path: this.path,
      props: clone(this.props, filterSchema),
      value: clone(this.value),
      initialValue: clone(this.initialValue),
      valid: this.valid,
      loading: this.loading,
      editable: this.editable,
      invalid: this.invalid,
      pristine: this.pristine,
      rules: clone(this.rules),
      errors: clone(this.effectErrors),
      visible: this.visible,
      required: this.required
    }
    reducer(published)
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
