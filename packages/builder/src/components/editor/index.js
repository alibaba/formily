import React from 'react'
import cls from 'classnames'
import Dialog from '@alifd/next/lib/dialog'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { initSchema, changeGbConfig, changeCodeMode } from '../../actions/index'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController'

class Component extends React.Component {
  componentDidMount() {
    this.monacoInstance = monaco.editor.create(
      document.getElementById('J_uformEditor'),
      {
        value: this.getValueFromProps(),
        language: 'javascript',
        theme: this.props.themeStyle === 'dark' ? 'vs-dark' : 'vs'
      }
    )
  }

  getValueFromProps() {
    const { initSchemaData, gbConfig } = this.props
    const val = JSON.stringify(
      {
        schema: initSchemaData,
        gbConfig
      },
      null,
      '\t'
    )

    return val
  }

  componentWillUnmount() {
    this.monacoInstance.dispose()
  }

  componentDidUpdate() {
    this.monacoInstance.setValue(this.getValueFromProps())
  }

  render() {
    const { className, codemode } = this.props

    return (
      <div className={cls(className, codemode ? 'active' : '')}>
        <div id='J_uformEditor' className='editor' />
        <a
          href='javascript:;'
          className='editor-btn'
          onClick={() => {
            try {
              // eslint-disable-next-line
              const newValue = new Function(
                `return ${this.monacoInstance.getValue()}`
              )()
              const { schema = {}, gbConfig = {} } = newValue
              const {
                initSchema: _initSchema,
                changeGbConfig: _changeGbConfig
              } = this.props
              _initSchema(schema)
              _changeGbConfig(gbConfig)
            } catch (e) {
              Dialog.alert({
                title: '提示',
                content: '格式转换失败，请检查代码'
              })
              return false
            }
          }}
        >
          保存源码
        </a>
      </div>
    )
  }
}

const StyledEditor = styled(Component)`
  position: absolute;
  min-width: 500px;
  top: 64px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in;
  transform: translate3d(500px, 0, 0);
  &.active {
    transform: translate3d(0, 0, 0);
  }
  z-index: 2000;
  .editor {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .editor-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px;
    background: rgba(90, 96, 255, 0.95);
    color: #fff;
    border-radius: 3px;
  }
`

class StyledEditorComp extends React.Component {
  render() {
    return <StyledEditor {...this.props} />
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  initSchema: data => dispatch(initSchema(data)),
  changeGbConfig: data => dispatch(changeGbConfig(data)),
  changeCodeMode: codemode => dispatch(changeCodeMode(codemode))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledEditorComp)
