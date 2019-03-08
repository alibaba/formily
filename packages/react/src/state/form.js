import React, { Component } from 'react'
import { createHOC, getSchemaNodeFromPath, isEqual, clone } from '../utils'
import { createForm } from '@uform/core'
import { StateContext } from '../shared/context'
import { getFormFieldPropsTransformer } from '../shared/core'
import { connect } from 'react-eva'
import { FormBridge } from '../shared/broadcast'

export const StateForm = createHOC((options, Form) => {
  class StateForm extends Component {
    static displayName = 'StateForm'

    static defaultProps = {
      locale: {}
    }

    constructor(props) {
      super(props)
      this.initialized = false
      this.form = createForm({
        initialValues: props.defaultValue || props.initialValues,
        effects: props.effects,
        subscribes: props.subscribes,
        schema: props.schema,
        onSubmit: this.onSubmitHandler(props),
        onFormChange: this.onFormChangeHandler(props),
        onFieldChange: this.onFieldChangeHandler(props),
        onValidateFailed: props.onValidateFailed,
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
            getSchema: this.getSchema
          })
        }
      })
      this.state = {}
      this.initialized = true
    }

    notify(payload) {
      const { broadcast, schema } = this.props
      if (broadcast) {
        payload.schema = schema
        broadcast.notify(payload)
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
            this.timerId = setTimeout(() => {
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

    onFieldChangeHandler(props) {
      return ({ formState }) => {
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
        result &&
        getFormFieldPropsTransformer(result['x-component'] || result['type'])
      return transformer ? transformer(result) : result
    }

    onSubmitHandler(props) {
      return ({ formState }) => {
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

    onResetHandler(props) {
      return ({ formState }) => {
        if (props.onReset) {
          props.onReset(clone(formState.values))
        }
      }
    }

    shouldComponentUpdate(nextProps) {
      return !isEqual(nextProps, this.props)
    }

    componentDidUpdate(prevProps) {
      if (this.props.value && !isEqual(this.props.value, prevProps.value)) {
        this.form.changeValues(this.props.value)
      }
      if (
        this.props.initialValues &&
        !isEqual(this.props.initialValues, prevProps.initialValues)
      ) {
        this.form.initialize(this.props.initialValues)
      }
    }

    componentDidMount() {
      this.unmounted = false
      this.form.triggerEffect('onFormMount', this.form.publishState())
      this.unsubscribe = this.props.broadcast.subscribe(
        ({ type, name, payload }) => {
          if (type === 'submit') {
            this.submit()
          } else if (type === 'reset') {
            this.reset()
          } else if (type === 'dispatch') {
            this.form.triggerEffect(name, payload)
          }
        }
      )
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

    reset = () => {
      this.form.reset()
    }

    validate = () => {
      return this.form.validate()
    }

    render() {
      const {
        onSubmit,
        onChange,
        onReset,
        onValidateFailed,
        initialValues,
        defaultValue,
        actions,
        effects,
        implementActions,
        dispatch,
        editable,
        createEvents,
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
            form: this.form,
            getSchema: this.getSchema,
            locale,
            editable,
            broadcast: this.broadcast
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
