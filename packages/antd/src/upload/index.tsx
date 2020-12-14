import React from 'react'
import { connect, mapProps } from '@formily/react'
import { Upload as AntdUpload } from 'antd'
import {
  UploadChangeParam,
  UploadProps as AntdUploadProps,
  DraggerProps as AntdDraggerProps
} from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { isArr } from '@formily/shared'
import { UPLOAD_PLACEHOLDER } from './placeholder'

const testOpts = (
  ext: RegExp,
  options: { exclude?: string[]; include?: string[] }
) => {
  if (options && isArr(options.include)) {
    return options.include.some(url => ext.test(url))
  }

  if (options && isArr(options.exclude)) {
    return !options.exclude.some(url => ext.test(url))
  }

  return true
}

const getImageByUrl = (url: string, options: any) => {
  for (let i = 0; i < UPLOAD_PLACEHOLDER.length; i++) {
    if (
      UPLOAD_PLACEHOLDER[i].ext.test(url) &&
      testOpts(UPLOAD_PLACEHOLDER[i].ext, options)
    ) {
      return UPLOAD_PLACEHOLDER[i].icon || url
    }
  }

  return url
}

const normalizeFileList = (fileList: UploadFile[]) => {
  if (fileList && fileList.length) {
    return fileList.map(file => {
      return {
        uid: file.uid,
        status: file.status,
        name: file.name,
        url: file['downloadURL'] || file['imgURL'] || file.url,
        ...file.response,
        thumbUrl:
          file.thumbUrl ||
          file['imgURL'] ||
          getImageByUrl(file['downloadURL'] || file.url, {
            exclude: ['.png', '.jpg', '.jpeg', '.gif']
          })
      }
    })
  }
  return []
}

type UploadProps = Omit<AntdUploadProps, 'onChange'> & {
  onChange?: (fileList: UploadFile[]) => void
}

type DraggerProps = Omit<AntdDraggerProps, 'onChange'> & {
  onChange?: (fileList: UploadFile[]) => void
}

type ComposedUpload = React.FC<UploadProps> & {
  Dragger?: React.FC<DraggerProps>
}

export const Upload: ComposedUpload = connect(
  (props: UploadProps) => {
    const handleChange = (param: UploadChangeParam<UploadFile>) => {
      props.onChange?.(normalizeFileList([...param.fileList]))
    }

    const handleRemove = (file: UploadFile) => {
      props.onChange?.(
        props.fileList?.filter?.(v => v.url !== file.uid && v.url !== file.url)
      )
    }

    return (
      <AntdUpload {...props} onChange={handleChange} onRemove={handleRemove} />
    )
  },
  mapProps({
    extract: 'value',
    to: 'fileList'
  })
)

export const Dragger = connect(
  (props: DraggerProps) => {
    const handleChange = (param: UploadChangeParam<UploadFile>) => {
      props.onChange?.(normalizeFileList([...param.fileList]))
    }

    const handleRemove = (file: UploadFile) => {
      props.onChange?.(
        props.fileList?.filter?.(v => v.url !== file.uid && v.url !== file.url)
      )
    }

    return (
      <AntdUpload.Dragger
        {...props}
        onChange={handleChange}
        onRemove={handleRemove}
      />
    )
  },
  mapProps({
    extract: 'value',
    to: 'fileList'
  })
)

Upload.Dragger = Dragger

export default Upload
