import { createForm } from '../'
import {
  onFieldValueChange,
  onFormInitialValuesChange,
  onFormValuesChange,
} from '../effects'
import { DataField } from '../types'
import { attach } from './shared'

test('create array field', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  expect(array.value).toEqual([])
  expect(array.push).toBeDefined()
  expect(array.pop).toBeDefined()
  expect(array.shift).toBeDefined()
  expect(array.unshift).toBeDefined()
  expect(array.move).toBeDefined()
  expect(array.moveDown).toBeDefined()
  expect(array.moveUp).toBeDefined()
  expect(array.insert).toBeDefined()
  expect(array.remove).toBeDefined()
})

test('array field methods', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
      value: [],
    })
  )
  array.push({ aa: 11 }, { bb: 22 })
  expect(array.value).toEqual([{ aa: 11 }, { bb: 22 }])
  array.pop()
  expect(array.value).toEqual([{ aa: 11 }])
  array.unshift({ cc: 33 })
  expect(array.value).toEqual([{ cc: 33 }, { aa: 11 }])
  array.remove(1)
  expect(array.value).toEqual([{ cc: 33 }])
  array.insert(1, { dd: 44 }, { ee: 55 })
  expect(array.value).toEqual([{ cc: 33 }, { dd: 44 }, { ee: 55 }])
  array.move(0, 2)
  expect(array.value).toEqual([{ dd: 44 }, { ee: 55 }, { cc: 33 }])
  array.shift()
  expect(array.value).toEqual([{ ee: 55 }, { cc: 33 }])
  array.moveDown(0)
  expect(array.value).toEqual([{ cc: 33 }, { ee: 55 }])
  array.moveUp(1)
  expect(array.value).toEqual([{ ee: 55 }, { cc: 33 }])
  array.move(1, 0)
  expect(array.value).toEqual([{ cc: 33 }, { ee: 55 }])
})

test('array field children state exchanges', () => {
  //注意：插入新节点，如果指定位置有节点，会丢弃，需要重新插入节点，主要是为了防止上一个节点状态对新节点状态产生污染
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createField({
      name: 'other',
      basePath: 'array',
    })
  )
  array.push({ value: 11 }, { value: 22 })
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.0',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.1',
    })
  )
  expect(array.value).toEqual([{ value: 11 }, { value: 22 }])
  expect(form.query('array.0.value').get('value')).toEqual(11)
  expect(form.query('array.1.value').get('value')).toEqual(22)
  expect(Object.keys(form.fields).sort()).toEqual([
    'array',
    'array.0.value',
    'array.1.value',
    'array.other',
  ])
  array.pop()
  expect(array.value).toEqual([{ value: 11 }])
  expect(form.query('array.0.value').get('value')).toEqual(11)
  expect(form.query('array.1.value').get('value')).toBeUndefined()
  array.unshift({ value: 33 })
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.0',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.1',
    })
  )
  expect(array.value).toEqual([{ value: 33 }, { value: 11 }])
  expect(form.query('array.0.value').get('value')).toEqual(33)
  expect(form.query('array.1.value').get('value')).toEqual(11)
  array.remove(1)
  expect(array.value).toEqual([{ value: 33 }])
  expect(form.query('array.0.value').get('value')).toEqual(33)
  expect(form.query('array.1.value').get('value')).toBeUndefined()
  array.insert(1, { value: 44 }, { value: 55 })
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.1',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.2',
    })
  )
  expect(array.value).toEqual([{ value: 33 }, { value: 44 }, { value: 55 }])
  expect(form.query('array.0.value').get('value')).toEqual(33)
  expect(form.query('array.1.value').get('value')).toEqual(44)
  expect(form.query('array.2.value').get('value')).toEqual(55)
  array.move(0, 2)
  expect(array.value).toEqual([{ value: 44 }, { value: 55 }, { value: 33 }])
  expect(form.query('array.0.value').get('value')).toEqual(44)
  expect(form.query('array.1.value').get('value')).toEqual(55)
  expect(form.query('array.2.value').get('value')).toEqual(33)
  array.move(2, 0)
  expect(array.value).toEqual([{ value: 33 }, { value: 44 }, { value: 55 }])
  expect(form.query('array.0.value').get('value')).toEqual(33)
  expect(form.query('array.1.value').get('value')).toEqual(44)
  expect(form.query('array.2.value').get('value')).toEqual(55)
})

test('array field move up/down then fields move', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.0',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.1',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.2',
    })
  )
  attach(
    form.createField({
      name: 'value',
      basePath: 'array.3',
    })
  )
  const line0 = form.fields['array.0.value']
  const line1 = form.fields['array.1.value']
  const line2 = form.fields['array.2.value']
  const line3 = form.fields['array.3.value']

  array.push({ value: '0' }, { value: '1' }, { value: '2' }, { value: '3' })

  array.move(0, 3)

  // 1,2,3,0
  expect(form.fields['array.0.value']).toBe(line1)
  expect(form.fields['array.1.value']).toBe(line2)
  expect(form.fields['array.2.value']).toBe(line3)
  expect(form.fields['array.3.value']).toBe(line0)

  array.move(3, 1)

  // 1,0,2,3
  expect(form.fields['array.0.value']).toBe(line1)
  expect(form.fields['array.1.value']).toBe(line0)
  expect(form.fields['array.2.value']).toBe(line2)
  expect(form.fields['array.3.value']).toBe(line3)
})

// 重现 issues #3932 , 补全 PR #3992 测试用例
test('lazy array field query each', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )

  const init = Array.from({ length: 6 }).map((_, i) => ({ value: i }))
  array.setValue(init)

  // page1: 0, 1
  // page2: 2, 3 untouch
  // page3: 4, 5
  init.forEach((item) => {
    const len = item.value
    //2, 3
    if (len >= 2 && len <= 3) {
    } else {
      // 0, 1, 4, 5
      attach(
        form.createField({
          name: 'value',
          basePath: 'array.' + len,
        })
      )
    }
  })

  array.insert(1, { value: '11' })
  expect(() => form.query('*').take()).not.toThrowError()
  expect(Object.keys(form.fields)).toEqual([
    'array',
    'array.0.value',
    'array.5.value',
    'array.2.value',
    'array.6.value',
  ])
})

test('void children', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createField({
      name: 'other',
      basePath: 'array',
    })
  )
  attach(
    form.createVoidField({
      name: 0,
      basePath: 'array',
    })
  )
  const aaa = attach(
    form.createField({
      name: 'aaa',
      basePath: 'array.0',
      value: 123,
    })
  )
  expect(aaa.value).toEqual(123)
  expect(array.value).toEqual([123])
})

test('exchange children', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createField({
      name: 'other',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: '0.aaa',
      basePath: 'array',
      value: '123',
    })
  )
  attach(
    form.createField({
      name: '0.bbb',
      basePath: 'array',
      value: '321',
    })
  )
  attach(
    form.createField({
      name: '1.bbb',
      basePath: 'array',
      value: 'kkk',
    })
  )
  expect(array.value).toEqual([{ aaa: '123', bbb: '321' }, { bbb: 'kkk' }])
  array.move(0, 1)
  expect(array.value).toEqual([{ bbb: 'kkk' }, { aaa: '123', bbb: '321' }])
  expect(form.query('array.0.aaa').take()).toBeUndefined()
})

test('fault tolerance', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  const array2 = attach(
    form.createArrayField({
      name: 'array2',
      value: [1, 2],
    })
  )
  array.setValue({} as any)
  array.push(11)
  expect(array.value).toEqual([11])
  array.pop()
  expect(array.value).toEqual([])
  array.remove(1)
  expect(array.value).toEqual([])
  array.shift()
  expect(array.value).toEqual([])
  array.unshift(1)
  expect(array.value).toEqual([1])
  array.move(0, 1)
  expect(array.value).toEqual([1])
  array.moveUp(1)
  expect(array.value).toEqual([1])
  array.moveDown(1)
  expect(array.value).toEqual([1])
  array.insert(1)
  expect(array.value).toEqual([1])
  array2.move(1, 1)
  expect(array2.value).toEqual([1, 2])
  array2.push(3)
  array2.moveUp(2)
  expect(array2.value).toEqual([1, 3, 2])
  array2.moveUp(0)
  expect(array2.value).toEqual([3, 2, 1])
  array2.moveDown(0)
  expect(array2.value).toEqual([2, 3, 1])
  array2.moveDown(1)
  expect(array2.value).toEqual([2, 1, 3])
  array2.moveDown(2)
  expect(array2.value).toEqual([3, 2, 1])
})

test('mutation fault tolerance', () => {
  const form = attach(createForm())
  const pushArray = attach(
    form.createArrayField({
      name: 'array1',
    })
  )
  const popArray = attach(
    form.createArrayField({
      name: 'array2',
    })
  )
  const insertArray = attach(
    form.createArrayField({
      name: 'array3',
    })
  )
  const removeArray = attach(
    form.createArrayField({
      name: 'array4',
    })
  )
  const shiftArray = attach(
    form.createArrayField({
      name: 'array5',
    })
  )
  const unshiftArray = attach(
    form.createArrayField({
      name: 'array6',
    })
  )
  const moveArray = attach(
    form.createArrayField({
      name: 'array7',
    })
  )
  const moveUpArray = attach(
    form.createArrayField({
      name: 'array8',
    })
  )
  const moveDownArray = attach(
    form.createArrayField({
      name: 'array9',
    })
  )
  pushArray.setValue({} as any)
  pushArray.push(123)
  expect(pushArray.value).toEqual([123])
  popArray.setValue({} as any)
  popArray.pop()
  expect(popArray.value).toEqual({})
  insertArray.setValue({} as any)
  insertArray.insert(0, 123)
  expect(insertArray.value).toEqual([123])
  removeArray.setValue({} as any)
  removeArray.remove(0)
  expect(removeArray.value).toEqual({})
  shiftArray.setValue({} as any)
  shiftArray.shift()
  expect(shiftArray.value).toEqual({})
  unshiftArray.setValue({} as any)
  unshiftArray.unshift(123)
  expect(unshiftArray.value).toEqual([123])
  moveArray.setValue({} as any)
  moveArray.move(0, 1)
  expect(moveArray.value).toEqual({})
  moveUpArray.setValue({} as any)
  moveUpArray.moveUp(0)
  expect(moveUpArray.value).toEqual({})
  moveDownArray.setValue({} as any)
  moveDownArray.moveDown(1)
  expect(moveDownArray.value).toEqual({})
})

test('array field move api with children', async () => {
  const form = attach(createForm())
  attach(
    form.createField({
      name: 'other',
    })
  )
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createArrayField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createArrayField({
      name: '1',
      basePath: 'array',
    })
  )
  attach(
    form.createArrayField({
      name: '2',
      basePath: 'array',
    })
  )
  attach(
    form.createArrayField({
      name: 'name',
      basePath: 'array.2',
    })
  )
  await array.move(0, 2)
  expect(form.fields['array.0.name']).toBeUndefined()
  expect(form.fields['array.2.name']).toBeUndefined()
  expect(form.fields['array.1.name']).not.toBeUndefined()
})

test('array field remove memo leak', async () => {
  const handler = jest.fn()
  const valuesChange = jest.fn()
  const initialValuesChange = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormValuesChange(valuesChange)
        onFormInitialValuesChange(initialValuesChange)
        onFieldValueChange('*', handler)
      },
    })
  )
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  await array.push('')
  attach(
    form.createField({
      name: '0',
      basePath: 'array',
    })
  )
  await array.remove(0)
  await array.push('')
  attach(
    form.createField({
      name: '0',
      basePath: 'array',
    })
  )
  expect(handler).toBeCalledTimes(0)
  expect(valuesChange).toBeCalledTimes(4)
  expect(initialValuesChange).toBeCalledTimes(0)
})

// add sandbox https://codesandbox.io/p/devbox/lingering-violet-jwr565
test('nest array remove', async () => {
  const form = attach(createForm())

  const metrics = attach(
    form.createArrayField({
      name: 'metrics',
    })
  )

  attach(
    form.createObjectField({
      name: '0',
      basePath: 'metrics',
    })
  )

  attach(
    form.createObjectField({
      name: '1',
      basePath: 'metrics',
    })
  )

  attach(
    form.createArrayField({
      name: 'content',
      basePath: 'metrics.0',
    })
  )

  attach(
    form.createArrayField({
      name: 'content',
      basePath: 'metrics.1',
    })
  )

  const obj00 = attach(
    form.createObjectField({
      name: '0',
      basePath: 'metrics.0.content',
    })
  )

  const obj10 = attach(
    form.createObjectField({
      name: '0',
      basePath: 'metrics.1.content',
    })
  )

  attach(
    form.createField({
      name: 'attr',
      basePath: 'metrics.0.content.0',
      initialValue: '123',
    })
  )

  attach(
    form.createField({
      name: 'attr',
      basePath: 'metrics.1.content.0',
      initialValue: '123',
    })
  )
  expect(obj00.indexes[0]).toBe(0)
  expect(obj00.index).toBe(0)
  expect(obj10.index).toBe(0)
  expect(obj10.indexes[0]).toBe(1)
  await (form.query('metrics.1.content').take() as any).remove(0)
  expect(form.fields['metrics.0.content.0.attr']).not.toBeUndefined()
  await metrics.remove(1)
  expect(form.fields['metrics.0.content.0.attr']).not.toBeUndefined()
  // TODO!! 测试不通过
  expect(
    form.initialValues.metrics?.[1]?.content?.[0]?.attr
  ).not.toBeUndefined()
})


test('nest array remove for #4024', () => {
  const form = attach(createForm())
  const arr1 = attach(
    form.createArrayField({
      name: 'aa',
      initialValue: [{}],
    })
  )

  attach(
    form.createArrayField({
      name: 'bb',
      basePath: 'aa.0',
      initialValue: [{}],
    })
  )

  attach(
    form.createField({
      name: 'cc',
      basePath: 'aa.0.bb.0',
      initialValue: true,
    })
  )

  expect(form.initialValues).toEqual({
    aa: [{ bb: [{ cc: true }] }],
  })

  // 模拟两次 antd/ArrayBase.Addation 点击
  attach(
    form.createField({
      name: 'cc',
      basePath: 'aa.0.bb.1',
      initialValue: true,
    })
  )
  attach(
    form.createField({
      name: 'cc',
      basePath: 'aa.0.bb.2',
      initialValue: true,
    })
  )
  // 符合 formily DevTools 表现
  expect(form.initialValues).toEqual({
    aa: [{ bb: [{ cc: true }, { cc: true }, { cc: true }] }],
  })
  // 模拟 antd/ArrayBase.Remove 点击
  arr1.remove(0)

  // 模拟一次外部数组点击 antd/ArrayBase.Addation 点击
  attach(
    form.createArrayField({
      name: 'bb',
      basePath: 'aa.0',
      initialValue: [{}],
    })
  )
  attach(
    form.createField({
      name: 'cc',
      basePath: 'aa.0.bb.0',
      initialValue: true,
    })
  )
  expect(form.initialValues).toEqual({
    aa: [{ bb: [{ cc: true }] }],
  })
})

test('indexes: nest path need exclude incomplete number', () => {
  const form = attach(createForm())

  const objPathIncludeNum = attach(
    form.createField({
      name: 'attr',
      basePath: 'metrics.0.a.10.iconWidth50',
    })
  )

  expect(objPathIncludeNum.indexes.length).toBe(2)
  expect(objPathIncludeNum.indexes).toEqual([0, 10])
  expect(objPathIncludeNum.index).toBe(10)
})

test('incomplete insertion of array elements', async () => {
  const form = attach(
    createForm({
      values: {
        array: [{ aa: 1 }, { aa: 2 }, { aa: 3 }],
      },
    })
  )
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'array.0',
    })
  )
  attach(
    form.createObjectField({
      name: '2',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'array.2',
    })
  )
  expect(form.fields['array.0.aa']).not.toBeUndefined()
  expect(form.fields['array.1.aa']).toBeUndefined()
  expect(form.fields['array.2.aa']).not.toBeUndefined()
  await array.unshift({})
  expect(form.fields['array.0.aa']).toBeUndefined()
  expect(form.fields['array.1.aa']).not.toBeUndefined()
  expect(form.fields['array.2.aa']).toBeUndefined()
  expect(form.fields['array.3.aa']).not.toBeUndefined()
})

test('void array items need skip data', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  const array2 = attach(
    form.createArrayField({
      name: 'array2',
    })
  )
  attach(
    form.createVoidField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createVoidField({
      name: '0',
      basePath: 'array2',
    })
  )
  attach(
    form.createVoidField({
      name: 'space',
      basePath: 'array.0',
    })
  )
  const select = attach(
    form.createField({
      name: 'select',
      basePath: 'array.0.space',
    })
  )
  const select2 = attach(
    form.createField({
      name: 'select2',
      basePath: 'array2.0',
    })
  )

  select.value = 123
  select2.value = 123
  expect(array.value).toEqual([123])
  expect(array2.value).toEqual([123])
})

test('array field reset', () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'input',
      initialValue: '123',
      basePath: 'array.0',
    })
  )
  form.reset('*', { forceClear: true })
  expect(form.values).toEqual({ array: [] })
  expect(array.value).toEqual([])
})

test('array field remove can not memory leak', async () => {
  const handler = jest.fn()
  const form = attach(
    createForm({
      values: {
        array: [{ aa: 1 }, { aa: 2 }],
      },
      effects() {
        onFieldValueChange('array.*.aa', handler)
      },
    })
  )
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'array.0',
    })
  )
  attach(
    form.createObjectField({
      name: '1',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'array.1',
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      basePath: 'array.1',
      reactions: (field) => {
        field.visible = field.query('.aa').value() === '123'
      },
    })
  )
  expect(bb.visible).toBeFalsy()
  await array.remove(0)
  form.query('array.0.aa').take((field) => {
    ;(field as DataField).value = '123'
  })
  expect(bb.visible).toBeTruthy()
  expect(handler).toBeCalledTimes(1)
})

test('array field patch values', async () => {
  const form = attach(createForm())

  const arr = attach(
    form.createArrayField({
      name: 'a',
    })
  )

  await arr.unshift({})
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'a',
    })
  )
  attach(
    form.createField({
      name: 'c',
      initialValue: 'A',
      basePath: 'a.0',
    })
  )
  expect(form.values).toEqual({ a: [{ c: 'A' }] })
  await arr.unshift({})
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'a',
    })
  )
  attach(
    form.createField({
      name: 'c',
      initialValue: 'A',
      basePath: 'a.0',
    })
  )
  attach(
    form.createObjectField({
      name: '1',
      basePath: 'a',
    })
  )
  attach(
    form.createField({
      name: 'c',
      initialValue: 'A',
      basePath: 'a.1',
    })
  )
  expect(form.values).toEqual({ a: [{ c: 'A' }, { c: 'A' }] })
})

test('array remove with initialValues', async () => {
  const form = attach(
    createForm({
      initialValues: {
        array: [{ a: 1 }, { a: 2 }],
      },
    })
  )
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '1',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'a',
      basePath: 'array.0',
    })
  )
  attach(
    form.createField({
      name: 'a',
      basePath: 'array.1',
    })
  )
  expect(form.values).toEqual({ array: [{ a: 1 }, { a: 2 }] })
  await array.remove(1)
  expect(form.values).toEqual({ array: [{ a: 1 }] })
  expect(form.initialValues).toEqual({ array: [{ a: 1 }, { a: 2 }] })
  await array.reset()
  attach(
    form.createObjectField({
      name: '1',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: 'a',
      basePath: 'array.0',
    })
  )
  attach(
    form.createField({
      name: 'a',
      basePath: 'array.1',
    })
  )
  expect(form.values).toEqual({ array: [{ a: 1 }, { a: 2 }] })
  expect(form.initialValues).toEqual({ array: [{ a: 1 }, { a: 2 }] })
})

test('records: find array fields', () => {
  const form = attach(
    createForm({
      initialValues: {
        array: [{ a: 1 }, { a: 2 }],
      },
    })
  )

  attach(
    form.createArrayField({
      name: 'array',
    })
  )

  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '1',
      basePath: 'array',
    })
  )
  const field0 = attach(
    form.createField({
      name: 'a',
      basePath: 'array.0',
    })
  )
  const field1 = attach(
    form.createField({
      name: 'a',
      basePath: 'array.1',
    })
  )

  expect(field0.records.length).toBe(2)
  expect(field0.record).toEqual({ a: 1 })
  expect(field1.record).toEqual({ a: 2 })
})

test('record: find array nest field record', () => {
  const form = attach(
    createForm({
      initialValues: {
        array: [{ a: { b: { c: 1, d: 1 } } }, { a: { b: { c: 2, d: 2 } } }],
      },
    })
  )

  attach(
    form.createArrayField({
      name: 'array',
    })
  )

  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: '1',
      basePath: 'array',
    })
  )

  attach(
    form.createObjectField({
      name: 'a',
      basePath: 'array.0',
    })
  )
  attach(
    form.createObjectField({
      name: 'a',
      basePath: 'array.1',
    })
  )

  attach(
    form.createObjectField({
      name: 'b',
      basePath: 'array.0.a',
    })
  )

  attach(
    form.createObjectField({
      name: 'b',
      basePath: 'array.1.a',
    })
  )

  const field0 = attach(
    form.createField({
      name: 'c',
      basePath: 'array.0.a.b',
    })
  )

  const field1 = attach(
    form.createField({
      name: 'c',
      basePath: 'array.1.a.b',
    })
  )

  const field2 = attach(
    form.createField({
      name: 'cc',
      basePath: 'array.1.a.b.c',
    })
  )

  expect(field0.records.length).toBe(2)
  expect(field1.records.length).toBe(2)
  expect(field1.records).toEqual([
    { a: { b: { c: 1, d: 1 } } },
    { a: { b: { c: 2, d: 2 } } },
  ])
  expect(field0.record).toEqual({ c: 1, d: 1 })
  expect(field1.record).toEqual({ c: 2, d: 2 })
  expect(field2.record).toEqual({ c: 2, d: 2 })
})

test('record: find array field record', () => {
  const form = attach(
    createForm({
      initialValues: {
        array: [1, 2, 3],
      },
    })
  )

  attach(
    form.createArrayField({
      name: 'array',
    })
  )

  const field = attach(
    form.createField({
      basePath: 'array',
      name: '0',
    })
  )

  expect(field.records.length).toBe(3)
  expect(field.record).toEqual(1)
})

test('record: find object field record', () => {
  const form = attach(
    createForm({
      initialValues: {
        a: {
          b: {
            c: 1,
            d: 1,
          },
        },
      },
    })
  )

  attach(
    form.createArrayField({
      name: 'a',
    })
  )

  attach(
    form.createObjectField({
      name: 'b',
      basePath: 'a',
    })
  )

  const fieldc = attach(
    form.createObjectField({
      name: 'c',
      basePath: 'a.b',
    })
  )

  expect(fieldc.records).toEqual(undefined)
  expect(fieldc.record).toEqual({
    c: 1,
    d: 1,
  })
})

test('record: find form fields', () => {
  const form = attach(
    createForm({
      initialValues: {
        array: [{ a: 1 }, { a: 2 }],
      },
    })
  )

  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )

  expect(array.record).toEqual({ array: [{ a: 1 }, { a: 2 }] })
})
