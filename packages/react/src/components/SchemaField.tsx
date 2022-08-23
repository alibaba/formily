import React, { useContext, Fragment } from 'react'
import { ISchema, Schema } from '@formily/json-schema'
import { RecursionField } from './RecursionField'
import { render } from '../shared/render'
import {
  SchemaMarkupContext,
  SchemaOptionsContext,
  SchemaComponentsContext,
} from '../shared'
import {
  ReactComponentPath,
  JSXComponent,
  ISchemaFieldReactFactoryOptions,
  SchemaReactComponents,
  ISchemaFieldProps,
  ISchemaMarkupFieldProps,
  ISchemaTypeFieldProps,
} from '../types'
import { lazyMerge } from '@formily/shared'
import { ExpressionScope } from './ExpressionScope'
const env = {
  nonameId: 0,
}

const getRandomName = () => {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export function createSchemaField<Components extends SchemaReactComponents>(
  options: ISchemaFieldReactFactoryOptions<Components> = {}
) {
  function SchemaField<
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(props: ISchemaFieldProps<Decorator, Component>) {
    const schema = Schema.isSchemaInstance(props.schema)
      ? props.schema
      : new Schema({
          type: 'object',
          ...props.schema,
        })
    const renderMarkup = () => {
      env.nonameId = 0
      if (props.schema) return null
      return render(
        <SchemaMarkupContext.Provider value={schema}>
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    }

    const renderChildren = () => {
      return <RecursionField {...props} schema={schema} />
    }

    return (
      <SchemaOptionsContext.Provider value={options}>
        <SchemaComponentsContext.Provider
          value={lazyMerge(options.components, props.components)}
        >
          <ExpressionScope value={lazyMerge(options.scope, props.scope)}>
            {renderMarkup()}
            {renderChildren()}
          </ExpressionScope>
        </SchemaComponentsContext.Provider>
      </SchemaOptionsContext.Provider>
    )
  }

  SchemaField.displayName = 'SchemaField'

  function MarkupRender(props: any) {
    const parent = useContext(SchemaMarkupContext)
    if (!parent) return <Fragment />
    const renderChildren = () => {
      return <React.Fragment>{props.children}</React.Fragment>
    }
    const appendArraySchema = (schema: ISchema) => {
      const items = parent.items as Schema
      if (items && items.name !== props.name) {
        return parent.addProperty(props.name, schema)
      } else {
        return parent.setItems(schema)
      }
    }
    if (parent.type === 'object' || parent.type === 'void') {
      const schema = parent.addProperty(props.name, props)
      return (
        <SchemaMarkupContext.Provider value={schema}>
          {renderChildren()}
        </SchemaMarkupContext.Provider>
      )
    } else if (parent.type === 'array') {
      const schema = appendArraySchema(props)
      return (
        <SchemaMarkupContext.Provider
          value={Array.isArray(schema) ? schema[0] : schema}
        >
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    } else {
      return renderChildren()
    }
  }

  function MarkupField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaMarkupFieldProps<Components, Component, Decorator>) {
    return <MarkupRender {...props} name={props.name || getRandomName()} />
  }

  MarkupField.displayName = 'MarkupField'

  function StringField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="string" />
  }

  StringField.displayName = 'StringField'

  function ObjectField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="object" />
  }

  ObjectField.displayName = 'ObjectField'

  function ArrayField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="array" />
  }

  ArrayField.displayName = 'ArrayField'
  function BooleanField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="boolean" />
  }

  BooleanField.displayName = 'BooleanField'

  function NumberField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="number" />
  }

  NumberField.displayName = 'NumberField'

  function DateField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="date" />
  }

  DateField.displayName = 'DateField'

  function DateTimeField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="datetime" />
  }

  DateTimeField.displayName = 'DateTimeField'

  function VoidField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaTypeFieldProps<Components, Component, Decorator>) {
    return <MarkupField {...props} type="void" />
  }

  VoidField.displayName = 'VoidField'

  SchemaField.Markup = MarkupField
  SchemaField.String = StringField
  SchemaField.Object = ObjectField
  SchemaField.Array = ArrayField
  SchemaField.Boolean = BooleanField
  SchemaField.Date = DateField
  SchemaField.DateTime = DateTimeField
  SchemaField.Void = VoidField
  SchemaField.Number = NumberField

  return SchemaField
}
