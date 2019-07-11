import React from 'react'
import cls from 'classnames'

import { connect } from 'react-redux'
import { initSchema, changeGbConfig, changeCodeMode } from '../../actions/index'
import EditorStyle from './style'

class Component extends React.Component {
  componentDidMount() {
    /* eslint-disable */
    const defaultValue = this.getValueFromProps()
    const theme = this.props.themeStyle === 'dark' ? 'vs-dark' : 'vs'

    if (window.loadedMonaco === true) {
      self.monacoInstance = monaco.editor.create(
        document.getElementById('J_uformEditor'),
        {
          language: 'javascript',
          theme: theme,
          value: defaultValue
        }
      )
      return false
    }

    const script = document.createElement('script')
    script.src =
      '//g.alicdn.com/ascp-comp/common-monaco-editor/5.0.1/min/vs/loader.js'
    document.head.appendChild(script)

    const tpl1 = `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = {
        baseUrl: "https://g.alicdn.com/ascp-comp/common-monaco-editor/5.0.1/min/"
      };
      importScripts(
        "https://g.alicdn.com/ascp-comp/common-monaco-editor/5.0.1/min/vs/base/worker/workerMain.js"
      )`)}`

    script.onload = () => {
      const script2 = document.createElement('script')
      const tpl = `
        require.config({
          paths: {
            vs: "https://g.alicdn.com/ascp-comp/common-monaco-editor/5.0.1/min/vs" 
          }
        });
        window.MonacoEnvironment = {
          getWorkerUrl: function(workerId, label) {
            return "${tpl1}"
          }
        };
        require(["vs/editor/editor.main"], function() {
          window.loadedMonaco = true;
          self.monacoInstance = self.monacoInstance || monaco.editor.create(document.getElementById("J_uformEditor"), {
            language: "javascript",
            theme: "${theme}",
            value: ${JSON.stringify(defaultValue)}
          })
        })
      `
      script2.innerHTML = tpl
      document.head.appendChild(script2)
    }
    /* eslint-enable */
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

  componentDidUpdate() {
    window.monacoInstance &&
      window.monacoInstance.setValue(this.getValueFromProps())
  }

  render() {
    const { className, codemode } = this.props

    return (
      <EditorStyle className={cls(className, codemode ? 'active' : '')}>
        <div id="J_uformEditor" className="editor" />
        <a
          href="javascript:;"
          className="editor-btn"
          onClick={() => {
            try {
              // eslint-disable-next-line
              const newValue = new Function(
                `return ${window.monacoInstance.getValue()}`
              )()
              const { schema = {}, gbConfig = {} } = newValue
              const {
                initSchema: _initSchema,
                changeGbConfig: _changeGbConfig
              } = this.props
              _initSchema(schema)
              _changeGbConfig(gbConfig)
            } catch (e) {
              throw new Error(`格式转换失败，请检查代码:  + ${e.message}`)
            }
          }}
        >
          保存源码
        </a>
      </EditorStyle>
    )
  }
}

class StyledEditorComp extends React.Component {
  render() {
    return <Component {...this.props} />
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
