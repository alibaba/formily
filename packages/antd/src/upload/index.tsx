import React, { useEffect } from 'react'
import { Field } from '@formily/core'
import { connect, mapProps, useField } from '@formily/react'
import { Upload as AntdUpload, Button } from 'antd'
import {
  UploadChangeParam,
  UploadProps as AntdUploadProps,
  DraggerProps as AntdDraggerProps,
} from 'antd/lib/upload'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { reaction } from '@formily/reactive'
import { UploadFile } from 'antd/lib/upload/interface'
import { isArr, toArr } from '@formily/shared'
import { UPLOAD_PLACEHOLDER } from './placeholder'
import { usePrefixCls } from '../__builtins__'

export type IUploadProps = Omit<AntdUploadProps, 'onChange'> & {
  textContent?: React.ReactNode
  onChange?: (fileList: UploadFile[]) => void
  serviceErrorMessage?: string
}

export type IDraggerUploadProps = Omit<AntdDraggerProps, 'onChange'> & {
  textContent?: React.ReactNode
  onChange?: (fileList: UploadFile[]) => void
  serviceErrorMessage?: string
}

type ComposedUpload = React.FC<IUploadProps> & {
  Dragger?: React.FC<IDraggerUploadProps>
}

type IExtendsUploadProps = {
  fileList?: any[]
  serviceErrorMessage?: string
  onChange?: (...args: any) => void
}

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

const getURL = (target: any) => {
  return target?.['url'] || target?.['downloadURL'] || target?.['imgURL']
}
const getThumbURL = (target: any) => {
  return (
    target?.['thumbUrl'] ||
    target?.['url'] ||
    target?.['downloadURL'] ||
    target?.['imgURL']
  )
}

const getErrorMessage = (target: any) => {
  return (
    target?.errorMessage ||
    target?.errMsg ||
    target?.errorMsg ||
    target?.message ||
    (typeof target?.error === 'string' ? target.error : '')
  )
}

const getState = (target: any) => {
  if (target?.success === false) return 'error'
  if (target?.failed === true) return 'error'
  if (target?.error) return 'error'
  return target?.state || target?.status
}

const normalizeFileList = (fileList: UploadFile[]) => {
  if (fileList && fileList.length) {
    return fileList.map((file, index) => {
      return {
        ...file,
        uid: file.uid || `${index}`,
        status: getState(file.response) || getState(file),
        url: getURL(file) || getURL(file?.response),
        thumbUrl: getImageByUrl(
          getThumbURL(file) || getThumbURL(file?.response),
          {
            exclude: ['.png', '.jpg', '.jpeg', '.gif'],
          }
        ),
      }
    })
  }
  return []
}

const useValidator = (validator: (value: any) => string) => {
  const field = useField<Field>()
  useEffect(() => {
    const dispose = reaction(
      () => field.value,
      (value) => {
        const message = validator(value)
        field.setFeedback({
          type: 'error',
          code: 'UploadError',
          messages: message ? [message] : [],
        })
      }
    )
    return () => {
      dispose()
    }
  }, [])
}

const useUploadValidator = (serviceErrorMessage = 'Upload Service Error') => {
  useValidator((value) => {
    const list = toArr(value)
    for (let i = 0; i < list.length; i++) {
      if (list[i]?.status === 'error') {
        return (
          getErrorMessage(list[i]?.response) ||
          getErrorMessage(list[i]) ||
          serviceErrorMessage
        )
      }
    }
  })
}

function useUploadProps<T extends IExtendsUploadProps = IUploadProps>({
  serviceErrorMessage,
  ...props
}: T) {
  useUploadValidator(serviceErrorMessage)
  const onChange = (param: UploadChangeParam<UploadFile>) => {
    props.onChange?.(normalizeFileList([...param.fileList]))
  }
  return {
    ...props,
    fileList: normalizeFileList(props.fileList),
    onChange,
  }
}

const getPlaceholder = (props: IUploadProps) => {
  if (props.listType !== 'picture-card') {
    return (
      <Button>
        <UploadOutlined />
        {props.textContent}
      </Button>
    )
  }
  return <UploadOutlined style={{ fontSize: 20 }} />
}

export const Upload: ComposedUpload = connect(
  (props: React.PropsWithChildren<IUploadProps>) => {
    return (
      <AntdUpload {...useUploadProps(props)}>
        {props.children || getPlaceholder(props)}
      </AntdUpload>
    )
  },
  mapProps({
    value: 'fileList',
  })
)

const Dragger = connect(
  (props: React.PropsWithChildren<IDraggerUploadProps>) => {
    return (
      <div className={usePrefixCls('upload-dragger')}>
        <AntdUpload.Dragger {...useUploadProps(props)}>
          {props.children || (
            <React.Fragment>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              {props.textContent && (
                <p className="ant-upload-text">{props.textContent}</p>
              )}
            </React.Fragment>
          )}
        </AntdUpload.Dragger>
      </div>
    )
  },
  mapProps({
    value: 'fileList',
  })
)

Upload.Dragger = Dragger

export default Upload
