import React, { Component, useContext } from 'react'
import { createHOC, isEqual, each, schemaIs, filterSchema, lowercase } from '../utils'
import { createMutators } from '../shared/mutators'
import { StateContext } from '../shared/context'
import { getFieldRenderer, getFormField } from '../shared/core'
import { StateFieldProps, StateFieldState, FieldProps } from '../type'

const StateField = createHOC((options, Field) => {
  class StateField extends Component<StateFieldProps, StateFieldState> {
    static displayName = 'StateField'

    private initialized: boolean
    private unmounted: boolean
    private field: any
    // TODO mutators 文件应该暴露出来 interface
    private mutators: any

    constructor(props) {
      super(props)
      this.initialized = true
      this.state = {}
      this.field = props.form.registerField(props.name || props.schemaPath.join('.'), {
        path: props.schemaPath,
        onChange: this.onChangeHandler(),
        props: props.schema
      })
      this.mutators = createMutators(props)
    }

    onChangeHandler() {
      return fieldState => {
        if (this.initialized) {
          if (this.unmounted) return
          this.setState(fieldState)
        } else {
          this.state = fieldState
        }
      }
    }

    componentWillUnmount() {
      this.unmounted = true
      this.field.unmount()
    }

    componentDidMount() {
      this.unmounted = false
      this.field.mount()
    }

    componentDidUpdate(prevProps) {
      if (!isEqual(this.props.schema, prevProps.schema, filterSchema)) {
        this.field.changeProps(this.props.schema)
      }
    }

    renderField = (key, addReactKey) => {
      const path = this.props.path.concat(key)
      const schemaPath = this.props.schemaPath.concat(key)
      const name = path.join('.')

      return (
        <FormField
          key={addReactKey ? name : undefined}
          path={path}
          name={name}
          schemaPath={schemaPath}
        />
      )
    }

    getOrderProperties = outerSchema => {
      const { schema: innerSchema, path } = this.props
      if (!innerSchema && !outerSchema) return []

      const properties = []
      each((outerSchema || innerSchema || {}).properties, (item, key) => {
        let index = item['x-index']
        let newPath = path.concat(key)
        let newName = newPath.join('.')
        if (typeof index === 'number') {
          properties[index] = {
            schema: item,
            key,
            path: newPath,
            name: newName
          }
        } else {
          properties.push({ schema: item, key, path: newPath, name: newName })
        }
      })
      return properties
    }

    render() {
      const { name, path, schemaPath, locale, getSchema } = this.props
      const { value, visible, props, errors, loading, editable, required } = this.state
      const newValue = schemaIs(props, 'object')
        ? value || {}
        : schemaIs(props, 'array')
          ? value || []
          : value

      return visible === false ? (
        <React.Fragment />
      ) : (
        <Field
          name={name}
          value={newValue}
          errors={errors}
          required={required}
          path={path}
          editable={editable}
          locale={locale}
          loading={loading}
          schemaPath={schemaPath}
          getSchema={getSchema}
          renderField={this.renderField}
          getOrderProperties={this.getOrderProperties}
          mutators={this.mutators}
          schema={props}
        />
      )
    }
  }

  return props => {
    const { name, path, schemaPath } = props
    const { form, getSchema, locale } = useContext(StateContext)
    return (
      <StateField
        name={name}
        path={path}
        form={form}
        schema={getSchema(schemaPath || path)}
        locale={locale}
        getSchema={getSchema}
        schemaPath={schemaPath}
      />
    )
  }
})

export const FormField = StateField()((props: FieldProps) => {
  const schema = props.schema
  const fieldComponentName = lowercase(schema['x-component'] || schema.type)
  const renderComponent = schema['x-render']
    ? $props => {
      return React.createElement(getFormField(fieldComponentName), {
        ...props,
        ...$props,
        schema,
        path: props.path,
        name: props.name
      })
    }
    : undefined

  const component = schema['x-render'] ? getFieldRenderer() : getFormField(fieldComponentName)

  if (component) {
    return React.createElement(component, { ...props, renderComponent })
  } else {
    if (console && console.error) {
      if (fieldComponentName) {
        console.error(`The schema field \`${fieldComponentName}\`'s component is not found.`)
      } else {
        console.error(
          `The schema field's component is not found, or field's schema is not defined.`
        )
      }
    }
    return <React.Fragment />
  }
})
