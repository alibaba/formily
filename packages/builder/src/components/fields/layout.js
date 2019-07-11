// 布局
import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import supportLayoutList from '../../configs/supportLayoutList'
import { Header, wrapComp2Class } from '../../utils/util'
import { connect } from 'react-redux'
import { addComponentAndEdit } from '../../actions'
import Field from './layoutField'
import { layoutStyle as LayoutStyle } from './style'

class Component extends React.Component {
  constructor(props) {
    super(props)

    this.layoutList = supportLayoutList
  }

  renderList() {
    return (
      <ul className="layout-list">
        {this.layoutList.map((item, i) => {
          return (
            <Field
              fieldItem={item}
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
      <LayoutStyle className={cls('col-card col-layout', this.props.className)}>
        <Header>
          <h2>布局</h2>
          <p>单击将布局添加入主面板</p>
        </Header>
        {this.renderList()}
      </LayoutStyle>
    )
  }
}

Component.propTypes = {
  addComponentAndEdit: PropTypes.func
}

Component.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  addComponentAndEdit: (...args) => dispatch(addComponentAndEdit(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapComp2Class(Component))
