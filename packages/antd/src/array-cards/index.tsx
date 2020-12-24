import React, { createContext, useContext } from 'react'
import { Button, Card, Empty } from 'antd'
import {
  MinusCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { ButtonProps } from 'antd/lib/button'
import { CardProps } from 'antd/lib/card'
import { useField } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { observer } from 'mobx-react-lite'
import cls from 'classnames'
import { ISchema } from '@formily/json-schema'
import './style.less'
interface IArrayCardsAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
}

type ComposedArrayCards = React.FC<CardProps> & {
  SortHandle?: React.FC<AntdIconProps>
  Addition?: React.FC<IArrayCardsAdditionProps>
  Index?: React.FC
  Remove?: React.FC<AntdIconProps>
  MoveUp?: React.FC<AntdIconProps>
  MoveDown?: React.FC<AntdIconProps>
  useArrayCards?: () => Formily.Core.Models.ArrayField
  useArrayCardsIndex?: () => number
}

const ArrayContext = createContext<Formily.Core.Models.ArrayField>(null)

const ArrayIndexContext = createContext<number>(null)

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}

export const ArrayCards: ComposedArrayCards = observer((props) => {
  const field = useField<Formily.Core.Models.ArrayField>()
  const schema = useSchema()
  const dataSource = Array.isArray(field.value) ? [...field.value] : []

  const renderItems = () => {
    return dataSource?.map((item, index) => {
      const items = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items
      const title = (
        <span>
          <RecursionField
            schema={items}
            name={index}
            mapProperties={(schema) => {
              if (!isIndexComponent(schema)) return false
              return schema
            }}
          />
          {props.title || field.title}
        </span>
      )
      const extra = (
        <span>
          <RecursionField
            schema={items}
            name={index}
            mapProperties={(schema) => {
              if (!isOperationComponent(schema)) return false
              return schema
            }}
          />
          {props.extra}
        </span>
      )
      const content = (
        <RecursionField
          schema={items}
          name={index}
          mapProperties={(schema) => {
            if (isIndexComponent(schema)) return false
            if (isOperationComponent(schema)) return false
            return schema
          }}
        />
      )
      return (
        <ArrayIndexContext.Provider key={index} value={index}>
          <Card
            {...props}
            onChange={() => {}}
            className={cls('ant-array-cards-item', props.className)}
            title={title}
            extra={extra}
          >
            {content}
          </Card>
        </ArrayIndexContext.Provider>
      )
    })
  }

  const renderAddition = () => {
    return schema.reduceProperties((addition, schema) => {
      if (isAdditionComponent(schema)) {
        return <RecursionField schema={schema} name="addition" />
      }
      return addition
    }, null)
  }

  const renderEmpty = () => {
    if (dataSource?.length) return
    return (
      <Card
        {...props}
        className={cls('ant-array-cards-item', props.className)}
        title={props.title || field.title}
        onChange={() => {}}
      >
        <Empty />
      </Card>
    )
  }

  return (
    <ArrayContext.Provider value={field}>
      {renderEmpty()}
      {renderItems()}
      {renderAddition()}
    </ArrayContext.Provider>
  )
})

ArrayCards.displayName = 'ArrayCards'

ArrayCards.useArrayCards = () => useContext(ArrayContext)

ArrayCards.useArrayCardsIndex = () => useContext(ArrayIndexContext)

ArrayCards.Index = (props) => {
  const index = ArrayCards.useArrayCardsIndex()
  return <span>#{index + 1}.</span>
}

ArrayCards.Addition = (props) => {
  const self = useField()
  const field = ArrayCards.useArrayCards()
  return (
    <Button
      type="dashed"
      block
      className={cls('ant-array-cards-addition', props.className)}
      {...props}
      onClick={() => {
        if (props.method === 'unshift') {
          field.unshift(null)
        } else {
          field.push(null)
        }
      }}
      icon={<PlusOutlined />}
    >
      {self.title || props.title}
    </Button>
  )
}

ArrayCards.Remove = React.forwardRef((props, ref) => {
  const index = ArrayCards.useArrayCardsIndex()
  const field = ArrayCards.useArrayCards()
  return (
    <MinusCircleOutlined
      {...props}
      className={cls('ant-array-cards-remove', props.className)}
      ref={ref}
      onClick={() => {
        field.remove(index)
      }}
    />
  )
})

ArrayCards.MoveDown = React.forwardRef((props, ref) => {
  const index = ArrayCards.useArrayCardsIndex()
  const field = ArrayCards.useArrayCards()
  return (
    <DownCircleOutlined
      {...props}
      className={cls('ant-array-cards-move-down', props.className)}
      ref={ref}
      onClick={() => {
        field.moveDown(index)
      }}
    />
  )
})

ArrayCards.MoveUp = React.forwardRef((props, ref) => {
  const index = ArrayCards.useArrayCardsIndex()
  const field = ArrayCards.useArrayCards()
  return (
    <UpCircleOutlined
      {...props}
      className={cls('ant-array-cards-move-up', props.className)}
      ref={ref}
      onClick={() => {
        field.moveUp(index)
      }}
    />
  )
})

export default ArrayCards