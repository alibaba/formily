import React from 'react'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { useFormLayout, useFormShallowLayout } from '../form-layout'

const useFormItemLayout = (props) => {
  const shallowFormLayout = useFormShallowLayout();
  const formLayout = useFormLayout();
  const layout = shallowFormLayout || formLayout || {};

  return {
    ...props,
    colon: props.colon || layout.colon,
    labelAlign: props.labelAlign || layout.labelAlign,
    labelWrap: props.labelWrap || layout.labelWrap,
    labelWidth: props.labelWidth || layout.labelWidth,
    wrapperWidth: props.wrapperWidth || layout.wrapperWidth,
    labelCol: props.labelCol || layout.labelCol,
    wrapperCol: props.wrapperCol || layout.wrapperCol,
    wrapperAlign: props.wrapperAlign || layout.wrapperAlign,
    wrapperWrap: props.wrapperWrap || layout.wrapperWrap,
    fullness: props.fullness || layout.fullness,
    size: props.size || layout.size,
    inset: props.inset || layout.inset,
    asterisk: props.asterisk || layout.asterisk,
    bordered: props.bordered || layout.bordered,
    feedbackIcon: props.feedbackIcon || layout.feedbackIcon,
  }
}

export const FormItemBase = (props) => {
  const { children, ...others } = props;
  const formLayout = useFormItemLayout(others);
  const { label, colon = true, addonBefore, asterisk, feedbackStatus, extra, help,
    fullness, feedbackLayout,
    labelWidth, wrapperWidth, labelCol, wrapperCol,
    labelAlign = 'right', wrapperAlign = 'left',
    size, labelWrap, wrapperWrap,
  } = formLayout;
  const labelStyle: any = {};
  const wrapperStyle: any = {};

  // 固定宽度
  let enableCol = false;
  if (labelWidth || wrapperWidth) {
    if (labelWidth) {
      labelStyle.width = `${labelWidth}px`;
    }
    if (wrapperWidth) {
      wrapperStyle.width = `${wrapperWidth}px`;
    }
  // 栅格模式
  } else if (labelCol || wrapperCol) {
    enableCol = true;
  }

  const prefixCls = usePrefixCls('formily-form-item', props)
  return <div className={cls({
    [`${prefixCls}`]: true,
    [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
    [`${prefixCls}-size-${size}`]: !!size,
    [`${prefixCls}-feedback-layout-${feedbackLayout}`]: !!feedbackLayout,
    [`${prefixCls}-fullness`]: !!fullness,
    [`${prefixCls}-label-align-${labelAlign}`]: true,
    [`${prefixCls}-control-align-${wrapperAlign}`]: true,
    [`${prefixCls}-label-wrap`]: !!labelWrap,
    [`${prefixCls}-control-wrap`]: !!wrapperWrap,
    [`${prefixCls}-label-col-${labelCol}`]: enableCol && !!labelCol,
    [`${prefixCls}-control-col-${wrapperCol}`]: enableCol && !!wrapperCol,
    [props.className]: !!props.className,
  })}>
    <div className={cls(`${prefixCls}-label`)} style={labelStyle}>
      { asterisk && <span className={cls(`${prefixCls}-asterisk`)}>{'*'}</span>}
      {label}
      { colon && <span className={cls(`${prefixCls}-colon`)}>{':'}</span> }
    </div>
    <div className={cls(`${prefixCls}-control`)} style={wrapperStyle}>
      <div className={cls(`${prefixCls}-control-content`)}>
        {addonBefore && <div className={cls(`${prefixCls}-addon-before`)}>{addonBefore}</div>}
        <div className={cls(`${prefixCls}-control-content-component`)}>{children}</div>
        {addonBefore && <div className={cls(`${prefixCls}-addon-after`)}>{addonBefore}</div>}
      </div>
      {help && <div className={cls(`${prefixCls}-help`)}>{help}</div>}
      {extra && <div className={cls(`${prefixCls}-extra`)}>{extra}</div>}
    </div>
  </div>
}

// 适配
export const FormItem = connect(
  FormItemBase,
  mapProps(
    { extract: 'validateStatus' },
    { extract: 'title', to: 'label' },
    { extract: 'required' },
    { extract: 'required', to: 'asterisk' },
    (props, field) => {
      if (!field) return props
      if (isVoidField(field)) return props
      if (field.invalid) {
        return {
          help: field.editable ? field.errors : field.description,
        }
      } else {
        return {
          help: field.description,
        }
      }
    },
    (props, field) => {
      if (!field.feedbackStatus && field.validateStatus) {
        return {
          feedbackStatus: field.validateStatus,
        }
      }
    }
  )
)

export default FormItem
