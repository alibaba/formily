import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import { isValid, isNum, isStr, isArr } from '@formily/shared'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

export interface IFormLayoutProps {
  prefix?: string
  className?: string
  style?: React.CSSProperties
  colon?: boolean
  labelAlign?: 'right' | 'left' | ('right' | 'left')[]
  wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number | number[]
  wrapperCol?: number | number[]
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?:
    | 'vertical'
    | 'horizontal'
    | 'inline'
    | ('vertical' | 'horizontal' | 'inline')[]
  direction?: 'rtl' | 'ltr'
  inset?: boolean
  shallow?: boolean
  tooltipLayout?: 'icon' | 'text'
  tooltipIcon?: React.ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  bordered?: boolean
  breakpoints?: number[]
}

interface IUseFormLayoutReactive {
  (props: IFormLayoutProps): {
    ref: React.MutableRefObject<HTMLDivElement>
    props: IFormLayoutProps
  }
}

export const FormLayoutDeepContext = createContext<IFormLayoutProps>(null)

export const FormLayoutShallowContext = createContext<IFormLayoutProps>(null)

export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)

export const useFormLayout = () => ({
  ...useFormDeepLayout(),
  ...useFormShallowLayout(),
})

const normalizeProps = (
  props: IFormLayoutProps
): IFormLayoutProps & { intervals: number[][] } => {
  const { breakpoints } = props

  const intervals = breakpoints.reduce((buf, cur, index, array) => {
    if (array.length === 1) {
      return [...buf, [0, cur], [cur, Infinity]]
    }
    if (index === array.length - 1) {
      return [...buf, [array[index], Infinity]]
    }
    if (index === 0) {
      return [...buf, [0, cur], [cur, array[index + 1]]]
    }
    return [...buf, [cur, array[index + 1]]]
  }, [])

  const normalize = (prop: any) => {
    if (isNum(prop) || isStr(prop)) {
      return intervals.map(() => prop)
    } else if (Array.isArray(prop)) {
      let lastVal: number
      return intervals.map((it, idx) => {
        const res = (isValid(prop[idx]) ? prop[idx] : lastVal) || 0
        lastVal = isValid(prop[idx]) ? prop[idx] : lastVal
        return res
      })
    } else {
      return undefined
    }
  }

  return {
    ...props,
    intervals,
    layout: normalize(props.layout),
    labelAlign: normalize(props.labelAlign),
    wrapperAlign: normalize(props.wrapperAlign),
    labelCol: normalize(props.labelCol),
    wrapperCol: normalize(props.wrapperCol),
  }
}

const useFormLayoutReactive: IUseFormLayoutReactive = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { breakpoints } = props
  if (!isArr(breakpoints)) {
    return { ref, props }
  }
  const [layoutProps, setLayout] = useState<IFormLayoutProps>({})
  const propsRef = useRef<IFormLayoutProps & { intervals: number[][] }>()
  const normalizedProps = normalizeProps(props)
  propsRef.current = normalizedProps
  const calculateProps = (target: HTMLElement) => {
    const { clientWidth } = target
    const {
      intervals,
      layout,
      labelAlign,
      wrapperAlign,
      labelCol,
      wrapperCol,
      ...otherProps
    } = propsRef.current
    const index = intervals.findIndex((interval) => {
      const [min, max] = interval
      if (clientWidth >= min && max > clientWidth) {
        return true
      }
    })
    const take = (v: any) => v?.[index] || v
    return {
      ...otherProps,
      layout: take(layout),
      labelAlign: take(labelAlign),
      wrapperAlign: take(wrapperAlign),
      labelCol: take(labelCol),
      wrapperCol: take(wrapperCol),
    }
  }

  const updateUI = () => {
    setLayout(calculateProps(ref.current))
  }

  useEffect(() => {
    updateUI()
  }, [])

  useLayoutEffect(() => {
    const observer = () => {
      updateUI()
    }
    const resizeObserver = new ResizeObserver(observer)
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }
    updateUI()
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return {
    ref,
    props: layoutProps,
  }
}

export const FormLayout: React.FC<IFormLayoutProps> & {
  useFormLayout: () => IFormLayoutProps
  useFormDeepLayout: () => IFormLayoutProps
  useFormShallowLayout: () => IFormLayoutProps
} = ({ shallow, children, prefix, className, style, ...otherProps }) => {
  const { ref, props } = useFormLayoutReactive(otherProps)
  const deepLayout = useFormDeepLayout()
  const formPrefixCls = usePrefixCls('form', { prefix })
  const layoutPrefixCls = usePrefixCls('formily-layout', { prefix })
  const layoutClassName = cls(
    layoutPrefixCls,
    {
      [`${formPrefixCls}-${props.layout}`]: true,
      [`${formPrefixCls}-rtl`]: props.direction === 'rtl',
      [`${formPrefixCls}-${props.size}`]: props.size,
    },
    className
  )
  const renderChildren = () => {
    const newDeepLayout = {
      ...deepLayout,
    }
    if (!shallow) {
      Object.assign(newDeepLayout, props)
    } else {
      if (props.size) {
        newDeepLayout.size = props.size
      }
      if (props.colon) {
        newDeepLayout.colon = props.colon
      }
    }
    return (
      <FormLayoutDeepContext.Provider value={newDeepLayout}>
        <FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
          {children}
        </FormLayoutShallowContext.Provider>
      </FormLayoutDeepContext.Provider>
    )
  }
  return (
    <div ref={ref} className={layoutClassName} style={style}>
      {renderChildren()}
    </div>
  )
}

FormLayout.defaultProps = {
  shallow: true,
}

FormLayout.useFormDeepLayout = useFormDeepLayout
FormLayout.useFormShallowLayout = useFormShallowLayout
FormLayout.useFormLayout = useFormLayout

export default FormLayout
