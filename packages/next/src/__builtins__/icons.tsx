import React from 'react'
import cls from 'classnames'
import { usePrefixCls } from './hooks/usePrefixCls'
export type IconProps = React.HTMLAttributes<SVGSVGElement> & {
  ref?: React.ForwardedRef<SVGSVGElement>
}

export type IconType = React.ForwardRefExoticComponent<IconProps>

export const Icon: IconType = React.forwardRef((props, ref) => {
  const prefix = usePrefixCls('formily-icon')
  return (
    <svg
      {...props}
      ref={ref}
      className={cls(prefix, props.className)}
      style={{
        ...props.style,
        cursor: props.onClick ? 'pointer' : '',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      viewBox="64 64 896 896"
      fill="currentColor"
      width="1em"
      height="1em"
      focusable="false"
      aria-hidden="true"
    >
      {props.children}
    </svg>
  )
})

export const MenuOutlinedIcon: IconType = React.forwardRef((props, ref) => (
  <Icon {...props} ref={ref}>
    <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
  </Icon>
))

export const PlusOutlinedIcon: IconType = React.forwardRef((props, ref) => (
  <Icon {...props} ref={ref}>
    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
    <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
  </Icon>
))

export const UpOutlinedIcon: IconType = React.forwardRef((props, ref) => (
  <Icon {...props} ref={ref}>
    <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
  </Icon>
))

export const DownOutlinedIcon: IconType = React.forwardRef((props, ref) => (
  <Icon {...props} ref={ref}>
    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
  </Icon>
))

export const DeleteOutlinedIcon: IconType = React.forwardRef((props, ref) => (
  <Icon {...props} ref={ref}>
    <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
  </Icon>
))
