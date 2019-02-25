import React from 'react'
import cls from 'classnames'
import Dialog from '@alifd/next/lib/dialog'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { initSchema, changeGbConfig, changeCodeMode } from '../../actions/index'
import editorStyle from './style'
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
  ${editorStyle}
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
