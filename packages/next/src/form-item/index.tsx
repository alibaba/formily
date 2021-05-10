import React, { useRef, useState } from 'react'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { reduce } from '@formily/shared'
import {
  useFormLayout,
  useFormShallowLayout,
  FormLayoutShallowContext,
} from '../form-layout'
import { useGridSpan } from '../form-grid'
import { Balloon } from '@alifd/next'
import {
  QuestionCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

export interface IFormItemProps {
  className?: string
  style?: React.CSSProperties
  prefix?: string
  label?: React.ReactNode
  colon?: boolean
  tooltip?: boolean
  tooltipLayout?: 'icon' | 'text'
  labelStyle?: React.CSSProperties
  labelAlign?: 'left' | 'right'
  labelWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  labelCol?: number
  wrapperCol?: number
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: React.CSSProperties
  fullness?: boolean
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  size?: 'small' | 'default' | 'large'
  inset?: boolean
  extra?: React.ReactNode
  feedbackText?: React.ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none' | (string & {})
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {})
  feedbackIcon?: React.ReactNode
  asterisk?: boolean
  gridSpan?: number
  bordered?: boolean
}

type ComposeFormItem = React.FC<IFormItemProps> & {
  BaseItem?: React.FC<IFormItemProps>
}

const useFormItemLayout = (props: IFormItemProps) => {
  const shallowFormLayout = useFormShallowLayout()
  const formLayout = useFormLayout()
  const layout = { ...shallowFormLayout, ...formLayout }
  return {
    ...props,
    layout: layout.layout ?? 'horizontal',
    colon: props.colon ?? layout.colon,
    labelAlign:
      layout.layout === 'vertical'
        ? props.labelAlign ?? layout.labelAlign ?? 'left'
        : props.labelAlign ?? layout.labelAlign ?? 'right',
    labelWrap: props.labelWrap ?? layout.labelWrap,
    labelWidth: props.labelWidth ?? layout.labelWidth,
    wrapperWidth: props.wrapperWidth ?? layout.wrapperWidth,
    labelCol: props.labelCol ?? layout.labelCol,
    wrapperCol: props.wrapperCol ?? layout.wrapperCol,
    wrapperAlign: props.wrapperAlign ?? layout.wrapperAlign,
    wrapperWrap: props.wrapperWrap ?? layout.wrapperWrap,
    fullness: props.fullness ?? layout.fullness,
    size: props.size ?? layout.size,
    inset: props.inset ?? layout.inset,
    asterisk: props.asterisk,
    bordered: props.bordered ?? layout.bordered,
    feedbackIcon: props.feedbackIcon,
    feedbackLayout: props.feedbackLayout ?? layout.feedbackLayout ?? 'loose',
    tooltipLayout: props.tooltipLayout ?? layout.tooltipLayout ?? 'icon',
  }
}

const ICON_MAP = {
  error: <CloseCircleOutlined />,
  success: <CheckCircleOutlined />,
  warning: <ExclamationCircleOutlined />,
}

export const BaseItem: React.FC<IFormItemProps> = (props) => {
  const { children, ...others } = props
  const [active, setActice] = useState(false)
  const popoverContainerRef = useRef()
  const formLayout = useFormItemLayout(others)
  const shallowFormLayout = useFormShallowLayout()
  const {
    label,
    style,
    layout,
    colon = true,
    addonBefore,
    addonAfter,
    asterisk,
    feedbackStatus,
    extra,
    feedbackText,
    fullness,
    feedbackLayout,
    feedbackIcon,
    inset,
    bordered = true,
    labelWidth,
    wrapperWidth,
    labelCol,
    wrapperCol,
    labelAlign,
    wrapperAlign = 'left',
    size,
    labelWrap,
    wrapperWrap,
    tooltip,
    tooltipLayout,
  } = formLayout
  const labelStyle = { ...formLayout.labelStyle }
  const wrapperStyle = { ...formLayout.wrapperStyle }
  // 固定宽度
  let enableCol = false
  if (labelWidth || wrapperWidth) {
    if (labelWidth) {
      labelStyle.width = labelWidth
      labelStyle.maxWidth = labelWidth
    }
    if (wrapperWidth) {
      wrapperStyle.width = wrapperWidth
      wrapperStyle.maxWidth = wrapperWidth
    }
    // 栅格模式
  } else if (labelCol || wrapperCol) {
    enableCol = true
  }

  const prefixCls = usePrefixCls('formily-item', props)
  const prefix = usePrefixCls()
  const formatChildren =
    feedbackLayout === 'popover' ? (
      <Balloon
        needAdjust
        align="t"
        closable={false}
        popupContainer={() => popoverContainerRef.current}
        trigger={children}
        visible={!!feedbackText}
      >
        <div
          className={cls({
            [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
            [`${prefixCls}-help`]: true,
          })}
        >
          {ICON_MAP[feedbackStatus]} {feedbackText}
        </div>
      </Balloon>
    ) : (
      children
    )

  const labelChildren = (
    <div className={cls(`${prefixCls}-label-content`)}>
      {asterisk && <span className={cls(`${prefixCls}-asterisk`)}>{'*'}</span>}
      <label>{label}</label>
    </div>
  )

  return (
    <div
      ref={popoverContainerRef}
      style={{
        ...style,
        gridColumnStart: `span ${useGridSpan(props.gridSpan)}`,
      }}
      className={cls({
        [`${prefixCls}`]: true,
        [`${prefixCls}-layout-${layout}`]: true,
        [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
        [`${prefixCls}-feedback-has-text`]: !!feedbackText,
        [`${prefixCls}-size-${size}`]: !!size,
        [`${prefixCls}-feedback-layout-${feedbackLayout}`]: !!feedbackLayout,
        [`${prefixCls}-fullness`]: !!fullness || !!inset || !!feedbackIcon,
        [`${prefixCls}-inset`]: !!inset,
        [`${prefix}-input`]: !!inset,
        [`${prefixCls}-active`]: active,
        [`${prefix}-focus`]: active,
        [`${prefixCls}-inset-active`]: !!inset && active,
        [`${prefixCls}-label-align-${labelAlign}`]: true,
        [`${prefixCls}-control-align-${wrapperAlign}`]: true,
        [`${prefixCls}-label-wrap`]: !!labelWrap,
        [`${prefixCls}-control-wrap`]: !!wrapperWrap,
        [`${prefixCls}-bordered-none`]: bordered === false,
        [props.className]: !!props.className,
      })}
      onFocus={() => {
        if (feedbackIcon || inset) {
          setActice(true)
        }
      }}
      onBlur={() => {
        if (feedbackIcon || inset) {
          setActice(false)
        }
      }}
    >
      {label !== undefined && (
        <div
          className={cls({
            [`${prefixCls}-label`]: true,
            [`${prefixCls}-label-tooltip`]: tooltip && tooltipLayout === 'text',
            [`${prefixCls}-item-col-${labelCol}`]: enableCol && !!labelCol,
          })}
          style={labelStyle}
        >
          {tooltipLayout === 'text' ? (
            <Balloon.Tooltip
              align="t"
              trigger={labelChildren}
              popupContainer={() => popoverContainerRef.current}
            >
              {tooltip}
            </Balloon.Tooltip>
          ) : (
            labelChildren
          )}
          {tooltip && tooltipLayout === 'icon' && (
            <span className={cls(`${prefixCls}-label-tooltip`)}>
              <Balloon.Tooltip
                align="t"
                trigger={<QuestionCircleOutlined />}
                popupContainer={() => popoverContainerRef.current}
              >
                {tooltip}
              </Balloon.Tooltip>
            </span>
          )}
          {label && (
            <span className={cls(`${prefixCls}-colon`)}>
              {colon ? ':' : ''}
            </span>
          )}
        </div>
      )}

      <div
        className={cls({
          [`${prefixCls}-control`]: true,
          [`${prefixCls}-item-col-${wrapperCol}`]: enableCol && !!wrapperCol,
        })}
      >
        <div className={cls(`${prefixCls}-control-content`)}>
          {addonBefore && (
            <div className={cls(`${prefixCls}-addon-before`)}>
              {addonBefore}
            </div>
          )}
          <div
            style={wrapperStyle}
            className={cls({
              [`${prefixCls}-control-content-component`]: true,
              [`${prefixCls}-control-content-component-has-feedback-icon`]: !!feedbackIcon,
              [`${prefix}-input`]: !!feedbackIcon,
              [`${prefixCls}-active`]: active,
              [`${prefix}-focus`]: active,
            })}
          >
            <FormLayoutShallowContext.Provider
              value={reduce(
                shallowFormLayout,
                (buf: any, _, key) => {
                  if (key === 'size') {
                    buf.size = size
                  } else {
                    buf[key] = undefined
                  }
                  return buf
                },
                {
                  size,
                }
              )}
            >
              {formatChildren}
            </FormLayoutShallowContext.Provider>
            {feedbackIcon && (
              <div className={cls(`${prefixCls}-feedback-icon`)}>
                {feedbackIcon}
              </div>
            )}
          </div>
          {addonAfter && (
            <div className={cls(`${prefixCls}-addon-after`)}>{addonAfter}</div>
          )}
        </div>
        {!!feedbackText &&
          feedbackLayout !== 'popover' &&
          feedbackLayout !== 'none' && (
            <div
              className={cls({
                [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                [`${prefixCls}-help`]: true,
                [`${prefixCls}-help-enter`]: true,
                [`${prefixCls}-help-enter-active`]: true,
              })}
            >
              {feedbackText}
            </div>
          )}
        {extra && <div className={cls(`${prefixCls}-extra`)}>{extra}</div>}
      </div>
    </div>
  )
}

// 适配
export const FormItem: ComposeFormItem = connect(
  BaseItem,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      const takeMessage = () => {
        const split = (messages: any[]) => {
          return messages.reduce((buf, text, index) => {
            if (!text) return buf
            return index < messages.length - 1
              ? buf.concat([text, ', '])
              : buf.concat([text])
          }, [])
        }
        if (field.validating) return
        if (props.feedbackText) return props.feedbackText
        if (field.errors.length) return split(field.errors)
        if (field.warnings.length) return split(field.warnings)
        if (field.successes.length) return split(field.successes)
      }

      return {
        feedbackText: takeMessage(),
        extra: props.extra || field.description,
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      return {
        feedbackStatus:
          field.validateStatus === 'validating'
            ? 'pending'
            : field.decorator[1]?.feedbackStatus || field.validateStatus,
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      let asterisk = false
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk
      }
      return {
        asterisk,
      }
    }
  )
)

FormItem.BaseItem = BaseItem

export default FormItem
