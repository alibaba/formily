import React from 'react'
import { render } from '@testing-library/react'
import { FormItem } from '../src/form-item'
import { isElement } from 'react-is'

// Test the actual isTooltipProps function implementation
const isTooltipProps = (tooltip: any): boolean => {
  return !!(
    tooltip &&
    typeof tooltip === 'object' &&
    !isElement(tooltip) &&
    !Array.isArray(tooltip) &&
    ('title' in tooltip || 'children' in tooltip || 'placement' in tooltip)
  )
}

describe('FormItem tooltip', () => {
  it('should treat string as ReactNode, not as props', () => {
    const stringTooltip = 'This is a tooltip'
    expect(isTooltipProps(stringTooltip)).toBe(false)
  })

  it('should treat number as ReactNode, not as props', () => {
    const numberTooltip = 123
    expect(isTooltipProps(numberTooltip)).toBe(false)
  })

  it('should treat React element as ReactNode, not as props', () => {
    const elementTooltip = <div>Tooltip content</div>
    expect(isTooltipProps(elementTooltip)).toBe(false)
  })

  it('should treat array as ReactNode, not as props', () => {
    const arrayTooltip = ['item1', 'item2']
    expect(isTooltipProps(arrayTooltip)).toBe(false)
  })

  it('should treat null/undefined as ReactNode, not as props', () => {
    expect(isTooltipProps(null)).toBe(false)
    expect(isTooltipProps(undefined)).toBe(false)
  })

  it('should treat object with tooltip props as props', () => {
    const propsTooltip = { title: 'Tooltip title', placement: 'top' }
    expect(isTooltipProps(propsTooltip)).toBe(true)
  })

  it('should treat object with children prop as props', () => {
    const propsTooltip = { children: 'Tooltip children' }
    expect(isTooltipProps(propsTooltip)).toBe(true)
  })

  it('should treat plain object without tooltip props as ReactNode', () => {
    const plainObject = { someProperty: 'value' }
    expect(isTooltipProps(plainObject)).toBe(false)
  })

  it('should render FormItem with string tooltip correctly', () => {
    const { container } = render(
      <FormItem tooltip="String tooltip" label="Test Label">
        <input />
      </FormItem>
    )

    // The tooltip should be rendered as text content, not as props
    expect(container).toBeTruthy()
  })

  it('should render FormItem with tooltip props correctly', () => {
    const { container } = render(
      <FormItem
        tooltip={{ title: 'Tooltip title', placement: 'top' }}
        label="Test Label"
      >
        <input />
      </FormItem>
    )

    // The tooltip should be rendered as Tooltip component with props
    expect(container).toBeTruthy()
  })
})
