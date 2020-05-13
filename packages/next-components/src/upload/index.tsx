import React from 'react'
import { connect } from '@formily/react-schema-renderer'
import { toArr, isArr, isEqual, mapStyledProps } from '../shared'
import { Button, Upload as NextUpload } from '@alifd/next'
import { UploadProps, CardProps } from '@alifd/next/types/upload'
const { Card: UploadCard, Dragger: UploadDragger } = NextUpload

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

const shallowClone = val =>
  isArr(val) ? [...val] : typeof val === 'object' ? { ...val } : val

export interface IUploaderProps extends UploadProps {
  locale: { [name: string]: any }
}

export const Upload = connect({
  getProps: mapStyledProps
})(
  class Uploader extends React.Component<IUploaderProps> {
    static defaultProps = {
      action:
        'https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload',
      listType: 'text',
      multiple: true
    }

    state = {
      value: toArr(this.props.value)
    }

    onChangeHandler = (fileList?: any) => {
      const { onChange } = this.props
      fileList = toArr(fileList)
      if (
        fileList.every(
          file => file.state === 'done' || file.imgURL || file.downloadURL
        )
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
      } else {
        this.setState({
          value: fileList
        })
      }
    }

    componentDidUpdate(preProps) {
      if (this.props.value && !isEqual(this.props.value, preProps.value)) {
        this.setState({
          value: this.props.value
        })
      }
    }

    render() {
      const {
        listType,
        locale,
        onChange,
        value,
        children,
        ...others
      } = this.props

      if (listType.indexOf('card') > -1) {
        return (
          <UploadCard
            {...(others as CardProps)}
            value={shallowClone(this.state.value)}
            onChange={this.onChangeHandler}
            listType="card"
          />
        )
      }
      if (listType.indexOf('dragger') > -1) {
        return (
          // @ts-ignore 感觉是 next 那边对于 Dragger 的 props 定义错了
          <UploadDragger
            {...others}
            value={shallowClone(this.state.value)}
            onChange={this.onChangeHandler}
            listType={listType.indexOf('image') > -1 ? 'image' : 'text'}
          />
        )
      }
      return (
        <NextUpload
          {...others}
          value={shallowClone(this.state.value)}
          onChange={this.onChangeHandler}
          listType={listType}
        >
          {children ? (
            children
          ) : (
            <Button style={{ margin: '0 0 10px' }}>
              {(locale && locale.uploadText) || '上传文件'}
            </Button>
          )}
        </NextUpload>
      )
    }
  }
)

export default Upload