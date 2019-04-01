import React, { Component } from 'react'
import cls from 'classnames'

import { connect } from 'react-redux'
import {
  addComponentAndEdit,
  changeComponentOrder,
  editComponent,
  deleteComponent,
  showComponentProps,
  changeComponent
} from '../../actions'

import { Header } from '../../utils/util'
import registerPreviewFieldMiddleware from './fieldMiddleware'
import MainBox from './mainBox'

import PreviewStyle from './style'

class Preview extends Component {
  static propTypes = {
  }

  componentDidMount() {
    registerPreviewFieldMiddleware(this)
  }

  onMouseClick = (id, comp, type) => {
    const { layoutId } = this.props
    this.props.changeComponent(id)
    this.props.showComponentProps(id, comp)

    this.props.editComponent(
      id,
      {
        active: true
      },
      type === 'layout' ? '' : layoutId
    )
  }

  deleteComponent = id => {
    this.props.deleteComponent && this.props.deleteComponent(id)
  }

  render() {
    return (
      <PreviewStyle
        className={cls('col-card preview-card', this.props.className)}
      >
        <Header>
          <h2>预览区域</h2>
          <p>组件过多时可下拉查看更多</p>
        </Header>
        <MainBox props={this.props} />
      </PreviewStyle>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  addComponentAndEdit: (component, existId, type, containerId) =>
    dispatch(addComponentAndEdit(component, existId, type, containerId)),
  changeComponentOrder: (sourceId, targetId, containerId) =>
    dispatch(changeComponentOrder(sourceId, targetId, containerId)),
  editComponent: (id, propsData, containerId) =>
    dispatch(editComponent(id, propsData, containerId)),
  deleteComponent: id => dispatch(deleteComponent(id)),
  showComponentProps: (id, comp) => dispatch(showComponentProps(id, comp)),
  changeComponent: componentId => dispatch(changeComponent(componentId))
})

class StyledPreviewComp extends React.Component {
  render() {
    return <Preview {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledPreviewComp)
