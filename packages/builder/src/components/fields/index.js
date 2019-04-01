import React, { Component } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import defaultSupportFieldList from '../../configs/supportFieldList'
import { Header } from '../../utils/util'
import { connect } from 'react-redux'
import {
  addComponent,
  editComponent,
  showComponentProps,
  changeComponent,
  addComponentAndEdit
} from '../../actions'
import uniqBy from 'lodash.uniqby'
import { indexStyle as IndexStyle } from './style'
import Field from './field'

class FieldList extends Component {
  static propTypes = {
    // addComponent: PropTypes.func,
    // eslint-disable-next-line
    supportFieldList: PropTypes.array,
    includeFieldListKeyList: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    supportFieldList: [],
    includeFieldListKeyList: []
  }

  constructor(props) {
    super(props)
    const { supportFieldList, includeFieldListKeyList } = props
    this.fieldList = defaultSupportFieldList
    if (supportFieldList.length) {
      this.fieldList = uniqBy(
        [...supportFieldList, ...defaultSupportFieldList],
        'key'
      )
    }
    if (includeFieldListKeyList.length) {
      this.fieldList = this.fieldList.filter(
        fieldItem => includeFieldListKeyList.indexOf(fieldItem.key) > -1
      )
    }
  }

  onDragStart = (ev, fieldItem) => {
    ev.dataTransfer.setData('text/plain', JSON.stringify(fieldItem))
    // eslint-disable-next-line
    ev.dataTransfer.dropEffect = 'copy'
  }

  renderFieldList() {
    return (
      <ul className='field-list'>
        {this.fieldList.map((fieldItem, i) => {
          return (
            <Field
              fieldItem={fieldItem}
              key={i}
              addComponentAndEdit={this.props.addComponentAndEdit}
            />
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <IndexStyle className={cls('col-card col-fields', this.props.className)}>
        <Header>
          <h2>组件</h2>
          <p>可将选项拖动到主面板进行编辑</p>
        </Header>
        {this.renderFieldList()}
      </IndexStyle>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  addComponent: component => dispatch(addComponent(component)),
  editComponent: (id, propsData, containerId) =>
    dispatch(editComponent(id, propsData, containerId)),
  showComponentProps: (id, comp) => dispatch(showComponentProps(id, comp)),
  changeComponent: componentId => dispatch(changeComponent(componentId)),
  addComponentAndEdit: (component, existId, type, containerId) =>
    dispatch(addComponentAndEdit(component, existId, type, containerId))
})

class StyledFieldListComp extends React.Component {
  render() {
    return <FieldList {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledFieldListComp)
