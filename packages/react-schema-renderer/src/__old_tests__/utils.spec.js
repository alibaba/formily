import { isNum, filterSchemaPropertiesAndReactChildren } from '../utils'

test('isNum', () => {
  expect(isNum('123')).toBe(false)
  expect(isNum(123)).toBe(true)
})

test('filterSchemaPropertiesAndReactChildren', () => {
  expect(filterSchemaPropertiesAndReactChildren(null, 'properties')).toBe(false)
  expect(filterSchemaPropertiesAndReactChildren(null, 'items')).toBe(false)
  expect(filterSchemaPropertiesAndReactChildren(null, 'children')).toBe(false)
  expect(filterSchemaPropertiesAndReactChildren(null, 'yes')).toBe(true)
})
