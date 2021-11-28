import React from 'react'
import { Box } from '@alifd/next'
import { isNumberLike } from '@formily/shared'
import { toArray, usePrefixCls } from '../__builtins__'
import { useFormLayout } from '../form-layout'
export interface ISpaceProps {
  prefix?: string
  className?: string
  style?: React.CSSProperties
  size?: number | 'small' | 'large' | 'middle'
  direction?: 'horizontal' | 'vertical'
  // No `stretch` since many components do not support that.
  align?: 'start' | 'end' | 'center' | 'baseline'
  wrap?: boolean
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

export const Space: React.FC<ISpaceProps> = ({
  direction,
  size,
  align,
  ...props
}) => {
  const layout = useFormLayout()
  const prefix = usePrefixCls('space', props)
  const getDirection = () => {
    if (direction === 'horizontal') {
      return 'row'
    } else {
      return 'column'
    }
  }
  const getAlign = () => {
    if (align === 'start') {
      return 'flex-start'
    } else if (align === 'end') {
      return 'flex-end'
    } else {
      return 'center'
    }
  }
  const _size = size ?? layout?.spaceGap ?? 8
  const _align = getAlign()
  return (
    <Box
      {...props}
      spacing={isNumberLike(_size) ? _size : spaceSize[_size] || 8}
      style={{
        alignItems: _align,
        display: 'inline-flex',
        ...props.style,
      }}
      align={_align}
      direction={getDirection()}
    >
      {toArray(props.children, { keepEmpty: true }).map((child, index) => (
        <div className={`${prefix}-item`} key={index}>
          {child}
        </div>
      ))}
    </Box>
  )
}

Space.defaultProps = {
  direction: 'horizontal',
  align: 'start',
}

export default Space
