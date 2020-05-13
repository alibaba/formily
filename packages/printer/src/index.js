import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { createFormActions, Schema } from '@formily/react-schema-renderer'
import styled from 'styled-components'
import Modal from 'react-modal'

const Dialog = styled(props => {
  const [visible, setVisible] = useState(true)
  return (
    <Modal
      {...props}
      style={{ overlay: { zIndex: 99999 } }}
      isOpen={visible}
      onRequestClose={() => {
        setVisible(false)
      }}
    >
      <div
        className="close-btn"
        onClick={() => {
          setVisible(false)
        }}
      >
        <img src="//img.alicdn.com/tfs/TB1KikcO5rpK1RjSZFhXXXSdXXa-200-200.svg" />
      </div>
      <div className="dialog-content" style={{ overflow: 'auto' }}>
        {props.children}
      </div>
    </Modal>
  )
})`
  position: relative;
  margin: 100px;
  padding: 30px;
  height: calc(100% - 200px);
  overflow: auto;
  border: 1px solid #eee;
  background: #fff;
  outline: none;
  box-shadow: 0 0 55px #555;
  border-radius: 10px;
  .close-btn {
    position: absolute;
    top: 15px;
    right: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .dialog-content {
    overflow: auto;
    height: 100%;
  }
`

const createAlert = (config = {}) => {
  const container = document.createElement('div')
  const unMount = () => {
    ReactDOM.unmountComponentAtNode(container)
    container.parentNode.removeChild(container)
  }
  if (typeof config === 'string' || React.isValidElement(config)) {
    config = {
      content: config
    }
  }
  document.body.appendChild(container)
  ReactDOM.render(
    <Dialog {...config} appElement={container} afterClose={unMount}>
      {config.content}
    </Dialog>,
    container
  )
}

const printSchema = schema => {
  return JSON.stringify(new Schema(schema).toJSON(), null, 2)
}

export default class extends React.Component {
  actions = createFormActions()

  onClickHandler = async e => {
    e.preventDefault()
    const schema = await this.actions.getFormSchema('')
    createAlert(
      <div>
        <h1>JSON Schema</h1>
        <pre>
          <code>{printSchema(schema)}</code>
        </pre>
        <h1>Formily Usage</h1>
        <pre>
          <code>{`<SchemaForm schema={${printSchema(schema)}} />`}</code>
        </pre>
      </div>
    )
  }

  render() {
    const { children, className, noSchema } = this.props
    if (children && children.props && children.props.actions) {
      this.actions = children.props.actions
    }
    return (
      <div className={className}>
        {React.cloneElement(children, {
          actions: this.actions,
          onSubmit:
            children.props.onSubmit ||
            (values => {
              createAlert(
                <div>
                  <h1>Submit Result</h1>
                  <pre>
                    <code>{JSON.stringify(values, null, 2)}</code>
                  </pre>
                </div>
              )
            })
        })}
        {!noSchema && (
          <a
            href=""
            style={{
              fontSize: 12,
              textDecoration: 'none',
              margin: '20px 0',
              display: 'block',
              textAlign: 'center'
            }}
            onClick={this.onClickHandler}
          >
            Print JSON Schema
          </a>
        )}
      </div>
    )
  }
}
