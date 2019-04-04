import React from 'react'
import { connect, registerFormField } from '@uform/react'
import { toArr, isArr, isEqual, mapStyledProps } from '../utils'
import { Button, Upload, Icon } from 'antd'
import styled from 'styled-components'
const { Dragger: UploadDragger } = Upload

const exts = [
  {
    ext: /\.docx?/i,
    icon: '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png'
  },
  {
    ext: /\.pptx?/i,
    icon: '//img.alicdn.com/tfs/TB1ItgWr_tYBeNjy1XdXXXXyVXa-200-200.png'
  },
  {
    ext: /\.jpe?g/i,
    icon: '//img.alicdn.com/tfs/TB1wrT5r9BYBeNjy0FeXXbnmFXa-200-200.png'
  },
  {
    ext: /pdf/i,
    icon: '//img.alicdn.com/tfs/TB1GwD8r9BYBeNjy0FeXXbnmFXa-200-200.png'
  },
  {
    ext: /\.png/i,
    icon: '//img.alicdn.com/tfs/TB1BHT5r9BYBeNjy0FeXXbnmFXa-200-200.png'
  },
  {
    ext: /\.eps/i,
    icon: '//img.alicdn.com/tfs/TB1G_iGrVOWBuNjy0FiXXXFxVXa-200-200.png'
  },
  {
    ext: /\.ai/i,
    icon: '//img.alicdn.com/tfs/TB1B2cVr_tYBeNjy1XdXXXXyVXa-200-200.png'
  },
  {
    ext: /\.gif/i,
    icon: '//img.alicdn.com/tfs/TB1DTiGrVOWBuNjy0FiXXXFxVXa-200-200.png'
  },
  {
    ext: /\.svg/i,
    icon: '//img.alicdn.com/tfs/TB1uUm9rY9YBuNjy0FgXXcxcXXa-200-200.png'
  },
  {
    ext: /\.xlsx?/i,
    icon: '//img.alicdn.com/tfs/TB1any1r1OSBuNjy0FdXXbDnVXa-200-200.png'
  },
  {
    ext: /\.psd?/i,
    icon: '//img.alicdn.com/tfs/TB1_nu1r1OSBuNjy0FdXXbDnVXa-200-200.png'
  },
  {
    ext: /\.(wav|aif|aiff|au|mp1|mp2|mp3|ra|rm|ram|mid|rmi)/i,
    icon: '//img.alicdn.com/tfs/TB1jPvwr49YBuNjy0FfXXXIsVXa-200-200.png'
  },
  {
    ext: /\.(avi|wmv|mpg|mpeg|vob|dat|3gp|mp4|mkv|rm|rmvb|mov|flv)/i,
    icon: '//img.alicdn.com/tfs/TB1FrT5r9BYBeNjy0FeXXbnmFXa-200-200.png'
  },
  {
    ext: /\.(zip|rar|arj|z|gz|iso|jar|ace|tar|uue|dmg|pkg|lzh|cab)/i,
    icon: '//img.alicdn.com/tfs/TB10jmfr29TBuNjy0FcXXbeiFXa-200-200.png'
  },
  {
    ext: /\..+/i,
    icon: '//img.alicdn.com/tfs/TB10.R4r3mTBuNjy1XbXXaMrVXa-200-200.png'
  }
]

const UploadPlaceholder = styled(props => (
  <div>
    <Icon type={props.loading ? 'loading' : 'plus'} />
    <div className='ant-upload-text'>上传</div>
  </div>
))``

const testOpts = (ext, options) => {
  if (options && isArr(options.include)) {
    return options.include.some(url => ext.test(url))
  }

  if (options && isArr(options.exclude)) {
    return !options.exclude.some(url => ext.test(url))
  }

  return true
}

const getImageByUrl = (url, options) => {
  for (let i = 0; i < exts.length; i++) {
    if (exts[i].ext.test(url) && testOpts(exts[i].ext, options)) {
      return exts[i].icon
    }
  }

  return url
}

const normalizeFileList = fileList => {
  if (fileList && fileList.length) {
    return fileList.map(file => {
      return {
        name: file.name,
        downloadURL: file.downloadURL || file.imgURL,
        ...file.response,
        imgURL: getImageByUrl(file.imgURL, {
          exclude: ['.png', '.jpg', '.jpeg', '.gif']
        })
      }
    })
  }
  return []
}

const shallowClone = val => {
  let result = isArr(val)
    ? [...val]
    : typeof val === 'object'
      ? { ...val }
      : val
  if (isArr(result)) {
    result = result.map(item => ({
      ...item,
      // 必须要有一个不重复的uid
      uid:
        item.uid ||
        Math.random()
          .toFixed(16)
          .slice(2, 10)
    }))
  }
  return result
}

registerFormField(
  'upload',
  connect({
    getProps: mapStyledProps
  })(
    class Uploader extends React.Component {
      static defaultProps = {
        action: '',
        listType: 'text',
        multiple: true,
        className: 'antd-uploader'
      }

      constructor(props) {
        super(props)
        this.state = {
          value: shallowClone(toArr(props.value))
        }
      }

      onRemoveHandler = file => {
        const { value } = this.state
        const fileList = []
        value.forEach(item => {
          if (item.uid !== file.uid) {
            fileList.push(item)
          }
        })
        this.props.onChange(fileList)
      }

      onChangeHandler = ({ fileList, file }) => {
        const { onChange } = this.props
        fileList = toArr(fileList)
        if (
          fileList.every(
            file => file.status === 'done' || file.imgURL || file.downloadURL
          ) &&
          fileList.length
        ) {
          fileList = normalizeFileList(fileList)
          this.setState(
            {
              value: fileList
            },
            () => {
              onChange(fileList.length > 0 ? fileList : undefined)
            }
          )
        } else if (file.status !== 'error' && file.status !== 'uploading') {
          this.setState({
            value: fileList
          })
        }
      }

      componentDidUpdate(preProps) {
        if (this.props.value && !isEqual(this.props.value, preProps.value)) {
          this.setState({
            value: shallowClone(this.props.value)
          })
        }
      }

      render() {
        const { listType, locale, onChange, value, ...others } = this.props
        if (listType.indexOf('card') > -1) {
          return (
            <Upload
              {...others}
              fileList={this.state.value}
              onChange={this.onChangeHandler}
              onRemove={this.onRemoveHandler}
              listType='picture-card'
            >
              <UploadPlaceholder />
            </Upload>
          )
        }
        if (listType.indexOf('dragger') > -1) {
          return (
            <UploadDragger
              {...others}
              fileList={this.state.value}
              onChange={this.onChangeHandler}
              onRemove={this.onRemoveHandler}
              listType={listType.indexOf('image') > -1 ? 'image' : 'text'}
            >
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-text'>拖拽上传</p>
            </UploadDragger>
          )
        }
        return (
          <Upload
            {...others}
            fileList={this.state.value}
            onChange={this.onChangeHandler}
            onRemove={this.onRemoveHandler}
            listType={listType}
          >
            <Button style={{ margin: '0 0 10px' }}>
              <Icon type='upload' />
              {(locale && locale.uploadText) || '上传文件'}
            </Button>
          </Upload>
        )
      }
    }
  )
)
