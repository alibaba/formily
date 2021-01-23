import { createForm } from '../'
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
  expect(form.query('array.0.value').get("value")).toEqual(11)
  expect(form.query('array.1.value').get("value")).toEqual(22)
  expect(Object.keys(form.fields).sort()).toEqual([
    'array',
    'array.0.value',
    'array.1.value',
    'array.other',
  ])
  array.pop()
  expect(array.value).toEqual([{ value: 11 }])
  expect(form.query('array.0.value').get("value")).toEqual(11)
  expect(form.query('array.1.value').get("value")).toBeUndefined()
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
  expect(form.query('array.0.value').get("value")).toEqual(33)
  expect(form.query('array.1.value').get("value")).toEqual(11)
  array.remove(1)
  expect(array.value).toEqual([{ value: 33 }])
  expect(form.query('array.0.value').get("value")).toEqual(33)
  expect(form.query('array.1.value').get("value")).toBeUndefined()
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
  expect(form.query('array.0.value').get("value")).toEqual(33)
  expect(form.query('array.1.value').get("value")).toEqual(44)
  expect(form.query('array.2.value').get("value")).toEqual(55)
  array.move(0, 2)
  expect(array.value).toEqual([{ value: 44 }, { value: 55 }, { value: 33 }])
  expect(form.query('array.0.value').get("value")).toEqual(44)
  expect(form.query('array.1.value').get("value")).toEqual(55)
  expect(form.query('array.2.value').get("value")).toEqual(33)
  array.move(2, 0)
  expect(array.value).toEqual([{ value: 33 }, { value: 44 }, { value: 55 }])
  expect(form.query('array.0.value').get("value")).toEqual(33)
  expect(form.query('array.1.value').get("value")).toEqual(44)
  expect(form.query('array.2.value').get("value")).toEqual(55)
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
  array.pop()
  array.remove(1)
  array.shift()
  array.unshift(1)
  array.move(0, 1)
  array.moveUp(1)
  array.moveDown(1)
  array.insert(1)
  expect(array.value).toEqual({})
  array2.move(1, 1)
  array2.moveUp(2)
  array2.moveUp(0)
  array2.moveDown(0)
  array2.moveDown(1)
  array2.moveDown(2)
})
