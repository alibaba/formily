import React from 'react'
import { Box } from '@alifd/next'
import { isNumberLike } from '@formily/shared'
import { toArray, usePrefixCls } from '../__builtins__'
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
  const prefix = usePrefixCls('space', props)
  const getDireaction = () => {
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
  return (
    <Box
      {...props}
      spacing={isNumberLike(size) ? size : spaceSize[size] || 8}
      style={{
        alignItems: 'center',
        display: 'inline-flex',
        ...props.style,
      }}
      align={getAlign()}
      direction={getDireaction()}
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
  size: 8,
}

export default Space
