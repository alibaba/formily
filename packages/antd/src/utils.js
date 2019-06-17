import React from 'react'
import { Select as AntSelect } from 'antd'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import MoveTo from 'moveto'
import { isFn } from '@uform/utils'
export * from '@uform/utils'
const WrapSelect = styled(
  class extends React.Component {
    render() {
      const { dataSource = [], ...others } = this.props
      const children = dataSource.map(item => {
        const { label, value, ...others } = item
        return (
          <AntSelect.Option key={value} {...others} label={label} value={value}>
            {label}
          </AntSelect.Option>
        )
      })
      return (
        <AntSelect className={this.props.className} {...others}>
          {children}
        </AntSelect>
      )
    }
  }
)`
  min-width: 100px;
  width:100%;
`

const Text = styled(props => {
  let value
  if (props.dataSource && props.dataSource.length) {
    let find = props.dataSource.filter(({ value }) =>
      Array.isArray(props.value)
        ? props.value.indexOf(value) > -1
        : props.value === value
    )
    value = find.map(item => item.label).join(' , ')
  } else {
    value = Array.isArray(props.value)
      ? props.value.join(' ~ ')
      : String(
        props.value === undefined || props.value === null ? '' : props.value
      )
  }
  return (
    <div className={`${props.className} ${props.size || ''} text-field`}>
      {value || 'N/A'}
      {props.addonAfter ? ' ' + props.addonAfter : ''}
    </div>
  )
})`
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  font-size: 13px;
  color: #333;
  &.small {
    height: 24px;
    line-height: 24px;
  }
  &.large {
    height: 40px;
    line-height: 40px;
  }
`

export const StateLoading = Target => {
  return class Select extends React.Component {
    componentDidMount() {
      if (this.wrapper) {
        this.wrapperDOM = ReactDOM.findDOMNode(this.wrapper)
        this.mapState()
      }
    }

    componentDidUpdate() {
      this.mapState()
    }

    mapState() {
      const { state } = this.props
      const loadingName = 'anticon-spin'
      const iconSizeClassNames = [
        'xxs',
        'xs',
        'small',
        'medium',
        'large',
        'xl',
        'xxl',
        'xxxl'
      ]
      this.classList = this.classList || []
      if (this.wrapperDOM) {
        const icon = this.wrapperDOM.querySelector('.anticon')
        if (!icon || !icon.classList) return
        if (state === 'loading') {
          icon.classList.forEach(className => {
            if (className.indexOf('anticon-') > -1) {
              if (
                className !== loadingName &&
                iconSizeClassNames.every(val => `anticon-${val}` !== className)
              ) {
                icon.classList.remove(className)
                this.classList.push(className)
              }
            }
          })
          if (!icon.classList.contains(loadingName)) {
            icon.classList.add(loadingName)
          }
        } else {
          icon.classList.remove(loadingName)
          this.classList.forEach(className => {
            icon.classList.add(className)
          })
          this.classList = []
        }
      }
    }

    render() {
      return (
        <Target
          ref={inst => {
            if (inst) {
              this.wrapper = inst
            }
          }}
          {...this.props}
        />
      )
    }
  }
}

const Select = StateLoading(WrapSelect)

export const acceptEnum = component => {
  return ({ dataSource, ...others }) => {
    if (dataSource || others.showSearch) {
      return React.createElement(Select, { dataSource, ...others })
    } else {
      return React.createElement(component, others)
    }
  }
}

export const mapStyledProps = (props, { loading, size }) => {
  if (loading) {
    props.state = props.state || 'loading'
  }
  if (size) {
    props.size = size
  }
}

export const mapTextComponent = (Target, props, { editable, name }) => {
  if (editable !== undefined) {
    if (isFn(editable)) {
      if (!editable(name)) {
        return Text
      }
    } else if (editable === false) {
      return Text
    }
  }
  return Target
}

export const compose = (...args) => {
  return (payload, ...extra) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra)
    }, payload)
  }
}

export const transformDataSourceKey = (component, dataSourceKey) => {
  return ({ dataSource, ...others }) => {
    return React.createElement(component, {
      [dataSourceKey]: dataSource,
      ...others
    })
  }
}

export const moveTo = element => {
  if (!element) return
  if (element.scrollIntoView) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'start'
    })
  } else {
    new MoveTo().move(element.getBoundingClientRect().top)
  }
}
