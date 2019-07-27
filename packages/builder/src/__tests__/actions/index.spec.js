import * as actions from '../../actions/index'

describe('test actions', () => {
  // addComponent actions
  test('addComponent action', () => {
    expect(
      actions.addComponent(
        {
          type: 'string',
          title: '111'
        },
        '222',
        '333',
        'layout',
        '444'
      )
    ).toEqual({
      type: 'ADD_COMPONENT',
      data: {
        id: '333',
        component: {
          type: 'string',
          title: '111'
        },
        existId: '222',
        addType: 'layout',
        containerId: '444'
      }
    })
  })

  test('changeComponentOrder action', () => {
    expect(actions.changeComponentOrder('111', '222', '333')).toEqual({
      type: 'CHANGE_COMPONENT_ORDER',
      data: {
        id: '111',
        targetId: '222',
        containerId: '333'
      }
    })
  })

  test('editComponent action', () => {
    expect(
      actions.editComponent('111', {
        __id__: 222
      })
    ).toEqual({
      type: 'EDIT_COMPONENT',
      data: {
        id: '111',
        propsData: {
          __id__: 222
        }
      }
    })
  })

  test('deleteComponent action', () => {
    expect(actions.deleteComponent(['111'])).toEqual({
      type: 'DELETE_COMPONENT',
      data: {
        id: ['111']
      }
    })
  })

  test('showComponentProps action', () => {
    expect(
      actions.showComponentProps(['111'], {
        type: 'string',
        title: '222'
      })
    ).toEqual({
      type: 'SHOW_COMPONENT_PROPS',
      data: {
        id: ['111'],
        comp: {
          type: 'string',
          title: '222'
        }
      }
    })
  })

  test('editComponentProps action', () => {
    expect(
      actions.editComponentProps('111', {
        __id__: '222'
      })
    ).toEqual({
      type: 'EDIT_COMPONENT_PROPS',
      data: {
        id: '111',
        propsData: {
          __id__: '222'
        }
      }
    })
  })

  test('changePreview action', () => {
    expect(actions.changePreview(true)).toEqual({
      type: 'CHANGE_PREVIEW',
      data: {
        preview: true
      }
    })
  })

  test('changeCodeMode action', () => {
    expect(actions.changeCodeMode(true)).toEqual({
      type: 'CHANGE_CODEMODE',
      data: {
        codemode: true
      }
    })
  })

  test('changeComponent action', () => {
    expect(actions.changeComponent('111')).toEqual({
      type: 'CHANGE_COMPONENT',
      data: {
        componentId: '111'
      }
    })
  })

  test('changeGbConfig action', () => {
    expect(
      actions.changeGbConfig({
        aaa: 1
      })
    ).toEqual({
      type: 'CHANGE_GB_CONFIG',
      data: {
        aaa: 1
      }
    })
  })

  test('initSchema action', () => {
    expect(
      actions.initSchema({
        aaa: 1
      })
    ).toEqual({
      type: 'INIT_SCHEMA',
      data: {
        aaa: 1
      }
    })
  })
})
