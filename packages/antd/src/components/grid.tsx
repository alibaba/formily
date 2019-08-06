import React, { Component, Children, cloneElement } from 'react'
import cx from 'classnames'
import { toArr } from '@uform/utils'
import { IColProps, IRowProps } from '../type'

export class Row extends Component<IRowProps> {
  public static defaultProps = {
    prefix: 'ant-',
    pure: false,
    fixed: false,
    gutter: 0,
    wrap: false,
    component: 'div'
  }

  public render() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      prefix,
      pure,
      wrap,
      fixed,
      gutter,
      fixedWidth,
      align,
      justify,
      hidden,
      className,
      component: Tag,
      children,
      ...others
    } = this.props
    /* eslint-enable @typescript-eslint/no-unused-vars */

    let hiddenClassObj
    if (hidden === true) {
      hiddenClassObj = { [`${prefix}row-hidden`]: true }
    } else if (typeof hidden === 'string') {
      hiddenClassObj = { [`${prefix}row-${hidden}-hidden`]: !!hidden }
    } else if (Array.isArray(hidden)) {
      hiddenClassObj = hidden.reduce((ret, point) => {
        ret[`${prefix}row-${point}-hidden`] = !!point
        return ret
      }, {})
    }

    const newClassName = cx({
      [`${prefix}row`]: true,
      [`${prefix}row-wrap`]: wrap,
      [`${prefix}row-fixed`]: fixed,
      [`${prefix}row-fixed-${fixedWidth}`]: !!fixedWidth,
      [`${prefix}row-justify-${justify}`]: !!justify,
      [`${prefix}row-align-${align}`]: !!align,
      ...hiddenClassObj,
      [className]: !!className
    })

    let newChildren = toArr(children)
    const gutterNumber = parseInt(gutter, 10)

    if (gutterNumber !== 0) {
      const halfGutterString = `${gutterNumber / 2}px`
      others.style = {
        marginLeft: `-${halfGutterString}`,
        marginRight: `-${halfGutterString}`,
        ...(others.style || {})
      }
      newChildren = Children.map(children, (child: React.ReactElement) => {
        if (
          child &&
          child.type &&
          typeof child.type === 'function' &&
          (child.type as any).isNextCol
        ) {
          const newChild = cloneElement(child, {
            style: {
              paddingLeft: halfGutterString,
              paddingRight: halfGutterString,
              ...(child.props.style || {})
            }
          })
          return newChild
        }

        return child
      })
    }

    return (
      <Tag role={'row'} className={newClassName} {...others}>
        {newChildren}
      </Tag>
    )
  }
}

const breakPoints = ['xxs', 'xs', 's', 'm', 'l', 'xl']

export class Col extends Component<IColProps> {
  public static isNextCol = true

  public static defaultProps = {
    prefix: 'ant-',
    pure: false,
    component: 'div'
  }

  public render() {
    const {
      prefix,
      pure,
      span,
      offset,
      fixedSpan,
      fixedOffset,
      hidden,
      align,
      xxs,
      xs,
      s,
      m,
      l,
      xl,
      component: Tag,
      className,
      children,
      ...others
    } = this.props

    const pointClassObj = breakPoints.reduce((ret, point) => {
      let pointProps: { span?: string; offset?: string } = {}
      if (typeof this.props[point] === 'object') {
        pointProps = this.props[point]
      } else {
        pointProps.span = this.props[point]
      }

      ret[`${prefix}col-${point}-${pointProps.span}`] = !!pointProps.span
      ret[
        `${prefix}col-${point}-offset-${pointProps.offset}`
      ] = !!pointProps.offset
      return ret
    }, {})

    let hiddenClassObj
    if (hidden === true) {
      hiddenClassObj = { [`${prefix}col-hidden`]: true }
    } else if (typeof hidden === 'string') {
      hiddenClassObj = { [`${prefix}col-${hidden}-hidden`]: !!hidden }
    } else if (Array.isArray(hidden)) {
      hiddenClassObj = hidden.reduce((ret, point) => {
        ret[`${prefix}col-${point}-hidden`] = !!point
        return ret
      }, {})
    }

    const classes = cx({
      [`${prefix}col`]: true,
      [`${prefix}col-${span}`]: !!span,
      [`${prefix}col-fixed-${fixedSpan}`]: !!fixedSpan,
      [`${prefix}col-offset-${offset}`]: !!offset,
      [`${prefix}col-offset-fixed-${fixedOffset}`]: !!fixedOffset,
      [`${prefix}col-${align}`]: !!align,
      ...pointClassObj,
      ...hiddenClassObj,
      [className]: className
    })

    return (
      <Tag role={'gridcell'} className={classes} {...others}>
        {children}
      </Tag>
    )
  }
}
