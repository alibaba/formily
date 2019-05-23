import {
  Broadcast,
  each,
  reduce,
  isEqual,
  isFn,
  isStr,
  isArr,
  setIn,
  getIn,
  deleteIn,
  clone,
  isEmpty,
  toArr,
  publishFormState,
  raf,
  caf,
  isChildField,
  getSchemaNodeFromPath,
  BufferList,
  defer
} from './utils'
import { Field } from './field'
import { runValidation, format } from '@uform/validator'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/internal/operators/filter'
import { FormPath } from './path'

const defaults = opts => ({
  initialValues: {},
  onSubmit: values => {},
  effects: $ => {},
  ...opts
})

export class Form {
  constructor(opts) {
    this.options = defaults(opts)
    this.formbrd = new Broadcast()
    this.initialized = false
    this.state = {}
    this.fields = {}
    this.subscribes = opts.subscribes || {}
    this.updateQueue = []
    this.updateBuffer = new BufferList()
    this.editable = opts.editable
    this.schema = opts.schema || {}
    this.initialize(this.options.initialValues)
    this.initializeEffects()
    this.initialized = true
    this.destructed = false
    this.fieldSize = 0
  }

  initialize(values = this.state.initialValues) {
    const lastValues = this.state.values
    const lastDirty = this.state.dirty
    this.state = {
      valid: true,
      invalid: false,
      errors: [],
      pristine: true,
      initialValues: clone(values) || {},
      values: clone(values) || {},
      dirty:
        lastDirty || (this.initialized ? !isEqual(values, lastValues) : false)
    }
    if (this.options.onFormChange && !this.initialized) {
      this.subscribe(this.options.onFormChange)
      this.options.onFormChange({
        formState: this.publishState()
      })
    }
    this.updateFieldsValue(false)
  }

  changeValues(values) {
    const lastValues = this.state.values
    const lastDirty = this.state.dirty
    this.state.values = values || {}
    this.state.dirty =
      lastDirty || (this.initialized ? !isEqual(values, lastValues) : false)
    this.updateFieldsValue()
  }

  changeEditable(editable) {
    this.editable = editable
    each(this.fields, (field, name) => {
      field.changeEditable(editable)
    })
  }

  initializeEffects() {
    const { effects } = this.options
    if (isFn(effects)) {
      effects(
        (eventName, $filter) => {
          if (!this.subscribes[eventName]) {
            this.subscribes[eventName] = new Subject()
          }
          if (isStr($filter) || isFn($filter)) {
            return this.subscribes[eventName].pipe(
              filter(isStr($filter) ? FormPath.match($filter) : $filter)
            )
          }
          return this.subscribes[eventName]
        },
        {
          setFieldState: this.setFieldState,
          getFieldState: this.getFieldState,
          getFormState: this.getFormState,
          setFormState: this.setFormState
        }
      )
    }
  }

  triggerEffect = (eventName, ...args) => {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].next(...args)
    }
  }

  setFieldState = (path, buffer, callback) => {
    if (this.destructed) return
    if (isFn(buffer)) {
      callback = buffer
      buffer = false
    }
    return new Promise(resolve => {
      if (isStr(path) || isArr(path) || isFn(path)) {
        this.updateQueue.push({ path, callback, resolve })
      }
      if (this.syncUpdateMode) {
        this.updateFieldStateFromQueue(buffer)
        return resolve()
      }
      if (this.updateQueue.length > 0) {
        if (this.updateRafId) caf(this.updateRafId)
        this.updateRafId = raf(() => {
          if (this.destructed) return
          this.updateFieldStateFromQueue(buffer)
        })
      }
    })
  }

  getFieldState = (path, callback) => {
    let field
    each(this.fields, _field => {
      if (_field.pathEqual(path)) {
        field = _field
        return false
      }
    })
    if (field) {
      return isFn(callback)
        ? callback(field.publishState())
        : field.publishState()
    }
  }

  getFormState = callback => {
    return isFn(callback) ? callback(this.publishState()) : this.publishState()
  }

  setFormState = reducer => {
    if (!isFn(reducer)) return
    const published = this.publishState()
    reducer(published, reducer)
    return Promise.resolve(this.checkState(published))
  }

  checkState(published) {
    if (!isEqual(this.state.values, published.values)) {
      this.state.values = published.values
      this.state.dirty = true
      return this.updateFieldsValue()
    }
    if (!isEqual(this.state.initialValues, published.initialValues)) {
      this.state.initialValues = published.initialValues
      this.state.dirty = true
      return this.updateFieldInitialValue()
    }
  }

  syncUpdate(fn) {
    if (isFn(fn)) {
      this.syncUpdateMode = true
      fn()
      this.syncUpdateMode = false
    }
  }

  asyncUpdate(fn) {
    if (isFn(fn)) {
      if (this.syncUpdateMode) {
        this.syncUpdateMode = false
        fn()
        this.syncUpdateMode = true
      } else {
        fn()
      }
    }
  }

  updateFieldStateFromQueue(buffer) {
    const failed = {}
    const rafIdMap = {}
    each(this.updateQueue, ({ path, callback, resolve }, i) => {
      each(this.fields, field => {
        if (path && (isFn(path) || isArr(path) || isStr(path))) {
          if (isFn(path) ? path(field) : field.pathEqual(path)) {
            field.updateState(callback)
            if (this.syncUpdateMode) {
              field.dirty = false
            }
            if (path.hasWildcard) {
              this.updateBuffer.push(path.string, callback, { path, resolve })
            }
            if (field.dirty) {
              const dirtyType = field.dirtyType
              if (rafIdMap[field.name]) caf(rafIdMap[field.name])
              rafIdMap[field.name] = raf(() => {
                if (dirtyType.value) {
                  this.internalValidate().then(() => {
                    this.formNotify(field.publishState())
                  })
                } else {
                  field.notify()
                  this.formNotify(field.publishState())
                }
              })
            }
            if (resolve && isFn(resolve)) {
              resolve()
            }
          } else {
            failed[i] = failed[i] || 0
            failed[i]++
            if (this.fieldSize <= failed[i] && (buffer || path.hasWildcard)) {
              if (isStr(path)) {
                this.updateBuffer.push(path, callback, { path, resolve })
              } else if (isFn(path) && path.hasWildcard) {
                this.updateBuffer.push(path.string, callback, { path, resolve })
              }
            }
          }
        }
      })
    })
    this.updateQueue = []
  }

  updateFieldStateFromBuffer(field) {
    const rafIdMap = {}
    this.updateBuffer.forEach(({ path, values, key, resolve }) => {
      if (isFn(path) ? path(field) : field.pathEqual(path)) {
        values.forEach(callback => field.updateState(callback))
        if (this.syncUpdateMode) {
          field.dirty = false
        }
        if (field.dirty) {
          const dirtyType = field.dirtyType
          if (rafIdMap[field.name]) caf(rafIdMap[field.name])
          rafIdMap[field.name] = raf(() => {
            if (dirtyType.value) {
              this.internalValidate().then(() => {
                this.formNotify(field.publishState())
              })
            } else {
              field.notify()
              this.formNotify(field.publishState())
            }
          })
        }
        if (!path.hasWildcard) {
          this.updateBuffer.remove(key)
        }
        if (resolve && isFn(resolve)) {
          resolve()
        }
      }
    })
  }

  internalValidate(values = this.state.values, forceUpdate) {
    if (this.destructed) return
    return new Promise(resolve => {
      if (this.rafValidateId) caf(this.rafValidateId)
      this.rafValidateId = raf(() => {
        if (this.destructed) return resolve()
        return runValidation(
          values || this.state.values,
          this.fields,
          forceUpdate
        )
          .then(response => {
            const lastValid = this.state.valid
            let _errors = reduce(
              response,
              (buf, { name, errors }) => {
                if (!errors.length) return buf
                return buf.concat({ name, errors })
              },
              []
            )
            this.state.valid = _errors.length === 0
            this.state.invalid = !this.state.valid
            this.state.errors = _errors
            if (this.state.valid !== lastValid) {
              this.state.dirty = true
            }
            const lastPristine = this.state.pristine
            if (!isEqual(this.state.values, this.state.initialValues)) {
              this.state.pristine = false
            } else {
              this.state.pristine = true
            }
            if (lastPristine !== this.state.pristine) {
              this.state.dirty = true
            }
            return response
          })
          .then(resolve)
      })
    })
  }

  registerField(name, options) {
    const value = this.getValue(name)
    const initialValue = this.getInitialValue(name, options.path)
    const field = this.fields[name]
    if (field) {
      field.initialize({
        ...options,
        value: !isEmpty(value) ? value : initialValue,
        initialValue: initialValue
      })
      this.asyncUpdate(() => {
        this.updateFieldStateFromBuffer(field)
      })
      this.triggerEffect('onFieldChange', field.publishState())
    } else {
      this.fields[name] = new Field(this, {
        name,
        value: !isEmpty(value) ? value : initialValue,
        path: options.path,
        initialValue: initialValue,
        props: options.props
      })
      let field = this.fields[name]
      if (options.onChange) {
        this.asyncUpdate(() => {
          this.updateFieldStateFromBuffer(field)
          field.onChange(options.onChange)
        })
        this.triggerEffect('onFieldChange', field.publishState())
      }
      this.fieldSize++
    }
    return this.fields[name]
  }

  setIn(name, value) {
    setIn(this.state.values, name, value)
  }

  setInitialValueIn(name, value) {
    setIn(this.state.initialValues, name, value)
  }

  setValue(name, value) {
    const field = this.fields[name]
    if (field) {
      field.updateState(state => {
        state.value = value
      })
      field.pristine = false
      if (field.dirty) {
        field.notify()
        this.internalValidate(this.state.values).then(() => {
          this.formNotify(field.publishState())
        })
      }
    }
  }

  setErrors(name, errors, ...args) {
    errors = toArr(errors)
    const field = this.fields[name]
    if (field) {
      const lastErrors = field.errors
      if (!isEqual(lastErrors, errors)) {
        field.errors = errors.map(msg => format(msg, ...args))
        if (errors.length) {
          field.invalid = true
          field.valid = false
        } else {
          field.invalid = false
          field.valid = true
        }
        field.dirty = true
        field.notify()
      }
    }
  }

  updateChildrenValue(parent) {
    if (!parent.path || this.batchUpdateField) return
    each(this.fields, (field, $name) => {
      if (isChildField(field, parent)) {
        let newValue = this.getValue($name)
        if (!isEqual(field.value, newValue)) {
          field.dirty = true
          field.value = newValue
          field.notify()
          this.triggerEffect('onFieldChange', field.publishState())
        }
      }
    })
  }

  updateChildrenInitalValue(parent) {
    if (!parent.path) return
    each(this.fields, (field, $name) => {
      if (isChildField(field, parent)) {
        let newValue = this.getInitialValue($name)
        if (!isEqual(field.initialValue, newValue)) {
          field.dirty = true
          field.initialValue = newValue
        }
      }
    })
  }

  updateFieldInitialValue() {
    if (this.state.dirty && this.initialized) {
      each(this.fields, (field, name) => {
        let newValue = this.getInitialValue(name)
        field.initialValue = newValue
      })
    }
  }

  updateFieldsValue(validate = true) {
    const { promise, resolve } = defer()
    const update = () => {
      const updateList = []
      this.batchUpdateField = true
      each(this.fields, (field, name) => {
        let newValue = this.getValue(name)
        field.updateState(state => {
          state.value = newValue
        })
        if (field.dirty) {
          updateList.push(
            new Promise(resolve => {
              raf(() => {
                if (this.destructed) return
                field.notify()
                this.triggerEffect('onFieldChange', field.publishState())
                resolve()
              })
            })
          )
        }
      })
      this.batchUpdateField = false
      resolve(Promise.all(updateList))
    }
    if (this.state.dirty && this.initialized) {
      if (validate) {
        this.internalValidate(this.state.values, true).then(() => {
          this.formNotify()
          update()
        })
      } else {
        update()
      }
    }

    return promise
  }

  updateChildrenVisible(parent, visible) {
    if (!parent.path) return
    each(this.fields, (field, $name) => {
      if ($name === parent.name) return
      if (isChildField(field, parent)) {
        if (!visible) this.deleteIn($name)
        else {
          let value =
            field.value !== undefined ? field.value : clone(field.initialValue)
          if (field.value !== undefined) this.setIn($name, value)
        }
        if (field.visible !== visible) {
          field.visible = visible
          field.dirty = true
        }
      }
    })
  }

  getInitialValue(name, path) {
    const initialValue = getIn(this.state.initialValues, name)
    let schema, schemaDefault
    if (initialValue === undefined) {
      schema = path ? getSchemaNodeFromPath(this.schema, path) : undefined
      schemaDefault = schema && schema.default
      if (schemaDefault !== undefined) {
        this.setIn(name, schemaDefault)
      }
    }
    return initialValue !== undefined ? initialValue : schemaDefault
  }

  getValue(name, copy) {
    return copy
      ? clone(getIn(this.state.values, name))
      : getIn(this.state.values, name)
  }

  deleteIn(name) {
    deleteIn(this.state.values, name)
  }

  deleteInitialValues(name) {
    deleteIn(this.state.initialValues, name)
  }

  reset(forceClear) {
    each(this.fields, (field, name) => {
      const value = this.getValue(name)
      const initialValue = this.getInitialValue(name, field.path)
      if (isEmpty(value) && isEmpty(initialValue)) return
      field.updateState(state => {
        state.value = forceClear ? undefined : initialValue
      })
      if (field.dirty) {
        raf(() => {
          if (this.destructed) return
          field.notify()
        })
      }
    })
    this.internalValidate(this.state.values, true).then(() => {
      this.formNotify()
      raf(() => {
        const formState = this.publishState()
        this.triggerEffect('onFormReset', formState)
        if (isFn(this.options.onReset)) {
          this.options.onReset({ formState })
        }
      })
    })
  }

  publishState() {
    return publishFormState(this.state)
  }

  formNotify(fieldState) {
    const formState = this.publishState()
    if (isFn(this.options.onFieldChange)) {
      this.options.onFieldChange({ formState, fieldState })
    }
    if (fieldState) this.triggerEffect('onFieldChange', fieldState)
    if (this.state.dirty) {
      this.formbrd.notify({ formState, fieldState })
    }
    this.state.dirty = false
    return formState
  }

  validate() {
    return this.internalValidate(this.state.values, true).then(() => {
      return new Promise((resolve, reject) => {
        this.formNotify()
        raf(() => {
          if (this.state.valid) {
            resolve(this.publishState())
          } else {
            if (this.options.onValidateFailed) {
              this.options.onValidateFailed(this.state.errors)
            }
            reject(this.state.errors)
          }
        })
      })
    })
  }

  submit() {
    return this.validate().then(formState => {
      this.triggerEffect('onFormSubmit', formState)
      if (isFn(this.options.onSubmit)) {
        this.options.onSubmit({ formState })
      }
      return formState
    })
  }

  subscribe(callback) {
    return this.formbrd.subscribe(callback)
  }

  destructor() {
    if (this.destructed) return
    this.destructed = true
    this.formbrd.unsubscribe()
    each(this.subscribes, effect => {
      effect.unsubscribe()
    })
    each(this.fields, (field, key) => {
      field.destructor()
      delete this.fields[key]
    })
    this.fieldSize = 0
    delete this.fields
    delete this.formbrd
  }
}
