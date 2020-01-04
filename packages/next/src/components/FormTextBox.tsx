import React, { useRef, useLayoutEffect } from 'react'
import { createControllerBox, Schema } from '@uform/react-schema-renderer'
import { IFormTextBox } from '../types'
import { toArr } from '@uform/shared'
import { CompatNextFormItem } from '../compat/FormItem'
import styled from 'styled-components'

export const FormTextBox = createControllerBox<IFormTextBox>(
  'text-box',
  styled(({ props, form, className, children }) => {
    const schema = new Schema(props)
    const {
      title,
      help,
      text,
      name,
      extra,
      gutter,
      style,
      ...componentProps
    } = Object.assign(
      {
        gutter: 5
      },
      schema.getExtendsComponentProps()
    )
    const ref: React.RefObject<HTMLDivElement> = useRef()
    const arrChildren = toArr(children)
    const split = text.split('%s')
    let index = 0
    useLayoutEffect(() => {
      if (ref.current) {
        const elements = ref.current.querySelectorAll('.text-box-field')
        const syncLayouts = Array.prototype.map.call(
          elements,
          (el: HTMLElement) => {
            return [
              el,
              () => {
                const ctrl = el.querySelector(
                  '.next-form-item-control:first-child'
                )
                if (ctrl) {
                  const editable = form.getFormState(state => state.editable)
                  el.style.width = editable
                    ? ctrl.getBoundingClientRect().width + 'px'
                    : 'auto'
                }
              }
            ]
          }
        )
        syncLayouts.forEach(([el, handler]) => {
          el.addEventListener('DOMSubtreeModified', handler)
        })

        return () => {
          syncLayouts.forEach(([el, handler]) => {
            el.removeEventListener('DOMSubtreeModified', handler)
          })
        }
      }
    }, [])
    const newChildren = split.reduce((buf, item, key) => {
      return buf.concat(
        item ? (
          <p
            key={index++}
            className="text-box-words"
            style={{
              marginRight: gutter / 2,
              marginLeft: gutter / 2,
              ...style
            }}
          >
            {item}
          </p>
        ) : null,
        arrChildren[key] ? (
          <div key={index++} className="text-box-field">
            {arrChildren[key]}
          </div>
        ) : null
      )
    }, [])

    const textChildren = (
      <div
        className={className}
        style={{
          marginRight: -gutter / 2,
          marginLeft: -gutter / 2
        }}
        ref={ref}
      >
        {newChildren}
      </div>
    )

    if (!title) return textChildren

    return (
      <CompatNextFormItem
        {...componentProps}
        label={title}
        help={help}
        extra={extra}
      >
        {textChildren}
      </CompatNextFormItem>
    )
  })`
    display: flex;
    .text-box-words:nth-child(1) {
      margin-left: 0;
    }
    .text-box-field {
      display: inline-block;
    }
    .next-form-item {
      margin-bottom: 0 !important;
    }
    .preview-text {
      text-align: center !important;
      white-space: nowrap;
    }
    .next-form-item-control {
      position: relative;
    }
  `
)
