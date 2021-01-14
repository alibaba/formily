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
})

test('array field children state exchanges', () => {
  //注意：插入新节点，如果指定位置有节点，会丢弃，需要重新插入节点，主要是为了防止上一个节点状态对新节点状态产生污染
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
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
  expect(form.query('array.0.value').value).toEqual(11)
  expect(form.query('array.1.value').value).toEqual(22)
  expect(Object.keys(form.fields).sort()).toEqual([
    'array',
    'array.0.value',
    'array.1.value',
  ])
  array.pop()
  expect(array.value).toEqual([{ value: 11 }])
  expect(form.query('array.0.value').value).toEqual(11)
  expect(form.query('array.1.value').value).toBeUndefined()
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
  expect(form.query('array.0.value').value).toEqual(33)
  expect(form.query('array.1.value').value).toEqual(11)
  array.remove(1)
  expect(array.value).toEqual([{ value: 33 }])
  expect(form.query('array.0.value').value).toEqual(33)
  expect(form.query('array.1.value').value).toBeUndefined()
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
  expect(form.query('array.0.value').value).toEqual(33)
  expect(form.query('array.1.value').value).toEqual(44)
  expect(form.query('array.2.value').value).toEqual(55)
  array.move(0, 2)
  expect(array.value).toEqual([{ value: 44 }, { value: 55 }, { value: 33 }])
  expect(form.query('array.0.value').value).toEqual(44)
  expect(form.query('array.1.value').value).toEqual(55)
  expect(form.query('array.2.value').value).toEqual(33)
})
