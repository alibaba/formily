import React, { Component, useContext } from 'react'
import { ISchema } from '@uform/types'

import {
  createHOC,
  isEqual,
  each,
  schemaIs,
  filterSchema,
  lowercase
} from '../utils'
import { createMutators } from '../shared/mutators'
import { StateContext } from '../shared/context'
import { getFieldRenderer, getFormField } from '../shared/core'
import { IStateFieldProps, IStateFieldState, IFieldProps } from '../type'

const StateField = createHOC((options, Field) => {
  class StateField extends Component<IStateFieldProps, IStateFieldState> {
    public static displayName = 'StateField'

    private initialized: boolean
    private unmounted: boolean
    private field: any
    // TODO mutators 文件应该暴露出来 interface
    private mutators: any

    constructor(props) {
      super(props)
      this.initialized = false
      this.state = {}
      this.field = props.form.registerField(
        props.name || props.schemaPath.join('.'),
        {
          path: props.schemaPath,
          onChange: this.onChangeHandler(),
          props: props.schema
        }
      )
      this.mutators = createMutators(props)
      this.initialized = true
    }

    public onChangeHandler() {
      return fieldState => {
        if (this.unmounted) {
          return
        }
        if (this.initialized) {
          this.setState(fieldState)
        } else {
          // eslint-disable-next-line react/no-direct-mutation-state
          this.state = fieldState
        }
      }
    }

    public componentWillUnmount() {
      this.unmounted = true
      this.field.unmount()
    }

    public componentDidMount() {
      this.unmounted = false
      this.field.mount()
    }

    public componentDidUpdate(prevProps) {
      if (!isEqual(this.props.schema, prevProps.schema, filterSchema)) {
        this.field.changeProps(this.props.schema)
      }
    }

    public renderField = (key, addReactKey: boolean) => {
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

    public getOrderProperties = (outerSchema?: ISchema) => {
      const { schema: innerSchema, path } = this.props
      if (!innerSchema && !outerSchema) {
        return []
      }

      const properties = []
      each((outerSchema || innerSchema || {}).properties, (item, key) => {
        const index = item['x-index']
        const newPath = path.concat(key)
        const newName = newPath.join('.')
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
      return properties.reduce((buf, item) => {
        return item ? buf.concat(item) : buf
      }, [])
    }

    public render() {
      const {
        name,
        path,
        schemaPath,
        broadcast,
        schema,
        form,
        locale,
        getSchema
      } = this.props
      const {
        value,
        visible,
        display,
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
      //todo: 重置schema children，这里有点恶心，后面重构的时候需要想下怎么重置更合适
      if (schema.properties) {
        props.properties = schema.properties
      } else if (schema.items) {
        props.items = schema.items
      }
      return visible === false || display === false ? (
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
          form={form}
          broadcast={broadcast}
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
    const { form, getSchema, locale, broadcast } = useContext(StateContext)
    return (
      <StateField
        name={name}
        path={path}
        form={form}
        broadcast={broadcast}
        schema={getSchema(schemaPath || path)}
        locale={locale}
        getSchema={getSchema}
        schemaPath={schemaPath}
      />
    )
  }
})

export const FormField = StateField()((props: IFieldProps) => {
  const schema = props.schema
  const fieldComponentName = lowercase(schema['x-component'] || schema.type)
  const renderComponent = schema['x-render']
    ? (innerProps: any) => {
        return React.createElement(getFormField(fieldComponentName), {
          ...props,
          ...innerProps,
          schema,
          path: props.path,
          name: props.name
        })
      }
    : undefined

  const component = schema['x-render']
    ? getFieldRenderer()
    : getFormField(fieldComponentName)

  if (component) {
    return React.createElement(component, { ...props, renderComponent })
  } else {
    if (console && console.error) {
      if (fieldComponentName) {
        console.error(
          `The schema field \`${fieldComponentName}\`'s component is not found.`
        )
      } else {
        console.error(
          "The schema field's component is not found, or field's schema is not defined."
        )
      }
    }
    return <React.Fragment />
  }
})
