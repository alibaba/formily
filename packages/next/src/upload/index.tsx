import React from 'react'
import { Upload as NextUpload } from '@alifd/next'
import { UploadProps, CardProps } from '@alifd/next/lib/upload'
import { isArr } from '@formily/shared'
import { UPLOAD_PLACEHOLDER } from './placeholder'

type FileList = Parameters<UploadProps['onChange']>[0]

const testOpts = (
  ext: RegExp,
  options: { exclude?: string[]; include?: string[] }
) => {
  if (options && isArr(options.include)) {
    return options.include.some((url) => ext.test(url))
  }

  if (options && isArr(options.exclude)) {
    return !options.exclude.some((url) => ext.test(url))
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

const normalizeFileList = (fileList: FileList) => {
  if (fileList && fileList.length) {
    return fileList.map((file) => {
      return {
        name: file.name,
        downloadURL: file['downloadURL'] || file['imgURL'] || file['url'],
        ...file['response'],
        imgURL:
          file['imgURL'] ||
          getImageByUrl(file['downloadURL'] || file['url'], {
            exclude: ['.png', '.jpg', '.jpeg', '.gif'],
          }),
      }
    })
  }
  return []
}

type ComposedUpload = React.FC<UploadProps> & {
  Card?: React.FC<UploadProps>
  Dragger?: React.FC<UploadProps>
}

export const Upload: ComposedUpload = (props: UploadProps) => {
  const handleChange = (fileList: FileList) => {
    props.onChange?.(normalizeFileList([...fileList]))
  }

  return <NextUpload {...props} onChange={handleChange} />
}

Upload.Dragger = (props: UploadProps) => {
  const handleChange = (fileList: FileList) => {
    props.onChange?.(normalizeFileList([...fileList]))
  }

  return <NextUpload.Dragger {...props} onChange={handleChange} />
}

Upload.Card = (props: CardProps) => {
  const handleChange = (fileList: FileList) => {
    props.onChange?.(normalizeFileList([...fileList]))
  }

  return <NextUpload.Card {...props} onChange={handleChange} />
}

export default Upload
