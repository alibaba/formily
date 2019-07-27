import React from 'react'
import { GLOBAL_BTN_ICON_URL } from '../../configs/theme'
import { wrapSubmitSchema, CustomIcon } from '../../utils/util'
import merge from 'lodash.merge'

export default props => {
  const {
    preview,
    codemode,
    onSubmit,
    themeStyle,
    changeCodeMode: _changeCodeMode,
    globalButtonList,
    showPreviewBtn,
    showSourceCodeBtn,
    UI
  } = props

  // 获取主题下的默认icon图片地址
  const globalBtnIconUrlWithTheme = GLOBAL_BTN_ICON_URL[themeStyle]

  // 默认按钮
  const defaultBtnList = [
    {
      key: 'preview',
      show: showPreviewBtn,
      title: preview ? '返回编辑' : '预览',
      props: {
        onClick: () => {
          props.changePreview(!props.preview)
        }
      },
      iconType: 'eye',
      iconUrl: globalBtnIconUrlWithTheme.preview,
      iconWidth: 16,
      iconHeight: 16
    },
    {
      key: 'submit',
      title: '保存',
      props: {
        type: 'primary',
        onClick: () => {
          onSubmit &&
            typeof onSubmit === 'function' &&
            onSubmit({
              schema: wrapSubmitSchema(props.initSchemaData),
              globalCfg: props.gbConfig
            })
        }
      },
      iconType: 'save',
      iconUrl: globalBtnIconUrlWithTheme.submit,
      iconWidth: 15,
      iconHeight: 15
    },
    {
      key: 'code',
      show: showSourceCodeBtn,
      title: codemode ? '关闭源码' : '源码',
      props: {
        onClick: () => {
          _changeCodeMode(!props.codemode)
        }
      },
      iconUrl: globalBtnIconUrlWithTheme.code,
      iconWidth: 21,
      iconHeight: 16
    }
  ]

  // 合并相同key的数据
  const _globalButtonList = defaultBtnList.map(btnItem => {
    const { key } = btnItem
    const customBtnItem = globalButtonList.find(btn => btn.key === key)
    return customBtnItem ? merge({}, btnItem, customBtnItem) : btnItem
  })

  // 注入额外的数据
  globalButtonList.forEach(btnItem => {
    if (['preview', 'submit', 'preview'].indexOf(btnItem.key) === -1) {
      _globalButtonList.push(btnItem)
    }
  })

  return _globalButtonList.map(btnItem => {
    const {
      props = {},
      key,
      show = true,
      title,
      iconUrl,
      iconWidth,
      iconHeight,
      render
    } = btnItem

    if (!title || !show || !key) return null

    const customIconTpl = iconUrl ? (
      <CustomIcon iconUrl={iconUrl} width={iconWidth} height={iconHeight} />
    ) : null

    const originalBtn = (
      <UI.Button key={key} {...props}>
        {customIconTpl}
        <span>{title}</span>
      </UI.Button>
    )

    return render
      ? React.createElement(render, btnItem, originalBtn)
      : originalBtn
  })
}
