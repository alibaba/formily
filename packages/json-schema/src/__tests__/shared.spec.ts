import { isNoNeedCompileObject, createDataSource } from '../shared'
import { observable } from '@formily/reactive'
import { Schema } from '../schema'

test('isNoNeedCompileObject', () => {
  expect(isNoNeedCompileObject({})).toBeFalsy()
  expect(isNoNeedCompileObject({ $$typeof: null, _owner: null })).toBeTruthy()
  expect(isNoNeedCompileObject({ _isAMomentObject: true })).toBeTruthy()
  expect(
    isNoNeedCompileObject({ [Symbol.for('__REVA_ACTIONS')]: true })
  ).toBeTruthy()
  expect(isNoNeedCompileObject({ toJSON: () => {} })).toBeTruthy()
  expect(isNoNeedCompileObject({ toJS: () => {} })).toBeTruthy()
  expect(isNoNeedCompileObject(observable({}))).toBeTruthy()
  expect(isNoNeedCompileObject(new Schema({}))).toBeTruthy()
})

test('createDataSource', () => {
  expect(createDataSource(['111'])).toEqual([{ label: '111', value: '111' }])
  expect(createDataSource([{ label: '111', value: '111' }])).toEqual([
    { label: '111', value: '111' },
  ])
})
