```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, FormButtonGroup, Submit } from '@formily/next'
import { Input, ArrayTable, Checkbox, Select } from '@formily/next-components'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const schema = {
  type: 'object',
  name: 'DP_PurchaseList',
  'x-component-props': {
    size: 'medium',
    labelAlign: 'left',
    labelTextAlign: 'right',
    labelCol: 1,
    wrapperCol: 24,
    useVirtual: false
  },
  properties: {
    poFormList: {
      key: 'poFormList',
      'x-component': 'arraytable',
      type: 'array',
      title: '采购查询表单',
      'x-index': 0,
      'x-component-props': {
        renderAddition: '添加',
        renderRemove: '删除',
        renderEmpty: '暂无数据',
        useVirtual: false
      },
      'x-rules': [],

      description: '',
      default: [
        {
          field: ['purchaseOrderNos'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '采购单编号',
          properties: ['optional', 'show'],
          group: 'purchaseOrderNos'
        },
        {
          field: ['reserveOrderNos'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '预约单号',
          properties: ['optional', 'show'],
          group: 'purchaseOrderNos'
        },
        {
          field: ['sourceOrderCodes'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '来源单号',
          properties: ['optional', 'show'],
          group: 'purchaseOrderNos'
        },
        {
          field: ['consignOrderNos'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '发货批次单号',
          properties: ['optional', 'show'],
          group: 'purchaseOrderNos'
        },
        {
          field: ['outInboundNos'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '物流单号',
          properties: ['optional', 'show'],
          group: 'purchaseOrderNos'
        },
        {
          field: ['itemIds'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '前端商品ID',
          properties: ['optional', 'show'],
          group: 'scItemIds'
        },
        {
          field: ['scItemIds'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '后端商品ID',
          properties: ['optional', 'show'],
          group: 'scItemIds'
        },
        {
          field: ['barcodes'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['BatchInput'],
          title: '条形码',
          properties: ['optional', 'show'],
          group: 'scItemIds'
        },
        {
          field: ['storeCodeList'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['Warehouses'],
          title: '仓库',
          properties: ['optional', 'show']
        },
        {
          field: ['supplierId'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['Suppliers'],
          title: '供应商',
          properties: ['optional', 'show']
        },
        {
          field: ['marketingTypeList'],
          options: [
            {
              value: 'ascm.dict.basic.marketing.type',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '经营模式',
          properties: ['optional', 'show']
        },
        {
          field: ['sfIndustryLevel1IdList'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['RequestSelect'],
          title: '一级行业',
          properties: ['optional', 'show']
        },
        {
          field: ['sfCategoryIdList'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['Input'],
          title: '类目',
          properties: ['optional', 'show']
        },
        {
          field: ['brandIdList'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['RequestSelect'],
          title: '品牌',
          properties: ['optional', 'show']
        },
        {
          field: ['bizStatusList'],
          options: [
            {
              value: 'ascm.dict.purchase.order.bizStatus',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '采购单状态',
          properties: ['optional', 'show']
        },
        {
          field: ['consignOrderBizStatusList'],
          options: [
            {
              value: 'ascm.dict.consign.order.bizStatus',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '发货单状态',
          properties: ['optional', 'show']
        },
        {
          field: ['reserveStatus'],
          options: [
            {
              value: 'ascm.dict.purchase.reserve.status',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '预约状态',
          properties: ['optional', 'show']
        },
        {
          field: ['sourceChannel'],
          options: [
            {
              value: 'ascm.dict.purchase.order.sourceChannel',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '来源类型',
          properties: ['optional', 'show']
        },
        {
          field: ['creator'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['Input'],
          title: '创建人',
          properties: ['optional', 'show']
        },
        {
          field: ['purchaseManager'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['Input'],
          title: '采购小二',
          properties: ['optional', 'show']
        },
        {
          field: ['[gmtCreateLeft, gmtCreateRight]'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['DateRangePicker'],
          title: '创建时间',
          properties: ['optional', 'show']
        },
        {
          field: ['[preArriveTimeLeft, preArriveTimeRight]'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['DateRangePicker'],
          title: '期望到仓时间',
          properties: ['optional', 'show']
        },
        {
          field: ['[gmtReceiveFinishLeft, gmtReceiveFinishRight]'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['DateRangePicker'],
          title: '收货时间',
          properties: ['optional', 'show']
        },
        {
          field: ['[gmtExpirationLeft, gmtExpirationRight]'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['DateRangePicker'],
          title: '失效时间',
          properties: ['optional', 'show']
        },
        {
          field: ['poType'],
          options: [
            {
              value: 'ascm.dict.purchase.poType',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '单据类型',
          properties: ['optional', 'show']
        },
        {
          field: ['zeroOrder'],
          options: [
            {
              value: 'ascm.dict.purchase.poType',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '零价订单',
          properties: ['optional', 'show']
        },
        {
          field: ['tags'],
          options: [
            {
              value: 'ascm.dict.purchase.order.tags',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '标签',
          properties: ['optional', 'show']
        },
        {
          field: ['totalAmountGE'],
          options: [],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['Input'],
          title: '采购金额大于(元）',
          properties: ['optional', 'show']
        },
        {
          field: ['fullBulkFlag'],
          options: [
            {
              value: 'ascm.dict.purchase.order.fullBulkFlag',
              key: 'groupName'
            }
          ],
          occasions: ['display'],
          visualities: ['supplier', 'xiaoer'],
          type: ['KVGroup'],
          title: '存储类型',
          properties: ['optional', 'show']
        }
      ],
      items: {
        type: 'object',
        properties: {
          type: {
            key: 'type',
            'x-component': 'select',
            type: 'array',
            title: '类型',
            'x-index': 5,
            'x-component-props': {
              placeholder: '',
              dataSource: [
                {
                  label: '多行文本',
                  value: 'BatchInput'
                },
                {
                  label: '文本',
                  value: 'Input'
                },
                {
                  label: '异步选择器',
                  value: 'RequestSelect'
                },
                {
                  label: '数据字典',
                  value: 'KVGroup'
                },
                {
                  value: 'Warehouses',
                  label: '仓库'
                },
                {
                  label: '类目',
                  value: 'Categories'
                },
                {
                  value: 'Suppliers',
                  label: '供应商'
                },
                {
                  label: '日期区间',
                  value: 'DateRangePicker'
                },
                {
                  label: '日期',
                  value: 'DatePicker'
                }
              ],
              hasClear: true,
              useVirtual: false,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },

            'x-rules': [
              {
                required: true
              }
            ]
          },
          field: {
            key: 'field',
            'x-component': 'select',
            type: 'array',
            'x-index': 0,
            'x-component-props': {
              placeholder: '',
              dataSource: [
                {
                  label: '采购单编号',
                  value: 'purchaseOrderNos'
                },
                {
                  value: 'reserveOrderNos',
                  label: '预约单号'
                },
                {
                  label: '来源单号',
                  value: 'sourceOrderCodes'
                },
                {
                  label: '发货批次单号',
                  value: 'consignOrderNos'
                },
                {
                  label: '物流单号',
                  value: 'outInboundNos'
                },
                {
                  label: '前端商品ID',
                  value: 'itemIds'
                },
                {
                  label: '后端商品ID',
                  value: 'scItemIds'
                },
                {
                  value: 'barcodes',
                  label: '条形码'
                },
                {
                  label: '仓库',
                  value: 'storeCodeList'
                },
                {
                  label: '供应商',
                  value: 'supplierId'
                },
                {
                  label: '经营模式',
                  value: 'marketingTypeList'
                },
                {
                  label: '一级行业',
                  value: 'sfIndustryLevel1IdList'
                },
                {
                  label: '类目',
                  value: 'sfCategoryIdList'
                },
                {
                  label: '品牌',
                  value: 'brandIdList'
                },
                {
                  label: '采购单状态',
                  value: 'bizStatusList'
                },
                {
                  label: '发货单状态',
                  value: 'consignOrderBizStatusList'
                },
                {
                  label: '预约状态',
                  value: 'reserveStatus'
                },
                {
                  label: '来源类型',
                  value: 'sourceChannel'
                },
                {
                  label: '创建人',
                  value: 'creator'
                },
                {
                  label: '采购小二',
                  value: 'purchaseManager'
                },
                {
                  label: '创建时间',
                  value: '[gmtCreateLeft, gmtCreateRight]'
                },
                {
                  label: '期望到仓时间',
                  value: '[preArriveTimeLeft, preArriveTimeRight]'
                },
                {
                  label: '收货时间',
                  value: '[gmtReceiveFinishLeft, gmtReceiveFinishRight]'
                },
                {
                  label: '失效时间',
                  value: '[gmtExpirationLeft, gmtExpirationRight]'
                },
                {
                  label: '单据类型',
                  value: 'poType'
                },
                {
                  label: '零价订单',
                  value: 'zeroOrder'
                },
                {
                  label: '标签',
                  value: 'tags'
                },
                {
                  label: '采购金额大于(元)',
                  value: 'totalAmountGE'
                },
                {
                  label: '存储类型',
                  value: 'fullBulkFlag'
                }
              ],
              hasClear: true,
              useVirtual: false,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },

            title: '字段',
            'x-rules': []
          },
          properties: {
            key: 'properties',
            'x-component': 'checkbox',
            type: 'array',
            title: '属性',
            'x-index': 2,
            'x-component-props': {
              dataSource: [
                {
                  label: '显示',
                  value: 'show'
                },
                {
                  label: '可选',
                  value: 'optional'
                }
              ],
              useVirtual: false
            }
          },
          visualities: {
            key: 'visualities',
            'x-component': 'checkbox',
            type: 'array',
            title: '可视性',
            'x-index': 3,
            'x-component-props': {
              dataSource: [
                {
                  label: '小二',
                  value: 'xiaoer'
                },
                {
                  label: '供应商',
                  value: 'supplier'
                }
              ],
              useVirtual: false
            },
            'x-rules': []
          },
          occasions: {
            key: 'occasions',
            'x-component': 'checkbox',
            type: 'array',
            title: '场景',
            'x-index': 4,
            'x-component-props': {
              dataSource: [
                {
                  label: '创建',
                  value: 'create'
                },
                {
                  label: '修改',
                  value: 'edit'
                },
                {
                  label: '展示',
                  value: 'display'
                }
              ],
              useVirtual: false
            },
            'x-rules': []
          },
          title: {
            key: 'title',
            'x-component': 'input',
            type: 'string',
            title: '标题',
            'x-index': 1,
            'x-component-props': {
              placeholder: '',
              addonTextBefore: '',
              addonTextAfter: '',
              trim: true,
              hasClear: true,
              useVirtual: false
            },
            'x-rules': []
          },
          formdialog_0: {
            key: 'formdialog_0',
            'x-component': 'formdialog',
            type: 'layout',
            'x-index': 7,
            'x-component-props': {
              btnText: '配置',
              title: '配置'
            },
            properties: {
              name: {
                key: 'name',
                'x-component': 'input',
                type: 'string',
                title: '字段属性',
                'x-index': 0,
                'x-component-props': {
                  placeholder: '',
                  addonTextBefore: '',
                  addonTextAfter: '',
                  trim: true,
                  hasClear: true
                },
                'x-rules': [],

                description: '自定义属性名称'
              },
              options: {
                key: 'options',
                'x-component': 'arraytable',
                type: 'array',
                title: '组件参数',
                'x-index': 1,
                'x-component-props': {
                  renderAddition: '添加',
                  renderRemove: '删除',
                  renderEmpty: '暂无数据'
                },

                description: '管理组件的参数',
                'x-rules': [],
                items: {
                  type: 'object',
                  properties: {
                    key: {
                      key: 'key',
                      'x-component': 'input',
                      type: 'string',
                      title: '参数名称',
                      'x-index': 0,
                      'x-component-props': {
                        placeholder: '',
                        addonTextBefore: '',
                        addonTextAfter: '',
                        trim: true,
                        hasClear: true
                      }
                    },
                    value: {
                      key: 'value',
                      'x-component': 'input',
                      type: 'string',
                      title: '参数值',
                      'x-index': 1,
                      'x-component-props': {
                        placeholder: '',
                        addonTextBefore: '',
                        addonTextAfter: '',
                        trim: true,
                        hasClear: true
                      }
                    }
                  }
                }
              }
            }
          },
          group: {
            key: 'group',
            'x-component': 'input',
            type: 'string',
            title: '组合',
            'x-index': 6,
            'x-component-props': {
              placeholder: '',
              addonTextBefore: '',
              addonTextAfter: '',
              trim: true,
              hasClear: true
            },

            'x-rules': [
              {
                required: true
              }
            ]
          }
        }
      }
    },
    poTableList: {
      key: 'poTableList',
      'x-component': 'arraytable',
      type: 'array',
      title: '采购展示列表',
      'x-index': 2,
      'x-component-props': {
        renderAddition: '添加',
        renderRemove: '删除',
        renderEmpty: '暂无数据',
        useVirtual: false
      },

      'x-rules': [],
      default: '',
      items: {
        type: 'object',
        properties: {
          title: {
            key: 'title',
            'x-component': 'input',
            type: 'string',
            title: '标题',
            'x-index': 1,
            'x-component-props': {
              placeholder: '',
              addonTextBefore: '',
              addonTextAfter: '',
              trim: true,
              hasClear: true
            },

            'x-rules': []
          },
          properties: {
            key: 'properties',
            'x-component': 'checkbox',
            type: 'array',
            title: '属性',
            'x-index': 2,
            'x-component-props': {
              dataSource: [
                {
                  value: 'show',
                  label: '显示'
                },
                {
                  value: 'optional',
                  label: '可选'
                }
              ],
              useVirtual: false
            },

            'x-rules': []
          },
          visualities: {
            key: 'visualities',
            'x-component': 'checkbox',
            type: 'array',
            title: '可视性',
            'x-index': 3,
            'x-component-props': {
              dataSource: [
                {
                  label: '小二',
                  value: 'xiaoer'
                },
                {
                  value: 'supplier',
                  label: '供应商'
                }
              ],
              useVirtual: false
            }
          },
          occasions: {
            key: 'occasions',
            'x-component': 'checkbox',
            type: 'array',
            title: '场景',
            'x-index': 4,
            'x-component-props': {
              dataSource: [
                {
                  value: 'create',
                  label: '创建'
                },
                {
                  value: 'edit',
                  label: '修改'
                },
                {
                  value: 'display',
                  label: '展示'
                }
              ],
              useVirtual: false
            }
          },
          type: {
            key: 'type',
            'x-component': 'select',
            type: 'array',
            title: '类型',
            'x-index': 5,
            'x-component-props': {
              placeholder: '',
              dataSource: [
                {
                  value: 'Input',
                  label: '文本'
                },
                {
                  label: '地址',
                  value: 'Url'
                },
                {
                  label: '价格',
                  value: 'Price'
                },
                {
                  label: '日期',
                  value: 'Date'
                },
                {
                  label: '状态',
                  value: 'BizStatus'
                },
                {
                  value: 'Operations',
                  label: '操作'
                }
              ],
              hasClear: true,
              useVirtual: false,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },

            'x-rules': []
          },
          field: {
            key: 'field',
            'x-component': 'select',
            type: 'array',
            title: '字段',
            'x-index': 0,
            'x-component-props': {
              placeholder: '',
              dataSource: [
                {
                  label: '采购单编号',
                  value: 'purchaseOrderNo'
                },
                {
                  value: 'marketingTypeDesc',
                  label: '经营模式'
                },
                {
                  value: 'poTypeDesc',
                  label: '单据类型'
                },
                {
                  value: 'sourceChannelDesc',
                  label: '来源类型'
                },
                {
                  value: 'sourceOrderCode',
                  label: '来源单号'
                },
                {
                  label: '合同编号',
                  value: 'purchaseContractId'
                },
                {
                  value: 'supplierName',
                  label: '供应商名称'
                },
                {
                  value: 'memberId',
                  label: '供应商编码'
                },
                {
                  label: '仓库名称',
                  value: 'warehouseDTO.name'
                },
                {
                  value: 'warehouseDTO.storeCode',
                  label: '仓库编码'
                },
                {
                  value: 'totalSkuCount',
                  label: 'SKU个数'
                },
                {
                  label: '下单数量',
                  value: 'totalQuantity'
                },
                {
                  label: '到货数量',
                  value: 'receivedQuantity'
                },
                {
                  value: 'totalAmount',
                  label: '金额'
                },
                {
                  value: 'zeroOrderDesc',
                  label: '零价订单'
                },
                {
                  label: '创建人',
                  value: 'creator'
                },
                {
                  label: '创建时间',
                  value: 'gmtCreate'
                },
                {
                  label: '期望到仓时间',
                  value: 'preArriveTime'
                },
                {
                  label: '失效时间',
                  value: 'gmtExpirationStr'
                },
                {
                  label: '预约状态',
                  value: 'reserveStatusDesc'
                },
                {
                  label: '采购小二',
                  value: 'purchaseManager'
                },
                {
                  label: '标签',
                  value: 'tagsDesc'
                },
                {
                  label: '一级行业',
                  value: 'sfIndustryLevel1Name'
                },
                {
                  label: '存储类型',
                  value: 'fullBulkFlagDesc'
                },
                {
                  label: '发货标识',
                  value: 'multiConsignMode'
                },
                {
                  label: '自动创建发货单',
                  value: 'isAutoConsign'
                },
                {
                  label: '状态/审核人',
                  value: 'bizStatusDesc'
                }
              ],
              hasClear: true,
              useVirtual: false,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },

            'x-rules': []
          },
          formdialog_2: {
            key: 'formdialog_2',
            'x-component': 'formdialog',
            type: 'layout',
            'x-index': 7,
            'x-component-props': {
              btnText: '配置',
              title: '配置'
            },
            properties: {
              name: {
                key: 'name',
                'x-component': 'input',
                type: 'string',
                title: '字段属性',
                'x-index': 0,
                'x-component-props': {
                  placeholder: '',
                  addonTextBefore: '',
                  addonTextAfter: '',
                  trim: true,
                  hasClear: true
                },

                description: '自定义属性名称',
                'x-rules': []
              },
              options: {
                key: 'options',
                'x-component': 'arraytable',
                type: 'array',
                title: '组件参数',
                'x-index': 2,
                'x-component-props': {
                  renderAddition: '添加',
                  renderRemove: '删除',
                  renderEmpty: '暂无数据'
                },

                'x-rules': [],
                items: {
                  type: 'object',
                  properties: {
                    key: {
                      key: 'key',
                      'x-component': 'input',
                      type: 'string',
                      title: ' 参数名称',
                      'x-index': 0,
                      'x-component-props': {
                        placeholder: '',
                        addonTextBefore: '',
                        addonTextAfter: '',
                        trim: true,
                        hasClear: true
                      }
                    },
                    value: {
                      key: 'value',
                      'x-component': 'input',
                      type: 'string',
                      title: '参数值',
                      'x-index': 1,
                      'x-component-props': {
                        placeholder: '',
                        addonTextBefore: '',
                        addonTextAfter: '',
                        trim: true,
                        hasClear: true
                      }
                    }
                  }
                }
              },
              groupTitle: {
                key: 'groupTitle',
                'x-component': 'input',
                type: 'string',
                title: '组合标题',
                'x-index': 1,
                'x-component-props': {
                  placeholder: '',
                  addonTextBefore: '',
                  addonTextAfter: '',
                  trim: true,
                  hasClear: true
                }
              }
            }
          },
          group: {
            key: 'group',
            'x-component': 'input',
            type: 'string',
            title: '组合',
            'x-index': 6,
            'x-component-props': {
              placeholder: '',
              addonTextBefore: '',
              addonTextAfter: '',
              trim: true,
              hasClear: true
            },

            'x-rules': []
          }
        }
      }
    },
    poToolbarList: {
      key: 'poToolbarList',
      'x-component': 'arraytable',
      type: 'array',
      title: '采购列表操作',
      'x-index': 1,
      'x-component-props': {
        renderAddition: '添加',
        renderRemove: '删除',
        renderEmpty: '暂无数据',
        useVirtual: false
      },

      'x-rules': [],
      default: '',
      items: {
        type: 'object',
        properties: {
          field: {
            key: 'field',
            'x-component': 'select',
            type: 'array',
            title: '字段',
            'x-index': 0,
            'x-component-props': {
              placeholder: '',
              dataSource: [
                {
                  value: 'Add',
                  label: '新增补差单'
                },
                {
                  label: '新增',
                  value: 'CreateButton'
                },
                {
                  value: 'AuditButton',
                  label: '通过'
                },
                {
                  label: '驳回',
                  value: 'RejectButton'
                },
                {
                  label: '取消',
                  value: 'CancelButton'
                },
                {
                  value: 'UpdateExpirationDateButton',
                  label: '修改失效时间'
                },
                {
                  value: 'ImportUpdateExpirationDateButton',
                  label: '导入修改失效时间'
                },
                {
                  value: 'ImportAuditButton',
                  label: '导入通过'
                },
                {
                  value: 'ImportCancelButton',
                  label: '导入取消'
                },
                {
                  value: 'ImportConfirmButton',
                  label: '导入确认'
                },
                {
                  value: 'BatchImportConsign',
                  label: '导入发货'
                },
                {
                  value: 'DownloadList',
                  label: '导出列表'
                },
                {
                  value: 'DownloadDetail',
                  label: '导出明细'
                },
                {
                  value: 'DownloadCoDetail',
                  label: '导出批量明细'
                }
              ],
              hasClear: true,
              useVirtual: false,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },

            'x-rules': []
          },
          title: {
            key: 'title',
            'x-component': 'input',
            type: 'string',
            title: '标题',
            'x-index': 1,
            'x-component-props': {
              placeholder: '',
              addonTextBefore: '',
              addonTextAfter: '',
              trim: true,
              hasClear: true
            }
          },
          properties: {
            key: 'properties',
            'x-component': 'checkbox',
            type: 'array',
            title: '属性',
            'x-index': 2,
            'x-component-props': {
              dataSource: [
                {
                  label: '显示',
                  value: 'show'
                }
              ]
            },

            'x-rules': []
          },
          visualities: {
            key: 'visualities',
            'x-component': 'checkbox',
            type: 'array',
            title: '可视性',
            'x-index': 3,
            'x-component-props': {
              dataSource: [
                {
                  label: '小二',
                  value: 'xiaoer'
                },
                {
                  label: '供应商',
                  value: 'supplier'
                }
              ],
              useVirtual: false
            }
          },
          type: {
            key: 'type',
            'x-component': 'select',
            type: 'array',
            title: '类型',
            'x-index': 4,
            'x-component-props': {
              placeholder: '',
              dataSource: [
                {
                  value: 'Add',
                  label: '新增补差单'
                },
                {
                  label: '新增',
                  value: 'CreateButton'
                },
                {
                  value: 'AuditButton',
                  label: '通过'
                },
                {
                  value: 'RejectButton',
                  label: '驳回'
                },
                {
                  value: 'CancelButton',
                  label: '取消'
                },
                {
                  value: 'BatchUpdateExpirationDate',
                  label: '修改失效时间'
                },
                {
                  value: 'ImportUpdateExpirationDateButton',
                  label: '导入修改失效时间'
                },
                {
                  value: 'ImportAuditButton',
                  label: '导入通过'
                },
                {
                  value: 'ImportCancelButton',
                  label: '导入取消'
                },
                {
                  value: 'ImportConfirmButton',
                  label: '导入确认'
                },
                {
                  value: 'ImportConsignButton',
                  label: '导入发货'
                },
                {
                  value: 'DownloadList',
                  label: '导出列表'
                },
                {
                  value: 'DownloadDetail',
                  label: '导出明细'
                },
                {
                  value: 'DownloadCoDetail',
                  label: '导出批次明细'
                }
              ],
              hasClear: true,
              useVirtual: false,
              filterLocal: false,
              showSearch: true,
              mode: 'multiple'
            },

            'x-rules': []
          },
          area: {
            key: 'area',
            'x-component': 'checkbox',
            type: 'array',
            title: '区域',
            'x-index': 5,
            'x-component-props': {
              dataSource: [
                {
                  value: 'upload',
                  label: '导入'
                },
                {
                  label: '导出',
                  value: 'download'
                }
              ],
              useVirtual: false
            }
          },
          formdialog_0: {
            key: 'formdialog_0',
            'x-component': 'formdialog',
            type: 'layout',
            'x-index': 6,
            'x-component-props': {
              btnText: '配置',
              title: '配置'
            },
            properties: {
              options: {
                key: 'options',
                'x-component': 'arraytable',
                type: 'array',
                title: '组件参数',
                'x-index': 0,
                'x-component-props': {
                  renderAddition: '添加',
                  renderRemove: '删除',
                  renderEmpty: '暂无数据'
                },
                'x-rules': [],

                items: {
                  type: 'object',
                  properties: {
                    key: {
                      key: 'key',
                      'x-component': 'input',
                      type: 'string',
                      title: '参数名称',
                      'x-index': 0,
                      'x-component-props': {
                        placeholder: '',
                        addonTextBefore: '',
                        addonTextAfter: '',
                        trim: true,
                        hasClear: true
                      }
                    },
                    value: {
                      key: 'value',
                      'x-component': 'input',
                      type: 'string',
                      title: '参数值',
                      'x-index': 1,
                      'x-component-props': {
                        placeholder: '',
                        addonTextBefore: '',
                        addonTextAfter: '',
                        trim: true,
                        hasClear: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(!visible)
        }}
      >
        显示隐藏
      </Button>
      {visible && (
        <SchemaForm
          components={{
            Input,
            ArrayTable,
            Checkbox: Checkbox.Group,
            Select,
            FormDialog: () => <div>Dialog</div>
          }}
          onSubmit={console.log}
          schema={schema}
        >
          <FormButtonGroup offset={7}>
            <Submit>提交</Submit>
          </FormButtonGroup>
        </SchemaForm>
      )}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```
