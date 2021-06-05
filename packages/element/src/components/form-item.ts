import { ref, toRefs, reactive, provide, defineComponent } from 'vue-demi'
import { isVoidField } from '@formily/core'
import { connect, mapProps, h } from '@formily/vue'
import { reduce } from '@formily/shared'
import {
  useFormLayout,
  useFormShallowLayout,
  FormLayoutShallowContext,
} from './form-layout'
import { resolveComponent, getComponentByTag } from '../shared'
import { stylePrefix } from '../configs'
import { Component } from 'vue'

const Tooltip = getComponentByTag('el-tooltip')

export type FormItemProps = {
  className?: string
  required: boolean
  label?: string | Component
  colon?: boolean
  tooltip?: boolean
  labelStyle?: Record<string, any>
  labelAlign?: 'left' | 'right'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  labelCol?: number
  wrapperCol?: number
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: Record<string, any>
  fullness?: boolean
  addonBefore?: string | Component
  addonAfter?: string | Component
  size?: 'small' | 'default' | 'large'
  extra?: string
  feedbackText?: string | Component
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none' | (string & {})
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {})
  feedbackIcon?: string | Component
  asterisk?: boolean
  gridSpan?: number
}

const useFormItemLayout = (props: FormItemProps) => {
  const shallowFormLayout = useFormShallowLayout()
  const formLayout = useFormLayout()
  const layout = { ...shallowFormLayout, ...formLayout }
  const propRefs = toRefs<FormItemProps>(props)
  return reactive({
    ...propRefs,
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
    asterisk: props.asterisk,
    feedbackIcon: props.feedbackIcon,
    feedbackLayout: props.feedbackLayout ?? layout.feedbackLayout ?? 'loose',
  })
}

const ICON_MAP = {
  error: () => h('i', { class: 'el-icon-circle-close' }, {}),
  success: () => h('i', { class: 'el-icon-circle-check' }, {}),
  warning: () => h('i', { class: 'el-icon-warning-outline' }, {}),
}

export const BaseItem = defineComponent<FormItemProps>({
  name: 'FormilyFormItem',
  props: {
    className: {},
    required: {},
    label: {},
    colon: { default: true },
    tooltip: {},
    labelStyle: {},
    labelAlign: {},
    labelWrap: { default: false },
    labelWidth: {},
    wrapperWidth: {},
    labelCol: {},
    wrapperCol: {},
    wrapperAlign: { default: 'left' },
    wrapperWrap: {},
    wrapperStyle: {},
    fullness: {},
    addonBefore: {},
    addonAfter: {},
    size: {},
    extra: {},
    feedbackText: {},
    feedbackLayout: {},
    feedbackStatus: {},
    feedbackIcon: {},
    asterisk: {},
    gridSpan: {},
  },
  setup(props, { slots, attrs }) {
    const active = ref(false)
    const formLayout = useFormItemLayout(props)
    const shallowFormLayout = useFormShallowLayout()
    const prefixCls = `${stylePrefix}-form-item`
    if (shallowFormLayout) {
      provide(
        FormLayoutShallowContext,
        reduce(
          shallowFormLayout,
          (buf: any, _, key) => {
            if (key === 'size') {
              buf.size = formLayout.size
            } else {
              buf[key] = undefined
            }
            return buf
          },
          {
            size: formLayout.size,
          }
        )
      )
    }

    return () => {
      const labelStyle: any = formLayout.labelStyle || {}
      const wrapperStyle: any = formLayout.wrapperStyle || {}
      // 固定宽度
      let enableCol = false
      if (formLayout.labelWidth || formLayout.wrapperWidth) {
        if (formLayout.labelWidth) {
          labelStyle.width = `${formLayout.labelWidth}px`
          labelStyle.maxWidth = `${formLayout.labelWidth}px`
        }
        if (formLayout.wrapperWidth) {
          wrapperStyle.width = `${formLayout.wrapperWidth}px`
          wrapperStyle.maxWidth = `${formLayout.wrapperWidth}px`
        }
        // 栅格模式
      } else if (formLayout.labelCol || formLayout.wrapperCol) {
        enableCol = true
      }

      const formatChildren =
        formLayout.feedbackLayout === 'popover'
          ? h(
              'el-popover',
              {
                props: {
                  disabled: !formLayout.feedbackText,
                  placement: 'top',
                },
              },
              {
                reference: () => slots.default?.(),
                default: () => [
                  h(
                    'div',
                    {
                      class: {
                        [`${prefixCls}-${formLayout.feedbackStatus}-help`]:
                          !!formLayout.feedbackStatus,
                        [`${prefixCls}-help`]: true,
                      },
                    },
                    {
                      default: () => [
                        formLayout.feedbackStatus &&
                        ['error', 'success', 'warning'].includes(
                          formLayout.feedbackStatus
                        )
                          ? ICON_MAP[
                              formLayout.feedbackStatus as
                                | 'error'
                                | 'success'
                                | 'warning'
                            ]()
                          : '',
                        resolveComponent(formLayout.feedbackText),
                      ],
                    }
                  ),
                ],
              }
            )
          : slots.default?.()

      const renderLabel =
        formLayout.label !== undefined &&
        h(
          'div',
          {
            class: {
              [`${prefixCls}-label`]: true,
              [`${prefixCls}-item-col-${formLayout.labelCol}`]:
                enableCol && !!formLayout.labelCol,
            },
            style: labelStyle,
          },
          {
            default: () => [
              // label content
              h(
                'div',
                {
                  class: `${prefixCls}-label-content`,
                },
                {
                  default: () => [
                    formLayout.asterisk &&
                      h(
                        'span',
                        { class: `${prefixCls}-asterisk` },
                        { default: () => ['*'] }
                      ),
                    h(
                      'label',
                      {},
                      { default: () => [resolveComponent(formLayout.label)] }
                    ),
                  ],
                }
              ),
              // label tooltip
              formLayout.tooltip &&
                h(
                  'span',
                  {
                    class: `${prefixCls}-label-tooltip`,
                  },
                  {
                    default: () => [
                      h(
                        Tooltip,
                        {
                          props: {
                            placement: 'top',
                            content: formLayout.tooltip,
                          },
                        },
                        { default: () => h('i', { class: 'el-icon-info' }, {}) }
                      ),
                    ],
                  }
                ),
              // label colon
              formLayout.label &&
                h(
                  'span',
                  {
                    class: `${prefixCls}-colon`,
                  },
                  { default: () => [formLayout.colon ? ':' : ''] }
                ),
            ],
          }
        )

      const renderFeedback =
        !!formLayout.feedbackText &&
        formLayout.feedbackLayout !== 'popover' &&
        formLayout.feedbackLayout !== 'none' &&
        h(
          'div',
          {
            class: {
              [`${prefixCls}-${formLayout.feedbackStatus}-help`]:
                !!formLayout.feedbackStatus,
              [`${prefixCls}-help`]: true,
              [`${prefixCls}-help-enter`]: true,
              [`${prefixCls}-help-enter-active`]: true,
            },
          },
          { default: () => [resolveComponent(formLayout.feedbackText)] }
        )

      const renderExtra =
        formLayout.extra &&
        h(
          'div',
          { class: `${prefixCls}-extra` },
          { default: () => [formLayout.extra] }
        )
      const renderContent = h(
        'div',
        {
          class: {
            [`${prefixCls}-control`]: true,
            [`${prefixCls}-item-col-${formLayout.wrapperCol}`]:
              enableCol && !!formLayout.wrapperCol,
          },
        },
        {
          default: () => [
            h(
              'div',
              { class: `${prefixCls}-control-content` },
              {
                default: () => [
                  formLayout.addonBefore &&
                    h(
                      'div',
                      { class: `${prefixCls}-addon-before` },
                      {
                        default: () => [
                          resolveComponent(formLayout.addonBefore),
                        ],
                      }
                    ),
                  h(
                    'div',
                    {
                      class: {
                        [`${prefixCls}-control-content-component`]: true,
                        [`${prefixCls}-control-content-component-has-feedback-icon`]:
                          !!formLayout.feedbackIcon,
                      },
                      style: wrapperStyle,
                    },
                    {
                      default: () => [
                        formatChildren,
                        formLayout.feedbackIcon &&
                          h(
                            'div',
                            { class: `${prefixCls}-feedback-icon` },
                            {
                              default: () => [
                                typeof formLayout.feedbackIcon === 'string'
                                  ? h(
                                      'i',
                                      { class: formLayout.feedbackIcon },
                                      {}
                                    )
                                  : resolveComponent(formLayout.feedbackIcon),
                              ],
                            }
                          ),
                      ],
                    }
                  ),
                  formLayout.addonAfter &&
                    h(
                      'div',
                      { class: `${prefixCls}-addon-after` },
                      {
                        default: () => [
                          resolveComponent(formLayout.addonAfter),
                        ],
                      }
                    ),
                ],
              }
            ),
            renderFeedback,
            renderExtra,
          ],
        }
      )

      return h(
        'div',
        {
          style: attrs.style as string | undefined,
          class: {
            [`${prefixCls}`]: true,
            [`${prefixCls}-layout-${formLayout.layout}`]: true,
            [`${prefixCls}-${formLayout.feedbackStatus}`]:
              !!formLayout.feedbackStatus,
            [`${prefixCls}-feedback-has-text`]: !!formLayout.feedbackText,
            [`${prefixCls}-size-${formLayout.size}`]: !!formLayout.size,
            [`${prefixCls}-feedback-layout-${formLayout.feedbackLayout}`]:
              !!formLayout.feedbackLayout,
            [`${prefixCls}-fullness`]:
              !!formLayout.fullness || !!formLayout.feedbackIcon,
            [`${prefixCls}-active`]: active.value,
            [`${prefixCls}-label-align-${formLayout.labelAlign}`]: true,
            [`${prefixCls}-control-align-${formLayout.wrapperAlign}`]: true,
            [`${prefixCls}-label-wrap`]: !!formLayout.labelWrap,
            [`${prefixCls}-control-wrap`]: !!formLayout.wrapperWrap,
            [`${props.className}`]: !!props.className,
          },
          on: {
            '!focus': () => {
              if (formLayout.feedbackIcon) {
                active.value = true
              }
            },
            '!blur': () => {
              if (formLayout.feedbackIcon) {
                active.value = false
              }
            },
          },
        },
        {
          default: () => [renderLabel, renderContent],
        }
      )
    }
  },
})

export const FormItem = connect(
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
      const errorMessages = takeMessage()
      return {
        feedbackText: Array.isArray(errorMessages)
          ? errorMessages.join(', ')
          : errorMessages,
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
            : (Array.isArray(field.decorator) &&
                field.decorator[1]?.feedbackStatus) ||
              field.validateStatus,
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
