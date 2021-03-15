import React, { useLayoutEffect, useRef, useState } from 'react'
import { isVoidField } from '@formily/core'
import { useField, useForm, observer } from '@formily/react'
import { isStr } from '@formily/shared'
import { Space, Popover } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { BaseItem, IFormItemProps } from '../form-item'
import { PopoverProps } from 'antd/lib/popover'
import { useClickAway, usePrefixCls } from '../__builtins__'
import cls from 'classnames'
/**
 * 默认Inline展示
 */

interface IPopoverProps extends PopoverProps {}

type ComposedEditable = React.FC<IFormItemProps> & {
  Popover?: React.FC<IPopoverProps>
}

const useEditable = (): [boolean, (payload: boolean) => void] => {
  const form = useForm()
  const field = useField<Formily.Core.Models.Field>()
  useLayoutEffect(() => {
    if (form.pattern === 'editable') {
      if (field.pattern === 'editable') {
        field.setPattern('readPretty')
      }
    }
  }, [])
  return [
    field.pattern === 'editable',
    (pyaload: boolean) => {
      field.setPattern(pyaload ? 'editable' : 'readPretty')
    },
  ]
}

const useFormItemProps = (): IFormItemProps => {
  const field = useField()
  if (isVoidField(field)) return {}
  if (!field) return {}
  const takeMessage = () => {
    if (field.errors.length) return field.errors
    if (field.warnings.length) return field.warnings
    if (field.successes.length) return field.successes
  }

  return {
    feedbackStatus:
      field.validateStatus === 'validating' ? 'pending' : field.validateStatus,
    feedbackText: takeMessage(),
    extra: field.description,
  }
}

export const Editable: ComposedEditable = observer((props) => {
  const [editable, setEditable] = useEditable()
  const itemProps = useFormItemProps()
  const field = useField<Formily.Core.Models.Field>()
  const basePrefixCls = usePrefixCls()
  const prefixCls = usePrefixCls('formily-editable')
  const ref = useRef<boolean>()
  const innerRef = useRef<HTMLDivElement>()
  const recover = () => {
    if (ref.current && !field?.errors?.length) {
      setEditable(false)
    }
  }
  const renderEditHelper = () => {
    if (editable) return
    return (
      <BaseItem {...props} {...itemProps}>
        <EditOutlined className={`${prefixCls}-edit-btn`} />
      </BaseItem>
    )
  }

  const renderCloseHelper = () => {
    if (!editable) return
    return (
      <BaseItem {...props}>
        <CloseOutlined className={`${prefixCls}-close-btn`} />
      </BaseItem>
    )
  }

  useClickAway((e) => {
    const target = e.target as HTMLElement
    if (target?.closest(`.${basePrefixCls}-select-dropdown`)) return
    if (target?.closest(`.${basePrefixCls}-picker-dropdown`)) return
    if (target?.closest(`.${basePrefixCls}-cascader-menus`)) return
    recover()
  }, innerRef)

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    const close = innerRef.current.querySelector(`.${prefixCls}-close-btn`)
    if (target?.contains(close) || close?.contains(target)) {
      recover()
    } else if (!ref.current) {
      setTimeout(() => {
        setEditable(true)
        setTimeout(() => {
          innerRef.current.querySelector('input')?.focus()
        })
      })
    }
  }

  ref.current = editable

  return (
    <div className={prefixCls} ref={innerRef} onClick={onClick}>
      <Space size={4} style={{ margin: '0 4px' }}>
        <BaseItem {...props} {...itemProps}>
          {props.children}
        </BaseItem>
        {renderEditHelper()}
        {renderCloseHelper()}
      </Space>
    </div>
  )
})

Editable.Popover = observer((props) => {
  const field = useField<Formily.Core.Models.Field>()
  const [editable, setEditable] = useEditable()
  const [visible, setVisible] = useState(false)
  const prefixCls = usePrefixCls('formily-editable')
  const timer = useRef(null)
  const closePopover = async () => {
    await field.form.validate(`${field.address}.*`)
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address}.*`,
    })
    if (errors?.length) return
    setVisible(false)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setEditable(false)
    }, 1000)
  }
  const openPopover = () => {
    clearTimeout(timer.current)
    setEditable(true)
    setVisible(true)
  }
  return (
    <Popover
      {...props}
      title={field.title}
      visible={editable && visible}
      className={cls(prefixCls, props.className)}
      content={props.children}
      trigger="click"
      destroyTooltipOnHide
      onVisibleChange={(visible) => {
        if (visible) {
          openPopover()
        } else {
          closePopover()
        }
      }}
    >
      <div>
        <BaseItem className={`${prefixCls}-trigger`}>
          <Space size={4} style={{ margin: '0 4px' }}>
            <span className={`${prefixCls}-preview`}>{field.title}</span>
            <EditOutlined className={`${prefixCls}-edit-btn`} />
          </Space>
        </BaseItem>
      </div>
    </Popover>
  )
})
