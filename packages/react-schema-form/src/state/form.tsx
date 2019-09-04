import React, { Component } from 'react'
import { connect } from 'react-eva'
import { createForm, Form } from '@uform/core'
import { IFormState, IFormActions } from '@uform/types'

import {
  createHOC,
  getSchemaNodeFromPath,
  isEqual,
  isObj,
  clone,
  isEmpty
} from '../utils'
import { StateContext } from '../shared/context'
import { getFormFieldPropsTransformer } from '../shared/core'
import { FormBridge } from '../shared/broadcast'
import { IStateFormProps } from '../type'

export const StateForm = createHOC((options, Form) => {
  class StateForm extends Component<IStateFormProps, IFormState> {
    public static displayName = 'StateForm'

    public static defaultProps = {
      locale: {}
    }

    private unmounted: boolean
    private initialized: boolean
    private lastFormValues: IFormState
    private formState: IFormState
    private form: Form
    private unsubscribe: () => void

    constructor(props) {
      super(props)
      this.initialized = false
      this.form = createForm({
        initialValues: props.defaultValue || props.initialValues,
        values: props.value,
        effects: props.effects,
        subscribes: props.subscribes,
        schema: props.schema,
        editable: props.editable,
        traverse: schema => {
          const traverse =
            schema &&
            getFormFieldPropsTransformer(schema['x-component'] || schema.type)
          return traverse ? traverse(schema) : schema
        },
        onSubmit: this.onSubmitHandler(props),
        onFormChange: this.onFormChangeHandler(props),
        onFieldChange: this.onFieldChangeHandler(props),
        onValidateFailed: this.onValidateFailed(props),
        onReset: this.onResetHandler(props),
        onFormWillInit: form => {
          props.implementActions(this.getActions(form))
        }
      })
      this.formState = {} as IFormState
      this.initialized = true
    }

    public getActions(form: Form): IFormActions {
      return {
        setFormState: form.setFormState,
        getFormState: form.getFormState,
        setFieldState: form.setFieldState,
        getFieldState: form.getFieldState,
        reset: this.reset,
        submit: this.submit,
        validate: this.validate,
        getSchema: this.getSchema,
        dispatch: this.dispatch
      }
    }

    public notify(payload) {
      const { broadcast, schema } = this.props
      if (broadcast) {
        payload.schema = schema
        broadcast.notify(payload)
      }
    }

    public onValidateFailed = $props => {
      return (...args) => {
        const props = this.props || $props
        if (props.onValidateFailed) {
          return props.onValidateFailed(...args)
        }
      }
    }

    public onFormChangeHandler(props) {
      let lastState = this.formState
      return ({ formState }) => {
        if (this.unmounted) {
          return
        }
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

        // eslint-disable-next-line react/no-direct-mutation-state
        this.formState = formState

        if (!this.initialized) {
          this.notify({
            type: 'initialize',
            state: formState
          })
        }
      }
    }

    public onFieldChangeHandler = $props => {
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

    public getSchema = path => {
      return getSchemaNodeFromPath(this.props.schema, path)
    }

    public onSubmitHandler = $props => {
      return ({ formState }) => {
        const props = this.props || $props
        if (props.onSubmit) {
          const promise = props.onSubmit(clone(formState.values))
          if (promise && promise.then) {
            this.notify({
              type: 'submitting',
              state: this.formState
            })
            promise.then(
              () => {
                this.notify({
                  type: 'submitted',
                  state: this.formState
                })
              },
              error => {
                this.notify({
                  type: 'submitted',
                  state: this.formState
                })
                throw error
              }
            )
          }
        }
      }
    }

    public onResetHandler($props) {
      return ({ formState }) => {
        const props = this.props || $props
        if (props.onReset) {
          props.onReset(clone(formState.values))
        }
      }
    }

    public componentDidUpdate(prevProps) {
      const { value, editable, initialValues } = this.props
      if (!isEmpty(value) && !isEqual(value, prevProps.value)) {
        this.form.changeValues(value)
      } else if (this.form.isDirtyValues(value)) {
        this.form.changeValues(value)
      }
      if (
        !isEmpty(initialValues) &&
        !isEqual(initialValues, prevProps.initialValues)
      ) {
        this.form.initialize({
          values: initialValues,
          initialValues
        })
      }
      if (!isEmpty(editable) && !isEqual(editable, prevProps.editable)) {
        this.form.changeEditable(editable)
      }
    }

    public componentDidMount() {
      this.unmounted = false
      this.form.dispatchEffect('onFormMount', this.form.publishState())

      this.unsubscribe = this.props.broadcast.subscribe(
        ({ type, name, payload }) => {
          if (this.unmounted) {
            return
          }
          if (type === 'submit') {
            this.submit()
          } else if (type === 'reset') {
            this.reset()
          } else if (type === 'dispatch') {
            this.form.dispatchEffect(name, payload)
          }
        }
      )
    }

    public componentWillUnmount() {
      this.unmounted = true
      if (this.form) {
        this.form.destructor()
        this.unsubscribe()
        delete this.form
      }
    }

    public onNativeSubmitHandler = e => {
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

    public getValues = () => {
      return this.form.getValue()
    }

    public submit = () => {
      return this.form.submit()
    }

    public reset = (
      params?: boolean | { forceClear?: boolean; validate?: boolean },
      validate: boolean = true
    ) => {
      let forceClear: boolean
      if (isObj(params)) {
        forceClear = !!params.forceClear
        validate = !isEmpty(params.validate) ? params.validate : validate
      }
      this.form.reset(forceClear, validate)
    }

    public validate = () => {
      return this.form.validate()
    }

    public dispatch = (type, payload) => {
      this.form.dispatchEffect(type, payload)
    }

    public render() {
      /* eslint-disable @typescript-eslint/no-unused-vars */
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
      /* eslint-enable @typescript-eslint/no-unused-vars */

      return (
        <StateContext.Provider
          value={{
            locale,
            form: this.form,
            actions: this.getActions(this.form),
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
