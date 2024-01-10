import React, { useEffect } from 'react'
import { Field } from '@formily/core'
import { useField } from '@formily/react'
import { reaction } from '@formily/reactive'
import { Upload as NextUpload, Button, Icon } from '@alifd/next'
import {
  UploadProps as NextUploadProps,
  CardProps,
} from '@alifd/next/lib/upload'
import { isArr, toArr } from '@formily/shared'
import { UPLOAD_PLACEHOLDER } from './placeholder'

type ExtendsUploadProps = NextUploadProps & {
  textContent?: React.ReactNode
  serviceErrorMessage?: string
}

type FileList = Parameters<ExtendsUploadProps['onChange']>[0]

type ComposedUpload = React.FC<React.PropsWithChildren<IUploadProps>> & {
  Card?: React.FC<React.PropsWithChildren<ICardUploadProps>>
  Dragger?: React.FC<React.PropsWithChildren<IUploadProps>>
}

type IExtendsUploadProps = {
  value?: any[]
  serviceErrorMessage?: string
  onChange?: (...args: any) => void
  formatter?: (...args: any) => any
}

export type IUploadProps = ExtendsUploadProps & { serviceErrorMessage?: string }

export type ICardUploadProps = CardProps & { serviceErrorMessage?: string }

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

const getSuccess = (target: any) => {
  return (
    target?.success ||
    target?.status === 'done' ||
    target?.status === 'success' ||
    target?.state === 'done' ||
    target?.state === 'success'
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

const normalizeFileList = (fileList: IUploadProps['value']) => {
  if (fileList && fileList.length) {
    return fileList.map(({ ...file }, index) => {
      delete file['originFileObj']
      return {
        ...file,
        uid: file.uid || index,
        state: getState(file?.response) || getState(file),
        downloadURL: getURL(file) || getURL(file?.response),
        imgURL: getImageByUrl(
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
      if (list[i]?.state === 'error') {
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
  const onChange = (fileList: FileList) => {
    props.onChange?.(normalizeFileList([...fileList]))
  }

  const formatter = (res: any, file: any) => {
    const response = props?.formatter?.(res, file) as any
    return {
      ...res,
      success: getSuccess(res),
      ...response,
    }
  }
  return {
    ...props,
    value: normalizeFileList(props.value),
    onChange,
    formatter,
  }
}

const getPlaceholder = (props: IUploadProps) => {
  if (props.shape !== 'card') {
    return (
      <Button>
        <Icon type="upload" />
        {props.textContent}
      </Button>
    )
  }
  return <Icon type="upload" style={{ fontSize: 20 }} />
}

export const Upload: ComposedUpload = (props) => {
  return (
    <NextUpload listType="text" {...useUploadProps(props)}>
      {props.children || getPlaceholder(props)}
    </NextUpload>
  )
}

Upload.Dragger = (props) => {
  return <NextUpload.Dragger listType="text" {...useUploadProps(props)} />
}

Upload.Card = (props) => {
  return <NextUpload.Card listType="card" {...useUploadProps(props)} />
}

export default Upload
