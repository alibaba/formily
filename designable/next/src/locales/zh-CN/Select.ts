import type { ISettingsLocale } from '../types'

export const Select: ISettingsLocale = {
  filterLocal: '本地过滤',
  filter: '过滤方法',
  autoHighlightFirstItem: '自动高亮首项',
  mode: {
    title: '模式',
    dataSource: ['单选', '多选', '标签'],
  },
  notFoundContent: {
    title: '无内容提示',
    tooltip: '弹层内容为空的文案',
  },
  showDataSourceChildren: {
    title: '展示数据源子节点',
  },
  hasSelectAll: '多选模式下是否可全选',
  cacheValue: {
    title: '缓存选中值',
    tooltip: '数据源变化的时是否保留已选的内容',
  },
  tagInline: '标签行内展示',
  tagClosable: '标签可关闭',
  adjustTagSize: {
    title: '调整标签大小',
    tooltip: '调整标签大小与选择器相同',
  },
  maxTagCount: '最多展示标签数量',
  hiddenSelected: '选择后立即隐藏菜单',
  popupAutoFocus: '弹出菜单时自动聚焦',
}
