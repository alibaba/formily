import React, { createContext, Fragment, useContext } from 'react'
import {
  LogicDiagram as ReactLogicDiagram,
  ILogicDiagramProps,
  RenderNodeFN,
  NodeTypes,
} from '@formily/react-logic-diagram'
import {
  observer,
  RecursionField,
  Schema,
  useField,
  useFieldSchema,
} from '@formily/react'
import { FormPath } from '@formily/core'
import { usePrefixCls } from '../__builtins__'
import { Balloon, Button, Icon } from '@alifd/next'
import { ButtonProps } from '@alifd/next/lib/button'
import { TooltipProps } from '@alifd/next/lib/balloon'
import { IconProps } from '@alifd/next/types/icon'
import cls from 'classnames'
import { toJS } from 'mobx'

interface ObservableDiagramSource {
  relationSchema?: Schema
  ruleSchema?: Schema
  addRuleSchema?: Schema
  addRuleGroupSchema?: Schema
  removeRuleSchema?: Schema
}

type ComposedLogicDiagram = React.FC<ILogicDiagramProps> & {
  AddRule?: React.FC<
    ButtonProps & {
      tooltipProps?: TooltipProps
      iconProps?: IconProps
      defaultValue?: any
    }
  >
  AddRuleGroup?: React.FC<
    ButtonProps & {
      tooltipProps?: TooltipProps
      iconProps?: IconProps
      defaultValue?: any
    }
  >
  RemoveRule?: React.FC<ButtonProps & { iconProps?: IconProps }>
  Relation?: React.FC
  Rule?: React.FC
}

interface IContext {
  field: Formily.Core.Models.ObjectField
  schema: Schema
  childrenKey: string
}

interface IItemProps {
  nodePath: string
}

const LogicDiagramContext = createContext<IContext>(null)
const ItemContext = createContext<IItemProps>(null)

const useLogicDiagram = () => {
  return useContext(LogicDiagramContext)
}

const useNodePath = () => {
  return useContext(ItemContext)?.nodePath
}

const isRelationComponent = (schema: Schema) => {
  return schema['x-component'] === 'LogicDiagram.Relation'
}

const isRuleComponent = (schema: Schema) => {
  return schema['x-component'] === 'LogicDiagram.Rule'
}

const isAddRuleComponent = (schema: Schema) => {
  return schema['x-component'] === 'LogicDiagram.AddRule'
}

const isAddRuleGroupComponent = (schema: Schema) => {
  return schema['x-component'] === 'LogicDiagram.AddRuleGroup'
}

const isRemoveRuleComponent = (schema: Schema) => {
  return schema['x-component'] === 'LogicDiagram.RemoveRule'
}

const useLogicDiagramSource = () => {
  const schema = useFieldSchema()
  const source: ObservableDiagramSource = {}
  return schema.reduceProperties((buf, schema) => {
    if (isRelationComponent(schema)) {
      return { ...buf, relationSchema: schema }
    } else if (isRuleComponent(schema)) {
      return { ...buf, ruleSchema: schema }
    } else if (isAddRuleComponent(schema)) {
      return { ...buf, addRuleSchema: schema }
    } else if (isAddRuleGroupComponent(schema)) {
      return { ...buf, addRuleGroupSchema: schema }
    } else if (isRemoveRuleComponent(schema)) {
      return { ...buf, removeRuleSchema: schema }
    }
    return buf
  }, source)
}

const ACTION_NODE = Symbol('ACTION')

const patchActionNodes = (nodes: any[] = [], childrenKey: string): any[] => {
  return [
    ...nodes.map((node) => {
      if (!node[childrenKey] || node[childrenKey].length === 0) {
        return { ...node }
      }
      return {
        ...node,
        [childrenKey]: patchActionNodes(node[childrenKey], childrenKey),
      }
    }),
    {
      [ACTION_NODE]: true,
    },
  ]
}

const useDiagramData = (childrenKey: string) => {
  const field = useField<Formily.Core.Models.ObjectField>()
  let value = field.value || { [childrenKey]: [{}] }
  if (field.editable) {
    value = {
      ...value,
      [childrenKey]: patchActionNodes(value[childrenKey], childrenKey),
    }
  }
  return value
}

export const LogicDiagram: ComposedLogicDiagram = observer((props) => {
  const field = useField<Formily.Core.Models.ObjectField>()
  const schema = useFieldSchema()
  const prefixCls = usePrefixCls('formily-logic-diagram')
  const {
    relationSchema,
    ruleSchema,
    addRuleSchema,
    addRuleGroupSchema,
    removeRuleSchema,
  } = useLogicDiagramSource()
  const childrenKey = ruleSchema.name as string
  const data = useDiagramData(childrenKey)

  const renderNode: RenderNodeFN = (nodePath, type, data) => {
    switch (type) {
      case NodeTypes.LEAF:
        if (data[ACTION_NODE]) {
          return (
            <div className={`${prefixCls}-action`}>
              <ItemContext.Provider value={{ nodePath }}>
                <Button.Group>
                  <RecursionField
                    schema={addRuleSchema}
                    name={FormPath.parse(nodePath)
                      .parent()
                      .parent()
                      .concat(addRuleSchema.name)
                      .toString()}
                    onlyRenderSelf
                  />
                  <RecursionField
                    schema={addRuleGroupSchema}
                    name={FormPath.parse(nodePath)
                      .parent()
                      .parent()
                      .concat(addRuleGroupSchema.name)
                      .toString()}
                    onlyRenderSelf
                  />
                </Button.Group>
              </ItemContext.Provider>
            </div>
          )
        } else {
          return (
            <div className={`${prefixCls}-rule`}>
              <ItemContext.Provider value={{ nodePath }}>
                <RecursionField
                  schema={ruleSchema}
                  name={nodePath}
                  onlyRenderProperties
                />
                <RecursionField
                  schema={removeRuleSchema}
                  name={`${nodePath}.${removeRuleSchema.name}`}
                  onlyRenderSelf
                />
              </ItemContext.Provider>
            </div>
          )
        }
      case NodeTypes.NON_LEAF:
        return (
          <div className={`${prefixCls}-relation`}>
            <ItemContext.Provider value={{ nodePath }}>
              <RecursionField
                schema={relationSchema}
                name={nodePath}
                onlyRenderProperties
              />
            </ItemContext.Provider>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cls(prefixCls, { [`${prefixCls}-disabled`]: !field.editable })}
    >
      <LogicDiagramContext.Provider value={{ field, schema, childrenKey }}>
        <ReactLogicDiagram
          nodeHeight={48}
          nodeMarginY={8}
          {...props}
          data={data}
          childrenKey={childrenKey}
          renderNode={renderNode}
        />
      </LogicDiagramContext.Provider>
    </div>
  )
})

LogicDiagram.Relation = () => {
  return <Fragment />
}

LogicDiagram.Rule = () => {
  return <Fragment />
}

LogicDiagram.AddRule = ({
  tooltipProps,
  iconProps,
  defaultValue,
  ...buttonProps
}) => {
  const self = useField()
  const logicDiagram = useLogicDiagram()
  const nodePath = useNodePath()
  const prefixCls = usePrefixCls('formily-logic-diagram')
  return (
    <Balloon.Tooltip
      {...tooltipProps}
      className={cls(`${prefixCls}-add-rule-tip`, tooltipProps?.className)}
      trigger={
        <Button
          type="normal"
          {...buttonProps}
          className={cls(`${prefixCls}-add-rule-btn`, buttonProps.className)}
          onClick={() => {
            logicDiagram?.field?.addProperty(nodePath, defaultValue || {})
          }}
        >
          <Icon
            type="add"
            {...iconProps}
            className={cls(
              `${prefixCls}-add-rule-btn-icon`,
              iconProps?.className
            )}
          />
        </Button>
      }
    >
      {self.title || tooltipProps?.children || '添加条件'}
    </Balloon.Tooltip>
  )
}

LogicDiagram.AddRuleGroup = ({
  tooltipProps,
  iconProps,
  defaultValue,
  ...buttonProps
}) => {
  const self = useField()
  const logicDiagram = useLogicDiagram()
  const nodePath = useNodePath()
  const prefixCls = usePrefixCls('formily-logic-diagram')
  return (
    <Balloon.Tooltip
      {...tooltipProps}
      className={cls(
        `${prefixCls}-add-rule-group-tip`,
        tooltipProps?.className
      )}
      trigger={
        <Button
          type="normal"
          {...buttonProps}
          className={cls(
            `${prefixCls}-add-rule-group-btn`,
            buttonProps.className
          )}
          onClick={() => {
            logicDiagram?.field?.addProperty(
              nodePath,
              defaultValue || { [logicDiagram.childrenKey]: [{}] }
            )
          }}
        >
          <Icon
            type="copy"
            {...iconProps}
            className={cls(
              `${prefixCls}-add-rule-group-btn-icon`,
              iconProps?.className
            )}
          />
        </Button>
      }
    >
      {self.title || tooltipProps?.children || '添加条件组'}
    </Balloon.Tooltip>
  )
}

LogicDiagram.RemoveRule = ({ iconProps, ...buttonProps }) => {
  const logicDiagram = useLogicDiagram()
  const nodePath = useNodePath()
  const prefixCls = usePrefixCls('formily-logic-diagram')

  return (
    <div className={`${prefixCls}-remove-action`}>
      <Button
        text
        type="primary"
        {...buttonProps}
        className={cls(`${prefixCls}-remove-action-btn`, buttonProps.className)}
        onClick={() => {
          const remove = (p: string) => {
            const siblingsPath = FormPath.parse(p).parent()
            const parentPath = siblingsPath.parent()
            const siblings = FormPath.getIn(
              toJS(logicDiagram.field.value),
              siblingsPath.toString()
            )
            if (siblings.length > 1 || parentPath.length === 0) {
              logicDiagram.field.removeProperty(p)
            } else {
              remove(parentPath.toString())
            }
          }
          remove(nodePath)
        }}
      >
        <Icon
          type="ashbin"
          {...iconProps}
          className={cls(
            `${prefixCls}-remove-action-btn-icon`,
            iconProps?.className
          )}
        />
      </Button>
    </div>
  )
}

export default LogicDiagram
