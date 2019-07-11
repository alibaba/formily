import React from 'react'
import styled from 'styled-components'

class Component extends React.Component {
  state = {}

  // 新增一行记录
  handleAddNewItem = () => {
    const newDataSource = [...this.props.dataSource]
    newDataSource.push({
      value: '',
      label: ''
    })
    this.props.onChange && this.props.onChange(newDataSource)
  }

  // 删除某一行
  handleDeleteItem = idx => {
    const newDataSource = [...this.props.dataSource]
    newDataSource.splice(idx, 1)
    this.props.onChange && this.props.onChange(newDataSource)
  }

  // 修改某行记录
  handleChangeItemRow = (e, idx, key) => {
    const { value } = e.target
    const newDataSource = [...this.props.dataSource]
    newDataSource[idx][key] = value
    this.props.onChange && this.props.onChange(newDataSource)
  }

  renderItemRow = (item = {}, idx) => {
    const { value = '', label = '' } = item
    const { UI } = this.props
    const btnProps = {}
    if (UI.version === '1.x') {
      btnProps.text = true
    } else {
      btnProps.shape = 'text'
    }
    return (
      <div className="source-row" key={`${idx}`}>
        <ul>
          <li>
            <label>字段名：</label>
            <UI.Input
              defaultValue={label}
              onBlur={e => this.handleChangeItemRow(e, idx, 'label')}
            />
          </li>
          <li>
            <label>值：</label>
            <UI.Input
              defaultValue={value}
              onBlur={e => this.handleChangeItemRow(e, idx, 'value')}
            />
          </li>
        </ul>
        <UI.Button
          className="ashbin-btn"
          {...btnProps}
          onClick={() => this.handleDeleteItem(idx)}
        >
          <UI.Icon type="ashbin" />
        </UI.Button>
      </div>
    )
  }

  renderNewBtn() {
    const { UI } = this.props
    return (
      <div className="source-btn-new">
        <UI.Button size="small" onClick={this.handleAddNewItem}>
          <UI.Icon type="add" />
          添加
        </UI.Button>
      </div>
    )
  }

  render() {
    const { dataSource = [], className } = this.props

    return (
      <div className={className}>
        {dataSource && dataSource.map(this.renderItemRow)}
        {this.renderNewBtn()}
      </div>
    )
  }
}

export default styled(Component)`
  .source-row {
    position: relative;
    margin-bottom: 4px;
    li {
      display: inline-block;
      width: 50%;
      > label,
      .next-input {
        display: inline-block;
      }
      > label {
        color: ${props => props.theme.whiteColor};
        text-align: right;
      }
      .next-input {
        width: 50px;
      }
    }
    .ashbin-btn {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translate3d(0, -50%, 0);
      opacity: 0.5;
    }
    &:hover {
      .ashbin-btn {
        opacity: 1;
      }
    }
  }
`
