import { Schema } from '../'

describe('major scene', () => {
  test('basic field schema', () => {
    const s1 = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-props': { attr: 'x' },
        'x-component-props': { attr: 'xc', replace: true }
      },
      undefined,
      'test'
    )

    expect(s1.getExtendsComponentProps()).toEqual({ attr: 'xc', replace: true })
    expect(s1.getExtendsVisible()).toEqual(undefined)
    expect(s1.getExtendsDisplay()).toEqual(undefined)
    expect(s1.getExtendsEditable()).toEqual(undefined)

    const s2 = new Schema(
      {
        type: 'date',
        title: 'test header'
      },
      undefined,
      'test'
    )

    s2.visible = true
    s2.display = true
    s2.editable = true

    expect(s2.getExtendsVisible()).toEqual(true)
    expect(s2.getExtendsDisplay()).toEqual(true)
    expect(s2.getExtendsEditable()).toEqual(true)

    const s3 = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-props': { visible: 'x', display: 'x', editable: 'x' },
        'x-component-props': {}
      },
      undefined,
      'test'
    )

    expect(s3.getExtendsVisible()).toEqual('x')
    expect(s3.getExtendsDisplay()).toEqual('x')
    expect(s3.getExtendsEditable()).toEqual('x')

    const s4 = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-props': {},
        'x-component-props': { visible: 'xc', display: 'xc', editable: 'xc' }
      },
      undefined,
      'test'
    )

    expect(s4.getExtendsVisible()).toEqual('xc')
    expect(s4.getExtendsDisplay()).toEqual('xc')
    expect(s4.getExtendsEditable()).toEqual('xc')

    const s5 = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-props': { visible: 'x', display: 'x', editable: 'x' },
        'x-component-props': { visible: 'xc', display: 'xc', editable: 'xc' }
      },
      undefined,
      'test'
    )

    s5.visible = true
    s5.display = true
    s5.editable = true

    expect(s5.getExtendsVisible()).toEqual(true)
    expect(s5.getExtendsDisplay()).toEqual(true)
    expect(s5.getExtendsEditable()).toEqual(true)
  })

  test('labelCol and wrapperCol(without filter)', () => {
    const s = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-props': { labelCol: 2, wrapperCol: 22 },
        'x-component-props': { labelCol: 6, wrapperCol: 18 }
      },
      undefined,
      'test'
    )

    expect(s.getExtendsComponentProps()).toEqual({
      labelCol: 6,
      wrapperCol: 18
    })
  })

  test('labelCol and wrapperCol(with filter)', () => {
    const s = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-props': { labelCol: 2, wrapperCol: 22 },
        'x-component-props': { labelCol: 6, wrapperCol: 18 }
      },
      undefined,
      'test'
    )

    expect(s.getExtendsComponentProps()).toEqual({
      labelCol: 6,
      wrapperCol: 18
    })
  })

  test('x-index', () => {
    // 全排序
    const s1 = new Schema({
      type: 'object',
      properties: {
        p1: {
          'x-index': 1
        },
        p2: {
          'x-index': 3
        },
        p3: {
          'x-index': 2
        },
        p4: {
          'x-index': 4
        },
        p5: {
          'x-index': 5
        },
        p6: {
          'x-index': 6
        },
        p7: {
          'x-index': 7
        },
        p8: {
          'x-index': 8
        },
        p9: {
          'x-index': 9
        },
        p10: {
          'x-index': 10
        },
        p11: {
          'x-index': 11
        }
      }
    })

    expect(s1.getOrderProperties().map(k => k.key)).toEqual([
      'p1',
      'p3',
      'p2',
      'p4',
      'p5',
      'p6',
      'p7',
      'p8',
      'p9',
      'p10',
      'p11',
    ])

    // 多排序
    const s2 = new Schema({
      type: 'object',
      properties: {
        p1: {
          'x-index': 1
        },
        p2: {
          'x-index': 5
        },
        p3: {
          'x-index': 7
        },
        p4: {},
        p5: {
          'x-index': 2
        }
      }
    })

    expect(s2.getOrderProperties().map(k => k.key)).toEqual([
      'p1',
      'p5',
      'p2',
      'p3',
      'p4'
    ])

    // 多无序
    const s3 = new Schema({
      type: 'object',
      properties: {
        p1: {},
        p2: {
          'x-index': 3
        },
        p3: {},
        p4: {},
        p5: {}
      }
    })

    expect(s3.getOrderProperties().map(k => k.key)).toEqual([
      'p2',
      'p1',
      'p3',
      'p4',
      'p5'
    ])

    // 交叉顺序
    const s4 = new Schema({
      type: 'object',
      properties: {
        p1: {
          'x-index': 2
        },
        p2: {},
        p3: {
          'x-index': 0
        },
        p4: {
          'x-index': 1
        },
        p5: {}
      }
    })

    expect(s4.getOrderProperties().map(k => k.key)).toEqual([
      'p3',
      'p4',
      'p1',
      'p2',
      'p5'
    ])

    // 全无序
    const s5 = new Schema({
      type: 'object',
      properties: {
        p1: {},
        p2: {},
        p3: {},
        p4: {},
        p5: {}
      }
    })

    expect(s5.getOrderProperties().map(k => k.key)).toEqual([
      'p1',
      'p2',
      'p3',
      'p4',
      'p5'
    ])
  })

  test('deprecate x-item-props', () => {
    const s1 = new Schema(
      {
        type: 'date',
        title: 'test header'
      },
      undefined,
      'test'
    )

    expect(s1.getExtendsItemProps()).toEqual({})

    const s2 = new Schema(
      {
        type: 'date',
        title: 'test header',
        'x-item-props': { hello: 'world' }
      },
      undefined,
      'test'
    )
    expect(s2.getExtendsItemProps()).toEqual({ hello: 'world' })
  })
})
