import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Index from '../index'

const renderer = new ShallowRenderer()

test('shoud correct render APP', () => {
  const _props = {
    renderEngine: class extends React.Component {}
  }
  renderer.render(<Index {..._props} />)
  const result = renderer.getRenderOutput()
  const matchProps = result.props.children.props
  expect(matchProps).toHaveProperty('renderEngine')
})
