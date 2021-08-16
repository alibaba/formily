import type { ISettingsLocale } from '../types'

export const Upload: ISettingsLocale = {
  action: '上传地址',
  shape: {
    title: '外观',
    dataSource: ['正常', '卡片'],
  },
  accept: '接受文件类型',
  data: '上传额外参数',
  headers: '上传请求头部',
  withCredentials: '携带 Cookie',
  timeout: '超时（ms）',
  method: {
    title: '上传方法',
    dataSource: ['POST', 'PUT'],
  },
  request: '自定义上传函数',
  name: '文件名键值',
  listType: {
    title: '上传列表样式',
    dataSource: ['默认', '文本', '图片', '卡片'],
  },
  limit: '最大文件上传数量',
  dragable: '支持拖拽上传',
  useDataURL: '本地预览',
  autoUpload: '自动上传',
}

Upload.Dragger = { ...Upload }
