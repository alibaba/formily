import React, { Component, useContext } from 'react'
import { createHOC, isEqual, each, schemaIs, filterSchema } from '../utils'
import { createMutators } from '../shared/mutators'
import { StateContext } from '../shared/context'
import { FormField } from '../shared/core'

export const StateField = createHOC((options, Field) => {
  class StateField extends Component {
    static displayName = 'StateField'

    constructor(props) {
      super(props)
      this.initialized = false
      this.state = {}
      this.field = props.form.registerField(
        props.name || props.schemaPath.join('.'),
        {
          path: props.schemaPath,
          onChange: this.onChangeHandler(props),
          props: props.schema
        }
      )
      this.initialized = true
      this.mutators = createMutators(props)
    }

    getEditable(props) {
      props = props || this.props
      if (
        props.schema['x-props'] &&
        props.schema['x-props'].editable !== undefined
      ) {
        return props.schema['x-props'].editable
      }
      return props.editable
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
      this.field.removeValue()
    }

    componentDidUpdate(prevProps) {
      this.unmounted = false
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

    getOrderProperties = () => {
      const { schema, path } = this.props
      if (!schema) return []
      const properties = []
      each(schema.properties, (item, key) => {
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
      const {
        name,
        path,
        schemaPath,
        renderComponent,
        locale,
        getSchema
      } = this.props
      const {
        value,
        visible,
        props,
        errors,
        loading,
        editable,
        required
      } = this.state
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
          renderComponent={renderComponent}
          getOrderProperties={this.getOrderProperties}
          mutators={this.mutators}
          schema={props}
        />
      )
    }
  }

  return ({ name, path, schemaPath, renderComponent }) => {
    const { form, getSchema, locale, editable } = useContext(StateContext)
    return (
      <StateField
        name={name}
        path={path}
        form={form}
        schemaPath={schemaPath}
        getSchema={getSchema}
        locale={locale}
        editable={editable}
        renderComponent={renderComponent}
        schema={getSchema(schemaPath || path)}
      />
    )
  }
})
