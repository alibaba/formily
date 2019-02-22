// 布局
import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import supportLayoutList from '../../configs/supportLayoutList'
import { Header } from '../../utils/util'
import { connect } from 'react-redux'
import { addComponentAndEdit } from '../../actions'
import styled from 'styled-components'

class Component extends React.Component {
  static propTypes = {
    addComponentAndEdit: PropTypes.func
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.layoutList = supportLayoutList
  }

  renderList() {
    const { addComponentAndEdit: _addComponentAndEdit } = this.props
    return (
      <ul className='layout-list'>
        {this.layoutList.map((item, i) => {
          const { title } = item
          return (
            <li
              // eslint-disable-next-line
              key={i}
              onClick={() => {
                _addComponentAndEdit && _addComponentAndEdit(item)
              }}
            >
              {title}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className={cls('col-card col-layout', this.props.className)}>
        <Header>
          <h2>布局</h2>
          <p>单击将布局添加入主面板</p>
        </Header>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addComponentAndEdit: component => dispatch(addComponentAndEdit(component))
})

const StyledComponent = styled(Component)`
  .layout-list {
    margin-bottom: 15px;
    padding: 0 8px;
    font-size: 0;
    li {
      overflow: hidden;
      margin-right: 7px;
      width: 70px;
      height: 90px;
      line-height: 90px;
      border-radius: 4px;
      display: inline-block;
      font-size: 12px;
      text-align: center;
      background: ${props => props.theme.compHoverBgColor};
      color: ${props => props.theme.whiteColor};
      border: 1px solid ${props => props.theme.compHoverBgColor};
      box-sizing: border-box;
      transition: all 0.1s ease;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.compHoverBgColor};
        border-color: ${props => props.theme.whiteColor};
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      span {
        display: block;
        margin: auto;
        word-break: break-all;
      }
    }
  }
`

class StyledLayoutListComp extends React.Component {
  render() {
    return <StyledComponent {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledLayoutListComp)
