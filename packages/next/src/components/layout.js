import React, { Component, useState, useEffect, useRef, Fragment } from 'react'
import {
  createVirtualBox,
  useFormController,
  createControllerBox,
  FormPath
} from '@uform/react'
import { toArr } from '@uform/utils'
import { Grid, Card, Step } from '@alifd/next'
import { FormConsumer, FormItem, FormProvider } from '../form'
import { useEva, createActions } from 'react-eva'
import styled from 'styled-components'
import cls from 'classnames'

const { Row, Col } = Grid

const normalizeCol = (col, _default = 0) => {
  if (!col) return _default
  return typeof col === 'object' ? col : { span: col }
}

export const FormLayoutItem = props =>
  React.createElement(
    FormConsumer,
    {},
    ({
      labelAlign,
      labelTextAlign,
      labelCol,
      wrapperCol,
      size,
      autoAddColon
    }) => {
      return React.createElement(
        FormItem,
        {
          labelAlign,
          labelTextAlign,
          labelCol,
          wrapperCol,
          autoAddColon,
          size,
          ...props
        },
        props.children
      )
    }
  )

export const FormLayout = createVirtualBox(
  'layout',
  ({ children, ...props }) => {
    return (
      <FormConsumer>
        {value => {
          let newValue = { ...value, ...props }
          let child =
            newValue.inline || newValue.className || newValue.style ? (
              <div
                className={cls(newValue.className, {
                  'next-form next-inline': !!newValue.inline
                })}
                style={newValue.style}
              >
                {children}
              </div>
            ) : (
              children
            )
          return <FormProvider value={newValue}>{child}</FormProvider>
        }}
      </FormConsumer>
    )
  }
)

export const FormItemGrid = createVirtualBox(
  'grid',
  class extends Component {
    renderFormItem(children) {
      const { title, description, help, name, extra, ...others } = this.props
      return React.createElement(
        FormLayoutItem,
        {
          label: title,
          noMinHeight: true,
          id: name,
          extra: description,
          help
        },
        children
      )
    }

    renderGrid() {
      let {
        children,
        cols,
        title,
        description,
        help,
        extra,
        ...props
      } = this.props
      children = toArr(children)
      cols = toArr(cols).map(col => normalizeCol(col))
      const childNum = children.length

      if (cols.length < childNum) {
        let offset = childNum - cols.length
        let lastSpan =
          24 -
          cols.reduce((buf, col) => {
            return (
              buf +
              Number(col.span ? col.span : 0) +
              Number(col.offset ? col.offset : 0)
            )
          }, 0)
        for (let i = 0; i < offset; i++) {
          cols.push(parseInt(offset / lastSpan))
        }
      }

      return (
        <Row {...props}>
          {children.reduce((buf, child, key) => {
            return child
              ? buf.concat(
                  <Col key={key} {...cols[key]}>
                    {child}
                  </Col>
                )
              : buf
          }, [])}
        </Row>
      )
    }

    render() {
      const { title } = this.props
      if (title) {
        return this.renderFormItem(this.renderGrid())
      } else {
        return this.renderGrid()
      }
    }
  }
)

export const FormCard = createVirtualBox(
  'card',
  styled(
    class extends Component {
      static defaultProps = {
        contentHeight: 'auto'
      }
      render() {
        const { children, className, ...props } = this.props
        return (
          <Card className={className} {...props}>
            {children}
          </Card>
        )
      }
    }
  )`
    margin-bottom: 30px;
    .next-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
  `
)

export const FormBlock = createVirtualBox(
  'block',
  styled(
    class extends Component {
      static defaultProps = {
        contentHeight: 'auto'
      }
      render() {
        const { children, className, ...props } = this.props
        return (
          <Card className={className} {...props}>
            {children}
          </Card>
        )
      }
    }
  )`
    margin-bottom: 0px;
    .next-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.next-card {
      border: none;
      padding: 0 15px;
      padding-bottom: 15px;
    }
  `
)

export const FormTextBox = createVirtualBox(
  'text-box',
  styled(
    ({
      title,
      description,
      help,
      gutter,
      className,
      text,
      name,
      extra,
      children,
      ...props
    }) => {
      const ref = useRef()
      const arrChildren = toArr(children)
      const split = text.split('%s')
      let index = 0
      useEffect(() => {
        if (ref.current) {
          const eles = ref.current.querySelectorAll('.text-box-field')
          eles.forEach(el => {
            const ctrl = el.querySelector(
              '.next-form-item-control>*:not(.next-form-item-space)'
            )
            if (ctrl) {
              el.style.width = getComputedStyle(ctrl).width
            }
          })
        }
      }, [])
      const newChildren = split.reduce((buf, item, key) => {
        return buf.concat(
          <span key={index++} className="text-box-words">
            {item}
          </span>,
          <div key={index++} className="text-box-field">
            {arrChildren[key]}
          </div>
        )
      }, [])

      if (!title)
        return (
          <div className={className} ref={ref}>
            {newChildren}
          </div>
        )

      return React.createElement(
        FormLayoutItem,
        {
          label: title,
          noMinHeight: true,
          id: name,
          extra: description,
          help
        },
        <div className={className} ref={ref}>
          {newChildren}
        </div>
      )
    }
  )`
    display: flex;
    .text-box-words {
      font-size: 12px;
      line-height: 28px;
      color: #333;
    }
    .text-box-field {
      display: inline-block;
      margin: 0 ${props => props.gutter || 10}px;
    }
  `
)

export const FormStep = createControllerBox(
  'form-step',
  ({ schema, children, form, broadcast, getSchema }) => {
    const names = children.map(({ props: { name } }) => name)
    const { actions, ...props } = schema['x-props'] || {}
    const ref = useRef()
    const [current, setCurrent] = useState(names.indexOf(props.current))
    const { implementActions } = useEva({ actions: actions })
    ref.current = current
    const setStep = index => {
      const name = names[index]
      if (name) {
        setCurrent(index)
        form.setFieldState(FormPath.match(`*(${names})`), state => {
          state.display = name === state.name
        })
      }
    }
    const getStepState = index => {
      if (index <= 0) return { type: 'step', state: -1 }
      if (index >= names.length - 1) return { type: 'step', state: 1 }
      return { type: 'step', state: 0 }
    }
    const setStepView = name => {
      const index = names.indexOf(name)
      setStep(index)
      broadcast.notify(getStepState(index))
    }
    const nextStepView = () => {
      setStep(ref.current + 1)
      broadcast.notify(getStepState(ref.current + 1))
    }
    const previousStepView = () => {
      setStep(ref.current - 1)
      broadcast.notify(getStepState(ref.current - 1))
    }
    implementActions({
      setStepView,
      nextStepView,
      previousStepView
    })
    const dispatch = useFormController(($, { setFieldState }) => {
      $('onFormMount').subscribe(() => {
        broadcast.notify(getStepState(ref.current))
      })
      $('onFieldInit', FormPath.match(`*(${names})`)).subscribe(() => {
        setFieldState(FormPath.match(`*(${names})`), state => {
          state.display = props.current === state.name
        })
      })
    })
    return (
      <Fragment>
        <Step {...props} current={current}>
          {children.map(
            ({ props: { name, schemaPath, children, ...props } }) => {
              const schema = getSchema(schemaPath)
              return (
                <Step.Item
                  {...schema['x-props']}
                  key={name}
                  onClick={() => dispatch('onStepClick', name)}
                />
              )
            }
          )}
        </Step>
        {children}
      </Fragment>
    )
  }
)

FormStep.createActions = () =>
  createActions('setStepView', 'nextStepView', 'previousStepView')

export const FormStepItem = createVirtualBox('form-step-item', props => {
  return <Fragment>{props.children}</Fragment>
})
