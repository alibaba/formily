import type { ISettingsLocale } from '../types'

export const Upload: ISettingsLocale = {
  action: 'Upload address',
  shape: {
    title: 'Appearance',
    dataSource: ['Normal', 'Card'],
  },
  accept: 'Accept file type',
  data: 'Upload additional parameters',
  headers: 'Upload request header',
  withCredentials: 'Carry cookies',
  timeout: 'Timeout (ms)',
  method: {
    title: 'Upload method',
    dataSource: ['Post', 'Put'],
  },
  name: 'File name',
  listType: {
    title: 'Upload list style',
    dataSource: ['Default', 'Text', 'Picture', 'Card'],
  },
  limit: 'Maximum number of file uploads',
  dragable: 'Support drag upload',
  useDataURL: 'Local preview',
  autoUpload: 'Auto upload',
}

Upload.Dragger = { ...Upload }
