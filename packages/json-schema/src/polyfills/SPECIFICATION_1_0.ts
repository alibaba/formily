import { Schema } from '../schema'
import { toArr, isArr, isStr, lowerCase } from '@formily/shared'

const VOID_COMPONENTS = [
  'card',
  'block',
  'grid-col',
  'grid-row',
  'grid',
  'layout',
  'step',
  'tab',
  'text-box',
]

const TYPE_DEFAULT_COMPONENTS = {}

const transformCondition = (condition: string) => {
  if (isStr(condition)) {
    return condition.replace(/\$value/, '$self.value')
  }
}

const transformXLinkage = (linkages: any[]) => {
  if (isArr(linkages)) {
    return linkages.reduce((buf, item) => {
      if (!item) return buf
      if (item.type === 'value:visible') {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fullfill: {
            state: {
              visible: true,
            },
          },
          otherwise: {
            state: {
              visible: false,
            },
          },
        })
      } else if (item.type === 'value:schema') {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fullfill: {
            schema: item.schema,
          },
          otherwise: {
            schema: item.otherwise,
          },
        })
      } else if (item.type === 'value:state') {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fullfill: {
            state: item.state,
          },
          otherwise: {
            state: item.otherwise,
          },
        })
      }
    }, [])
  }
}

Schema.registerPatches((schema) => {
  if (schema.version === '1.0') {
    if (schema['editable']) {
      schema['x-editable'] = schema['editable']
      delete schema['editable']
    }
    if (schema['visible']) {
      schema['x-visible'] = schema['visible']
      delete schema['visible']
    }
    if (schema['display']) {
      schema['x-display'] = schema['display'] ? 'visible' : 'hidden'
      delete schema['display']
    }
    if (schema['x-props']) {
      schema['x-decorator-props'] = schema['x-props']
      delete schema['display']
    }
    if (!schema['x-decorator']) {
      schema['x-decorator'] = 'FormItem'
    }
    if (schema['x-linkages']) {
      schema['x-reactions'] = toArr(schema['x-reactions']).concat(
        transformXLinkage(schema['x-linkages'])
      )
    }
    if (schema['x-component']) {
      if (
        VOID_COMPONENTS.some(
          (component) =>
            lowerCase(component) === lowerCase(schema['x-component'])
        )
      ) {
        schema['type'] = 'void'
      }
    } else {
      if (TYPE_DEFAULT_COMPONENTS[schema['type']]) {
        schema['x-component'] = TYPE_DEFAULT_COMPONENTS[schema['type']]
      }
    }
  }
  return schema
})

export const registerVoidComponents = (components: string[]) => {
  VOID_COMPONENTS.push(...components)
}

export const registerTypeDefaultComponents = (maps: Record<string, string>) => {
  Object.assign(TYPE_DEFAULT_COMPONENTS, maps)
}
