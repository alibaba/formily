import React, { Component } from 'react'
import cls from 'classnames'

import { connect } from 'react-redux'
import {
  changeComponentOrder,
  moveComponent,
  deleteComponent,
  showComponentProps,
  changeComponent
} from '../../actions'

import { Header, wrapComp2Class } from '../../utils/util'
import registerPreviewFieldMiddleware from './fieldMiddleware'
import MainBox from './mainBox'

import PreviewStyle from './style'

class Preview extends Component {
  componentDidMount() {
    registerPreviewFieldMiddleware(this)
  }

  onMouseClick = (id, comp) => {
    this.props.changeComponent(id)
    this.props.showComponentProps(id, comp)
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
  changeComponentOrder: (sourceId, targetId, containerId) =>
    dispatch(changeComponentOrder(sourceId, targetId, containerId)),
  moveComponent: (sourceId, targetId) =>
    dispatch(moveComponent(sourceId, targetId)),
  deleteComponent: id => dispatch(deleteComponent(id)),
  showComponentProps: (id, comp) => dispatch(showComponentProps(id, comp)),
  changeComponent: componentId => dispatch(changeComponent(componentId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapComp2Class(Preview))
