import React from 'react'
import cls from 'classnames'
import defaultSupportFieldList from '../../configs/supportFieldList'
import { Header, wrapComp2Class } from '../../utils/util'
import { connect } from 'react-redux'
import { addComponentAndEdit } from '../../actions'
import uniqBy from 'lodash.uniqby'
import { indexStyle as IndexStyle } from './style'
import Field from './field'

function FieldList(props) {
  const {
    addComponentAndEdit,
    supportFieldList = [],
    includeFieldListKeyList = []
  } = props

  let fieldList = defaultSupportFieldList
  if (supportFieldList.length) {
    fieldList = uniqBy([...supportFieldList, ...defaultSupportFieldList], 'key')
  }
  if (includeFieldListKeyList.length) {
    fieldList = fieldList.filter(
      fieldItem => includeFieldListKeyList.indexOf(fieldItem.key) > -1
    )
  }

  return (
    <IndexStyle className={cls('col-card col-fields', props.className)}>
      <Header>
        <h2>组件</h2>
        <p>可将选项拖动到主面板进行编辑</p>
      </Header>
      <ul className="field-list">
        {fieldList.map((fieldItem, i) => {
          return (
            <Field
              fieldItem={fieldItem}
              key={i}
              addComponentAndEdit={addComponentAndEdit}
            />
          )
        })}
      </ul>
    </IndexStyle>
  )
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  addComponentAndEdit: (...args) => dispatch(addComponentAndEdit(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapComp2Class(FieldList))
