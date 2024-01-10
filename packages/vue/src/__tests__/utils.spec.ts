import { formatVue3VNodeData } from '../utils/formatVNodeData'

test('valid formatVNodeData', () => {
  const onClick = () => {}
  const ondblclick = () => {}

  const vNodeData = {
    class: [{ bar: false }, { 'test-component': true }],
    style: {
      border: '4px solid red',
      padding: '20px',
      borderRadius: '10px',
    },
    attrs: {
      id: 'foo',
    },
    props: {
      value: 'leader',
      user: {
        name: '张三',
        age: 18,
        sex: 1,
      },
    },
    domProps: {
      innerHTML: 'innerHTML - baz',
    },
    on: {
      click: onClick,
    },
    nativeOn: {
      dblclick: ondblclick,
    },
  }

  const vue3VNodeData = {
    class: [{ bar: false }, { 'test-component': true }],
    style: {
      border: '4px solid red',
      padding: '20px',
      borderRadius: '10px',
    },
    id: 'foo',
    value: 'leader',
    user: {
      name: '张三',
      age: 18,
      sex: 1,
    },
    innerHTML: 'innerHTML - baz',
    onClick,
    ondblclick,
  }

  expect(formatVue3VNodeData(vNodeData)).toEqual(vue3VNodeData)
})
