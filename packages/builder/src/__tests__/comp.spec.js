import React from 'react'
import renderer from 'react-test-renderer'
import * as Comp from '../utils/comp'

test('shoud correct render comp', () => {
  const comp1 = renderer.create(<Comp.Divider />)
  const comp2 = renderer.create(
    <Comp.Header className="aa" theme={{ whiteColor: '#fff' }}>
      hello
    </Comp.Header>
  )
  const comp3 = renderer.create(
    <Comp.CustomIcon
      className="aaa"
      iconUrl="https://www.tmall.com"
      width="15"
      height="15"
    />
  )
  let tree1 = comp1.toJSON()
  let tree2 = comp2.toJSON()
  let tree3 = comp3.toJSON()
  expect(tree1).toMatchSnapshot()
  expect(tree2).toMatchSnapshot()
  expect(tree3).toMatchSnapshot()
})
