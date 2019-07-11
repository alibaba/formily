import React, { useRef, forwardRef } from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../../constants/itemType'
import { SchemaForm } from '../../utils/baseForm'
import { isEmptyObj } from '../../utils/util'
import pick from 'lodash.pick'
import { normalizeSchema } from '../../utils/lang'
import { FormProvider } from '../../constants/context'

const RenderPreviewList = ({ props }) => {
  const { preview, gbConfig = {}, schema = {}, renderEngine, onChange } = props
  const { properties = {} } = schema
  const { FormButtonGroup, Submit, Reset } = renderEngine
  const { needFormButtonGroup } = gbConfig

  if (isEmptyObj(properties)) {
    return <p className="preview-tips">请从左边字段添加组件进来吧</p>
  }

  let children = ' '
  try {
    children =
      needFormButtonGroup === true || needFormButtonGroup === 'true' ? (
        <FormButtonGroup align="center" sticky>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      ) : (
        ' '
      )
  } catch (e) {
    if (window.location.href.indexOf('av_debug=true') > -1) {
      console.error(`RenderPreviewList function error: ${e.message}`)
    }
  }

  // @see: https://alibaba.github.io/uform/#/aAUeUD/qAI7IVFnsJ
  const globalCfg = pick(gbConfig, [
    'labelCol',
    'wrapperCol',
    'action',
    'labelAlign',
    'labelTextAlign',
    'autoAddColon',
    'inline',
    'size',
    'editable',
    'defaultValue',
    'value',
    'locale',
    'schema',
    'effects',
    'actions',
    'editable',
    'onValidateFailed',
    'onReset',
    'onSubmit',
    'onChange'
  ])

  return (
    <FormProvider
      value={{
        type: preview ? '' : 'preview'
      }}
    >
      <SchemaForm
        {...globalCfg}
        onChange={onChange}
        schema={normalizeSchema(schema)}
      >
        {children}
      </SchemaForm>
    </FormProvider>
  )
}

const MainBox = forwardRef(
  ({ props, canDrop, isOver, connectDropTarget }, ref) => {
    const elementRef = useRef(null)
    connectDropTarget(elementRef)

    const isActive = canDrop && isOver
    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = '#f1f1f1'
    }

    return (
      <div
        className="preview-main"
        style={Object.assign({}, { backgroundColor })}
      >
        <RenderPreviewList props={props} />
        <div
          ref={elementRef}
          className="main-drop"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    )
  }
)

export default DropTarget(
  [ItemTypes.FIELD, ItemTypes.LAYOUT],
  {
    drop: (props, monitor, component) => {
      // console.info('drop', component)
      if (!component) {
        return
      }
      const hasDroppedOnChild = monitor.didDrop()
      if (hasDroppedOnChild) {
        return
      }
      // console.info('drop child')
      component.onDrop(hasDroppedOnChild)
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  })
)(MainBox)
