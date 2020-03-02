import { Schema } from '../'

describe('major scene', () => {
  test('basic field schema', () => {
    const s1 = new Schema({
        "type":"date",
        "title":"test header",
        "x-props": {"attr":'x'},
        "x-component-props": {"attr": 'xc', replace: true },
    }, undefined, 'test')

    expect(s1.getExtendsComponentProps()).toEqual({ attr: 'xc', replace: true })    
    expect(s1.getExtendsVisible()).toEqual(undefined)
    expect(s1.getExtendsDisplay()).toEqual(undefined)
    expect(s1.getExtendsEditable()).toEqual(undefined)

    const s2 = new Schema({
        "type":"date",
        "title":"test header",
    }, undefined, 'test')

    s2.visible = true
    s2.display = true
    s2.editable = true

    expect(s2.getExtendsVisible()).toEqual(true)
    expect(s2.getExtendsDisplay()).toEqual(true)
    expect(s2.getExtendsEditable()).toEqual(true)

    const s3 = new Schema({
        "type":"date",
        "title":"test header",
        "x-props": { visible: 'x', display: 'x', editable: 'x' },
        "x-component-props": {},
    }, undefined, 'test')

    expect(s3.getExtendsVisible()).toEqual('x')
    expect(s3.getExtendsDisplay()).toEqual('x')
    expect(s3.getExtendsEditable()).toEqual('x')

    const s4 = new Schema({
        "type":"date",
        "title":"test header",
        "x-props": {},
        "x-component-props": { visible: 'xc', display: 'xc', editable: 'xc' },
    }, undefined, 'test')

    expect(s4.getExtendsVisible()).toEqual('xc')
    expect(s4.getExtendsDisplay()).toEqual('xc')
    expect(s4.getExtendsEditable()).toEqual('xc')

    const s5 = new Schema({
        "type":"date",
        "title":"test header",
        "x-props": { visible: 'x', display: 'x', editable: 'x' },
        "x-component-props": { visible: 'xc', display: 'xc', editable: 'xc' },
    }, undefined, 'test')

    s5.visible = true
    s5.display = true
    s5.editable = true

    expect(s5.getExtendsVisible()).toEqual(true)
    expect(s5.getExtendsDisplay()).toEqual(true)
    expect(s5.getExtendsEditable()).toEqual(true)
  })

  test('labelCol and wrapperCol(without filter)', () => {
    const s = new Schema({
        "type":"date",
        "title":"test header",
        "x-props": { "labelCol": 2, "wrapperCol": 22 },
        "x-component-props": { "labelCol": 6, "wrapperCol": 18 },
    }, undefined, 'test')

    expect(s.getExtendsComponentProps()).toEqual({
      "labelCol": 6, "wrapperCol": 18
    })    
  })

  test('labelCol and wrapperCol(with filter)', () => {
    const s = new Schema({
        "type":"date",
        "title":"test header",
        "x-props": { "labelCol": 2, "wrapperCol": 22 },
        "x-component-props": { "labelCol": 6, "wrapperCol": 18 },
    }, undefined, 'test')

    expect(s.getExtendsComponentProps()).toEqual({ "labelCol": 6, "wrapperCol": 18 })    
  })

  test('deprecate x-item-props', () => {
    const s1 = new Schema({
        "type":"date",
        "title":"test header",
    }, undefined, 'test')

    expect(s1.getExtendsItemProps()).toEqual({})

    const s2 = new Schema({
        "type":"date",
        "title":"test header",
        "x-item-props": { hello: 'world' },
    }, undefined, 'test')
    expect(s2.getExtendsItemProps()).toEqual({ hello: 'world' })
  })  
})
