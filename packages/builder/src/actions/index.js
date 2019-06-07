import uuid from 'uuid'

/**
 * 添加组件
 * @param {Object} component
 */
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

/**
 * 添加组件并置于编辑状态
 * @param {Object} component
 */
export const addComponentAndEdit = (
  component,
  existId,
  type,
  containerId = []
) => dispatch => {
  const id = component.id || uuid()

  dispatch(addComponent(component, existId, id, type, containerId))
  dispatch(changeComponent(Array.isArray(id) ? id : [...containerId, id]))
  dispatch(
    showComponentProps(Array.isArray(id) ? id : [...containerId, id], component)
  )
  dispatch(
    editComponent(Array.isArray(id) ? id : [...containerId, id], {
      active: true
    })
  )
}

/**
 * 移动组件
 * @param {Array} sourceId 源ID
 * @param {Array} targetId 目标ID
 */
export const moveComponent = (sourceId, targetId) => ({
  type: 'MOVE_COMOPNENT',
  data: {
    id: sourceId,
    targetId
  }
})

/**
 * 改变组件顺序
 */
export const changeComponentOrder = (sourceId, targetId, containerId) => ({
  type: 'CHANGE_COMPONENT_ORDER',
  data: {
    id: sourceId,
    targetId,
    containerId
  }
})

/**
 * 修改组件数据
 */
export const editComponent = (id, propsData) => ({
  type: 'EDIT_COMPONENT',
  data: {
    id,
    propsData
  }
})

/**
 * 删除组件
 */
export const deleteComponent = id => ({
  type: 'DELETE_COMPONENT',
  data: {
    id
  }
})

/**
 * 展示组件属性
 */
export const showComponentProps = (id, comp) => ({
  type: 'SHOW_COMPONENT_PROPS',
  data: {
    id,
    comp
  }
})

/**
 * 编辑组件属性
 */
export const editComponentProps = (id, propsData) => ({
  type: 'EDIT_COMPONENT_PROPS',
  data: {
    id,
    propsData
  }
})

/**
 * 改变预览状态
 */
export const changePreview = preview => ({
  type: 'CHANGE_PREVIEW',
  data: {
    preview
  }
})

/**
 * 改变源码编辑状态
 */
export const changeCodeMode = codemode => ({
  type: 'CHANGE_CODEMODE',
  data: {
    codemode
  }
})

/**
 * 改变当前编辑的组件
 */
export const changeComponent = componentId => ({
  type: 'CHANGE_COMPONENT',
  data: {
    componentId
  }
})

/**
 * 修改全局配置
 */
export const changeGbConfig = data => ({
  type: 'CHANGE_GB_CONFIG',
  data
})

/**
 * 初始化schema
 */
export const initSchema = data => ({
  type: 'INIT_SCHEMA',
  data
})
