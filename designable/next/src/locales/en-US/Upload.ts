import type { ISettingsLocale } from '../types'

export const Upload: ISettingsLocale = {
  action: 'Upload Url',
  shape: {
    title: 'Shape',
    dataSource: ['Normal', 'Card'],
  },
  accept: 'Accept File Type',
  data: 'Upload Extra Data',
  headers: 'Upload Headers',
  withCredentials: 'With Credentials',
  timeout: 'Timeout(ms)',
  method: {
    title: 'Upload Method',
    dataSource: ['POST', 'PUT'],
  },
  request: 'Custom Upload Function',
  name: 'Name Key',
  listType: {
    title: 'Upload List Type',
    dataSource: ['Default', 'Text', 'Image', 'Card'],
  },
  limit: 'Max Upload count',
  dragable: 'Dragable',
  useDataURL: 'Local Preview',
  autoUpload: 'Auto Upload',
}

Upload.Dragger = { ...Upload }
