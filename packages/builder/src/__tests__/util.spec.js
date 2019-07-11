/* eslint-disable @typescript-eslint/camelcase */
import {
  getCompDetailById,
  wrapSubmitSchema,
  flatObj,
  checkRepeatId
} from '../utils/util'

describe('util test suites', () => {
  test('should correct getCompDetailById', () => {
    var schema = {
      type: 'object',
      properties: {
        aaa: {
          type: 'object',
          properties: {
            aaa1: {
              type: 'string'
            }
          }
        },
        bbb: {
          type: 'string'
        }
      }
    }

    var value1 = getCompDetailById(['bbb'], schema)
    var value2 = getCompDetailById(['aaa', 'aaa1'], schema)

    var result1 = { type: 'string', id: 'bbb' }
    var result2 = { type: 'string', id: 'aaa1' }

    expect(value1).toEqual(result1)
    expect(value2).toEqual(result2)
  })

  test('should correct wrap schema', () => {
    var schema1
    var schema2 = {}
    var schema3 = {
      properties: {
        wrapper1: {
          type: 'object',
          id: 'wrapper1',
          __id__: 'wrapper',
          'x-component': 'layout',
          'x-props': {
            labelCol: 10,
            wrapperCol: 6,
            _extra: {
              icon: 'clock-circle-o',
              type: 'object',
              title: 'Layout布局',
              __key__: 'layout',
              __key__data__: {
                'x-component': 'layout',
                'x-props': {
                  labelCol: 8,
                  wrapperCol: 6
                }
              }
            }
          },
          properties: {
            '810dbe8a-d654-4e26-aaf1-861a6b20c269': {
              key: 'input',
              icon: 'info',
              iconUrl:
                '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
              width: '58',
              height: '28',
              type: 'string',
              title: '姓名',
              placeholder: '请输入',
              id: '810dbe8a-d654-4e26-aaf1-861a6b20c269',
              'x-index': 0,
              __id__: 'name',
              active: false,
              'x-props': {}
            }
          },
          active: false,
          'x-props.labelCol': 10,
          'x-props.wrapperCol': 6
        },
        grid1: {
          type: 'object',
          id: 'grid1',
          __id__: 'grid1',
          'x-component': 'grid',
          'x-props': {
            gutter: 20,
            _extra: {
              icon: 'clock-circle-o',
              type: 'object',
              title: 'Grid布局',
              __key__: 'layout',
              __key__data__: {
                'x-component': 'grid',
                'x-props': {
                  gutter: 20
                }
              }
            },
            'cols-num': 6,
            cols: [4, 4, 4, 4, 4, 4]
          },
          properties: {
            '6412a07a-691a-443a-a89d-d759579e4892': {
              key: 'input',
              icon: 'info',
              iconUrl:
                '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
              width: '58',
              height: '28',
              type: 'string',
              title: '单行文本框',
              placeholder: '请输入',
              id: '6412a07a-691a-443a-a89d-d759579e4892',
              'x-index': 0,
              __id__: 'aaa',
              active: false,
              'x-props': {}
            },
            '77aa9e8a-7d4e-4b69-b2b8-4957c14d5cc7': {
              key: 'input',
              icon: 'info',
              iconUrl:
                '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
              width: '58',
              height: '28',
              type: 'string',
              title: '单行文本框',
              placeholder: '请输入',
              id: '77aa9e8a-7d4e-4b69-b2b8-4957c14d5cc7',
              'x-index': 1,
              __id__: 'bbb',
              active: false,
              'x-props': {}
            },
            'cc714340-c559-4bf2-bc7b-825090e2a344': {
              key: 'multipleInput',
              icon: 'file-text',
              iconUrl:
                '//gw.alicdn.com/tfs/TB1zk14DjTpK1RjSZKPXXa3UpXa-116-78.png',
              width: '58',
              height: '39',
              type: 'string',
              title: '多行文本框',
              placeholder: '请输入',
              'x-props': {},
              id: 'cc714340-c559-4bf2-bc7b-825090e2a344',
              'x-index': 2,
              __id__: 'ccc',
              active: true
            },
            'e893cd93-e1a9-4834-91c0-6d56dc092495': {
              key: 'checkbox',
              icon: 'check-square-o',
              iconUrl:
                '//gw.alicdn.com/tfs/TB1ELO7DgHqK1RjSZFPXXcwapXa-56-56.png',
              width: '28',
              height: '28',
              type: 'checkbox',
              title: '复选框',
              'x-component': 'checkbox',
              'x-props': {},
              id: 'e893cd93-e1a9-4834-91c0-6d56dc092495',
              'x-index': 3,
              __id__: 'e893cd93-e1a9-4834-91c0-6d56dc092495',
              active: false
            }
          },
          active: true,
          'x-props.gutter': 20,
          'x-props.cols-num': 6,
          'x-props.cols': [4, 4, 4, 4, 4, 4]
        }
      },
      type: 'object'
    }

    var value1 = wrapSubmitSchema(schema1)
    var value2 = wrapSubmitSchema(schema2)
    var value3 = wrapSubmitSchema(schema3)

    var result1 = {
      type: 'object',
      properties: {}
    }

    expect(JSON.stringify(value1)).toBe(JSON.stringify(result1))
    expect(JSON.stringify(value2)).toBe(JSON.stringify(result1))

    expect(value3).toHaveProperty('type', 'object')
    expect(value3).toHaveProperty('properties')
    expect(value3).not.toHaveProperty('properties.wrapper.id')
    expect(value3).not.toHaveProperty('properties.wrapper.__id__')
    // expect(value3).not.toHaveProperty('properties.wrapper.x-props.labelCol');
    // expect(value3).not.toHaveProperty('properties.wrapper.x-props.wrapperCol');
    expect(value3).not.toHaveProperty('properties.wrapper.active')
    expect(value3).not.toHaveProperty(
      'properties.wrapper.properties.name.iconWidth'
    )
    expect(value3).not.toHaveProperty(
      'properties.wrapper.properties.name.iconHeight'
    )
    expect(value3).not.toHaveProperty(
      'properties.wrapper.properties.name.__id__'
    )
    expect(value3).toHaveProperty('properties.wrapper.properties.name.key')
    expect(value3).not.toHaveProperty(
      'properties.wrapper.properties.name.width'
    )
    expect(value3).not.toHaveProperty(
      'properties.wrapper.properties.name.height'
    )
    expect(value3).not.toHaveProperty(
      'properties.wrapper.properties.name.active'
    )
  })

  test('should correct flatObj', () => {
    var obj1 = {
      'a.b.c': '3',
      'a1.b1': '2',
      a2: 3,
      'x-props.htmltype': true,
      'x-props.a': 2,
      'x-props': {
        a: 1
      }
    }
    var value1 = flatObj(obj1)
    var result1 = {
      'a.b.c': '3',
      'a1.b1': '2',
      a2: 3,
      'x-props.htmltype': true,
      'x-props.a': 2,
      'x-props': {
        a: 2,
        htmltype: true
      },
      a: {
        b: {
          c: '3'
        }
      },
      a1: {
        b1: '2'
      }
    }
    expect(value1).toEqual(result1)
  })

  test('checkRepeatId has repeated', () => {
    var schema = {
      type: 'object',
      properties: {
        aa: {
          type: 'string'
        },
        bb: {
          type: 'string',
          __id__: 'aa'
        }
      }
    }
    var value = checkRepeatId(schema)
    expect(value).not.toBeFalsy()
  })

  test('checkRepeatId has not repeated', () => {
    var schema = {
      type: 'object',
      properties: {
        aa: {
          type: 'string'
        },
        bb: {
          type: 'string'
        }
      }
    }
    var value = checkRepeatId(schema)
    expect(value).toBeFalsy()
  })
})
