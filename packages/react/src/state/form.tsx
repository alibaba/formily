import React, { Component } from 'react'
import { connect } from 'react-eva'
import { createForm, Form } from '@uform/core'
import { IFormState } from '@uform/types'

import { createHOC, getSchemaNodeFromPath, isEqual, clone, isEmpty } from '../utils'
import { StateContext } from '../shared/context'
import { getFormFieldPropsTransformer } from '../shared/core'
import { FormBridge } from '../shared/broadcast'
import { StateFormProps } from '../type'

export const StateForm = createHOC((options, Form) => {
  class StateForm extends Component<StateFormProps, IFormState> {
    static displayName = 'StateForm'

    static defaultProps = {
      locale: {}
    }

    private timerId: number
    private unmounted: boolean
    private initialized: boolean
    private lastFormValues: IFormState
    private form: Form
    private unsubscribe: Function

    constructor(props) {
      super(props)
      this.initialized = false
      this.form = createForm({
        initialValues: props.defaultValue || props.initialValues,
        effects: props.effects,
        subscribes: props.subscribes,
        schema: props.schema,
        editable: props.editable,
        onSubmit: this.onSubmitHandler(props),
        onFormChange: this.onFormChangeHandler(props),
        onFieldChange: this.onFieldChangeHandler(props),
        onValidateFailed: this.onValidateFailed(props),
        onReset: this.onResetHandler(props),
        onFormWillInit: form => {
          props.implementActions({
            setFormState: form.setFormState,
            getFormState: form.getFormState,
            setFieldState: form.setFieldState,
            getFieldState: form.getFieldState,
            reset: this.reset,
            submit: this.submit,
            validate: this.validate,
            getSchema: this.getSchema,
            dispatch: this.dispatch
          })
        }
      })
      this.state = {} as IFormState
      this.initialized = true
    }

    notify(payload) {
      const { broadcast, schema } = this.props
      if (broadcast) {
        payload.schema = schema
        broadcast.notify(payload)
      }
    }

    onValidateFailed = $props => {
      return (...args) => {
        const props = this.props || $props
        if (props.onValidateFailed) {
          return props.onValidateFailed(...args)
        }
      }
    }

    onFormChangeHandler(props) {
      let lastState = this.state
      return ({ formState }) => {
        if (this.unmounted) return
        if (lastState && lastState.pristine !== formState.pristine) {
          if (lastState.pristine) {
            this.notify({
              type: 'changed',
              state: formState
            })
          } else {
            this.notify({
              type: 'reseted',
              state: formState
            })
          }
        }

        lastState = formState

        if (this.initialized) {
          if (formState.dirty) {
            clearTimeout(this.timerId)
            this.timerId = window.setTimeout(() => {
              clearTimeout(this.timerId)
              this.setState(formState)
            }, 60)
          }
        } else {
          this.state = formState
          this.notify({
            type: 'initialize',
            state: formState
          })
        }
      }
    }

    onFieldChangeHandler = $props => {
      return ({ formState }) => {
        const props = this.props || $props
        if (props.onChange) {
          const values = formState.values
          if (!isEqual(this.lastFormValues, values)) {
            props.onChange(values)
            this.lastFormValues = clone(values)
          }
        }
      }
    }

    getSchema = path => {
      const { schema } = this.props
      const result = getSchemaNodeFromPath(schema, path)
      const transformer =
        result && getFormFieldPropsTransformer(result['x-component'] || result['type'])
      return transformer ? transformer(result) : result
    }

    onSubmitHandler = $props => {
      return ({ formState }) => {
        const props = this.props || $props
        if (props.onSubmit) {
          const promise = props.onSubmit(clone(formState.values))
          if (promise && promise.then) {
            this.notify({
              type: 'submitting',
              state: this.state
            })
            promise.then(
              () => {
                this.notify({
                  type: 'submitted',
                  state: this.state
                })
              },
              error => {
                this.notify({
                  type: 'submitted',
                  state: this.state
                })
                throw error
              }
            )
          }
        }
      }
    }

    onResetHandler($props) {
      return ({ formState }) => {
        const props = this.props || $props
        if (props.onReset) {
          props.onReset(clone(formState.values))
        }
      }
    }

    shouldComponentUpdate(nextProps) {
      return !isEqual(nextProps, this.props)
    }

    componentDidUpdate(prevProps) {
      const { value, editable, initialValues } = this.props
      if (!isEmpty(value) && !isEqual(value, prevProps.value)) {
        this.form.changeValues(value)
      }
      if (!isEmpty(initialValues) && !isEqual(initialValues, prevProps.initialValues)) {
        this.form.initialize(initialValues)
      }
      if (!isEmpty(editable) && !isEqual(editable, prevProps.editable)) {
        this.form.changeEditable(editable)
      }
    }

    componentDidMount() {
      this.unmounted = false
      this.form.triggerEffect('onFormMount', this.form.publishState())
      this.unsubscribe = this.props.broadcast.subscribe(({ type, name, payload }) => {
        if (type === 'submit') {
          this.submit()
        } else if (type === 'reset') {
          this.reset()
        } else if (type === 'dispatch') {
          this.form.triggerEffect(name, payload)
        }
      })
    }

    componentWillUnmount() {
      this.unmounted = true
      if (this.form) {
        this.form.destructor()
        this.unsubscribe()
        delete this.form
      }
    }

    onNativeSubmitHandler = e => {
      if (e.preventDefault) {
        e.stopPropagation()
        e.preventDefault()
      }
      this.form.submit().catch(e => {
        if (console && console.error) {
          console.error(e)
        }
      })
    }

    getValues = () => {
      return this.form.getValue()
    }

    submit = () => {
      return this.form.submit()
    }

    reset = (forceClear?: boolean) => {
      this.form.reset(forceClear)
    }

    validate = () => {
      return this.form.validate()
    }

    dispatch = (type, payload) => {
      this.form.triggerEffect(type, payload)
    }

    render() {
      const {
        onSubmit,
        onChange,
        onReset,
        onValidateFailed,
        initialValues,
        defaultValue,
        effects,
        implementActions,
        dispatch,
        editable,
        subscribes,
        subscription,
        children,
        schema,
        broadcast,
        locale,
        value,
        ...others
      } = this.props

      return (
        <StateContext.Provider
          value={{
            locale,
            form: this.form,
            getSchema: this.getSchema,
            broadcast
          }}
        >
          <Form {...others} onSubmit={this.onNativeSubmitHandler}>
            {children}
          </Form>
        </StateContext.Provider>
      )
    }
  }

  return connect({ autoRun: false })(FormBridge()(StateForm))
})
