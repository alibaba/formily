import React, { useEffect } from 'react'
import { Field } from '@formily/core'
import { useField } from '@formily/react'
import { reaction } from '@formily/reactive'
import { Upload as NextUpload } from '@alifd/next'
import { UploadProps, CardProps } from '@alifd/next/lib/upload'
import { isArr, toArr } from '@formily/shared'
import { UPLOAD_PLACEHOLDER } from './placeholder'

type FileList = Parameters<UploadProps['onChange']>[0]

type ExtendUploadProps = UploadProps & { serviceErrorMessage?: string }

type ExtendCardProps = CardProps & { serviceErrorMessage?: string }

type ComposedUpload = React.FC<ExtendUploadProps> & {
  Card?: React.FC<ExtendCardProps>
  Dragger?: React.FC<ExtendUploadProps>
}

type IUploadProps = {
  serviceErrorMessage?: string
  onChange?: (...args: any) => void
  formatter?: (...args: any) => any
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
  return target?.errorMessage ||
    target?.errMsg ||
    target?.errorMsg ||
    target?.message ||
    typeof target?.error === 'string'
    ? target.error
    : ''
}

const getState = (target: any) => {
  if (target?.success === false) return 'error'
  if (target?.failed === true) return 'error'
  if (target?.error) return 'error'
  return target?.state || target?.status
}

const normalizeFileList = (fileList: UploadProps['value']) => {
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
    }) as any[]
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

function useUploadProps<T extends IUploadProps = ExtendUploadProps>({
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
    onChange,
    formatter,
  }
}

export const Upload: ComposedUpload = (props) => {
  return <NextUpload listType="text" {...useUploadProps(props)} />
}

Upload.Dragger = (props) => {
  return <NextUpload.Dragger listType="text" {...useUploadProps(props)} />
}

Upload.Card = (props) => {
  return <NextUpload.Card listType="card" {...useUploadProps(props)} />
}

export default Upload
