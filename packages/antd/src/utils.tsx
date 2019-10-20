import React from 'react'
import { Select as AntSelect, Icon } from 'antd'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isFn } from '@uform/utils'
import { IConnectProps, IFieldProps } from '@uform/react'
export * from '@uform/utils'

export interface ISelectProps {
  dataSource: any[]
  className: string
}

export interface IElement extends Element {
  oldHTML?: string
}
const MoveTo = typeof window !== 'undefined' ? require('moveto') : null
const WrapSelect = styled(
  class extends React.Component<ISelectProps> {
    public render() {
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
  width: 100%;
`

const Text = styled(props => {
  let value
  if (props.dataSource && props.dataSource.length) {
    const find = props.dataSource.filter(({ value }) =>
      Array.isArray(props.value)
        ? props.value.some(val => val == value)
        : props.value == value
    )
    value = find.reduce((buf, item, index) => {
      return buf.concat(item.label, index < find.length - 1 ? ', ' : '')
    }, [])
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
      {props.innerAfter ? ' ' + props.innerAfter : ''}
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

export interface IStateLoadingProps {
  state?: string
  dataSource: any[]
}

const loadingSvg =
  '<svg viewBox="0 0 1024 1024" class="anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>'

export const StateLoading = (Target: React.ComponentClass) => {
  return class Select extends React.Component<IStateLoadingProps> {
    public wrapper: React.ReactInstance
    public wrapperDOM: HTMLElement
    public classList: string[]

    public componentDidMount() {
      if (this.wrapper) {
        this.wrapperDOM = ReactDOM.findDOMNode(this.wrapper)
        this.mapState()
      }
    }

    public componentDidUpdate() {
      this.mapState()
    }

    public render() {
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

    public mapState() {
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
        const icon: IElement = this.wrapperDOM.querySelector('.anticon')
        if (!icon || !icon.classList) {
          return
        }

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
          if (icon.innerHTML) {
            icon.oldHTML = icon.innerHTML
            icon.innerHTML = loadingSvg
          }
          if (!icon.classList.contains(loadingName)) {
            icon.classList.add(loadingName)
          }
        } else {
          icon.classList.remove(loadingName)
          this.classList.forEach(className => {
            icon.classList.add(className)
          })
          if (icon.oldHTML) {
            icon.innerHTML = icon.oldHTML
          }
          this.classList = []
        }
      }
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

export const mapStyledProps = (
  props: IConnectProps,
  { loading, size }: IFieldProps
) => {
  if (loading) {
    props.state = props.state || 'loading'
    props.suffix = props.suffix || (
      <Icon type="loading" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
    )
  } else {
    props.suffix = props.suffix || <span />
  }
  if (size) {
    props.size = size
  }
}

export const mapTextComponent = (
  Target: React.ComponentClass,
  props,
  {
    editable,
    name
  }: { editable: boolean | ((name: string) => boolean); name: string }
): React.ComponentClass => {
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
  if (!element || !MoveTo) {
    return
  }
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
