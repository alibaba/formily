import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SchemaForm, Field } from '../../utils/baseForm'
import remove from 'lodash.remove'

const showUploadListData = [
  { value: 'text', label: '文字' },
  { value: 'text-image', label: '图文' },
  { value: 'picture-card', label: '卡片' }
]

const apiHost =
  window.location.href.indexOf('.tmall.com') > -1
    ? '//sop.tmall.com'
    : '//sop.daily.tmall.net'
const uploadUrl = `${apiHost}/workflow/instance/formUpload.do`

// 文件特殊设置
class fileSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xprops: props.xprops || {}
    }
  }

  componentDidUpdate(prevProps) {
    const preXprops = prevProps.xprops || {}
    const curXprops = this.props.xprops || {}
    if (JSON.stringify(preXprops) !== JSON.stringify(curXprops)) {
      this.setState({
        xprops: curXprops
      })
    }
  }

  onChangeDefaultFile(newDefaultFileList) {
    const { onChange } = this.props
    const newXprops = this.state.xprops
    newXprops.defaultFileList = newDefaultFileList

    this.setState(
      {
        xprops: newXprops
      },
      () => {
        onChange && onChange(newXprops)
      }
    )
  }

  onChangeHandler = formdata => {
    const { onChange } = this.props
    const newXprops = Object.assign({}, this.state.xprops, formdata)

    if (newXprops.file) {
      newXprops.defaultFileList = newXprops.file
      delete newXprops.file
    }

    this.setState(
      {
        xprops: newXprops
      },
      () => {
        onChange && onChange(newXprops)
      }
    )
  }

  getSchemaValue() {
    const { xprops = {} } = this.props
    const {
      action = '',
      limit = 10,
      showUploadList = true,
      listType = 'text',
      defaultFileList = []
    } = xprops
    return {
      action,
      limit,
      showUploadList,
      listType,
      file: defaultFileList
    }
  }

  renderProps() {
    return (
      <SchemaForm
        value={this.getSchemaValue()}
        onChange={this.onChangeHandler}
        labelAlign="top"
      >
        <Field title="文件上传地址" type="string" name="action" />
        <Field title="文件限制个数" type="number" name="limit" />
        <Field title="展示文件列表" type="boolean" name="showUploadList" />
        <Field
          title="上传列表样式"
          type="string"
          enum={showUploadListData}
          name="listType"
        />
      </SchemaForm>
    )
  }

  renderUploadComp() {
    const { xprops = {}, UI } = this.props
    const { defaultFileList = [] } = xprops
    return (
      <div className="next-form">
        <div className="next-form-item">
          <label className="next-col-8 next-form-item-label">
            <span>模板文件：</span>
          </label>
          <div className="next-form-item-control">
            <div className="schema-inline-field">
              <div className="schema-form-field">
                <UI.Upload
                  name="file"
                  listType="text"
                  withCredentials
                  action={uploadUrl}
                  data={{
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    _scm_token_: window._scm_token_
                  }}
                  formatter={res => {
                    const imgKey =
                      res.data && Object.keys(res.data).length
                        ? Object.keys(res.data)[0]
                        : null

                    return {
                      code: res.succ === true ? '0' : '1',
                      name: imgKey,
                      imgURL: imgKey && res.data[imgKey],
                      downloadURL: imgKey && res.data[imgKey],
                      fileURL: imgKey && res.data[imgKey]
                    }
                  }}
                  fileList={defaultFileList}
                  onRemove={res => {
                    const newDefaultFileList =
                      this.props.xprops.defaultFileList || []
                    remove(
                      newDefaultFileList,
                      item => item.fileURL === res.fileURL
                    )
                    this.onChangeDefaultFile(newDefaultFileList)
                  }}
                  onSuccess={res => {
                    const newDefaultFileList =
                      this.props.xprops.defaultFileList || []
                    newDefaultFileList.push(res)
                    this.onChangeDefaultFile(newDefaultFileList)
                  }}
                  onError={() => {
                    this.props.UI.Toast.error('文件上传失败')
                  }}
                >
                  <UI.Button>上传文件</UI.Button>
                </UI.Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="file-setting">
        {this.renderProps()}
        {this.renderUploadComp()}
      </div>
    )
  }
}

fileSetting.propTypes = {
  // eslint-disable-next-line
  xprops: PropTypes.object,
  onChange: PropTypes.func
}

fileSetting.defaultProps = {
  xprops: {},
  // eslint-disable-next-line
  onChange: xprops => {}
}

export default fileSetting
