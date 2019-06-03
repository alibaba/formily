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
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged'
import { FormPath } from './path'
import { IFormOptions, IFieldOptions, IFieldState, IFormPathMatcher, IFormState, ISchema, Path, IFieldMap, ISubscribers } from '@uform/types'

type Editable = boolean | ((name: string) => boolean)

const defaults = <T>(opts: T): T => ({
  initialValues: {},
  onSubmit: (values: any) => { },
  effects: ($: any) => { },
  ...opts
} as T)

export class Form {

  public editable: Editable

  private options: IFormOptions

  private publisher: Broadcast<any, any, any>

  private state: IFormState

  private fields: IFieldMap

  private subscribes: ISubscribers

  private updateQueue: any[]

  private updateBuffer: BufferList

  private schema: ISchema

  private initialized: boolean

  private destructed: boolean

  private fieldSize: number

  private syncUpdateMode: boolean

  private updateRafId: any

  private rafValidateId: any

  private batchUpdateField: boolean

  constructor(opts: IFormOptions) {
    this.options = defaults<IFormOptions>(opts)
    this.publisher = new Broadcast()
    this.initialized = false
    this.state = {} as IFormState
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


  public changeValues(values: any) {
    const lastValues = this.state.values
    const lastDirty = this.state.dirty
    this.state.values = values || {}
    this.state.dirty =
      lastDirty || (this.initialized ? !isEqual(values, lastValues) : false)
    this.updateFieldsValue()
  }

  public changeEditable(editable: Editable) {
    this.editable = editable
    each(this.fields, (field, name) => {
      field.changeEditable(editable)
    })
  }


  public setFieldState = (path: Path | IFormPathMatcher, buffer: boolean | (() => boolean), callback: (() => boolean)) => {
    if (this.destructed) { return }
    if (isFn(buffer)) {
      callback = buffer as (() => boolean)
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
        if (this.updateRafId !== undefined) { caf(this.updateRafId) }
        this.updateRafId = raf(() => {
          if (this.destructed) { return }
          this.updateFieldStateFromQueue(buffer)
        })
      }
    })
  }

  public getFieldState = (path: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => any) => {
    let field
    each(this.fields, innerField => {
      if (innerField.match(path)) {
        field = innerField
        return false
      }
    })
    if (field) {
      return isFn(callback)
        ? callback(field.publishState())
        : field.publishState()
    }
  }

  public getFormState = (callback: any) => {
    return isFn(callback) ? callback(this.publishState()) : this.publishState()
  }

  public setFormState = (reducer: any): Promise<any> => {
    if (!isFn(reducer)) {
      return Promise.resolve()
    }
    const published = this.publishState()
    reducer(published, reducer)
    return Promise.resolve(this.checkState(published))
  }


  public registerField(name: string, options: IFieldOptions) {
    const value = this.getValue(name)
    const initialValue = this.getInitialValue(name, options.path)
    const field = this.fields[name]
    if (field) {
      field.initialize({
        ...options,
        value: !isEmpty(value) ? value : initialValue,
        initialValue
      } as IFieldOptions)
      this.asyncUpdate(() => {
        this.updateFieldStateFromBuffer(field)
      })
      this.triggerEffect('onFieldChange', field.publishState())
    } else {
      this.fields[name] = new Field(this, {
        name,
        value: !isEmpty(value) ? value : initialValue,
        path: options.path,
        initialValue,
        props: options.props
      })
      const field = this.fields[name]
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

  public setIn(name: string, value: any) {
    setIn(this.state.values, name, value)
  }

  public setInitialValueIn(name: string, value: any) {
    setIn(this.state.initialValues, name, value)
  }

  public setValue(name: string, value: any) {
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

  public setErrors(name: string, errors: string[] | string, ...args: string[]) {
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

  public updateChildrenValue(parent: Field) {
    if (!parent.path || this.batchUpdateField) { return }
    each(this.fields, (field, $name) => {
      if (isChildField(field, parent)) {
        const newValue = this.getValue($name)
        if (!isEqual(field.value, newValue)) {
          field.dirty = true
          field.value = newValue
          field.notify()
          this.triggerEffect('onFieldChange', field.publishState())
        }
      }
    })
  }

  public updateChildrenInitalValue(parent: Field) {
    if (!parent.path) { return }
    each(this.fields, (field, $name) => {
      if (isChildField(field, parent)) {
        const newValue = this.getInitialValue($name)
        if (!isEqual(field.initialValue, newValue)) {
          field.dirty = true
          field.initialValue = newValue
        }
      }
    })
  }

  public updateFieldInitialValue(): Promise<any> {
    if (this.state.dirty && this.initialized) {
      each(this.fields, (field, name) => {
        const newValue = this.getInitialValue(name)
        field.initialValue = newValue
      })
    }
    return Promise.resolve()
  }

  public updateFieldsValue(validate = true): Promise<any> {
    const { promise, resolve } = defer()
    const update = () => {
      const updateList = []
      this.batchUpdateField = true
      each(this.fields, (field, name) => {
        const newValue = this.getValue(name)
        field.updateState(state => {
          state.value = newValue
        })
        if (field.dirty) {
          updateList.push(
            new Promise(resolve => {
              raf(() => {
                if (this.destructed) { return }
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

  public updateChildrenVisible(parent: Field, visible?: boolean) {
    if (!parent.path) { return }
    each(this.fields, (field, $name) => {
      if ($name === parent.name) { return }
      if (isChildField(field, parent)) {
        if (!visible) { this.deleteIn($name) }
        else {
          const value =
            field.value !== undefined ? field.value : clone(field.initialValue)
          if (field.value !== undefined) { this.setIn($name, value) }
        }
        if (field.visible !== visible) {
          field.visible = visible
          field.dirty = true
        }
      }
    })
  }

  public getInitialValue(name: string, path?: Path) {
    const initialValue = getIn(this.state.initialValues, name)
    let schema: ISchema
    let schemaDefault: any
    if (initialValue === undefined) {
      schema = path ? getSchemaNodeFromPath(this.schema, path) : undefined
      schemaDefault = schema && schema.default
      if (schemaDefault !== undefined) {
        this.setIn(name, schemaDefault)
      }
    }
    return initialValue !== undefined ? initialValue : schemaDefault
  }

  public getValue(name: string, copy?: boolean) {
    return copy
      ? clone(getIn(this.state.values, name))
      : getIn(this.state.values, name)
  }

  public deleteIn(name: string) {
    deleteIn(this.state.values, name)
  }

  public deleteInitialValues(name: string) {
    deleteIn(this.state.initialValues, name)
  }

  public reset(forceClear) {
    each(this.fields, (field, name) => {
      const value = this.getValue(name)
      const initialValue = this.getInitialValue(name, field.path)
      if (isEmpty(value) && isEmpty(initialValue)) { return }
      field.updateState(state => {
        state.value = forceClear ? undefined : initialValue
      })
      if (field.dirty) {
        raf(() => {
          if (this.destructed) { return }
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

  public publishState() {
    return publishFormState(this.state)
  }

  public formNotify(fieldState?: IFieldState) {
    const formState = this.publishState()
    if (isFn(this.options.onFieldChange)) {
      this.options.onFieldChange({ formState, fieldState })
    }
    if (fieldState) { this.triggerEffect('onFieldChange', fieldState) }
    if (this.state.dirty) {
      this.publisher.notify({ formState, fieldState })
    }
    this.state.dirty = false
    return formState
  }

  public validate() {
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

  public submit() {
    return this.validate().then(formState => {
      this.triggerEffect('onFormSubmit', formState)
      if (isFn(this.options.onSubmit)) {
        this.options.onSubmit({ formState })
      }
      return formState
    })
  }

  public subscribe(callback: (payload: any) => void) {
    return this.publisher.subscribe(callback)
  }

  public destructor() {
    if (this.destructed) { return }
    this.destructed = true
    this.publisher.unsubscribe()
    each(this.subscribes, effect => {
      effect.unsubscribe()
    })
    each(this.fields, (field, key) => {
      field.destructor()
      delete this.fields[key]
    })
    this.fieldSize = 0
    delete this.fields
    delete this.publisher
  }

  public triggerEffect = (eventName: string, ...args: any[]) => {
    if (this.subscribes[eventName]) {
      this.subscribes[eventName].next(...args)
    }
  }


  public syncUpdate(fn: (() => void)) {
    if (isFn(fn)) {
      this.syncUpdateMode = true
      fn()
      this.syncUpdateMode = false
    }
  }


  private initialize(values = this.state.initialValues) {
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

  private initializeEffects() {
    const { effects } = this.options
    if (isFn(effects)) {
      effects(
        (eventName: string, eventFilter: string | IFormPathMatcher) => {
          if (!this.subscribes[eventName]) {
            this.subscribes[eventName] = new Subject()
          }
          this.subscribes[eventName] = this.subscribes[eventName].pipe(
            distinctUntilChanged(isEqual)
          ) as Subject<any>
          if (isStr(eventFilter) || isFn(eventFilter)) {
            return this.subscribes[eventName].pipe(
              filter(isStr(eventFilter) ? FormPath.match(eventFilter) : eventFilter)
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

  private checkState(published): Promise<any> {
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

    return Promise.resolve()
  }

  private asyncUpdate(fn) {
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

  private updateFieldStateFromQueue(buffer) {
    const failed = {}
    const rafIdMap = {}
    each(this.updateQueue, ({ path, callback, resolve }, i) => {
      each(this.fields, field => {
        if (field.match(path)) {
          field.updateState(callback)
          if (this.syncUpdateMode) {
            field.dirty = false
          }
          if (path.hasWildcard) {
            this.updateBuffer.push(path.string, callback, { path, resolve })
          }
          if (field.dirty) {
            const dirtyType = field.dirtyType
            field.notify()
            if (rafIdMap[field.name]) { caf(rafIdMap[field.name]) }
            rafIdMap[field.name] = raf(() => {
              if (dirtyType === 'value') {
                this.internalValidate().then(() => {
                  this.formNotify(field.publishState())
                })
              } else {
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
          if (this.fieldSize <= failed[i] && (buffer || (path as IFormPathMatcher).hasWildcard)) {
            if (isStr(path)) {
              this.updateBuffer.push(path, callback, { path, resolve })
            } else if (isFn(path) && (path as IFormPathMatcher).hasWildcard) {
              this.updateBuffer.push((path as IFormPathMatcher).string, callback, { path, resolve })
            }
          }
        }

      })
    })
    this.updateQueue = []
  }

  private updateFieldStateFromBuffer(field) {
    const rafIdMap = {}
    this.updateBuffer.forEach(({ path, values, key, resolve }) => {
      if (field.match(path)) {
        values.forEach(callback => field.updateState(callback))
        if (this.syncUpdateMode) {
          field.dirty = false
        }
        if (field.dirty) {
          const dirtyType = field.dirtyType
          field.notify()
          if (rafIdMap[field.name]) { caf(rafIdMap[field.name]) }
          rafIdMap[field.name] = raf(() => {
            if (dirtyType === 'value') {
              this.internalValidate().then(() => {
                this.formNotify(field.publishState())
              })
            } else {
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

  private internalValidate(values: any = this.state.values, forceUpdate?: boolean) {
    if (this.destructed) { return }
    return new Promise(resolve => {
      if (this.rafValidateId) { caf(this.rafValidateId) }
      this.rafValidateId = raf(() => {
        if (this.destructed) { return resolve() }
        return runValidation(
          values || this.state.values,
          this.fields,
          forceUpdate
        )
          .then(response => {
            const lastValid = this.state.valid
            const _errors = reduce(
              response,
              (buf, { name, errors }) => {
                if (!errors.length) { return buf }
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
}
