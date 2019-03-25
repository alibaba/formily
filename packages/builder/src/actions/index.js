import uuid from 'uuid'

export const changeLayoutId = layoutId => ({
  type: 'CHANGE_LAYOUTID',
  data: {
    id: layoutId
  }
})

export const addComponent = (component, existId, id, type, containerId) => ({
  type: 'ADD_COMPONENT',
  data: {
    id: id || uuid(),
    component,
    existId,
    addType: type,
    containerId
  }
})

export const addComponentAndEdit = (
  component,
  existId,
  type,
  containerId
) => dispatch => {
  const id = uuid()
  dispatch(addComponent(component, existId, id, type, containerId))
  dispatch(changeComponent(id))
  dispatch(showComponentProps(id, component, containerId))

  if (component.__key__ === 'layout') {
    dispatch(changeLayoutId(id))
  }

  dispatch(
    editComponent(
      id,
      {
        active: true
      },
      containerId
    )
  )
}

export const changeComponentOrder = (sourceId, targetId, containerId) => ({
  type: 'CHANGE_COMPONENT_ORDER',
  data: {
    id: sourceId,
    targetId,
    containerId
  }
})

export const editComponent = (id, propsData, containerId) => ({
  type: 'EDIT_COMPONENT',
  data: {
    id,
    propsData,
    containerId
  }
})

export const deleteComponent = id => ({
  type: 'DELETE_COMPONENT',
  data: {
    id
  }
})

export const showComponentProps = (id, comp, containerId) => ({
  type: 'SHOW_COMPONENT_PROPS',
  data: {
    id,
    comp,
    containerId
  }
})

export const editComponentProps = (id, propsData) => ({
  type: 'EDIT_COMPONENT_PROPS',
  data: {
    id,
    propsData
  }
})

export const changePreview = preview => ({
  type: 'CHANGE_PREVIEW',
  data: {
    preview
  }
})

export const changeCodeMode = codemode => ({
  type: 'CHANGE_CODEMODE',
  data: {
    codemode
  }
})

export const changeComponent = componentId => ({
  type: 'CHANGE_COMPONENT',
  data: {
    componentId
  }
})

export const changeGbConfig = data => ({
  type: 'CHANGE_GB_CONFIG',
  data
})

export const initSchema = data => ({
  type: 'INIT_SCHEMA',
  data
})
