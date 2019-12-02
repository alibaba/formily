export default {
  next: [
    {
      "name": "Affix",
      "title": "固钉",
      "typeId": 6,
      "props": {
        "container": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "设置 Affix 需要监听滚动事件的容器元素",
          "defaultValue": {
            "value": "() => window",
            "computed": false
          },
          "docblock": "设置 Affix 需要监听滚动事件的容器元素\n@return {ReactElement} 目标容器元素的实例",
          "params": [],
          "returns": {
            "description": "目标容器元素的实例",
            "type": {
              "name": "ReactElement"
            }
          }
        },
        "offsetTop": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "距离窗口顶部达到指定偏移量后触发",
          "docblock": "距离窗口顶部达到指定偏移量后触发"
        },
        "offsetBottom": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "距离窗口底部达到制定偏移量后触发",
          "docblock": "距离窗口底部达到制定偏移量后触发"
        },
        "onAffix": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "当元素的样式发生固钉样式变化时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "当元素的样式发生固钉样式变化时触发的回调函数\n@param {Boolean} 元素是否被固钉",
          "params": [{
            "name": "元素是否被固钉",
            "description": null,
            "type": {
              "name": "Boolean"
            }
          }],
          "returns": null
        },
        "useAbsolute": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否启用绝对布局实现 affix",
          "docblock": "是否启用绝对布局实现 affix\n@param {Boolean} 是否启用绝对布局"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Animate",
      "title": "动画",
      "typeId": 6,
      "props": {
        "animation": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "object"
              }
            ]
          },
          "required": false,
          "description": "动画 className",
          "docblock": "动画 className"
        },
        "animationAppear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "子元素第一次挂载时是否执行动画",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "子元素第一次挂载时是否执行动画"
        },
        "component": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "包裹子元素的标签",
          "defaultValue": {
            "value": "'div'",
            "computed": false
          },
          "docblock": "包裹子元素的标签"
        },
        "singleMode": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只有单个子元素，如果有多个子元素，请设置为 false",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否只有单个子元素，如果有多个子元素，请设置为 false"
        },
        "children": {
          "type": {
            "name": "union",
            "value": [{
              "name": "element"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "element"
                }
              }
            ]
          },
          "required": false,
          "description": "子元素",
          "docblock": "子元素"
        },
        "beforeAppear": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行第一次挂载动画前触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行第一次挂载动画前触发的回调函数",
          "params": [],
          "returns": null
        },
        "onAppear": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行第一次挂载动画，添加 xxx-appear-active 类名后触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行第一次挂载动画，添加 xxx-appear-active 类名后触发的回调函数\n @param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "afterAppear": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行完第一次挂载动画后触发的函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行完第一次挂载动画后触发的函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "beforeEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行进场动画前触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行进场动画前触发的回调函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "onEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行进场动画，添加 xxx-enter-active 类名后触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行进场动画，添加 xxx-enter-active 类名后触发的回调函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "afterEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行完进场动画后触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行完进场动画后触发的回调函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "beforeLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行离场动画前触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行离场动画前触发的回调函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "onLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行离场动画，添加 xxx-leave-active 类名后触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行离场动画，添加 xxx-leave-active 类名后触发的回调函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        },
        "afterLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "执行完离场动画后触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "执行完离场动画后触发的回调函数\n@param {HTMLElement} node \b执行动画的 dom 元素",
          "params": [{
            "name": "node",
            "description": "\b执行动画的 dom 元素",
            "type": {
              "name": "HTMLElement"
            }
          }],
          "returns": null
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Badge",
      "title": "徽标",
      "typeId": 4,
      "props": {
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "徽章依托的内容",
          "docblock": "徽章依托的内容"
        },
        "count": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时默认隐藏",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时默认隐藏"
        },
        "showZero": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当count为0时，是否显示count",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "当count为0时，是否显示count"
        },
        "content": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义节点内容",
          "docblock": "自定义节点内容"
        },
        "overflowCount": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "展示的封顶的数字",
          "defaultValue": {
            "value": "99",
            "computed": false
          },
          "docblock": "展示的封顶的数字"
        },
        "dot": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "不展示数字，只展示一个小红点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "不展示数字，只展示一个小红点"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Balloon",
      "title": "气泡",
      "typeId": 5,
      "props": {
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内敛样式",
          "docblock": "自定义内敛样式",
          "properties": []
        },
        "children": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "浮层的内容",
          "docblock": "浮层的内容"
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'primary'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "样式类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "样式类型"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层当前显示的状态",
          "docblock": "弹层当前显示的状态"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层默认显示的状态",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "弹层默认显示的状态"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层在显示和隐藏触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层在显示和隐藏触发的事件\n@param {Boolean} visible 弹层是否隐藏和显示\n@param {String} type 触发弹层显示或隐藏的来源， closeClick 表示由自带的关闭按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层是否隐藏和显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示或隐藏的来源， closeClick 表示由自带的关闭按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "alignEdge": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹出层对齐方式",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "弹出层对齐方式"
        },
        "closable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示关闭按钮",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示关闭按钮"
        },
        "align": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'t'",
              "computed": false,
              "description": "上"
            },
              {
                "value": "'r'",
                "computed": false,
                "description": "右"
              },
              {
                "value": "'b'",
                "computed": false,
                "description": "下"
              },
              {
                "value": "'l'",
                "computed": false,
                "description": "左"
              },
              {
                "value": "'tl'",
                "computed": false,
                "description": "上左"
              },
              {
                "value": "'tr'",
                "computed": false,
                "description": "上右"
              },
              {
                "value": "'bl'",
                "computed": false,
                "description": "下左"
              },
              {
                "value": "'br'",
                "computed": false,
                "description": "下右"
              },
              {
                "value": "'lt'",
                "computed": false,
                "description": "左上"
              },
              {
                "value": "'lb'",
                "computed": false,
                "description": "左下"
              },
              {
                "value": "'rt'",
                "computed": false,
                "description": "右上"
              },
              {
                "value": "'rb'",
                "computed": false,
                "description": "右下 及其 两两组合"
              }
            ]
          },
          "required": false,
          "description": "弹出层位置",
          "defaultValue": {
            "value": "'b'",
            "computed": false
          },
          "docblock": "弹出层位置\n@enumdesc 上, 右, 下, 左, 上左, 上右, 下左, 下右, 左上, 左下, 右上, 右下 及其 两两组合",
          "value": [{
            "value": "'t'",
            "computed": false,
            "description": "上"
          },
            {
              "value": "'r'",
              "computed": false,
              "description": "右"
            },
            {
              "value": "'b'",
              "computed": false,
              "description": "下"
            },
            {
              "value": "'l'",
              "computed": false,
              "description": "左"
            },
            {
              "value": "'tl'",
              "computed": false,
              "description": "上左"
            },
            {
              "value": "'tr'",
              "computed": false,
              "description": "上右"
            },
            {
              "value": "'bl'",
              "computed": false,
              "description": "下左"
            },
            {
              "value": "'br'",
              "computed": false,
              "description": "下右"
            },
            {
              "value": "'lt'",
              "computed": false,
              "description": "左上"
            },
            {
              "value": "'lb'",
              "computed": false,
              "description": "左下"
            },
            {
              "value": "'rt'",
              "computed": false,
              "description": "右上"
            },
            {
              "value": "'rb'",
              "computed": false,
              "description": "右下 及其 两两组合"
            }
          ]
        },
        "offset": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px",
          "defaultValue": {
            "value": "[0, 0]",
            "computed": false
          },
          "docblock": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px"
        },
        "trigger": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "触发元素",
          "defaultValue": {
            "value": "<span />",
            "computed": false
          },
          "docblock": "触发元素"
        },
        "triggerType": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "触发行为\n鼠标悬浮, 鼠标点击('hover','click')或者它们组成的数组，如 ['hover', 'click'], 强烈不建议使用'focus'，若弹窗内容有复杂交互请使用click",
          "defaultValue": {
            "value": "'hover'",
            "computed": false
          },
          "docblock": "触发行为\n鼠标悬浮, 鼠标点击('hover','click')或者它们组成的数组，如 ['hover', 'click'], 强烈不建议使用'focus'，若弹窗内容有复杂交互请使用click"
        },
        "onClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "任何visible为false时会触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "任何visible为false时会触发的事件",
          "params": [],
          "returns": null
        },
        "needAdjust": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否进行自动位置调整",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否进行自动位置调整"
        },
        "delay": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "弹层在触发以后的延时显示, 单位毫秒 ms",
          "docblock": "弹层在触发以后的延时显示, 单位毫秒 ms"
        },
        "afterClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "浮层关闭后触发的事件, 如果有动画，则在动画结束后触发",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "浮层关闭后触发的事件, 如果有动画，则在动画结束后触发",
          "params": [],
          "returns": null
        },
        "shouldUpdatePosition": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "强制更新定位信息",
          "docblock": "强制更新定位信息"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层出现后是否自动focus到内部第一个元素",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "弹层出现后是否自动focus到内部第一个元素"
        },
        "safeNode": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "安全节点:对于triggetType为click的浮层,会在点击除了浮层外的其它区域时关闭浮层.safeNode用于添加不触发关闭的节点, 值可以是dom节点的id或者是节点的dom对象",
          "defaultValue": {
            "value": "undefined",
            "computed": true
          },
          "docblock": "安全节点:对于triggetType为click的浮层,会在点击除了浮层外的其它区域时关闭浮层.safeNode用于添加不触发关闭的节点, 值可以是dom节点的id或者是节点的dom对象"
        },
        "safeId": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "用来指定safeNode节点的id，和safeNode配合使用",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "用来指定safeNode节点的id，和safeNode配合使用"
        },
        "animation": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "配置动画的播放方式",
          "defaultValue": {
            "value": "{\n    in: 'zoomIn',\n    out: 'zoomOut',\n}",
            "computed": false
          },
          "docblock": "配置动画的播放方式\n@param {String} in 进场动画\n@param {String} out 出场动画"
        },
        "cache": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层的dom节点关闭时是否删除",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "弹层的dom节点关闭时是否删除"
        },
        "popupContainer": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。",
          "docblock": "指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。"
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层组件style，透传给Popup",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "弹层组件style，透传给Popup",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层组件className，透传给Popup",
          "defaultValue": {
            "value": "''",
            "computed": false
          },
          "docblock": "弹层组件className，透传给Popup"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层组件属性，透传给Popup",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "弹层组件属性，透传给Popup",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "id": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层id, 传入值才会支持无障碍",
          "docblock": "弹层id, 传入值才会支持无障碍"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Tooltip",
        "title": "文字提示",
        "typeId": 5,
        "props": {
          "prefix": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "样式类名的品牌前缀",
            "defaultValue": {
              "value": "'next-'",
              "computed": false
            },
            "docblock": "样式类名的品牌前缀"
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义类名",
            "docblock": "自定义类名"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "自定义内联样式",
            "docblock": "自定义内联样式",
            "properties": []
          },
          "children": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "tooltip的内容",
            "docblock": "tooltip的内容"
          },
          "align": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'t'",
                "computed": false,
                "description": "上"
              },
                {
                  "value": "'r'",
                  "computed": false,
                  "description": "右"
                },
                {
                  "value": "'b'",
                  "computed": false,
                  "description": "下"
                },
                {
                  "value": "'l'",
                  "computed": false,
                  "description": "左"
                },
                {
                  "value": "'tl'",
                  "computed": false,
                  "description": "上左"
                },
                {
                  "value": "'tr'",
                  "computed": false,
                  "description": "上右"
                },
                {
                  "value": "'bl'",
                  "computed": false,
                  "description": "下左"
                },
                {
                  "value": "'br'",
                  "computed": false,
                  "description": "下右"
                },
                {
                  "value": "'lt'",
                  "computed": false,
                  "description": "左上"
                },
                {
                  "value": "'lb'",
                  "computed": false,
                  "description": "左下"
                },
                {
                  "value": "'rt'",
                  "computed": false,
                  "description": "右上"
                },
                {
                  "value": "'rb'",
                  "computed": false,
                  "description": "右下 及其 两两组合"
                }
              ]
            },
            "required": false,
            "description": "弹出层位置",
            "defaultValue": {
              "value": "'b'",
              "computed": false
            },
            "docblock": "弹出层位置\n@enumdesc 上, 右, 下, 左, 上左, 上右, 下左, 下右, 左上, 左下, 右上, 右下 及其 两两组合",
            "value": [{
              "value": "'t'",
              "computed": false,
              "description": "上"
            },
              {
                "value": "'r'",
                "computed": false,
                "description": "右"
              },
              {
                "value": "'b'",
                "computed": false,
                "description": "下"
              },
              {
                "value": "'l'",
                "computed": false,
                "description": "左"
              },
              {
                "value": "'tl'",
                "computed": false,
                "description": "上左"
              },
              {
                "value": "'tr'",
                "computed": false,
                "description": "上右"
              },
              {
                "value": "'bl'",
                "computed": false,
                "description": "下左"
              },
              {
                "value": "'br'",
                "computed": false,
                "description": "下右"
              },
              {
                "value": "'lt'",
                "computed": false,
                "description": "左上"
              },
              {
                "value": "'lb'",
                "computed": false,
                "description": "左下"
              },
              {
                "value": "'rt'",
                "computed": false,
                "description": "右上"
              },
              {
                "value": "'rb'",
                "computed": false,
                "description": "右下 及其 两两组合"
              }
            ]
          },
          "trigger": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "触发元素",
            "defaultValue": {
              "value": "<span />",
              "computed": false
            },
            "docblock": "触发元素"
          },
          "triggerType": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "触发行为\n鼠标悬浮,  鼠标点击('hover', 'click')或者它们组成的数组，如 ['hover', 'click'], 强烈不建议使用'focus'，若有复杂交互，推荐使用triggerType为click的Balloon组件",
            "defaultValue": {
              "value": "'hover'",
              "computed": false
            },
            "docblock": "触发行为\n鼠标悬浮,  鼠标点击('hover', 'click')或者它们组成的数组，如 ['hover', 'click'], 强烈不建议使用'focus'，若有复杂交互，推荐使用triggerType为click的Balloon组件"
          },
          "popupStyle": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "弹层组件style，透传给Popup",
            "docblock": "弹层组件style，透传给Popup",
            "properties": []
          },
          "popupClassName": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "弹层组件className，透传给Popup",
            "docblock": "弹层组件className，透传给Popup"
          },
          "popupProps": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "弹层组件属性，透传给Popup",
            "docblock": "弹层组件属性，透传给Popup",
            "properties": []
          },
          "pure": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否pure render",
            "docblock": "是否pure render"
          },
          "popupContainer": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。",
            "docblock": "指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。"
          },
          "followTrigger": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否跟随滚动",
            "docblock": "是否跟随滚动"
          },
          "id": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "弹层id, 传入值才会支持无障碍",
            "docblock": "弹层id, 传入值才会支持无障碍"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Breadcrumb",
      "title": "面包屑",
      "typeId": 2,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式类名的品牌前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式类名的品牌前缀"
        },
        "children": {
          "type": {
            "name": "custom",
            "raw": "(props, propName) => {\n    Children.forEach(props[propName], child => {\n        if (\n            !(\n                child &&\n                typeof child.type === 'function' &&\n                child.type._typeMark === 'breadcrumb_item'\n            )\n        ) {\n            throw new Error(\n                \"Breadcrumb's children must be Breadcrumb.Item!\"\n            );\n        }\n    });\n}"
          },
          "required": false,
          "description": "面包屑子节点，需传入 Breadcrumb.Item",
          "docblock": "面包屑子节点，需传入 Breadcrumb.Item"
        },
        "maxNode": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "面包屑最多显示个数，超出部分会被隐藏",
          "defaultValue": {
            "value": "100",
            "computed": false
          },
          "docblock": "面包屑最多显示个数，超出部分会被隐藏"
        },
        "separator": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "分隔符，可以是文本或 Icon",
          "defaultValue": {
            "value": "<Icon type=\"arrow-right\" />",
            "computed": false
          },
          "docblock": "分隔符，可以是文本或 Icon"
        },
        "component": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "设置标签类型",
          "defaultValue": {
            "value": "'nav'",
            "computed": false
          },
          "docblock": "设置标签类型"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Item",
        "title": "面包屑项",
        "typeId": 2,
        "props": {
          "link": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "面包屑节点链接，如果设置这个属性，则该节点为`<a />` ，否则是`<span />`",
            "docblock": "面包屑节点链接，如果设置这个属性，则该节点为`<a />` ，否则是`<span />`"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Button",
      "title": "按钮",
      "typeId": 1,
      "props": {
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'primary'",
              "computed": false
            },
              {
                "value": "'secondary'",
                "computed": false
              },
              {
                "value": "'normal'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "按钮的类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "按钮的类型"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "按钮的尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "按钮的尺寸"
        },
        "iconSize": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'xxs'",
              "computed": false
            },
              {
                "value": "'xs'",
                "computed": false
              },
              {
                "value": "'small'",
                "computed": false
              },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              },
              {
                "value": "'xl'",
                "computed": false
              },
              {
                "value": "'xxl'",
                "computed": false
              },
              {
                "value": "'xxxl'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "按钮中 Icon 的尺寸，用于替代 Icon 的默认大小",
          "docblock": "按钮中 Icon 的尺寸，用于替代 Icon 的默认大小"
        },
        "htmlType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'submit'",
              "computed": false
            },
              {
                "value": "'reset'",
                "computed": false
              },
              {
                "value": "'button'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "当 component = 'button' 时，设置 button 标签的 type 值",
          "defaultValue": {
            "value": "'button'",
            "computed": false
          },
          "docblock": "当 component = 'button' 时，设置 button 标签的 type 值"
        },
        "component": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'button'",
              "computed": false
            },
              {
                "value": "'a'",
                "computed": false
              },
              {
                "value": "'div'",
                "computed": false
              },
              {
                "value": "'span'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "设置标签类型",
          "defaultValue": {
            "value": "'button'",
            "computed": false
          },
          "docblock": "设置标签类型"
        },
        "loading": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "设置按钮的载入状态",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "设置按钮的载入状态"
        },
        "ghost": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "true",
              "computed": false
            },
              {
                "value": "false",
                "computed": false
              },
              {
                "value": "'light'",
                "computed": false
              },
              {
                "value": "'dark'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "是否为幽灵按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否为幽灵按钮"
        },
        "text": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否为文本按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否为文本按钮"
        },
        "warning": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否为警告按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否为警告按钮"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "onClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击按钮的回调",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击按钮的回调\n@param {Object} e Event Object",
          "params": [{
            "name": "e",
            "description": "Event Object",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Group",
        "title": "按钮组",
        "typeId": 1,
        "props": {
          "size": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "统一设置 Button 组件的按钮大小",
            "defaultValue": {
              "value": "'medium'",
              "computed": false
            },
            "docblock": "统一设置 Button 组件的按钮大小"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Calendar",
      "title": "日历",
      "typeId": 4,
      "props": {
        "defaultValue": {
          "type": {
            "name": "custom",
            "raw": "checkMomentObj"
          },
          "required": false,
          "description": "默认选中的日期（moment 对象）",
          "docblock": "默认选中的日期（moment 对象）"
        },
        "value": {
          "type": {
            "name": "custom",
            "raw": "checkMomentObj"
          },
          "required": false,
          "description": "选中的日期值 (moment 对象)",
          "docblock": "选中的日期值 (moment 对象)"
        },
        "mode": {
          "type": {
            "name": "enum",
            "computed": true,
            "value": "CALENDAR_MODES"
          },
          "required": false,
          "description": "面板模式",
          "docblock": "面板模式"
        },
        "showOtherMonth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否展示非本月的日期",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否展示非本月的日期"
        },
        "defaultVisibleMonth": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "默认展示的月份",
          "docblock": "默认展示的月份",
          "params": [],
          "returns": null
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'card'",
              "computed": false
            },
              {
                "value": "'fullscreen'",
                "computed": false
              },
              {
                "value": "'panel'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "展现形态",
          "defaultValue": {
            "value": "'fullscreen'",
            "computed": false
          },
          "docblock": "展现形态"
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选择日期单元格时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "选择日期单元格时的回调\n@param {Object} value 对应的日期值 (moment 对象)",
          "params": [{
            "name": "value",
            "description": "对应的日期值 (moment 对象)",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "onModeChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "面板模式变化时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "面板模式变化时的回调\n@param {String} mode 对应面板模式 date month year",
          "params": [{
            "name": "mode",
            "description": "对应面板模式 date month year",
            "type": {
              "name": "String"
            }
          }],
          "returns": null
        },
        "onVisibleMonthChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "展现的月份变化时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "展现的月份变化时的回调\n@param {Object} value 显示的月份 (moment 对象)\n@param {String} reason 触发月份改变原因",
          "params": [{
            "name": "value",
            "description": "显示的月份 (moment 对象)",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "reason",
              "description": "触发月份改变原因",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义样式类",
          "docblock": "自定义样式类"
        },
        "dateCellRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义日期渲染函数",
          "defaultValue": {
            "value": "value => value.date()",
            "computed": false
          },
          "docblock": "自定义日期渲染函数\n@param {Object} value 日期值（moment对象）\n@returns {ReactNode}",
          "params": [{
            "name": "value",
            "description": "日期值（moment对象）",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "monthCellRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义月份渲染函数",
          "docblock": "自定义月份渲染函数\n@param {Object} calendarDate 对应 Calendar 返回的自定义日期对象\n@returns {ReactNode}",
          "params": [{
            "name": "calendarDate",
            "description": "对应 Calendar 返回的自定义日期对象",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "yearRange": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "number"
            }
          },
          "required": false,
          "description": "年份范围，[START_YEAR, END_YEAR] (只在shape 为 ‘card’, 'fullscreen' 下生效)",
          "docblock": "年份范围，[START_YEAR, END_YEAR] (只在shape 为 ‘card’, 'fullscreen' 下生效)"
        },
        "disabledDate": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "不可选择的日期",
          "docblock": "不可选择的日期\n@param {Object} calendarDate 对应 Calendar 返回的自定义日期对象\n@param {String} view 当前视图类型，year: 年， month: 月, date: 日\n@returns {Boolean}",
          "params": [{
            "name": "calendarDate",
            "description": "对应 Calendar 返回的自定义日期对象",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "view",
              "description": "当前视图类型，year: 年， month: 月, date: 日",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": {
            "description": null,
            "type": {
              "name": "Boolean"
            }
          }
        },
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "国际化配置",
          "defaultValue": {
            "value": "nextLocale.Calendar",
            "computed": true
          },
          "docblock": "国际化配置",
          "properties": []
        }
      },
      "methods": [{
        "name": "changeVisibleMonthByOffset",
        "docblock": "根据日期偏移量设置当前展示的月份\n@param {Number} offset 日期偏移的数量\n@param {String} type 日期偏移的类型 days, months, years",
        "modifiers": [],
        "params": [{
          "name": "offset",
          "description": "日期偏移的数量",
          "type": {
            "name": "Number"
          }
        },
          {
            "name": "type",
            "description": "日期偏移的类型 days, months, years",
            "type": {
              "name": "String"
            }
          }
        ],
        "returns": null,
        "description": "根据日期偏移量设置当前展示的月份"
      }],
      "subComponents": []
    },
    {
      "name": "Card",
      "title": "卡片",
      "typeId": 4,
      "props": {
        "title": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "卡片的标题",
          "docblock": "卡片的标题"
        },
        "subTitle": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "卡片的副标题",
          "docblock": "卡片的副标题"
        },
        "showTitleBullet": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示标题的项目符号",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示标题的项目符号"
        },
        "showHeadDivider": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否展示头部的分隔线",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否展示头部的分隔线"
        },
        "contentHeight": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "number"
              }
            ]
          },
          "required": false,
          "description": "内容区域的固定高度",
          "defaultValue": {
            "value": "120",
            "computed": false
          },
          "docblock": "内容区域的固定高度"
        },
        "extra": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "标题区域的用户自定义内容",
          "docblock": "标题区域的用户自定义内容"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Cascader",
      "title": "级联",
      "typeId": 4,
      "props": {
        "dataSource": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "object"
            }
          },
          "required": false,
          "description": "数据源，结构可参考下方说明",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "数据源，结构可参考下方说明"
        },
        "defaultValue": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "string"
                }
              }
            ]
          },
          "required": false,
          "description": "（非受控）默认值",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "（非受控）默认值"
        },
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "string"
                }
              }
            ]
          },
          "required": false,
          "description": "（受控）当前值",
          "docblock": "（受控）当前值"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选中值改变时触发的回调函数",
          "docblock": "选中值改变时触发的回调函数\n@param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组\n@param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点\n@param {Object} extra 额外参数\n@param {Array} extra.selectedPath 单选时选中的数据的路径\n@param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中\n@param {Object} extra.currentData 多选时当前操作的数据\n@param {Array} extra.checkedData 多选时所有被选中的数据\n@param {Array} extra.indeterminateData 多选时半选的数据",
          "params": [{
            "name": "value",
            "description": "选中的值，单选时返回单个值，多选时返回数组",
            "type": {
              "name": "union",
              "value": [
                "String",
                "Array"
              ]
            }
          },
            {
              "name": "data",
              "description": "选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点",
              "type": {
                "name": "union",
                "value": [
                  "Object",
                  "Array"
                ]
              }
            },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.selectedPath",
              "description": "单选时选中的数据的路径",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.checked",
              "description": "多选时当前的操作是选中还是取消选中",
              "type": {
                "name": "Boolean"
              }
            },
            {
              "name": "extra.currentData",
              "description": "多选时当前操作的数据",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.checkedData",
              "description": "多选时所有被选中的数据",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.indeterminateData",
              "description": "多选时半选的数据",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "defaultExpandedValue": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（非受控）默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置",
          "docblock": "（非受控）默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置"
        },
        "expandedValue": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（受控）当前展开值",
          "docblock": "（受控）当前展开值"
        },
        "expandTriggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "展开触发的方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "展开触发的方式"
        },
        "onExpand": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "展开时触发的回调函数",
          "docblock": "展开时触发的回调函数\n@param {Array} expandedValue 各列展开值的数组",
          "params": [{
            "name": "expandedValue",
            "description": "各列展开值的数组",
            "type": {
              "name": "Array"
            }
          }],
          "returns": null
        },
        "useVirtual": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启虚拟滚动",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否开启虚拟滚动"
        },
        "multiple": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否多选",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否多选"
        },
        "canOnlySelectLeaf": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "单选时是否只能选中叶子节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "单选时是否只能选中叶子节点"
        },
        "canOnlyCheckLeaf": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "多选时是否只能选中叶子节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "多选时是否只能选中叶子节点"
        },
        "checkStrictly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "父子节点是否选中不关联",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "父子节点是否选中不关联"
        },
        "listStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "每列列表样式对象",
          "docblock": "每列列表样式对象",
          "properties": []
        },
        "listClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "每列列表类名",
          "docblock": "每列列表类名"
        },
        "itemRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "每列列表项渲染函数",
          "defaultValue": {
            "value": "item => item.label",
            "computed": false
          },
          "docblock": "每列列表项渲染函数\n@param {Object} data 数据\n@return {ReactNode} 列表项内容",
          "params": [{
            "name": "data",
            "description": "数据",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "列表项内容",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "loadData": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "异步加载数据函数",
          "docblock": "异步加载数据函数\n@param {Object} data 当前点击异步加载的数据\n@param {Object} source 当前点击数据",
          "params": [{
            "name": "data",
            "description": "当前点击异步加载的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "source",
              "description": "当前点击数据",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "CascaderSelect",
      "title": "级联选择",
      "typeId": 3,
      "props": {
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选择框大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "选择框大小"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "选择框占位符",
          "docblock": "选择框占位符"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "hasArrow": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有下拉箭头",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否有下拉箭头"
        },
        "hasBorder": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有边框",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否有边框"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有清除按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否有清除按钮"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义内联 label",
          "docblock": "自定义内联 label"
        },
        "readOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只读，只读模式下可以展开弹层但不能选",
          "docblock": "是否只读，只读模式下可以展开弹层但不能选"
        },
        "dataSource": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "object"
            }
          },
          "required": false,
          "description": "数据源，结构可参考下方说明",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "数据源，结构可参考下方说明"
        },
        "defaultValue": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "string"
                }
              }
            ]
          },
          "required": false,
          "description": "（非受控）默认值",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "（非受控）默认值"
        },
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "string"
                }
              }
            ]
          },
          "required": false,
          "description": "（受控）当前值",
          "docblock": "（受控）当前值"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选中值改变时触发的回调函数",
          "docblock": "选中值改变时触发的回调函数\n@param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组\n@param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点\n@param {Object} extra 额外参数\n@param {Array} extra.selectedPath 单选时选中的数据的路径\n@param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中\n@param {Object} extra.currentData 多选时当前操作的数据\n@param {Array} extra.checkedData 多选时所有被选中的数据\n@param {Array} extra.indeterminateData 多选时半选的数据",
          "params": [{
            "name": "value",
            "description": "选中的值，单选时返回单个值，多选时返回数组",
            "type": {
              "name": "union",
              "value": [
                "String",
                "Array"
              ]
            }
          },
            {
              "name": "data",
              "description": "选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点",
              "type": {
                "name": "union",
                "value": [
                  "Object",
                  "Array"
                ]
              }
            },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.selectedPath",
              "description": "单选时选中的数据的路径",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.checked",
              "description": "多选时当前的操作是选中还是取消选中",
              "type": {
                "name": "Boolean"
              }
            },
            {
              "name": "extra.currentData",
              "description": "多选时当前操作的数据",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.checkedData",
              "description": "多选时所有被选中的数据",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.indeterminateData",
              "description": "多选时半选的数据",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "defaultExpandedValue": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置",
          "docblock": "默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置"
        },
        "expandTriggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "展开触发的方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "展开触发的方式"
        },
        "useVirtual": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启虚拟滚动",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否开启虚拟滚动"
        },
        "multiple": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否多选",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否多选"
        },
        "changeOnSelect": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否选中即发生改变, 该属性仅在单选模式下有效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否选中即发生改变, 该属性仅在单选模式下有效"
        },
        "canOnlyCheckLeaf": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只能勾选叶子项的checkbox，该属性仅在多选模式下有效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否只能勾选叶子项的checkbox，该属性仅在多选模式下有效"
        },
        "checkStrictly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "父子节点是否选中不关联",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "父子节点是否选中不关联"
        },
        "listStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "每列列表样式对象",
          "docblock": "每列列表样式对象",
          "properties": []
        },
        "listClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "每列列表类名",
          "docblock": "每列列表类名"
        },
        "displayRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选择框单选时展示结果的自定义渲染函数",
          "docblock": "选择框单选时展示结果的自定义渲染函数\n@param {Array} label 选中路径的文本数组\n@return {ReactNode} 渲染在选择框中的内容\n@default 单选时：labelPath => labelPath.join(' / ')；多选时：labelPath => labelPath[labelPath.length - 1]",
          "params": [{
            "name": "label",
            "description": "选中路径的文本数组",
            "type": {
              "name": "Array"
            }
          }],
          "returns": {
            "description": "渲染在选择框中的内容",
            "type": {
              "name": "ReactNode"
            }
          },
          "defaultValue": {
            "value": "单选时：labelPath => labelPath.join(' / ')；多选时：labelPath => labelPath[labelPath.length - 1]",
            "computed": false
          }
        },
        "itemRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "渲染 item 内容的方法",
          "docblock": "渲染 item 内容的方法\n@param {Object} item 渲染节点的item\n@return {ReactNode} item node",
          "params": [{
            "name": "item",
            "description": "渲染节点的item",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "item node",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "showSearch": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示搜索框",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示搜索框"
        },
        "filter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义搜索函数",
          "defaultValue": {
            "value": "根据路径所有节点的文本值模糊匹配",
            "computed": false
          },
          "docblock": "自定义搜索函数\n@param {String} searchValue 搜索的关键字\n@param {Array} path 节点路径\n@return {Boolean} 是否匹配\n@default 根据路径所有节点的文本值模糊匹配",
          "params": [{
            "name": "searchValue",
            "description": "搜索的关键字",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "path",
              "description": "节点路径",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": {
            "description": "是否匹配",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "resultRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "搜索结果自定义渲染函数",
          "defaultValue": {
            "value": "按照节点文本 a / b / c 的模式渲染",
            "computed": false
          },
          "docblock": "搜索结果自定义渲染函数\n@param {String} searchValue 搜索的关键字\n@param {Array} path 匹配到的节点路径\n@return {ReactNode} 渲染的内容\n@default 按照节点文本 a / b / c 的模式渲染",
          "params": [{
            "name": "searchValue",
            "description": "搜索的关键字",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "path",
              "description": "匹配到的节点路径",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": {
            "description": "渲染的内容",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "resultAutoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "搜索结果列表是否和选择框等宽",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "搜索结果列表是否和选择框等宽"
        },
        "notFoundContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "无数据时显示内容",
          "defaultValue": {
            "value": "'Not Found'",
            "computed": false
          },
          "docblock": "无数据时显示内容"
        },
        "loadData": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "异步加载数据函数",
          "docblock": "异步加载数据函数\n@param {Object} data 当前点击异步加载的数据",
          "params": [{
            "name": "data",
            "description": "当前点击异步加载的数据",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "header": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义下拉框头部",
          "docblock": "自定义下拉框头部"
        },
        "footer": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义下拉框底部",
          "docblock": "自定义下拉框底部"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "初始下拉框是否显示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "初始下拉框是否显示"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当前下拉框是否显示",
          "docblock": "当前下拉框是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "下拉框显示或关闭时触发事件的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "下拉框显示或关闭时触发事件的回调函数\n@param {Boolean} visible 是否显示\n@param {String} type 触发显示关闭的操作类型, fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "是否显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发显示关闭的操作类型, fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "下拉框自定义样式对象",
          "docblock": "下拉框自定义样式对象",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "下拉框样式自定义类名",
          "docblock": "下拉框样式自定义类名"
        },
        "popupContainer": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "下拉框挂载的容器节点",
          "docblock": "下拉框挂载的容器节点"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传到 Popup 的属性对象",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "透传到 Popup 的属性对象",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Checkbox",
      "title": "复选按钮",
      "typeId": 3,
      "props": {
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        },
        "id": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "checkbox id, 挂载在input上",
          "docblock": "checkbox id, 挂载在input上"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内敛样式",
          "docblock": "自定义内敛样式",
          "properties": []
        },
        "checked": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "选中状态",
          "docblock": "选中状态"
        },
        "defaultChecked": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "默认选中状态",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "默认选中状态"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "禁用",
          "docblock": "禁用"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "通过属性配置label，",
          "docblock": "通过属性配置label，"
        },
        "indeterminate": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "Checkbox 的中间状态，只会影响到 Checkbox 的样式，并不影响其 checked 属性",
          "docblock": "Checkbox 的中间状态，只会影响到 Checkbox 的样式，并不影响其 checked 属性"
        },
        "defaultIndeterminate": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "Checkbox 的默认中间态，只会影响到 Checkbox 的样式，并不影响其 checked 属性",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "Checkbox 的默认中间态，只会影响到 Checkbox 的样式，并不影响其 checked 属性"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "状态变化时触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "状态变化时触发的事件\n@param {Boolean} checked 是否选中\n@param {Event} e Dom 事件对象",
          "params": [{
            "name": "checked",
            "description": "是否选中",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "e",
              "description": "Dom 事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onMouseEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "鼠标进入enter事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "鼠标进入enter事件\n@param {Event} e Dom 事件对象",
          "params": [{
            "name": "e",
            "description": "Dom 事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        },
        "onMouseLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "鼠标离开Leave事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "鼠标离开Leave事件\n@param {Event} e Dom 事件对象",
          "params": [{
            "name": "e",
            "description": "Dom 事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        }
      },
      "methods": [],
      "order": 1,
      "subComponents": [{
        "name": "Group",
        "title": "复选按钮组",
        "typeId": 3,
        "props": {
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义类名",
            "docblock": "自定义类名"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "自定义内敛样式",
            "docblock": "自定义内敛样式",
            "properties": []
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "整体禁用",
            "docblock": "整体禁用"
          },
          "dataSource": {
            "type": {
              "name": "arrayOf",
              "value": {
                "name": "any"
              }
            },
            "required": false,
            "description": "可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']` 或者 `[{value: 'apple', label: '苹果',}, {value: 'pear', label: '梨'}, {value: 'orange', label: '橙子'}]`",
            "defaultValue": {
              "value": "[]",
              "computed": false
            },
            "docblock": "可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']` 或者 `[{value: 'apple', label: '苹果',}, {value: 'pear', label: '梨'}, {value: 'orange', label: '橙子'}]`"
          },
          "value": {
            "type": {
              "name": "union",
              "value": [{
                "name": "array"
              },
                {
                  "name": "string"
                },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "被选中的值列表",
            "docblock": "被选中的值列表"
          },
          "defaultValue": {
            "type": {
              "name": "union",
              "value": [{
                "name": "array"
              },
                {
                  "name": "string"
                },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "默认被选中的值列表",
            "docblock": "默认被选中的值列表"
          },
          "children": {
            "type": {
              "name": "arrayOf",
              "value": {
                "name": "element"
              }
            },
            "required": false,
            "description": "通过子元素方式设置内部 checkbox",
            "docblock": "通过子元素方式设置内部 checkbox"
          },
          "onChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "选中值改变时的事件",
            "defaultValue": {
              "value": "() => {}",
              "computed": false
            },
            "docblock": "选中值改变时的事件\n@param {Array} value 选中项列表\n@param {Event} e Dom 事件对象",
            "params": [{
              "name": "value",
              "description": "选中项列表",
              "type": {
                "name": "Array"
              }
            },
              {
                "name": "e",
                "description": "Dom 事件对象",
                "type": {
                  "name": "Event"
                }
              }
            ],
            "returns": null
          },
          "itemDirection": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'hoz'",
                "computed": false
              },
                {
                  "value": "'ver'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "子项目的排列方式\n- hoz: 水平排列 (default)\n- ver: 垂直排列",
            "defaultValue": {
              "value": "'hoz'",
              "computed": false
            },
            "docblock": "子项目的排列方式\n- hoz: 水平排列 (default)\n- ver: 垂直排列"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Collapse",
      "title": "折叠面板",
      "typeId": 4,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式前缀"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "组件接受行内样式",
          "docblock": "组件接受行内样式",
          "properties": []
        },
        "dataSource": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "使用数据模型构建",
          "docblock": "使用数据模型构建"
        },
        "defaultExpandedKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "默认展开keys",
          "docblock": "默认展开keys"
        },
        "expandedKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "受控展开keys",
          "docblock": "受控展开keys"
        },
        "onExpand": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "展开状态发升变化时候的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "展开状态发升变化时候的回调",
          "params": [],
          "returns": null
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "所有禁用",
          "docblock": "所有禁用"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "扩展class",
          "docblock": "扩展class"
        },
        "accordion": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "手风琴模式，一次只能打开一个",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "手风琴模式，一次只能打开一个"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Panel",
        "title": "单个折叠面板",
        "props": {
          "prefix": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "样式类名的品牌前缀",
            "defaultValue": {
              "value": "'next-'",
              "computed": false
            },
            "docblock": "样式类名的品牌前缀"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "子组件接受行内样式",
            "docblock": "子组件接受行内样式",
            "properties": []
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁止用户操作",
            "docblock": "是否禁止用户操作"
          },
          "title": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "标题",
            "docblock": "标题"
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "扩展class",
            "docblock": "扩展class"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "ConfigProvider",
      "title": "全局配置",
      "typeId": 6,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式类名的品牌前缀",
          "docblock": "样式类名的品牌前缀"
        },
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "国际化文案对象，属性为组件的 displayName",
          "docblock": "国际化文案对象，属性为组件的 displayName",
          "properties": []
        },
        "errorBoundary": {
          "type": {
            "name": "union",
            "value": [{
              "name": "bool"
            },
              {
                "name": "object"
              }
            ]
          },
          "required": false,
          "description": "是否开启错误捕捉 errorBoundary\n如需自定义参数，请传入对象 对象接受参数列表如下：\n\nfallbackUI `Function(error?: {}, errorInfo?: {}) => Element` 捕获错误后的展示\nafterCatch `Function(error?: {}, errorInfo?: {})` 捕获错误后的行为, 比如埋点上传",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否开启错误捕捉 errorBoundary\n如需自定义参数，请传入对象 对象接受参数列表如下：\n\nfallbackUI `Function(error?: {}, errorInfo?: {}) => Element` 捕获错误后的展示\nafterCatch `Function(error?: {}, errorInfo?: {})` 捕获错误后的行为, 比如埋点上传"
        },
        "pure": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启 Pure Render 模式，会提高性能，但是也会带来副作用",
          "docblock": "是否开启 Pure Render 模式，会提高性能，但是也会带来副作用"
        },
        "warning": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否在开发模式下显示组件属性被废弃的 warning 提示",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否在开发模式下显示组件属性被废弃的 warning 提示"
        },
        "rtl": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启 rtl 模式",
          "docblock": "是否开启 rtl 模式"
        },
        "children": {
          "type": {
            "name": "element"
          },
          "required": false,
          "description": "组件树",
          "docblock": "组件树"
        }
      },
      "methods": [{
        "name": "config",
        "docblock": "传入组件，生成受 ConfigProvider 控制的 HOC 组件\n@param {Component} Component 组件类\n@param {Object} options 可选项\n@returns {Component} HOC",
        "modifiers": [
          "static"
        ],
        "params": [{
          "name": "Component",
          "description": "组件类",
          "type": {
            "name": "Component"
          }
        },
          {
            "name": "options",
            "description": "可选项",
            "type": {
              "name": "Object"
            }
          }
        ],
        "returns": {
          "description": "HOC",
          "type": {
            "name": "Component"
          }
        },
        "description": "传入组件，生成受 ConfigProvider 控制的 HOC 组件"
      },
        {
          "name": "getContextProps",
          "docblock": "传入组件的 props 和 displayName，得到和 childContext 计算过的包含有 preifx/locale/pure 的对象，一般用于通过静态方法生成脱离组件树的组件\n@param {Object} props 组件的 props\n@param {String} displayName 组件的 displayName\n@returns {Object} 新的 context props",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "组件的 props",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "displayName",
              "description": "组件的 displayName",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": {
            "description": "新的 context props",
            "type": {
              "name": "Object"
            }
          },
          "description": "传入组件的 props 和 displayName，得到和 childContext 计算过的包含有 preifx/locale/pure 的对象，一般用于通过静态方法生成脱离组件树的组件"
        }
      ],
      "propsExtends": false,
      "subComponents": []
    },
    {
      "name": "DatePicker",
      "title": "日期选择框",
      "typeId": 3,
      "props": {
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "输入框内置标签",
          "docblock": "输入框内置标签"
        },
        "state": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'success'",
              "computed": false
            },
              {
                "value": "'loading'",
                "computed": false
              },
              {
                "value": "'error'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "输入框状态",
          "docblock": "输入框状态"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "输入提示",
          "docblock": "输入提示"
        },
        "defaultVisibleMonth": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "默认展现的月",
          "docblock": "默认展现的月\n@return {MomentObject} 返回包含指定月份的 moment 对象实例",
          "params": [],
          "returns": {
            "description": "返回包含指定月份的 moment 对象实例",
            "type": {
              "name": "MomentObject"
            }
          }
        },
        "value": {
          "type": {
            "name": "custom",
            "raw": "checkDateValue"
          },
          "required": false,
          "description": "日期值（受控）moment 对象",
          "docblock": "日期值（受控）moment 对象"
        },
        "defaultValue": {
          "type": {
            "name": "custom",
            "raw": "checkDateValue"
          },
          "required": false,
          "description": "初始日期值，moment 对象",
          "docblock": "初始日期值，moment 对象"
        },
        "format": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "日期值的格式（用于限定用户输入和展示）",
          "defaultValue": {
            "value": "'YYYY-MM-DD'",
            "computed": false
          },
          "docblock": "日期值的格式（用于限定用户输入和展示）"
        },
        "showTime": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "是否使用时间控件，传入 TimePicker 的属性 { defaultValue, format, ... }",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否使用时间控件，传入 TimePicker 的属性 { defaultValue, format, ... }"
        },
        "resetTime": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "每次选择日期时是否重置时间（仅在 showTime 开启时有效）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "每次选择日期时是否重置时间（仅在 showTime 开启时有效）"
        },
        "disabledDate": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "禁用日期函数",
          "defaultValue": {
            "value": "() => false",
            "computed": false
          },
          "docblock": "禁用日期函数\n@param {MomentObject} 日期值\n@param {String} view 当前视图类型，year: 年， month: 月, date: 日\n@return {Boolean} 是否禁用",
          "params": [{
            "name": "日期值",
            "description": null,
            "type": {
              "name": "MomentObject"
            }
          },
            {
              "name": "view",
              "description": "当前视图类型，year: 年， month: 月, date: 日",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": {
            "description": "是否禁用",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "footerRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义面板页脚",
          "defaultValue": {
            "value": "() => null",
            "computed": false
          },
          "docblock": "自定义面板页脚\n@return {Node} 自定义的面板页脚组件",
          "params": [],
          "returns": {
            "description": "自定义的面板页脚组件",
            "type": {
              "name": "Node"
            }
          }
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "日期值改变时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "日期值改变时的回调\n@param {MomentObject|String} value 日期值",
          "params": [{
            "name": "value",
            "description": "日期值",
            "type": {
              "name": "union",
              "value": [
                "MomentObject",
                "String"
              ]
            }
          }],
          "returns": null
        },
        "onOk": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击确认按钮时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "点击确认按钮时的回调\n@return {MomentObject|String} 日期值",
          "params": [],
          "returns": {
            "description": "日期值",
            "type": {
              "name": "union",
              "value": [
                "MomentObject",
                "String"
              ]
            }
          }
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "输入框尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "输入框尺寸"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "docblock": "是否禁用"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示清空按钮",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示清空按钮"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层显示状态",
          "docblock": "弹层显示状态"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层默认是否显示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "弹层默认是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层展示状态变化时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； okBtnClick 表示由确认按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层是否显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； okBtnClick 表示由确认按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupTriggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "弹层触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "弹层触发方式"
        },
        "popupAlign": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层对齐方式,具体含义见 OverLay文档",
          "defaultValue": {
            "value": "'tl tl'",
            "computed": false
          },
          "docblock": "弹层对齐方式,具体含义见 OverLay文档"
        },
        "popupContainer": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层容器",
          "docblock": "弹层容器\n@param {Element} target 目标元素\n@return {Element} 弹层的容器元素",
          "params": [{
            "name": "target",
            "description": "目标元素",
            "type": {
              "name": "Element"
            }
          }],
          "returns": {
            "description": "弹层的容器元素",
            "type": {
              "name": "Element"
            }
          }
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层自定义样式",
          "docblock": "弹层自定义样式",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层自定义样式类",
          "docblock": "弹层自定义样式类"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层其他属性",
          "docblock": "弹层其他属性",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "inputProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "输入框其他属性",
          "docblock": "输入框其他属性",
          "properties": []
        },
        "dateCellRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义日期渲染函数",
          "docblock": "自定义日期渲染函数\n@param {Object} value 日期值（moment对象）\n@returns {ReactNode}",
          "params": [{
            "name": "value",
            "description": "日期值（moment对象）",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "monthCellRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义月份渲染函数",
          "docblock": "自定义月份渲染函数\n@param {Object} calendarDate 对应 Calendar 返回的自定义日期对象\n@returns {ReactNode}",
          "params": [{
            "name": "calendarDate",
            "description": "对应 Calendar 返回的自定义日期对象",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "dateInputAriaLabel": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "日期输入框的 aria-label 属性",
          "docblock": "日期输入框的 aria-label 属性"
        },
        "timeInputAriaLabel": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "时间输入框的 aria-label 属性",
          "docblock": "时间输入框的 aria-label 属性"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "MonthPicker",
        "title": "月份选择框",
        "props": {
          "label": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "输入框内置标签",
            "docblock": "输入框内置标签"
          },
          "state": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'success'",
                "computed": false
              },
                {
                  "value": "'loading'",
                  "computed": false
                },
                {
                  "value": "'error'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "输入框状态",
            "docblock": "输入框状态"
          },
          "placeholder": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "输入提示",
            "docblock": "输入提示"
          },
          "defaultVisibleYear": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "默认展现的年",
            "docblock": "默认展现的年\n@return {MomentObject} 返回包含指定年份的 moment 对象实例",
            "params": [],
            "returns": {
              "description": "返回包含指定年份的 moment 对象实例",
              "type": {
                "name": "MomentObject"
              }
            }
          },
          "value": {
            "type": {
              "name": "custom",
              "raw": "checkDateValue"
            },
            "required": false,
            "description": "日期值（受控）moment 对象",
            "docblock": "日期值（受控）moment 对象"
          },
          "defaultValue": {
            "type": {
              "name": "custom",
              "raw": "checkDateValue"
            },
            "required": false,
            "description": "初始日期值，moment 对象",
            "docblock": "初始日期值，moment 对象"
          },
          "format": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "日期值的格式（用于限定用户输入和展示）",
            "defaultValue": {
              "value": "'YYYY-MM'",
              "computed": false
            },
            "docblock": "日期值的格式（用于限定用户输入和展示）"
          },
          "disabledDate": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "禁用日期函数",
            "defaultValue": {
              "value": "() => false",
              "computed": false
            },
            "docblock": "禁用日期函数\n@param {MomentObject} 日期值\n@param {String} view 当前视图类型，year: 年， month: 月, date: 日\n@return {Boolean} 是否禁用",
            "params": [{
              "name": "日期值",
              "description": null,
              "type": {
                "name": "MomentObject"
              }
            },
              {
                "name": "view",
                "description": "当前视图类型，year: 年， month: 月, date: 日",
                "type": {
                  "name": "String"
                }
              }
            ],
            "returns": {
              "description": "是否禁用",
              "type": {
                "name": "Boolean"
              }
            }
          },
          "footerRender": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "自定义面板页脚",
            "defaultValue": {
              "value": "() => null",
              "computed": false
            },
            "docblock": "自定义面板页脚\n@return {Node} 自定义的面板页脚组件",
            "params": [],
            "returns": {
              "description": "自定义的面板页脚组件",
              "type": {
                "name": "Node"
              }
            }
          },
          "onChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "日期值改变时的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "日期值改变时的回调\n@param {MomentObject|String} value 日期值",
            "params": [{
              "name": "value",
              "description": "日期值",
              "type": {
                "name": "union",
                "value": [
                  "MomentObject",
                  "String"
                ]
              }
            }],
            "returns": null
          },
          "size": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'small'",
                "computed": false
              },
                {
                  "value": "'medium'",
                  "computed": false
                },
                {
                  "value": "'large'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "输入框尺寸",
            "defaultValue": {
              "value": "'medium'",
              "computed": false
            },
            "docblock": "输入框尺寸"
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁用",
            "docblock": "是否禁用"
          },
          "hasClear": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否显示清空按钮",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "是否显示清空按钮"
          },
          "visible": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "弹层显示状态",
            "docblock": "弹层显示状态"
          },
          "defaultVisible": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "弹层默认是否显示",
            "docblock": "弹层默认是否显示"
          },
          "onVisibleChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层展示状态变化时的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
            "params": [{
              "name": "visible",
              "description": "弹层是否显示",
              "type": {
                "name": "Boolean"
              }
            },
              {
                "name": "type",
                "description": "触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
                "type": {
                  "name": "String"
                }
              }
            ],
            "returns": null
          },
          "popupTriggerType": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'click'",
                "computed": false
              },
                {
                  "value": "'hover'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "弹层触发方式",
            "defaultValue": {
              "value": "'click'",
              "computed": false
            },
            "docblock": "弹层触发方式"
          },
          "popupAlign": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "弹层对齐方式, 具体含义见 OverLay文档",
            "defaultValue": {
              "value": "'tl tl'",
              "computed": false
            },
            "docblock": "弹层对齐方式, 具体含义见 OverLay文档"
          },
          "popupContainer": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层容器",
            "docblock": "弹层容器\n@param {Element} target 目标元素\n@return {Element} 弹层的容器元素",
            "params": [{
              "name": "target",
              "description": "目标元素",
              "type": {
                "name": "Element"
              }
            }],
            "returns": {
              "description": "弹层的容器元素",
              "type": {
                "name": "Element"
              }
            }
          },
          "popupStyle": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "弹层自定义样式",
            "docblock": "弹层自定义样式",
            "properties": []
          },
          "popupClassName": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "弹层自定义样式类",
            "docblock": "弹层自定义样式类"
          },
          "popupProps": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "弹层其他属性",
            "docblock": "弹层其他属性",
            "properties": []
          },
          "followTrigger": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否跟随滚动",
            "docblock": "是否跟随滚动"
          },
          "inputProps": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "输入框其他属性",
            "docblock": "输入框其他属性",
            "properties": []
          },
          "monthCellRender": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "自定义月份渲染函数",
            "docblock": "自定义月份渲染函数\n@param {Object} calendarDate 对应 Calendar 返回的自定义日期对象\n@returns {ReactNode}",
            "params": [{
              "name": "calendarDate",
              "description": "对应 Calendar 返回的自定义日期对象",
              "type": {
                "name": "Object"
              }
            }],
            "returns": {
              "description": null,
              "type": {
                "name": "ReactNode"
              }
            }
          },
          "dateInputAriaLabel": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "日期输入框的 aria-label 属性",
            "docblock": "日期输入框的 aria-label 属性"
          }
        },
        "methods": []
      },
        {
          "name": "RangePicker",
          "title": "区间选择框",
          "props": {
            "defaultVisibleMonth": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "默认展示的起始月份",
              "docblock": "默认展示的起始月份\n@return {MomentObject} 返回包含指定月份的 moment 对象实例",
              "params": [],
              "returns": {
                "description": "返回包含指定月份的 moment 对象实例",
                "type": {
                  "name": "MomentObject"
                }
              }
            },
            "value": {
              "type": {
                "name": "array"
              },
              "required": false,
              "description": "日期范围值数组 [moment, moment]",
              "docblock": "日期范围值数组 [moment, moment]"
            },
            "defaultValue": {
              "type": {
                "name": "array"
              },
              "required": false,
              "description": "初始的日期范围值数组 [moment, moment]",
              "docblock": "初始的日期范围值数组 [moment, moment]"
            },
            "format": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "日期格式",
              "defaultValue": {
                "value": "'YYYY-MM-DD'",
                "computed": false
              },
              "docblock": "日期格式"
            },
            "showTime": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "object"
                },
                  {
                    "name": "bool"
                  }
                ]
              },
              "required": false,
              "description": "是否使用时间控件，支持传入 TimePicker 的属性",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否使用时间控件，支持传入 TimePicker 的属性"
            },
            "resetTime": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "每次选择是否重置时间（仅在 showTime 开启时有效）",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "每次选择是否重置时间（仅在 showTime 开启时有效）"
            },
            "disabledDate": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "禁用日期函数",
              "defaultValue": {
                "value": "() => false",
                "computed": false
              },
              "docblock": "禁用日期函数\n@param {MomentObject} 日期值\n@param {String} view 当前视图类型，year: 年， month: 月, date: 日\n@return {Boolean} 是否禁用",
              "params": [{
                "name": "日期值",
                "description": null,
                "type": {
                  "name": "MomentObject"
                }
              },
                {
                  "name": "view",
                  "description": "当前视图类型，year: 年， month: 月, date: 日",
                  "type": {
                    "name": "String"
                  }
                }
              ],
              "returns": {
                "description": "是否禁用",
                "type": {
                  "name": "Boolean"
                }
              }
            },
            "footerRender": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "自定义面板页脚",
              "defaultValue": {
                "value": "() => null",
                "computed": false
              },
              "docblock": "自定义面板页脚\n@return {Node} 自定义的面板页脚组件",
              "params": [],
              "returns": {
                "description": "自定义的面板页脚组件",
                "type": {
                  "name": "Node"
                }
              }
            },
            "onChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "日期范围值改变时的回调 [ MomentObject|String, MomentObject|String ]",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "日期范围值改变时的回调 [ MomentObject|String, MomentObject|String ]\n@param {Array<MomentObject|String>} value 日期值",
              "params": [{
                "name": "value",
                "description": "日期值",
                "type": {
                  "name": "Array"
                }
              }],
              "returns": null
            },
            "onOk": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "点击确认按钮时的回调 返回开始时间和结束时间`[ MomentObject|String, MomentObject|String ]`",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "点击确认按钮时的回调 返回开始时间和结束时间`[ MomentObject|String, MomentObject|String ]`\n@return {Array} 日期范围",
              "params": [],
              "returns": {
                "description": "日期范围",
                "type": {
                  "name": "Array"
                }
              }
            },
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "输入框内置标签",
              "docblock": "输入框内置标签"
            },
            "state": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'error'",
                  "computed": false
                },
                  {
                    "value": "'loading'",
                    "computed": false
                  },
                  {
                    "value": "'success'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "输入框状态",
              "docblock": "输入框状态"
            },
            "size": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'small'",
                  "computed": false
                },
                  {
                    "value": "'medium'",
                    "computed": false
                  },
                  {
                    "value": "'large'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "输入框尺寸",
              "defaultValue": {
                "value": "'medium'",
                "computed": false
              },
              "docblock": "输入框尺寸"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "docblock": "是否禁用"
            },
            "hasClear": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否显示清空按钮",
              "defaultValue": {
                "value": "true",
                "computed": false
              },
              "docblock": "是否显示清空按钮"
            },
            "visible": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "弹层显示状态",
              "docblock": "弹层显示状态"
            },
            "defaultVisible": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "弹层默认是否显示",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "弹层默认是否显示"
            },
            "onVisibleChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "弹层展示状态变化时的回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示和隐藏的来源 okBtnClick 表示由确认按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "params": [{
                "name": "visible",
                "description": "弹层是否显示",
                "type": {
                  "name": "Boolean"
                }
              },
                {
                  "name": "type",
                  "description": "触发弹层显示和隐藏的来源 okBtnClick 表示由确认按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
                  "type": {
                    "name": "String"
                  }
                }
              ],
              "returns": null
            },
            "popupTriggerType": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'click'",
                  "computed": false
                },
                  {
                    "value": "'hover'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "弹层触发方式",
              "defaultValue": {
                "value": "'click'",
                "computed": false
              },
              "docblock": "弹层触发方式"
            },
            "popupAlign": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "弹层对齐方式, 具体含义见 OverLay文档",
              "defaultValue": {
                "value": "'tl tl'",
                "computed": false
              },
              "docblock": "弹层对齐方式, 具体含义见 OverLay文档"
            },
            "popupContainer": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "弹层容器",
              "docblock": "弹层容器\n@param {Element} target 目标元素\n@return {Element} 弹层的容器元素",
              "params": [{
                "name": "target",
                "description": "目标元素",
                "type": {
                  "name": "Element"
                }
              }],
              "returns": {
                "description": "弹层的容器元素",
                "type": {
                  "name": "Element"
                }
              }
            },
            "popupStyle": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "弹层自定义样式",
              "docblock": "弹层自定义样式",
              "properties": []
            },
            "popupClassName": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "弹层自定义样式类",
              "docblock": "弹层自定义样式类"
            },
            "popupProps": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "弹层其他属性",
              "docblock": "弹层其他属性",
              "properties": []
            },
            "followTrigger": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否跟随滚动",
              "docblock": "是否跟随滚动"
            },
            "inputProps": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "输入框其他属性",
              "docblock": "输入框其他属性",
              "properties": []
            },
            "dateCellRender": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "自定义日期单元格渲染",
              "docblock": "自定义日期单元格渲染",
              "params": [],
              "returns": null
            },
            "monthCellRender": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "自定义月份渲染函数",
              "docblock": "自定义月份渲染函数\n@param {Object} calendarDate 对应 Calendar 返回的自定义日期对象\n@returns {ReactNode}",
              "params": [{
                "name": "calendarDate",
                "description": "对应 Calendar 返回的自定义日期对象",
                "type": {
                  "name": "Object"
                }
              }],
              "returns": {
                "description": null,
                "type": {
                  "name": "ReactNode"
                }
              }
            },
            "startDateInputAriaLabel": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "开始日期输入框的 aria-label 属性",
              "docblock": "开始日期输入框的 aria-label 属性"
            },
            "startTimeInputAriaLabel": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "开始时间输入框的 aria-label 属性",
              "docblock": "开始时间输入框的 aria-label 属性"
            },
            "endDateInputAriaLabel": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "结束日期输入框的 aria-label 属性",
              "docblock": "结束日期输入框的 aria-label 属性"
            },
            "endTimeInputAriaLabel": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "结束时间输入框的 aria-label 属性",
              "docblock": "结束时间输入框的 aria-label 属性"
            }
          },
          "methods": []
        },
        {
          "name": "YearPicker",
          "title": "年份选择框",
          "props": {
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "输入框内置标签",
              "docblock": "输入框内置标签"
            },
            "state": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'success'",
                  "computed": false
                },
                  {
                    "value": "'loading'",
                    "computed": false
                  },
                  {
                    "value": "'error'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "输入框状态",
              "docblock": "输入框状态"
            },
            "placeholder": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "输入提示",
              "docblock": "输入提示"
            },
            "value": {
              "type": {
                "name": "custom",
                "raw": "checkDateValue"
              },
              "required": false,
              "description": "日期值（受控）moment 对象",
              "docblock": "日期值（受控）moment 对象"
            },
            "defaultValue": {
              "type": {
                "name": "custom",
                "raw": "checkDateValue"
              },
              "required": false,
              "description": "初始日期值，moment 对象",
              "docblock": "初始日期值，moment 对象"
            },
            "format": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "日期值的格式（用于限定用户输入和展示）",
              "defaultValue": {
                "value": "'YYYY'",
                "computed": false
              },
              "docblock": "日期值的格式（用于限定用户输入和展示）"
            },
            "disabledDate": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "禁用日期函数",
              "defaultValue": {
                "value": "() => false",
                "computed": false
              },
              "docblock": "禁用日期函数\n@param {MomentObject} 日期值\n@param {String} view 当前视图类型，year: 年， month: 月, date: 日\n@return {Boolean} 是否禁用",
              "params": [{
                "name": "日期值",
                "description": null,
                "type": {
                  "name": "MomentObject"
                }
              },
                {
                  "name": "view",
                  "description": "当前视图类型，year: 年， month: 月, date: 日",
                  "type": {
                    "name": "String"
                  }
                }
              ],
              "returns": {
                "description": "是否禁用",
                "type": {
                  "name": "Boolean"
                }
              }
            },
            "footerRender": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "自定义面板页脚",
              "defaultValue": {
                "value": "() => null",
                "computed": false
              },
              "docblock": "自定义面板页脚\n@return {Node} 自定义的面板页脚组件",
              "params": [],
              "returns": {
                "description": "自定义的面板页脚组件",
                "type": {
                  "name": "Node"
                }
              }
            },
            "onChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "日期值改变时的回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "日期值改变时的回调\n@param {MomentObject|String} value 日期值",
              "params": [{
                "name": "value",
                "description": "日期值",
                "type": {
                  "name": "union",
                  "value": [
                    "MomentObject",
                    "String"
                  ]
                }
              }],
              "returns": null
            },
            "size": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'small'",
                  "computed": false
                },
                  {
                    "value": "'medium'",
                    "computed": false
                  },
                  {
                    "value": "'large'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "输入框尺寸",
              "defaultValue": {
                "value": "'medium'",
                "computed": false
              },
              "docblock": "输入框尺寸"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "docblock": "是否禁用"
            },
            "hasClear": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否显示清空按钮",
              "defaultValue": {
                "value": "true",
                "computed": false
              },
              "docblock": "是否显示清空按钮"
            },
            "visible": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "弹层显示状态",
              "docblock": "弹层显示状态"
            },
            "defaultVisible": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "弹层默认是否显示",
              "docblock": "弹层默认是否显示"
            },
            "onVisibleChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "弹层展示状态变化时的回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} reason 触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "params": [{
                "name": "visible",
                "description": "弹层是否显示",
                "type": {
                  "name": "Boolean"
                }
              },
                {
                  "name": "reason",
                  "description": "触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
                  "type": {
                    "name": "String"
                  }
                }
              ],
              "returns": null
            },
            "popupTriggerType": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'click'",
                  "computed": false
                },
                  {
                    "value": "'hover'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "弹层触发方式",
              "defaultValue": {
                "value": "'click'",
                "computed": false
              },
              "docblock": "弹层触发方式"
            },
            "popupAlign": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "弹层对齐方式, 具体含义见 OverLay文档",
              "defaultValue": {
                "value": "'tl tl'",
                "computed": false
              },
              "docblock": "弹层对齐方式, 具体含义见 OverLay文档"
            },
            "popupContainer": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "弹层容器",
              "docblock": "弹层容器\n@param {Element} target 目标元素\n@return {Element} 弹层的容器元素",
              "params": [{
                "name": "target",
                "description": "目标元素",
                "type": {
                  "name": "Element"
                }
              }],
              "returns": {
                "description": "弹层的容器元素",
                "type": {
                  "name": "Element"
                }
              }
            },
            "popupStyle": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "弹层自定义样式",
              "docblock": "弹层自定义样式",
              "properties": []
            },
            "popupClassName": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "弹层自定义样式类",
              "docblock": "弹层自定义样式类"
            },
            "popupProps": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "弹层其他属性",
              "docblock": "弹层其他属性",
              "properties": []
            },
            "followTrigger": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否跟随滚动",
              "docblock": "是否跟随滚动"
            },
            "inputProps": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "输入框其他属性",
              "docblock": "输入框其他属性",
              "properties": []
            },
            "dateInputAriaLabel": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "日期输入框的 aria-label 属性",
              "docblock": "日期输入框的 aria-label 属性"
            }
          },
          "methods": []
        }
      ]
    },
    {
      "name": "Dialog",
      "title": "弹窗",
      "typeId": 5,
      "props": {
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示"
        },
        "title": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "标题",
          "docblock": "标题"
        },
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "内容",
          "docblock": "内容"
        },
        "footer": {
          "type": {
            "name": "union",
            "value": [{
              "name": "bool"
            },
              {
                "name": "node"
              }
            ]
          },
          "required": false,
          "description": "底部内容，设置为 false，则不进行显示",
          "docblock": "底部内容，设置为 false，则不进行显示\n@default [<Button type=\"primary\">确定</Button>, <Button>取消</Button>]",
          "defaultValue": {
            "value": "[<Button type=\"primary\">确定</Button>, <Button>取消</Button>]",
            "computed": false
          }
        },
        "footerAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'left'",
              "computed": false
            },
              {
                "value": "'center'",
                "computed": false
              },
              {
                "value": "'right'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "底部按钮的对齐方式",
          "defaultValue": {
            "value": "'right'",
            "computed": false
          },
          "docblock": "底部按钮的对齐方式"
        },
        "footerActions": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "指定确定按钮和取消按钮是否存在以及如何排列,<br><br>**可选值**：\n['ok', 'cancel']（确认取消按钮同时存在，确认按钮在左）\n['cancel', 'ok']（确认取消按钮同时存在，确认按钮在右）\n['ok']（只存在确认按钮）\n['cancel']（只存在取消按钮）",
          "defaultValue": {
            "value": "['ok', 'cancel']",
            "computed": false
          },
          "docblock": "指定确定按钮和取消按钮是否存在以及如何排列,<br><br>**可选值**：\n['ok', 'cancel']（确认取消按钮同时存在，确认按钮在左）\n['cancel', 'ok']（确认取消按钮同时存在，确认按钮在右）\n['ok']（只存在确认按钮）\n['cancel']（只存在取消按钮）"
        },
        "onOk": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "在点击确定按钮时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "在点击确定按钮时触发的回调函数\n@param {Object} event 点击事件对象",
          "params": [{
            "name": "event",
            "description": "点击事件对象",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "onCancel": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "在点击取消按钮时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "在点击取消按钮时触发的回调函数\n@param {Object} event 点击事件对象",
          "params": [{
            "name": "event",
            "description": "点击事件对象",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "okProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "应用于确定按钮的属性对象",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "应用于确定按钮的属性对象",
          "properties": []
        },
        "cancelProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "应用于取消按钮的属性对象",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "应用于取消按钮的属性对象",
          "properties": []
        },
        "closeable": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "控制对话框关闭的方式，值可以为字符串或者布尔值，其中字符串是由以下值组成：\n**close** 表示点击关闭按钮可以关闭对话框\n**mask** 表示点击遮罩区域可以关闭对话框\n**esc** 表示按下 esc 键可以关闭对话框\n如 'close' 或 'close,esc,mask'\n如果设置为 true，则以上关闭方式全部生效\n如果设置为 false，则以上关闭方式全部失效",
          "defaultValue": {
            "value": "'esc,close'",
            "computed": false
          },
          "docblock": "控制对话框关闭的方式，值可以为字符串或者布尔值，其中字符串是由以下值组成：\n**close** 表示点击关闭按钮可以关闭对话框\n**mask** 表示点击遮罩区域可以关闭对话框\n**esc** 表示按下 esc 键可以关闭对话框\n如 'close' 或 'close,esc,mask'\n如果设置为 true，则以上关闭方式全部生效\n如果设置为 false，则以上关闭方式全部失效"
        },
        "onClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "对话框关闭时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "对话框关闭时触发的回调函数\n@param {String} trigger 关闭触发行为的描述字符串\n@param {Object} event 关闭时事件对象",
          "params": [{
            "name": "trigger",
            "description": "关闭触发行为的描述字符串",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "event",
              "description": "关闭时事件对象",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "afterClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "对话框关闭后触发的回调函数, 如果有动画，则在动画结束后触发",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "对话框关闭后触发的回调函数, 如果有动画，则在动画结束后触发",
          "params": [],
          "returns": null
        },
        "hasMask": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示遮罩",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示遮罩"
        },
        "animation": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "显示隐藏时动画的播放方式",
          "defaultValue": {
            "value": "{\n    in: 'fadeInDown',\n    out: 'fadeOutUp',\n}",
            "computed": false
          },
          "docblock": "显示隐藏时动画的播放方式\n@property {String} in 进场动画\n@property {String} out 出场动画"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "对话框弹出时是否自动获得焦点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "对话框弹出时是否自动获得焦点"
        },
        "align": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "对话框对齐方式, 具体见Overlay文档",
          "defaultValue": {
            "value": "'cc cc'",
            "computed": false
          },
          "docblock": "对话框对齐方式, 具体见Overlay文档"
        },
        "isFullScreen": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当对话框高度超过浏览器视口高度时，是否显示所有内容而不是出现滚动条以保证对话框完整显示在浏览器视口内，该属性仅在对话框垂直水平居中时生效，即 align 被设置为 'cc cc' 时",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "当对话框高度超过浏览器视口高度时，是否显示所有内容而不是出现滚动条以保证对话框完整显示在浏览器视口内，该属性仅在对话框垂直水平居中时生效，即 align 被设置为 'cc cc' 时"
        },
        "shouldUpdatePosition": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否在对话框重新渲染时及时更新对话框位置，一般用于对话框高度变化后依然能保证原来的对齐方式",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否在对话框重新渲染时及时更新对话框位置，一般用于对话框高度变化后依然能保证原来的对齐方式"
        },
        "minMargin": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "对话框距离浏览器顶部和底部的最小间距，align 被设置为 'cc cc' 并且 isFullScreen 被设置为 true 时不生效",
          "defaultValue": {
            "value": "40",
            "computed": false
          },
          "docblock": "对话框距离浏览器顶部和底部的最小间距，align 被设置为 'cc cc' 并且 isFullScreen 被设置为 true 时不生效"
        },
        "overlayProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传到弹层组件的属性对象",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "透传到弹层组件的属性对象",
          "properties": []
        },
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义国际化文案对象",
          "defaultValue": {
            "value": "zhCN.Dialog",
            "computed": true
          },
          "docblock": "自定义国际化文案对象\n@property {String} ok 确认按钮文案\n@property {String} cancel 取消按钮文案",
          "properties": [{
            "name": "ok",
            "description": "确认按钮文案",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "cancel",
              "description": "取消按钮文案",
              "type": {
                "name": "String"
              }
            }
          ]
        },
        "height": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "对话框的高度样式属性",
          "docblock": "对话框的高度样式属性"
        }
      },
      "methods": [{
        "name": "show",
        "docblock": "\n  创建对话框\n  @exportName show\n  @param {Object} config 配置项\n  @returns {Object} \b包含有 hide 方法，可用来关闭对话框\n ",
        "description": "创建对话框",
        "modifiers": [
          "static"
        ],
        "params": [{
          "name": "config",
          "description": "配置项",
          "type": {
            "type": "NameExpression",
            "name": "Object"
          }
        }],
        "returns": {
          "description": "\b包含有 hide 方法，可用来关闭对话框",
          "type": {
            "type": "NameExpression",
            "name": "Object"
          }
        }
      },
        {
          "name": "alert",
          "docblock": "\n  创建警示对话框\n  @exportName alert\n  @param {Object} config 配置项\n  @returns {Object} \b包含有 hide 方法，可用来关闭对话框\n ",
          "description": "创建警示对话框",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "config",
            "description": "配置项",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": {
            "description": "\b包含有 hide 方法，可用来关闭对话框",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }
        },
        {
          "name": "confirm",
          "docblock": "\n  创建确认对话框\n  @exportName confirm\n  @param {Object} config 配置项\n  @returns {Object} \b包含有 hide 方法，可用来关闭对话框\n ",
          "description": "创建确认对话框",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "config",
            "description": "配置项",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": {
            "description": "\b包含有 hide 方法，可用来关闭对话框",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }
        }
      ],
      "subComponents": []
    },
    {
      "name": "Dropdown",
      "title": "下拉菜单",
      "typeId": 6,
      "props": {
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "弹层内容",
          "docblock": "弹层内容"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层当前是否显示",
          "docblock": "弹层当前是否显示"
        },
        "onRequestClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层请求关闭时触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层请求关闭时触发事件的回调函数\n@param {String} type 弹层关闭的来源\n@param {Object} e DOM 事件",
          "params": [{
            "name": "type",
            "description": "弹层关闭的来源",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "e",
              "description": "DOM 事件",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "target": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "弹层定位的参照元素",
          "docblock": "弹层定位的参照元素\n@default target 属性，即触发元素",
          "defaultValue": {
            "value": "target 属性，即触发元素",
            "computed": false
          }
        },
        "align": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层相对于触发元素的定位, 详见 Overlay 的定位部分",
          "defaultValue": {
            "value": "'tl bl'",
            "computed": false
          },
          "docblock": "弹层相对于触发元素的定位, 详见 Overlay 的定位部分"
        },
        "offset": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px",
          "defaultValue": {
            "value": "[0, 0]",
            "computed": false
          },
          "docblock": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px"
        },
        "container": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点",
          "docblock": "渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点"
        },
        "hasMask": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示遮罩",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示遮罩"
        },
        "canCloseByEsc": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持 esc 按键关闭弹层",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否支持 esc 按键关闭弹层"
        },
        "canCloseByOutSideClick": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "点击弹层外的区域是否关闭弹层，不显示遮罩时生效",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "点击弹层外的区域是否关闭弹层，不显示遮罩时生效"
        },
        "canCloseByMask": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "点击遮罩区域是否关闭弹层，显示遮罩时生效",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "点击遮罩区域是否关闭弹层，显示遮罩时生效"
        },
        "beforeOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层打开前触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层打开前触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "onOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层打开时触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层打开时触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "afterOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层打开后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层打开后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "params": [],
          "returns": null
        },
        "beforeClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层关闭前触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层关闭前触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "onClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层关闭时触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层关闭时触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "afterClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层关闭后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层关闭后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "params": [],
          "returns": null
        },
        "beforePosition": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层定位完成前触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层定位完成前触发的事件",
          "params": [],
          "returns": null
        },
        "onPosition": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层定位完成时触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层定位完成时触发的事件\n@param {Object} config 定位的参数\n@param {Array} config.align 对齐方式，如 ['cc', 'cc']（如果开启 needAdjust，可能和预先设置的 align 不同）\n@param {Number} config.top 距离视口顶部距离\n@param {Number} config.left 距离视口左侧距离\n@param {Object} node 定位参照的容器节点",
          "params": [{
            "name": "config",
            "description": "定位的参数",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "config.align",
              "description": "对齐方式，如 ['cc', 'cc']（如果开启 needAdjust，可能和预先设置的 align 不同）",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "config.top",
              "description": "距离视口顶部距离",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "config.left",
              "description": "距离视口左侧距离",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "node",
              "description": "定位参照的容器节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "shouldUpdatePosition": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否在每次弹层重新渲染后强制更新定位信息，一般用于弹层内容区域大小发生变化时，仍需保持原来的定位方式",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否在每次弹层重新渲染后强制更新定位信息，一般用于弹层内容区域大小发生变化时，仍需保持原来的定位方式"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层打开时是否让其中的元素自动获取焦点",
          "docblock": "弹层打开时是否让其中的元素自动获取焦点"
        },
        "needAdjust": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当弹层由于页面滚动等情况不在可视区域时，是否自动调整定位以出现在可视区域",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "当弹层由于页面滚动等情况不在可视区域时，是否自动调整定位以出现在可视区域"
        },
        "disableScroll": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用页面滚动",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用页面滚动"
        },
        "cache": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "隐藏时是否保留子节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "隐藏时是否保留子节点"
        },
        "safeNode": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "安全节点，当点击 document 的时候，如果包含该节点则不会关闭弹层，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点，或者以上值组成的数组",
          "docblock": "安全节点，当点击 document 的时候，如果包含该节点则不会关闭弹层，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点，或者以上值组成的数组"
        },
        "wrapperClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层的根节点的样式类",
          "docblock": "弹层的根节点的样式类"
        },
        "wrapperStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层的根节点的内联样式",
          "docblock": "弹层的根节点的内联样式",
          "properties": []
        },
        "animation": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "配置动画的播放方式，支持 { in: 'enter-class', out: 'leave-class' } 的对象参数，如果设置为 false，则不播放动画",
          "docblock": "配置动画的播放方式，支持 { in: 'enter-class', out: 'leave-class' } 的对象参数，如果设置为 false，则不播放动画\n@default { in: 'expandInDown', out: 'expandOutUp' }",
          "defaultValue": {
            "value": "{ in: 'expandInDown', out: 'expandOutUp' }",
            "computed": false
          }
        },
        "trigger": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "触发弹层显示或者隐藏的元素",
          "docblock": "触发弹层显示或者隐藏的元素"
        },
        "triggerType": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "触发弹层显示或隐藏的操作类型，可以是 'click'，'hover'，或者它们组成的数组，如 ['hover', 'click']",
          "defaultValue": {
            "value": "'hover'",
            "computed": false
          },
          "docblock": "触发弹层显示或隐藏的操作类型，可以是 'click'，'hover'，或者它们组成的数组，如 ['hover', 'click']"
        },
        "triggerClickKeycode": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "当 triggerType 为 click 时才生效，可自定义触发弹层显示的键盘码",
          "defaultValue": {
            "value": "[KEYCODE.SPACE, KEYCODE.ENTER]",
            "computed": false
          },
          "docblock": "当 triggerType 为 click 时才生效，可自定义触发弹层显示的键盘码"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层默认是否显示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "弹层默认是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层显示或隐藏时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层显示或隐藏时触发的回调函数\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层是否显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "设置此属性，弹层无法显示或隐藏",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "设置此属性，弹层无法显示或隐藏"
        },
        "delay": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "弹层显示或隐藏的延时时间（以毫秒为单位），在 triggerType 被设置为 hover 时生效",
          "defaultValue": {
            "value": "200",
            "computed": false
          },
          "docblock": "弹层显示或隐藏的延时时间（以毫秒为单位），在 triggerType 被设置为 hover 时生效"
        },
        "canCloseByTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "trigger 是否可以关闭弹层",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "trigger 是否可以关闭弹层"
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随trigger滚动",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否跟随trigger滚动"
        }
      },
      "methods": [],
      "description": "继承 Popup 的 API，除非特别说明",
      "subComponents": []
    },
    {
      "name": "Form",
      "title": "表单",
      "typeId": 3,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式前缀"
        },
        "inline": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "内联表单",
          "docblock": "内联表单"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'large'",
              "computed": false,
              "description": "大"
            },
              {
                "value": "'medium'",
                "computed": false,
                "description": "中"
              },
              {
                "value": "'small'",
                "computed": false,
                "description": "小"
              }
            ]
          },
          "required": false,
          "description": "单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。\n@enumdesc 大, 中, 小",
          "value": [{
            "value": "'large'",
            "computed": false,
            "description": "大"
          },
            {
              "value": "'medium'",
              "computed": false,
              "description": "中"
            },
            {
              "value": "'small'",
              "computed": false,
              "description": "小"
            }
          ]
        },
        "labelAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'top'",
              "computed": false,
              "description": "上"
            },
              {
                "value": "'left'",
                "computed": false,
                "description": "左"
              },
              {
                "value": "'inset'",
                "computed": false,
                "description": "内"
              }
            ]
          },
          "required": false,
          "description": "标签的位置",
          "defaultValue": {
            "value": "'left'",
            "computed": false
          },
          "docblock": "标签的位置\n@enumdesc 上, 左, 内",
          "value": [{
            "value": "'top'",
            "computed": false,
            "description": "上"
          },
            {
              "value": "'left'",
              "computed": false,
              "description": "左"
            },
            {
              "value": "'inset'",
              "computed": false,
              "description": "内"
            }
          ]
        },
        "labelTextAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'left'",
              "computed": false,
              "description": "左"
            },
              {
                "value": "'right'",
                "computed": false,
                "description": "右"
              }
            ]
          },
          "required": false,
          "description": "标签的左右对齐方式",
          "docblock": "标签的左右对齐方式\n@enumdesc 左, 右",
          "value": [{
            "value": "'left'",
            "computed": false,
            "description": "左"
          },
            {
              "value": "'right'",
              "computed": false,
              "description": "右"
            }
          ]
        },
        "field": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项",
          "docblock": "经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项"
        },
        "saveField": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "保存 Form 自动生成的 field 对象",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "保存 Form 自动生成的 field 对象",
          "params": [],
          "returns": null
        },
        "labelCol": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "控制第一级 Item 的 labelCol",
          "docblock": "控制第一级 Item 的 labelCol",
          "properties": []
        },
        "wrapperCol": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "控制第一级 Item 的 wrapperCol",
          "docblock": "控制第一级 Item 的 wrapperCol",
          "properties": []
        },
        "onSubmit": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "form内有 `htmlType=\"submit\"` 的元素的时候会触发",
          "defaultValue": {
            "value": "function preventDefault(e) {\n    e.preventDefault();\n}",
            "computed": false
          },
          "docblock": "form内有 `htmlType=\"submit\"` 的元素的时候会触发",
          "params": [],
          "returns": null
        },
        "children": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "子元素",
          "docblock": "子元素"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "扩展class",
          "docblock": "扩展class"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内联样式",
          "docblock": "自定义内联样式",
          "properties": []
        },
        "value": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "表单数值",
          "docblock": "表单数值",
          "properties": []
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "表单变化回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "表单变化回调\n@param {Object} values 表单数据\n@param {Object} item 详细\n@param {String} item.name 变化的组件名\n@param {String} item.value 变化的数据\n@param {Object} item.field field 实例",
          "params": [{
            "name": "values",
            "description": "表单数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "item",
              "description": "详细",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "item.name",
              "description": "变化的组件名",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "item.value",
              "description": "变化的数据",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "item.field",
              "description": "field 实例",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "component": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "设置标签类型",
          "defaultValue": {
            "value": "'form'",
            "computed": false
          },
          "docblock": "设置标签类型"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Item",
        "title": "表单项",
        "props": {
          "prefix": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "样式前缀",
            "defaultValue": {
              "value": "'next-'",
              "computed": false
            },
            "docblock": "样式前缀"
          },
          "label": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "label 标签的文本",
            "docblock": "label 标签的文本"
          },
          "labelCol": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效",
            "docblock": "label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效",
            "properties": []
          },
          "wrapperCol": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "需要为输入控件设置布局样式时，使用该属性，用法同 labelCol",
            "docblock": "需要为输入控件设置布局样式时，使用该属性，用法同 labelCol",
            "properties": []
          },
          "help": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "自定义提示信息，如不设置，则会根据校验规则自动生成.",
            "docblock": "自定义提示信息，如不设置，则会根据校验规则自动生成."
          },
          "extra": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面",
            "docblock": "额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面"
          },
          "validateState": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'error'",
                "computed": false,
                "description": "失败"
              },
                {
                  "value": "'success'",
                  "computed": false,
                  "description": "成功"
                },
                {
                  "value": "'loading'",
                  "computed": false,
                  "description": "校验中"
                }
              ]
            },
            "required": false,
            "description": "校验状态，如不设置，则会根据校验规则自动生成",
            "docblock": "校验状态，如不设置，则会根据校验规则自动生成\n@enumdesc 失败, 成功, 校验中",
            "value": [{
              "value": "'error'",
              "computed": false,
              "description": "失败"
            },
              {
                "value": "'success'",
                "computed": false,
                "description": "成功"
              },
              {
                "value": "'loading'",
                "computed": false,
                "description": "校验中"
              }
            ]
          },
          "hasFeedback": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "配合 validateState 属性使用，是否展示 success/loading 的校验状态图标, 目前只有Input支持",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "配合 validateState 属性使用，是否展示 success/loading 的校验状态图标, 目前只有Input支持"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "自定义内联样式",
            "docblock": "自定义内联样式",
            "properties": []
          },
          "children": {
            "type": {
              "name": "union",
              "value": [{
                "name": "node"
              },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "node 或者 function(values)",
            "docblock": "node 或者 function(values)"
          },
          "size": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'large'",
                "computed": false
              },
                {
                  "value": "'small'",
                  "computed": false
                },
                {
                  "value": "'medium'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。",
            "docblock": "单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。"
          },
          "labelAlign": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'top'",
                "computed": false,
                "description": "上"
              },
                {
                  "value": "'left'",
                  "computed": false,
                  "description": "左"
                },
                {
                  "value": "'inset'",
                  "computed": false,
                  "description": "内"
                }
              ]
            },
            "required": false,
            "description": "标签的位置",
            "docblock": "标签的位置\n@enumdesc 上, 左, 内",
            "value": [{
              "value": "'top'",
              "computed": false,
              "description": "上"
            },
              {
                "value": "'left'",
                "computed": false,
                "description": "左"
              },
              {
                "value": "'inset'",
                "computed": false,
                "description": "内"
              }
            ]
          },
          "labelTextAlign": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'left'",
                "computed": false,
                "description": "左"
              },
                {
                  "value": "'right'",
                  "computed": false,
                  "description": "右"
                }
              ]
            },
            "required": false,
            "description": "标签的左右对齐方式",
            "docblock": "标签的左右对齐方式\n@enumdesc 左, 右",
            "value": [{
              "value": "'left'",
              "computed": false,
              "description": "左"
            },
              {
                "value": "'right'",
                "computed": false,
                "description": "右"
              }
            ]
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "扩展class",
            "docblock": "扩展class"
          },
          "required": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "[表单校验] 不能为空",
            "docblock": "[表单校验] 不能为空"
          },
          "asterisk": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "required 的星号是否显示",
            "docblock": "required 的星号是否显示"
          },
          "requiredMessage": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "required 自定义错误信息",
            "docblock": "required 自定义错误信息"
          },
          "requiredTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "required 自定义触发方式",
            "docblock": "required 自定义触发方式"
          },
          "min": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "[表单校验] 最小值",
            "docblock": "[表单校验] 最小值"
          },
          "max": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "[表单校验] 最大值",
            "docblock": "[表单校验] 最大值"
          },
          "minmaxMessage": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "min/max 自定义错误信息",
            "docblock": "min/max 自定义错误信息"
          },
          "minmaxTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "min/max 自定义触发方式",
            "docblock": "min/max 自定义触发方式"
          },
          "minLength": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "[表单校验] 字符串最小长度 / 数组最小个数",
            "docblock": "[表单校验] 字符串最小长度 / 数组最小个数"
          },
          "maxLength": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "[表单校验] 字符串最大长度 / 数组最大个数",
            "docblock": "[表单校验] 字符串最大长度 / 数组最大个数"
          },
          "minmaxLengthMessage": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "minLength/maxLength 自定义错误信息",
            "docblock": "minLength/maxLength 自定义错误信息"
          },
          "minmaxLengthTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "minLength/maxLength 自定义触发方式",
            "docblock": "minLength/maxLength 自定义触发方式"
          },
          "length": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "[表单校验] 字符串精确长度 / 数组精确个数",
            "docblock": "[表单校验] 字符串精确长度 / 数组精确个数"
          },
          "lengthMessage": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "length 自定义错误信息",
            "docblock": "length 自定义错误信息"
          },
          "lengthTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "length 自定义触发方式",
            "docblock": "length 自定义触发方式"
          },
          "pattern": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "正则校验",
            "docblock": "正则校验"
          },
          "patternMessage": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "pattern 自定义错误信息",
            "docblock": "pattern 自定义错误信息"
          },
          "patternTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "pattern 自定义触发方式",
            "docblock": "pattern 自定义触发方式"
          },
          "format": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'number'",
                "computed": false
              },
                {
                  "value": "'email'",
                  "computed": false
                },
                {
                  "value": "'url'",
                  "computed": false
                },
                {
                  "value": "'tel'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "[表单校验] 四种常用的 pattern",
            "docblock": "[表单校验] 四种常用的 pattern"
          },
          "formatMessage": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "format 自定义错误信息",
            "docblock": "format 自定义错误信息"
          },
          "formatTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "format 自定义触发方式",
            "docblock": "format 自定义触发方式"
          },
          "validator": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "[表单校验] 自定义校验函数",
            "docblock": "[表单校验] 自定义校验函数",
            "params": [],
            "returns": null
          },
          "validatorTrigger": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "validator 自定义触发方式",
            "docblock": "validator 自定义触发方式"
          },
          "autoValidate": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否修改数据时自动触发校验",
            "docblock": "是否修改数据时自动触发校验"
          }
        },
        "methods": [{
          "name": "getNames",
          "docblock": "从子元素里面提取表单组件",
          "modifiers": [],
          "params": [],
          "returns": null,
          "description": "从子元素里面提取表单组件"
        }],
        "description": "手动传递了 wrapCol labelCol 会使用 Grid 辅助布局; labelAlign='top' 会强制禁用 Grid",
        "order": 1
      },
        {
          "name": "Submit",
          "title": "表单提交",
          "props": {
            "type": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'primary'",
                  "computed": false
                },
                  {
                    "value": "'secondary'",
                    "computed": false
                  },
                  {
                    "value": "'normal'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "按钮的类型",
              "defaultValue": {
                "value": "'normal'",
                "computed": false
              },
              "docblock": "按钮的类型"
            },
            "size": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'small'",
                  "computed": false
                },
                  {
                    "value": "'medium'",
                    "computed": false
                  },
                  {
                    "value": "'large'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "按钮的尺寸",
              "defaultValue": {
                "value": "'medium'",
                "computed": false
              },
              "docblock": "按钮的尺寸"
            },
            "iconSize": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'xxs'",
                  "computed": false
                },
                  {
                    "value": "'xs'",
                    "computed": false
                  },
                  {
                    "value": "'small'",
                    "computed": false
                  },
                  {
                    "value": "'medium'",
                    "computed": false
                  },
                  {
                    "value": "'large'",
                    "computed": false
                  },
                  {
                    "value": "'xl'",
                    "computed": false
                  },
                  {
                    "value": "'xxl'",
                    "computed": false
                  },
                  {
                    "value": "'xxxl'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "按钮中 Icon 的尺寸，用于替代 Icon 的默认大小",
              "docblock": "按钮中 Icon 的尺寸，用于替代 Icon 的默认大小"
            },
            "htmlType": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'submit'",
                  "computed": false
                },
                  {
                    "value": "'reset'",
                    "computed": false
                  },
                  {
                    "value": "'button'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "当 component = 'button' 时，设置 button 标签的 type 值",
              "defaultValue": {
                "value": "'button'",
                "computed": false
              },
              "docblock": "当 component = 'button' 时，设置 button 标签的 type 值"
            },
            "component": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'button'",
                  "computed": false
                },
                  {
                    "value": "'a'",
                    "computed": false
                  },
                  {
                    "value": "'div'",
                    "computed": false
                  },
                  {
                    "value": "'span'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "设置标签类型",
              "defaultValue": {
                "value": "'button'",
                "computed": false
              },
              "docblock": "设置标签类型"
            },
            "loading": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "设置按钮的载入状态",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "设置按钮的载入状态"
            },
            "ghost": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "true",
                  "computed": false
                },
                  {
                    "value": "false",
                    "computed": false
                  },
                  {
                    "value": "'light'",
                    "computed": false
                  },
                  {
                    "value": "'dark'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "是否为幽灵按钮",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否为幽灵按钮"
            },
            "text": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否为文本按钮",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否为文本按钮"
            },
            "warning": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否为警告按钮",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否为警告按钮"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否禁用"
            },
            "onClick": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "点击提交后触发",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "点击提交后触发\n@param {Object} value 数据\n@param {Object} errors 错误数据\n@param {class} field 实例",
              "params": [{
                "name": "value",
                "description": "数据",
                "type": {
                  "name": "Object"
                }
              },
                {
                  "name": "errors",
                  "description": "错误数据",
                  "type": {
                    "name": "Object"
                  }
                },
                {
                  "name": "field",
                  "description": "实例",
                  "type": {
                    "name": "class"
                  }
                }
              ],
              "returns": null
            },
            "validate": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "bool"
                },
                  {
                    "name": "array"
                  }
                ]
              },
              "required": false,
              "description": "是否校验/需要校验的 name 数组",
              "docblock": "是否校验/需要校验的 name 数组"
            },
            "field": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "自定义 field (在 Form 内不需要设置)",
              "docblock": "自定义 field (在 Form 内不需要设置)",
              "properties": []
            }
          },
          "methods": [],
          "description": "继承 Button API",
          "order": 2
        },
        {
          "name": "Reset",
          "title": "表单重置",
          "props": {
            "type": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'primary'",
                  "computed": false
                },
                  {
                    "value": "'secondary'",
                    "computed": false
                  },
                  {
                    "value": "'normal'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "按钮的类型",
              "defaultValue": {
                "value": "'normal'",
                "computed": false
              },
              "docblock": "按钮的类型"
            },
            "size": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'small'",
                  "computed": false
                },
                  {
                    "value": "'medium'",
                    "computed": false
                  },
                  {
                    "value": "'large'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "按钮的尺寸",
              "defaultValue": {
                "value": "'medium'",
                "computed": false
              },
              "docblock": "按钮的尺寸"
            },
            "iconSize": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'xxs'",
                  "computed": false
                },
                  {
                    "value": "'xs'",
                    "computed": false
                  },
                  {
                    "value": "'small'",
                    "computed": false
                  },
                  {
                    "value": "'medium'",
                    "computed": false
                  },
                  {
                    "value": "'large'",
                    "computed": false
                  },
                  {
                    "value": "'xl'",
                    "computed": false
                  },
                  {
                    "value": "'xxl'",
                    "computed": false
                  },
                  {
                    "value": "'xxxl'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "按钮中 Icon 的尺寸，用于替代 Icon 的默认大小",
              "docblock": "按钮中 Icon 的尺寸，用于替代 Icon 的默认大小"
            },
            "htmlType": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'submit'",
                  "computed": false
                },
                  {
                    "value": "'reset'",
                    "computed": false
                  },
                  {
                    "value": "'button'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "当 component = 'button' 时，设置 button 标签的 type 值",
              "defaultValue": {
                "value": "'button'",
                "computed": false
              },
              "docblock": "当 component = 'button' 时，设置 button 标签的 type 值"
            },
            "component": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'button'",
                  "computed": false
                },
                  {
                    "value": "'a'",
                    "computed": false
                  },
                  {
                    "value": "'div'",
                    "computed": false
                  },
                  {
                    "value": "'span'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "设置标签类型",
              "defaultValue": {
                "value": "'button'",
                "computed": false
              },
              "docblock": "设置标签类型"
            },
            "loading": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "设置按钮的载入状态",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "设置按钮的载入状态"
            },
            "ghost": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "true",
                  "computed": false
                },
                  {
                    "value": "false",
                    "computed": false
                  },
                  {
                    "value": "'light'",
                    "computed": false
                  },
                  {
                    "value": "'dark'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "是否为幽灵按钮",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否为幽灵按钮"
            },
            "text": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否为文本按钮",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否为文本按钮"
            },
            "warning": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否为警告按钮",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否为警告按钮"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否禁用"
            },
            "onClick": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "点击提交后触发",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "点击提交后触发",
              "params": [],
              "returns": null
            },
            "names": {
              "type": {
                "name": "array"
              },
              "required": false,
              "description": "自定义重置的字段",
              "docblock": "自定义重置的字段"
            },
            "toDefault": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "返回默认值",
              "docblock": "返回默认值"
            },
            "field": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "自定义 field (在 Form 内不需要设置)",
              "docblock": "自定义 field (在 Form 内不需要设置)",
              "properties": []
            }
          },
          "methods": [],
          "description": "继承 Button API",
          "order": 3
        },
        {
          "name": "Error",
          "title": "表单错误",
          "props": {
            "name": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "array"
                  }
                ]
              },
              "required": false,
              "description": "表单名",
              "docblock": "表单名"
            },
            "field": {
              "type": {
                "name": "object"
              },
              "required": false,
              "description": "自定义 field (在 Form 内不需要设置)",
              "docblock": "自定义 field (在 Form 内不需要设置)",
              "properties": []
            },
            "children": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "node"
                },
                  {
                    "name": "func"
                  }
                ]
              },
              "required": false,
              "description": "自定义错误渲染, 可以是 node 或者 function(errors, state)",
              "docblock": "自定义错误渲染, 可以是 node 或者 function(errors, state)"
            }
          },
          "methods": [],
          "description": "自定义错误展示",
          "order": 4
        }
      ]
    },
    {
      "name": "Grid",
      "title": "栅格",
      "typeId": 1,
      "subComponents": [{
        "name": "Row",
        "title": "行",
        "props": {
          "children": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "行内容",
            "docblock": "行内容"
          },
          "gutter": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "列间隔",
            "defaultValue": {
              "value": "0",
              "computed": false
            },
            "docblock": "列间隔"
          },
          "wrap": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "列在行中宽度溢出后是否换行",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "列在行中宽度溢出后是否换行"
          },
          "fixed": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "行在某一断点下宽度是否保持不变（默认行宽度随视口变化而变化）",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "行在某一断点下宽度是否保持不变（默认行宽度随视口变化而变化）"
          },
          "fixedWidth": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'xxs'",
                "computed": false,
                "description": "320px"
              },
                {
                  "value": "'xs'",
                  "computed": false,
                  "description": "480px"
                },
                {
                  "value": "'s'",
                  "computed": false,
                  "description": "720px"
                },
                {
                  "value": "'m'",
                  "computed": false,
                  "description": "990px"
                },
                {
                  "value": "'l'",
                  "computed": false,
                  "description": "1200px"
                },
                {
                  "value": "'xl'",
                  "computed": false,
                  "description": "1500px"
                }
              ]
            },
            "required": false,
            "description": "固定行的宽度为某一断点的宽度，不受视口影响而变动",
            "docblock": "固定行的宽度为某一断点的宽度，不受视口影响而变动\n@enumdesc 320px, 480px, 720px, 990px, 1200px, 1500px",
            "value": [{
              "value": "'xxs'",
              "computed": false,
              "description": "320px"
            },
              {
                "value": "'xs'",
                "computed": false,
                "description": "480px"
              },
              {
                "value": "'s'",
                "computed": false,
                "description": "720px"
              },
              {
                "value": "'m'",
                "computed": false,
                "description": "990px"
              },
              {
                "value": "'l'",
                "computed": false,
                "description": "1200px"
              },
              {
                "value": "'xl'",
                "computed": false,
                "description": "1500px"
              }
            ]
          },
          "align": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'top'",
                "computed": false,
                "description": "顶部对齐"
              },
                {
                  "value": "'center'",
                  "computed": false,
                  "description": "居中对齐"
                },
                {
                  "value": "'bottom'",
                  "computed": false,
                  "description": "底部对齐"
                },
                {
                  "value": "'baseline'",
                  "computed": false,
                  "description": "按第一行文字基线对齐"
                },
                {
                  "value": "'stretch'",
                  "computed": false,
                  "description": "未设置高度或设为 auto，将占满整个容器的高度"
                }
              ]
            },
            "required": false,
            "description": "（不支持IE9浏览器）多列垂直方向对齐方式",
            "docblock": "（不支持IE9浏览器）多列垂直方向对齐方式\n@enumdesc 顶部对齐, 居中对齐, 底部对齐, 按第一行文字基线对齐, 未设置高度或设为 auto，将占满整个容器的高度",
            "value": [{
              "value": "'top'",
              "computed": false,
              "description": "顶部对齐"
            },
              {
                "value": "'center'",
                "computed": false,
                "description": "居中对齐"
              },
              {
                "value": "'bottom'",
                "computed": false,
                "description": "底部对齐"
              },
              {
                "value": "'baseline'",
                "computed": false,
                "description": "按第一行文字基线对齐"
              },
              {
                "value": "'stretch'",
                "computed": false,
                "description": "未设置高度或设为 auto，将占满整个容器的高度"
              }
            ]
          },
          "justify": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'start'",
                "computed": false,
                "description": "左对齐"
              },
                {
                  "value": "'center'",
                  "computed": false,
                  "description": "居中对齐"
                },
                {
                  "value": "'end'",
                  "computed": false,
                  "description": "右对齐"
                },
                {
                  "value": "'space-between'",
                  "computed": false,
                  "description": "两端对齐，列之间间距相等"
                },
                {
                  "value": "'space-around'",
                  "computed": false,
                  "description": "每列具有相同的左右间距，行两端间距是列间距的二分之一"
                }
              ]
            },
            "required": false,
            "description": "（不支持IE9浏览器）行内具有多余空间时的布局方式",
            "docblock": "（不支持IE9浏览器）行内具有多余空间时的布局方式\n@enumdesc 左对齐, 居中对齐, 右对齐, 两端对齐，列之间间距相等, 每列具有相同的左右间距，行两端间距是列间距的二分之一",
            "value": [{
              "value": "'start'",
              "computed": false,
              "description": "左对齐"
            },
              {
                "value": "'center'",
                "computed": false,
                "description": "居中对齐"
              },
              {
                "value": "'end'",
                "computed": false,
                "description": "右对齐"
              },
              {
                "value": "'space-between'",
                "computed": false,
                "description": "两端对齐，列之间间距相等"
              },
              {
                "value": "'space-around'",
                "computed": false,
                "description": "每列具有相同的左右间距，行两端间距是列间距的二分之一"
              }
            ]
          },
          "hidden": {
            "type": {
              "name": "union",
              "value": [{
                "name": "bool"
              },
                {
                  "name": "string"
                },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "行在不同断点下的显示与隐藏<br><br>**可选值**:<br>true(在所有断点下隐藏)<br>false(在所有断点下显示)<br>'xs'(在 xs 断点下隐藏）<br>['xxs', 'xs', 's', 'm', 'l', 'xl'](在 xxs, xs, s, m, l, xl 断点下隐藏）",
            "docblock": "行在不同断点下的显示与隐藏<br><br>**可选值**:<br>true(在所有断点下隐藏)<br>false(在所有断点下显示)<br>'xs'(在 xs 断点下隐藏）<br>['xxs', 'xs', 's', 'm', 'l', 'xl'](在 xxs, xs, s, m, l, xl 断点下隐藏）"
          },
          "component": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "指定以何种元素渲染该节点\n- 默认为 'div'",
            "defaultValue": {
              "value": "'div'",
              "computed": false
            },
            "docblock": "指定以何种元素渲染该节点\n- 默认为 'div'"
          }
        },
        "methods": [],
        "order": 1
      },
        {
          "name": "Col",
          "title": "列",
          "props": {
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "列内容",
              "docblock": "列内容"
            },
            "span": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  }
                ]
              },
              "required": false,
              "description": "列宽度<br><br>**可选值**:<br>1, 2, 3, ..., 22, 23, 24",
              "docblock": "列宽度<br><br>**可选值**:<br>1, 2, 3, ..., 22, 23, 24"
            },
            "fixedSpan": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  }
                ]
              },
              "required": false,
              "description": "固定列宽度，宽度值为20 * 栅格数<br><br>**可选值**:<br>1, 2, 3, ..., 28, 29, 30",
              "docblock": "固定列宽度，宽度值为20 * 栅格数<br><br>**可选值**:<br>1, 2, 3, ..., 28, 29, 30"
            },
            "offset": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  }
                ]
              },
              "required": false,
              "description": "（不支持IE9浏览器）列偏移<br><br>**可选值**:<br>1, 2, 3, ..., 22, 23, 24",
              "docblock": "（不支持IE9浏览器）列偏移<br><br>**可选值**:<br>1, 2, 3, ..., 22, 23, 24"
            },
            "fixedOffset": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  }
                ]
              },
              "required": false,
              "description": "（不支持IE9浏览器）固定列偏移，宽度值为20 * 栅格数<br><br>**可选值**:<br>1, 2, 3, ..., 28, 29, 30",
              "docblock": "（不支持IE9浏览器）固定列偏移，宽度值为20 * 栅格数<br><br>**可选值**:<br>1, 2, 3, ..., 28, 29, 30"
            },
            "align": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'top'",
                  "computed": false
                },
                  {
                    "value": "'center'",
                    "computed": false
                  },
                  {
                    "value": "'bottom'",
                    "computed": false
                  },
                  {
                    "value": "'baseline'",
                    "computed": false
                  },
                  {
                    "value": "'stretch'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "（不支持IE9浏览器）多列垂直方向对齐方式，可覆盖Row的align属性",
              "docblock": "（不支持IE9浏览器）多列垂直方向对齐方式，可覆盖Row的align属性"
            },
            "hidden": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "bool"
                },
                  {
                    "name": "string"
                  },
                  {
                    "name": "array"
                  }
                ]
              },
              "required": false,
              "description": "列在不同断点下的显示与隐藏<br><br>**可选值**:<br>true(在所有断点下隐藏)<br>false(在所有断点下显示)<br>'xs'(在 xs 断点下隐藏）<br>['xxs', 'xs', 's', 'm', 'l', 'xl'](在 xxs, xs, s, m, l, xl 断点下隐藏）",
              "docblock": "列在不同断点下的显示与隐藏<br><br>**可选值**:<br>true(在所有断点下隐藏)<br>false(在所有断点下显示)<br>'xs'(在 xs 断点下隐藏）<br>['xxs', 'xs', 's', 'm', 'l', 'xl'](在 xxs, xs, s, m, l, xl 断点下隐藏）"
            },
            "xxs": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  },
                  {
                    "name": "object"
                  }
                ]
              },
              "required": false,
              "description": ">=320px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象",
              "docblock": ">=320px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象"
            },
            "xs": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  },
                  {
                    "name": "object"
                  }
                ]
              },
              "required": false,
              "description": ">=480px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象",
              "docblock": ">=480px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象"
            },
            "s": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  },
                  {
                    "name": "object"
                  }
                ]
              },
              "required": false,
              "description": ">=720px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象",
              "docblock": ">=720px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象"
            },
            "m": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  },
                  {
                    "name": "object"
                  }
                ]
              },
              "required": false,
              "description": ">=990px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象",
              "docblock": ">=990px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象"
            },
            "l": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  },
                  {
                    "name": "object"
                  }
                ]
              },
              "required": false,
              "description": ">=1200px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象",
              "docblock": ">=1200px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象"
            },
            "xl": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "number"
                  },
                  {
                    "name": "object"
                  }
                ]
              },
              "required": false,
              "description": ">=1500px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象",
              "docblock": ">=1500px，响应式栅格，可为栅格数（span）或一个包含栅格数（span）和偏移栅格数（offset）对象"
            },
            "component": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "func"
                  }
                ]
              },
              "required": false,
              "description": "指定以何种元素渲染该节点，默认为 'div'",
              "defaultValue": {
                "value": "'div'",
                "computed": false
              },
              "docblock": "指定以何种元素渲染该节点，默认为 'div'"
            }
          },
          "methods": [],
          "order": 2
        }
      ],
      "methods": []
    },
    {
      "name": "Icon",
      "title": "图标",
      "typeId": 1,
      "props": {
        "type": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "指定显示哪种图标",
          "docblock": "指定显示哪种图标"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'xxs'",
              "computed": false
            },
              {
                "value": "'xs'",
                "computed": false
              },
              {
                "value": "'small'",
                "computed": false
              },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              },
              {
                "value": "'xl'",
                "computed": false
              },
              {
                "value": "'xxl'",
                "computed": false
              },
              {
                "value": "'xxxl'",
                "computed": false
              },
              {
                "value": "'inherit'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "指定图标大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "指定图标大小"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Input",
      "title": "输入框",
      "typeId": 3,
      "props": {
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "number"
              }
            ]
          },
          "required": false,
          "description": "当前值",
          "docblock": "当前值"
        },
        "defaultValue": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "number"
              }
            ]
          },
          "required": false,
          "description": "初始化值",
          "docblock": "初始化值"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "发生改变的时候触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "发生改变的时候触发的回调\n@param {String} value 数据\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "value",
            "description": "数据",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onKeyDown": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "键盘按下的时候触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "键盘按下的时候触发的回调\n@param {Event} e DOM事件对象\n@param {Object} opts 可扩展的附加信息：<br> - opts.overMaxLength: {Boolean} 已超出最大长度<br> - opts.beTrimed: {Boolean} 输入的空格被清理",
          "params": [{
            "name": "e",
            "description": "DOM事件对象",
            "type": {
              "name": "Event"
            }
          },
            {
              "name": "opts",
              "description": "可扩展的附加信息：<br> - opts.overMaxLength: {Boolean} 已超出最大长度<br> - opts.beTrimed: {Boolean} 输入的空格被清理",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "禁用状态",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "禁用状态"
        },
        "maxLength": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最大长度",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "最大长度"
        },
        "hasLimitHint": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否展现最大长度样式",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否展现最大长度样式"
        },
        "cutString": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当设置了maxLength时，是否截断超出字符串",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "当设置了maxLength时，是否截断超出字符串"
        },
        "readOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "只读",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "只读"
        },
        "trim": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "onChange返回会自动去除头尾空字符",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "onChange返回会自动去除头尾空字符"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "输入提示",
          "docblock": "输入提示"
        },
        "onFocus": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "获取焦点时候触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "获取焦点时候触发的回调\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "e",
            "description": "DOM事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        },
        "onBlur": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "失去焦点时候触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "失去焦点时候触发的回调\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "e",
            "description": "DOM事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        },
        "getValueLength": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义字符串计算长度方式",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "自定义字符串计算长度方式\n@param {String} value 数据\n@returns {Number} 自定义长度",
          "params": [{
            "name": "value",
            "description": "数据",
            "type": {
              "name": "String"
            }
          }],
          "returns": {
            "description": "自定义长度",
            "type": {
              "name": "Number"
            }
          }
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义class",
          "docblock": "自定义class"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内联样式",
          "docblock": "自定义内联样式",
          "properties": []
        },
        "htmlType": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "原生type",
          "docblock": "原生type"
        },
        "name": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "name",
          "docblock": "name"
        },
        "state": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'error'",
              "computed": false,
              "description": "错误"
            },
              {
                "value": "'loading'",
                "computed": false,
                "description": "校验中"
              },
              {
                "value": "'success'",
                "computed": false,
                "description": "成功"
              }
            ]
          },
          "required": false,
          "description": "状态",
          "docblock": "状态\n@enumdesc 错误, 校验中, 成功",
          "value": [{
            "value": "'error'",
            "computed": false,
            "description": "错误"
          },
            {
              "value": "'loading'",
              "computed": false,
              "description": "校验中"
            },
            {
              "value": "'success'",
              "computed": false,
              "description": "成功"
            }
          ]
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "label",
          "docblock": "label"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否出现clear按钮",
          "docblock": "是否出现clear按钮"
        },
        "hasBorder": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有边框",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否有边框"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false,
              "description": "小"
            },
              {
                "value": "'medium'",
                "computed": false,
                "description": "中"
              },
              {
                "value": "'large'",
                "computed": false,
                "description": "大"
              }
            ]
          },
          "required": false,
          "description": "尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "尺寸\n@enumdesc 小, 中, 大",
          "value": [{
            "value": "'small'",
            "computed": false,
            "description": "小"
          },
            {
              "value": "'medium'",
              "computed": false,
              "description": "中"
            },
            {
              "value": "'large'",
              "computed": false,
              "description": "大"
            }
          ]
        },
        "onPressEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "按下回车的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "按下回车的回调",
          "params": [],
          "returns": null
        },
        "hint": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "水印 (Icon的type类型，和hasClear占用一个地方)",
          "docblock": "水印 (Icon的type类型，和hasClear占用一个地方)"
        },
        "innerBefore": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "文字前附加内容",
          "docblock": "文字前附加内容"
        },
        "innerAfter": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "文字后附加内容",
          "docblock": "文字后附加内容"
        },
        "addonBefore": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "输入框前附加内容",
          "docblock": "输入框前附加内容"
        },
        "addonAfter": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "输入框后附加内容",
          "docblock": "输入框后附加内容"
        },
        "addonTextBefore": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "输入框前附加文字",
          "docblock": "输入框前附加文字"
        },
        "addonTextAfter": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "输入框后附加文字",
          "docblock": "输入框后附加文字"
        },
        "autoComplete": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "(原生input支持)",
          "defaultValue": {
            "value": "'off'",
            "computed": false
          },
          "docblock": "(原生input支持)"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "自动聚焦(原生input支持)",
          "docblock": "自动聚焦(原生input支持)"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "TextArea",
        "title": "文本域",
        "props": {
          "value": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "当前值",
            "docblock": "当前值"
          },
          "defaultValue": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "初始化值",
            "docblock": "初始化值"
          },
          "onChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "发生改变的时候触发的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "发生改变的时候触发的回调\n@param {String} value 数据\n@param {Event} e DOM事件对象",
            "params": [{
              "name": "value",
              "description": "数据",
              "type": {
                "name": "String"
              }
            },
              {
                "name": "e",
                "description": "DOM事件对象",
                "type": {
                  "name": "Event"
                }
              }
            ],
            "returns": null
          },
          "onKeyDown": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "键盘按下的时候触发的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "键盘按下的时候触发的回调\n@param {Event} e DOM事件对象\n@param {Object} opts 可扩展的附加信息：<br> - opts.overMaxLength: {Boolean} 已超出最大长度<br> - opts.beTrimed: {Boolean} 输入的空格被清理",
            "params": [{
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            },
              {
                "name": "opts",
                "description": "可扩展的附加信息：<br> - opts.overMaxLength: {Boolean} 已超出最大长度<br> - opts.beTrimed: {Boolean} 输入的空格被清理",
                "type": {
                  "name": "Object"
                }
              }
            ],
            "returns": null
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "禁用状态",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "禁用状态"
          },
          "maxLength": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "最大长度",
            "defaultValue": {
              "value": "null",
              "computed": false
            },
            "docblock": "最大长度"
          },
          "hasLimitHint": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否展现最大长度样式",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否展现最大长度样式"
          },
          "cutString": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "当设置了maxLength时，是否截断超出字符串",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "当设置了maxLength时，是否截断超出字符串"
          },
          "readOnly": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "只读",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "只读"
          },
          "trim": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "onChange返回会自动去除头尾空字符",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "onChange返回会自动去除头尾空字符"
          },
          "placeholder": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "输入提示",
            "docblock": "输入提示"
          },
          "onFocus": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "获取焦点时候触发的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "获取焦点时候触发的回调\n@param {Event} e DOM事件对象",
            "params": [{
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }],
            "returns": null
          },
          "onBlur": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "失去焦点时候触发的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "失去焦点时候触发的回调\n@param {Event} e DOM事件对象",
            "params": [{
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }],
            "returns": null
          },
          "getValueLength": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "自定义字符串计算长度方式",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "自定义字符串计算长度方式\n@param {String} value 数据\n@returns {Number} 自定义长度",
            "params": [{
              "name": "value",
              "description": "数据",
              "type": {
                "name": "String"
              }
            }],
            "returns": {
              "description": "自定义长度",
              "type": {
                "name": "Number"
              }
            }
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义class",
            "docblock": "自定义class"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "自定义内联样式",
            "docblock": "自定义内联样式",
            "properties": []
          },
          "htmlType": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "原生type",
            "docblock": "原生type"
          },
          "name": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "name",
            "docblock": "name"
          },
          "state": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'error'",
                "computed": false,
                "description": "错误"
              }]
            },
            "required": false,
            "description": "状态",
            "docblock": "状态\n@enumdesc 错误",
            "value": [{
              "value": "'error'",
              "computed": false,
              "description": "错误"
            }]
          },
          "hasBorder": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否有边框",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "是否有边框"
          },
          "autoHeight": {
            "type": {
              "name": "union",
              "value": [{
                "name": "bool"
              },
                {
                  "name": "object"
                }
              ]
            },
            "required": false,
            "description": "自动高度 true / {minRows: 2, maxRows: 4}",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "自动高度 true / {minRows: 2, maxRows: 4}"
          },
          "rows": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "多行文本框高度 <br />(不要直接用height设置多行文本框的高度, ie9 10会有兼容性问题)",
            "defaultValue": {
              "value": "4",
              "computed": false
            },
            "docblock": "多行文本框高度 <br />(不要直接用height设置多行文本框的高度, ie9 10会有兼容性问题)"
          }
        },
        "methods": [{
          "name": "getValueLength",
          "docblock": "value.length !== maxLength  in ie/safari(mac) while value has `Enter`\nabout maxLength compute: `Enter` was considered to be one char(\\n) in chrome , but two chars(\\r\\n) in ie/safari(mac).\nso while value has `Enter`, we should let display length + 1",
          "modifiers": [],
          "params": [{
            "name": "value"
          }],
          "returns": null,
          "description": "value.length !== maxLength  in ie/safari(mac) while value has `Enter`\nabout maxLength compute: `Enter` was considered to be one char(\\n) in chrome , but two chars(\\r\\n) in ie/safari(mac).\nso while value has `Enter`, we should let display length + 1"
        }],
        "order": 2
      },
        {
          "name": "Group",
          "title": "输入框组",
          "props": {
            "prefix": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "样式前缀",
              "defaultValue": {
                "value": "'next-'",
                "computed": false
              },
              "docblock": "样式前缀"
            },
            "addonBefore": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "输入框前附加内容",
              "docblock": "输入框前附加内容"
            },
            "addonBeforeClassName": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "输入框前附加内容css",
              "docblock": "输入框前附加内容css"
            },
            "addonAfter": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "输入框后附加内容",
              "docblock": "输入框后附加内容"
            },
            "addonAfterClassName": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "输入框后额外css",
              "docblock": "输入框后额外css"
            },
            "rtl": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "rtl",
              "docblock": "rtl"
            }
          },
          "methods": []
        }
      ]
    },
    {
      "name": "Loading",
      "title": "加载",
      "typeId": 5,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式前缀"
        },
        "tip": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "自定义内容",
          "docblock": "自定义内容"
        },
        "tipAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'right'",
              "computed": false,
              "description": "出现在动画右边"
            },
              {
                "value": "'bottom'",
                "computed": false,
                "description": "出现在动画下面"
              }
            ]
          },
          "required": false,
          "description": "自定义内容位置",
          "defaultValue": {
            "value": "'bottom'",
            "computed": false
          },
          "docblock": "自定义内容位置\n@enumdesc 出现在动画右边, 出现在动画下面",
          "value": [{
            "value": "'right'",
            "computed": false,
            "description": "出现在动画右边"
          },
            {
              "value": "'bottom'",
              "computed": false,
              "description": "出现在动画下面"
            }
          ]
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "loading 状态, 默认 true",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "loading 状态, 默认 true"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义class",
          "docblock": "自定义class"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内联样式",
          "docblock": "自定义内联样式",
          "properties": []
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'large'",
              "computed": false,
              "description": "大号"
            },
              {
                "value": "'medium'",
                "computed": false,
                "description": "中号"
              }
            ]
          },
          "required": false,
          "description": "设置动画尺寸",
          "defaultValue": {
            "value": "'large'",
            "computed": false
          },
          "docblock": "设置动画尺寸\n@description 仅仅对默认动画效果起作用\n@enumdesc 大号, 中号",
          "value": [{
            "value": "'large'",
            "computed": false,
            "description": "大号"
          },
            {
              "value": "'medium'",
              "computed": false,
              "description": "中号"
            }
          ]
        },
        "indicator": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "自定义动画",
          "docblock": "自定义动画"
        },
        "color": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "动画颜色",
          "docblock": "动画颜色"
        },
        "fullScreen": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "全屏展示",
          "docblock": "全屏展示"
        },
        "children": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "子元素",
          "docblock": "子元素"
        },
        "inline": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "should loader be displayed inline",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "should loader be displayed inline"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Menu",
      "title": "菜单",
      "typeId": 4,
      "props": {
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "菜单项和子菜单",
          "docblock": "菜单项和子菜单"
        },
        "onItemClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击菜单项触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击菜单项触发的回调函数\n@param {String} key 点击的菜单项的 key 值\n@param {Object} item 点击的菜单项对象\n@param {Object} event 点击的事件对象",
          "params": [{
            "name": "key",
            "description": "点击的菜单项的 key 值",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "item",
              "description": "点击的菜单项对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "event",
              "description": "点击的事件对象",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "openKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "当前打开的子菜单的 key 值",
          "docblock": "当前打开的子菜单的 key 值"
        },
        "defaultOpenKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "初始打开的子菜单的 key 值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "初始打开的子菜单的 key 值"
        },
        "defaultOpenAll": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "初始展开所有的子菜单，只在 mode 设置为 'inline' 以及 openMode 设置为 'multiple' 下生效，优先级高于 defaultOpenKeys",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "初始展开所有的子菜单，只在 mode 设置为 'inline' 以及 openMode 设置为 'multiple' 下生效，优先级高于 defaultOpenKeys"
        },
        "onOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "打开或关闭子菜单触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "打开或关闭子菜单触发的回调函数\n@param {String} key 打开的所有子菜单的 key 值\n@param {Object} extra 额外参数\n@param {String} extra.key 当前操作子菜单的 key 值\n@param {Boolean} extra.open 是否是打开",
          "params": [{
            "name": "key",
            "description": "打开的所有子菜单的 key 值",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.key",
              "description": "当前操作子菜单的 key 值",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "extra.open",
              "description": "是否是打开",
              "type": {
                "name": "Boolean"
              }
            }
          ],
          "returns": null
        },
        "mode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'inline'",
              "computed": false
            },
              {
                "value": "'popup'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "子菜单打开的模式",
          "defaultValue": {
            "value": "'inline'",
            "computed": false
          },
          "docblock": "子菜单打开的模式"
        },
        "triggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "子菜单打开的触发行为",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "子菜单打开的触发行为"
        },
        "openMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "展开内连子菜单的模式，同时可以展开一个子菜单还是多个子菜单，该属性仅在 mode 为 inline 时生效",
          "defaultValue": {
            "value": "'multiple'",
            "computed": false
          },
          "docblock": "展开内连子菜单的模式，同时可以展开一个子菜单还是多个子菜单，该属性仅在 mode 为 inline 时生效"
        },
        "inlineIndent": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "内连子菜单缩进距离",
          "defaultValue": {
            "value": "20",
            "computed": false
          },
          "docblock": "内连子菜单缩进距离"
        },
        "popupAutoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动让弹层的宽度和菜单项保持一致，如果弹层的宽度比菜单项小则和菜单项保持一致，如果宽度大于菜单项则不做处理",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否自动让弹层的宽度和菜单项保持一致，如果弹层的宽度比菜单项小则和菜单项保持一致，如果宽度大于菜单项则不做处理"
        },
        "popupAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'follow'",
              "computed": false
            },
              {
                "value": "'outside'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "弹层的对齐方式",
          "defaultValue": {
            "value": "'follow'",
            "computed": false
          },
          "docblock": "弹层的对齐方式"
        },
        "popupProps": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "弹层自定义 props",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "弹层自定义 props"
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹出子菜单自定义 className",
          "docblock": "弹出子菜单自定义 className"
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹出子菜单自定义 style",
          "docblock": "弹出子菜单自定义 style",
          "properties": []
        },
        "selectedKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "当前选中菜单项的 key 值",
          "docblock": "当前选中菜单项的 key 值"
        },
        "defaultSelectedKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "初始选中菜单项的 key 值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "初始选中菜单项的 key 值"
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选中或取消选中菜单项触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "选中或取消选中菜单项触发的回调函数\n@param {Array} selectedKeys 选中的所有菜单项的值\n@param {Object} item 选中或取消选中的菜单项\n@param {Object} extra 额外参数\n@param {Boolean} extra.select 是否是选中\n@param {Array} extra.key 菜单项的 key\n@param {Object} extra.label 菜单项的文本\n@param {Array} extra.keyPath 菜单项 key 的路径",
          "params": [{
            "name": "selectedKeys",
            "description": "选中的所有菜单项的值",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "item",
              "description": "选中或取消选中的菜单项",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.select",
              "description": "是否是选中",
              "type": {
                "name": "Boolean"
              }
            },
            {
              "name": "extra.key",
              "description": "菜单项的 key",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.label",
              "description": "菜单项的文本",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.keyPath",
              "description": "菜单项 key 的路径",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "selectMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选中模式，单选还是多选，默认无值，不可选",
          "docblock": "选中模式，单选还是多选，默认无值，不可选"
        },
        "shallowSelect": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只能选择第一层菜单项（不能选择子菜单中的菜单项）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否只能选择第一层菜单项（不能选择子菜单中的菜单项）"
        },
        "hasSelectedIcon": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示选中图标，如果设置为 false 需配合配置平台设置选中时的背景色以示区分",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示选中图标，如果设置为 false 需配合配置平台设置选中时的背景色以示区分"
        },
        "isSelectIconRight": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否将选中图标居右，仅当 hasSelectedIcon 为true 时生效。\n注意：SubMenu 上的选中图标一直居左，不受此API控制",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否将选中图标居右，仅当 hasSelectedIcon 为true 时生效。\n注意：SubMenu 上的选中图标一直居左，不受此API控制"
        },
        "direction": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'ver'",
              "computed": false
            },
              {
                "value": "'hoz'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "菜单第一层展示方向",
          "defaultValue": {
            "value": "'ver'",
            "computed": false
          },
          "docblock": "菜单第一层展示方向"
        },
        "hozAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'left'",
              "computed": false
            },
              {
                "value": "'right'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "横向菜单条 item 和 footer 的对齐方向，在 direction 设置为 'hoz' 并且 header 存在时生效",
          "defaultValue": {
            "value": "'left'",
            "computed": false
          },
          "docblock": "横向菜单条 item 和 footer 的对齐方向，在 direction 设置为 'hoz' 并且 header 存在时生效"
        },
        "hozInLine": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "横向菜单模式下，是否维持在一行，即超出一行折叠成 SubMenu 显示， 仅在 direction='hoz' mode='popup' 时生效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "横向菜单模式下，是否维持在一行，即超出一行折叠成 SubMenu 显示， 仅在 direction='hoz' mode='popup' 时生效"
        },
        "header": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义菜单头部",
          "docblock": "自定义菜单头部"
        },
        "footer": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义菜单尾部",
          "docblock": "自定义菜单尾部"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动获得焦点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否自动获得焦点"
        },
        "focusedKey": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "当前获得焦点的子菜单或菜单项 key 值",
          "docblock": "当前获得焦点的子菜单或菜单项 key 值"
        },
        "embeddable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启嵌入式模式，一般用于Layout的布局中，开启后没有默认背景、外层border、box-shadow，可以配合`<Menu style={{lineHeight: '100px'}}>` 自定义高度",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否开启嵌入式模式，一般用于Layout的布局中，开启后没有默认背景、外层border、box-shadow，可以配合`<Menu style={{lineHeight: '100px'}}>` 自定义高度"
        }
      },
      "methods": [{
        "name": "create",
        "docblock": "\n  创建上下文菜单\n  @exportName create\n  @param {Object} props 属性对象\n ",
        "description": "创建上下文菜单",
        "modifiers": [
          "static"
        ],
        "params": [{
          "name": "props",
          "description": "属性对象",
          "type": {
            "type": "NameExpression",
            "name": "Object"
          }
        }],
        "returns": null
      }],
      "subComponents": [{
        "name": "Item",
        "title": "菜单项",
        "props": {
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁用",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否禁用"
          },
          "helper": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "帮助文本",
            "docblock": "帮助文本"
          },
          "children": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "菜单项标签内容",
            "docblock": "菜单项标签内容"
          }
        },
        "methods": [],
        "order": 0
      },
        {
          "name": "SubMenu",
          "title": "子菜单",
          "props": {
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            },
            "selectable": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否可选，该属性仅在设置 Menu 组件 selectMode 属性后生效",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否可选，该属性仅在设置 Menu 组件 selectMode 属性后生效"
            },
            "mode": {
              "type": {
                "name": "enum",
                "value": [{
                  "value": "'inline'",
                  "computed": false
                },
                  {
                    "value": "'popup'",
                    "computed": false
                  }
                ]
              },
              "required": false,
              "description": "子菜单打开方式，如果设置会覆盖 Menu 上的同名属性",
              "docblock": "子菜单打开方式，如果设置会覆盖 Menu 上的同名属性\n@default Menu 的 mode 属性值",
              "defaultValue": {
                "value": "Menu 的 mode 属性值",
                "computed": false
              }
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "菜单项或下一级子菜单",
              "docblock": "菜单项或下一级子菜单"
            }
          },
          "methods": [],
          "order": 1
        },
        {
          "name": "PopupItem",
          "title": "弹出菜单",
          "props": {
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "自定义弹层内容",
              "docblock": "自定义弹层内容"
            }
          },
          "methods": [],
          "order": 2
        },
        {
          "name": "CheckboxItem",
          "title": "复选菜单",
          "props": {
            "checked": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否选中",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否选中"
            },
            "indeterminate": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否半选中",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否半选中"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否禁用"
            },
            "onChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "选中或取消选中触发的回调函数",
              "defaultValue": {
                "value": "() => {}",
                "computed": false
              },
              "docblock": "选中或取消选中触发的回调函数\n@param {Boolean} checked 是否选中\n@param {Object} event 选中事件对象",
              "params": [{
                "name": "checked",
                "description": "是否选中",
                "type": {
                  "name": "Boolean"
                }
              },
                {
                  "name": "event",
                  "description": "选中事件对象",
                  "type": {
                    "name": "Object"
                  }
                }
              ],
              "returns": null
            },
            "helper": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "帮助文本",
              "docblock": "帮助文本"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            }
          },
          "methods": [],
          "description": "该子组件选中情况不受 defaultSelectedKeys/selectedKeys 控制，请自行控制选中逻辑",
          "order": 3
        },
        {
          "name": "RadioItem",
          "title": "单选菜单",
          "props": {
            "checked": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否选中",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否选中"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否禁用"
            },
            "onChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "选中或取消选中触发的回调函数",
              "defaultValue": {
                "value": "() => {}",
                "computed": false
              },
              "docblock": "选中或取消选中触发的回调函数\n@param {Boolean} checked 是否选中\n@param {Object} event 选中事件对象",
              "params": [{
                "name": "checked",
                "description": "是否选中",
                "type": {
                  "name": "Boolean"
                }
              },
                {
                  "name": "event",
                  "description": "选中事件对象",
                  "type": {
                    "name": "Object"
                  }
                }
              ],
              "returns": null
            },
            "helper": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "帮助文本",
              "docblock": "帮助文本"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            }
          },
          "methods": [],
          "description": "该子组件选中情况不受 defaultSelectedKeys/selectedKeys 控制，请自行控制选中逻辑",
          "order": 4
        },
        {
          "name": "Group",
          "title": "菜单组",
          "props": {
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "菜单项",
              "docblock": "菜单项"
            }
          },
          "methods": [],
          "order": 5
        },
        {
          "name": "Divider",
          "title": "菜单分隔",
          "props": {},
          "methods": [],
          "order": 6
        }
      ]
    },
    {
      "name": "MenuButton",
      "title": "菜单按钮",
      "typeId": 1,
      "props": {
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "按钮上的文本内容",
          "docblock": "按钮上的文本内容"
        },
        "autoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层是否与按钮宽度相同",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "弹层是否与按钮宽度相同"
        },
        "popupTriggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "弹层触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "弹层触发方式"
        },
        "popupContainer": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层容器",
          "docblock": "弹层容器",
          "params": [],
          "returns": null
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层展开状态",
          "docblock": "弹层展开状态"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层默认是否展开",
          "docblock": "弹层默认是否展开"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层在显示和隐藏触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层在显示和隐藏触发的事件",
          "params": [],
          "returns": null
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层自定义样式",
          "docblock": "弹层自定义样式",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层自定义样式类",
          "docblock": "弹层自定义样式类"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层属性透传",
          "docblock": "弹层属性透传",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "defaultSelectedKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "默认激活的菜单项（用法同 Menu 非受控）",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "默认激活的菜单项（用法同 Menu 非受控）"
        },
        "selectedKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "激活的菜单项（用法同 Menu 受控）",
          "docblock": "激活的菜单项（用法同 Menu 受控）"
        },
        "selectMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "菜单的选择模式，同 Menu",
          "docblock": "菜单的选择模式，同 Menu"
        },
        "onItemClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击菜单项后的回调，同 Menu",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "点击菜单项后的回调，同 Menu",
          "params": [],
          "returns": null
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选择菜单后的回调，同 Menu",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "选择菜单后的回调，同 Menu",
          "params": [],
          "returns": null
        },
        "menuProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "菜单属性透传",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "菜单属性透传",
          "properties": []
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Message",
      "title": "信息",
      "typeId": 5,
      "props": {
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'success'",
              "computed": false
            },
              {
                "value": "'warning'",
                "computed": false
              },
              {
                "value": "'error'",
                "computed": false
              },
              {
                "value": "'notice'",
                "computed": false
              },
              {
                "value": "'help'",
                "computed": false
              },
              {
                "value": "'loading'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "反馈类型",
          "defaultValue": {
            "value": "'success'",
            "computed": false
          },
          "docblock": "反馈类型"
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'inline'",
              "computed": false
            },
              {
                "value": "'addon'",
                "computed": false
              },
              {
                "value": "'toast'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "反馈外观",
          "defaultValue": {
            "value": "'inline'",
            "computed": false
          },
          "docblock": "反馈外观"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'medium'",
              "computed": false
            },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "反馈大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "反馈大小"
        },
        "title": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "标题",
          "docblock": "标题"
        },
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "内容",
          "docblock": "内容"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "默认是否显示",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "默认是否显示"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当前是否显示",
          "docblock": "当前是否显示"
        },
        "iconType": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "显示的图标类型，会覆盖内部设置的IconType",
          "docblock": "显示的图标类型，会覆盖内部设置的IconType"
        },
        "closeable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "显示关闭按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "显示关闭按钮"
        },
        "onClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "关闭按钮的回调",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "关闭按钮的回调",
          "params": [],
          "returns": null
        },
        "afterClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "关闭之后调用的函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "关闭之后调用的函数",
          "params": [],
          "returns": null
        },
        "animation": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启展开收起动画",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否开启展开收起动画"
        }
      },
      "methods": [{
        "name": "show",
        "docblock": "\n  创建提示弹层\n  @exportName show\n  @param {Object} props 属性对象\n ",
        "description": "创建提示弹层",
        "modifiers": [
          "static"
        ],
        "params": [{
          "name": "props",
          "description": "属性对象",
          "type": {
            "type": "NameExpression",
            "name": "Object"
          }
        }],
        "returns": null
      },
        {
          "name": "hide",
          "docblock": "\n  关闭提示弹层\n  @exportName hide\n ",
          "description": "关闭提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [],
          "returns": null
        },
        {
          "name": "success",
          "docblock": "\n  创建成功提示弹层\n  @exportName success\n  @param {Object} props 属性对象\n ",
          "description": "创建成功提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "属性对象",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": null
        },
        {
          "name": "warning",
          "docblock": "\n  创建警告提示弹层\n  @exportName warning\n  @param {Object} props 属性对象\n ",
          "description": "创建警告提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "属性对象",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": null
        },
        {
          "name": "error",
          "docblock": "\n  创建错误提示弹层\n  @exportName error\n  @param {Object} props 属性对象\n ",
          "description": "创建错误提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "属性对象",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": null
        },
        {
          "name": "help",
          "docblock": "\n  创建帮助提示弹层\n  @exportName help\n  @param {Object} props 属性对象\n ",
          "description": "创建帮助提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "属性对象",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": null
        },
        {
          "name": "loading",
          "docblock": "\n  创建加载中提示弹层\n  @exportName loading\n  @param {Object} props 属性对象\n ",
          "description": "创建加载中提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "属性对象",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": null
        },
        {
          "name": "notice",
          "docblock": "\n  创建通知提示弹层\n  @exportName notice\n  @param {Object} props 属性对象\n ",
          "description": "创建通知提示弹层",
          "modifiers": [
            "static"
          ],
          "params": [{
            "name": "props",
            "description": "属性对象",
            "type": {
              "type": "NameExpression",
              "name": "Object"
            }
          }],
          "returns": null
        }
      ],
      "subComponents": []
    },
    {
      "name": "Nav",
      "title": "导航",
      "typeId": 2,
      "props": {
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "导航项和子导航",
          "docblock": "导航项和子导航"
        },
        "onItemClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击菜单项触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击菜单项触发的回调函数\n@param {String} key 点击的菜单项的 key 值\n@param {Object} item 点击的菜单项对象\n@param {Object} event 点击的事件对象",
          "params": [{
            "name": "key",
            "description": "点击的菜单项的 key 值",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "item",
              "description": "点击的菜单项对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "event",
              "description": "点击的事件对象",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "openKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "当前打开的子菜单的 key 值",
          "docblock": "当前打开的子菜单的 key 值"
        },
        "defaultOpenKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "初始打开的子菜单的 key 值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "初始打开的子菜单的 key 值"
        },
        "defaultOpenAll": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "初始展开所有的子导航，只在 mode 设置为 'inline' 以及 openMode 设置为 'multiple' 下生效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "初始展开所有的子导航，只在 mode 设置为 'inline' 以及 openMode 设置为 'multiple' 下生效"
        },
        "onOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "打开或关闭子菜单触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "打开或关闭子菜单触发的回调函数\n@param {String} key 打开的所有子菜单的 key 值\n@param {Object} extra 额外参数\n@param {String} extra.key 当前操作子菜单的 key 值\n@param {Boolean} extra.open 是否是打开",
          "params": [{
            "name": "key",
            "description": "打开的所有子菜单的 key 值",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.key",
              "description": "当前操作子菜单的 key 值",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "extra.open",
              "description": "是否是打开",
              "type": {
                "name": "Boolean"
              }
            }
          ],
          "returns": null
        },
        "mode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'inline'",
              "computed": false
            },
              {
                "value": "'popup'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "子导航打开的模式（水平导航只支持弹出）",
          "defaultValue": {
            "value": "'inline'",
            "computed": false
          },
          "docblock": "子导航打开的模式（水平导航只支持弹出）\n@eumdesc 行内, 弹出"
        },
        "triggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "子导航打开的触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "子导航打开的触发方式"
        },
        "openMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "内联子导航的展开模式，同时可以展开一个同级子导航还是多个同级子导航，该属性仅在 mode 为 inline 时生效",
          "defaultValue": {
            "value": "'multiple'",
            "computed": false
          },
          "docblock": "内联子导航的展开模式，同时可以展开一个同级子导航还是多个同级子导航，该属性仅在 mode 为 inline 时生效\n@eumdesc 一个, 多个"
        },
        "inlineIndent": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "内联子导航缩进距离",
          "defaultValue": {
            "value": "20",
            "computed": false
          },
          "docblock": "内联子导航缩进距离"
        },
        "popupAutoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动让弹层的宽度和菜单项保持一致，如果弹层的宽度比菜单项小则和菜单项保持一致，如果宽度大于菜单项则不做处理",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否自动让弹层的宽度和菜单项保持一致，如果弹层的宽度比菜单项小则和菜单项保持一致，如果宽度大于菜单项则不做处理"
        },
        "popupAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'follow'",
              "computed": false
            },
              {
                "value": "'outside'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "弹出子导航的对齐方式（水平导航只支持 follow ）",
          "defaultValue": {
            "value": "'follow'",
            "computed": false
          },
          "docblock": "弹出子导航的对齐方式（水平导航只支持 follow ）\n@eumdesc Item 顶端对齐, Nav 顶端对齐"
        },
        "popupProps": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "弹层自定义 props",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "弹层自定义 props"
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹出子导航的自定义类名",
          "docblock": "弹出子导航的自定义类名"
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹出子菜单自定义 style",
          "docblock": "弹出子菜单自定义 style",
          "properties": []
        },
        "selectedKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "当前选中导航项的 key 值",
          "docblock": "当前选中导航项的 key 值"
        },
        "defaultSelectedKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "array"
              }
            ]
          },
          "required": false,
          "description": "初始选中导航项的 key 值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "初始选中导航项的 key 值"
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选中或取消选中导航项触发的回调函数",
          "docblock": "选中或取消选中导航项触发的回调函数\n@param {Array} selectedKeys 选中的所有导航项的 key\n@param {Object} item 选中或取消选中的导航项\n@param {Object} extra 额外参数\n@param {Boolean} extra.select 是否是选中\n@param {Array} extra.key 导航项的 key\n@param {Object} extra.label 导航项的文本\n@param {Array} extra.keyPath 导航项 key 的路径",
          "params": [{
            "name": "selectedKeys",
            "description": "选中的所有导航项的 key",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "item",
              "description": "选中或取消选中的导航项",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.select",
              "description": "是否是选中",
              "type": {
                "name": "Boolean"
              }
            },
            {
              "name": "extra.key",
              "description": "导航项的 key",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.label",
              "description": "导航项的文本",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.keyPath",
              "description": "导航项 key 的路径",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "selectMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选中模式，单选还是多选，默认无值，不可选",
          "docblock": "选中模式，单选还是多选，默认无值，不可选"
        },
        "shallowSelect": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只能选择第一层菜单项（不能选择子菜单中的菜单项）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否只能选择第一层菜单项（不能选择子菜单中的菜单项）"
        },
        "hasSelectedIcon": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示选中图标，如果设置为 false 需配合配置平台设置选中时的背景色以示区分",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示选中图标，如果设置为 false 需配合配置平台设置选中时的背景色以示区分"
        },
        "isSelectIconRight": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否将选中图标居右，仅当 hasSelectedIcon 为true 时生效。\n注意：SubMenu 上的选中图标一直居左，不受此API控制",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否将选中图标居右，仅当 hasSelectedIcon 为true 时生效。\n注意：SubMenu 上的选中图标一直居左，不受此API控制"
        },
        "direction": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hoz'",
              "computed": false,
              "description": "水平"
            },
              {
                "value": "'ver'",
                "computed": false,
                "description": "垂直"
              }
            ]
          },
          "required": false,
          "description": "导航布局",
          "defaultValue": {
            "value": "'ver'",
            "computed": false
          },
          "docblock": "导航布局\n@enumdesc 水平, 垂直",
          "value": [{
            "value": "'hoz'",
            "computed": false,
            "description": "水平"
          },
            {
              "value": "'ver'",
              "computed": false,
              "description": "垂直"
            }
          ]
        },
        "hozAlign": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'left'",
              "computed": false
            },
              {
                "value": "'right'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "横向导航条 items 和 footer 的对齐方向，在 direction 设置为 'hoz' 并且 header 存在时生效",
          "defaultValue": {
            "value": "'left'",
            "computed": false
          },
          "docblock": "横向导航条 items 和 footer 的对齐方向，在 direction 设置为 'hoz' 并且 header 存在时生效"
        },
        "hozInLine": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "横向菜单模式下，是否维持在一行，即超出一行折叠成 SubMenu 显示， 仅在 direction='hoz' mode='popup' 时生效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "横向菜单模式下，是否维持在一行，即超出一行折叠成 SubMenu 显示， 仅在 direction='hoz' mode='popup' 时生效"
        },
        "header": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义导航头部",
          "docblock": "自定义导航头部"
        },
        "footer": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义导航尾部",
          "docblock": "自定义导航尾部"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动获得焦点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否自动获得焦点"
        },
        "focusedKey": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "当前获得焦点的子菜单或菜单项 key 值",
          "docblock": "当前获得焦点的子菜单或菜单项 key 值"
        },
        "embeddable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启嵌入式模式，一般用于Layout的布局中，开启后没有默认背景、外层border、box-shadow，可以配合`<Nav style={{lineHeight: '100px'}}>` 自定义高度",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否开启嵌入式模式，一般用于Layout的布局中，开启后没有默认背景、外层border、box-shadow，可以配合`<Nav style={{lineHeight: '100px'}}>` 自定义高度"
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false,
              "description": "普通"
            },
              {
                "value": "'primary'",
                "computed": false,
                "description": "主要"
              },
              {
                "value": "'secondary'",
                "computed": false,
                "description": "次要"
              },
              {
                "value": "'line'",
                "computed": false,
                "description": "线形"
              }
            ]
          },
          "required": false,
          "description": "导航类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "导航类型\n@enumdesc 普通, 主要, 次要, 线形",
          "value": [{
            "value": "'normal'",
            "computed": false,
            "description": "普通"
          },
            {
              "value": "'primary'",
              "computed": false,
              "description": "主要"
            },
            {
              "value": "'secondary'",
              "computed": false,
              "description": "次要"
            },
            {
              "value": "'line'",
              "computed": false,
              "description": "线形"
            }
          ]
        },
        "activeDirection": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "null",
              "computed": false,
              "description": "无"
            },
              {
                "value": "'top'",
                "computed": false,
                "description": "上"
              },
              {
                "value": "'bottom'",
                "computed": false,
                "description": "下"
              },
              {
                "value": "'left'",
                "computed": false,
                "description": "左"
              },
              {
                "value": "'right'",
                "computed": false,
                "description": "右"
              }
            ]
          },
          "required": false,
          "description": "设置组件选中状态的 active 边方向",
          "docblock": "设置组件选中状态的 active 边方向\n@enumdesc 无, 上, 下, 左, 右\n@default 当 direction 为 'hoz' 时，默认值为 'bottom'，当 direction 为 'ver' 时，默认值为 'left'",
          "value": [{
            "value": "null",
            "computed": false,
            "description": "无"
          },
            {
              "value": "'top'",
              "computed": false,
              "description": "上"
            },
            {
              "value": "'bottom'",
              "computed": false,
              "description": "下"
            },
            {
              "value": "'left'",
              "computed": false,
              "description": "左"
            },
            {
              "value": "'right'",
              "computed": false,
              "description": "右"
            }
          ],
          "defaultValue": {
            "value": "当 direction 为 'hoz' 时，默认值为 'bottom'，当 direction 为 'ver' 时，默认值为 'left'",
            "computed": false
          }
        },
        "iconOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只显示图标",
          "docblock": "是否只显示图标"
        },
        "hasArrow": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示右侧的箭头（仅在 iconOnly=true 时生效）",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示右侧的箭头（仅在 iconOnly=true 时生效）"
        },
        "hasTooltip": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有 ToolTips （仅在 iconOnly=true 时生效）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否有 ToolTips （仅在 iconOnly=true 时生效）"
        }
      },
      "methods": [],
      "description": "继承自 `Menu` 的能力请查看 `Menu` 文档",
      "subComponents": [{
        "name": "Group",
        "title": "导航组",
        "props": {
          "label": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "标签内容",
            "docblock": "标签内容"
          },
          "children": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "导航项和子导航",
            "docblock": "导航项和子导航"
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义类名",
            "docblock": "自定义类名"
          }
        },
        "methods": [],
        "description": "继承自 `Menu.Group` 的能力请查看 `Menu.Group` 文档"
      },
        {
          "name": "Item",
          "title": "导航项",
          "props": {
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否禁用"
            },
            "helper": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "帮助文本",
              "docblock": "帮助文本"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "导航内容",
              "docblock": "导航内容"
            },
            "icon": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "node"
                  }
                ]
              },
              "required": false,
              "description": "自定义图标，可以使用 Icon 的 type，也可以使用组件 `<Icon type=\"icon type\" />`",
              "docblock": "自定义图标，可以使用 Icon 的 type，也可以使用组件 `<Icon type=\"icon type\" />`"
            }
          },
          "methods": [],
          "description": "继承自 `Menu.Item` 的能力请查看 `Menu.Item` 文档"
        },
        {
          "name": "PopupItem",
          "title": "导航弹出项",
          "props": {
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "弹出内容",
              "docblock": "弹出内容"
            },
            "className": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "自定义类名",
              "docblock": "自定义类名"
            },
            "icon": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "node"
                  }
                ]
              },
              "required": false,
              "description": "自定义图标，可以使用 Icon 的 type, 也可以使用组件 `<Icon type=\"icon type\" />`",
              "docblock": "自定义图标，可以使用 Icon 的 type, 也可以使用组件 `<Icon type=\"icon type\" />`"
            }
          },
          "methods": [],
          "description": "继承自 `Menu.PopupItem` 的能力请查看 `Menu.PopupItem` 文档"
        },
        {
          "name": "SubNav",
          "title": "子导航",
          "props": {
            "className": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "自定义类名",
              "docblock": "自定义类名"
            },
            "icon": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "string"
                },
                  {
                    "name": "node"
                  }
                ]
              },
              "required": false,
              "description": "自定义图标，可以使用 Icon 的 type，也可以使用组件 `<Icon type=\"your type\" />`",
              "docblock": "自定义图标，可以使用 Icon 的 type，也可以使用组件 `<Icon type=\"your type\" />`"
            },
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "标签内容",
              "docblock": "标签内容"
            },
            "selectable": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否可选",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否可选"
            },
            "children": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "导航项和子导航",
              "docblock": "导航项和子导航"
            }
          },
          "methods": [],
          "description": "继承自 `Menu.SubMenu` 的能力请查看 `Menu.SubMenu` 文档"
        }
      ]
    },
    {
      "name": "NumberPicker",
      "title": "数字输入框",
      "typeId": 3,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式前缀"
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false,
              "description": "普通"
            },
              {
                "value": "'inline'",
                "computed": false,
                "description": "内联"
              }
            ]
          },
          "required": false,
          "description": "设置类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "设置类型\n@enumdesc 普通, 内联",
          "value": [{
            "value": "'normal'",
            "computed": false,
            "description": "普通"
          },
            {
              "value": "'inline'",
              "computed": false,
              "description": "内联"
            }
          ]
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'large'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "大小"
        },
        "value": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "当前值",
          "docblock": "当前值"
        },
        "defaultValue": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "默认值",
          "docblock": "默认值"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "docblock": "是否禁用"
        },
        "step": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "步长",
          "defaultValue": {
            "value": "1",
            "computed": false
          },
          "docblock": "步长"
        },
        "precision": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "保留小数点后位数",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "保留小数点后位数"
        },
        "editable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "用户是否可以输入",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "用户是否可以输入"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "自动焦点",
          "docblock": "自动焦点"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "数值被改变的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "数值被改变的事件\n@param {Number} value 数据\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "value",
            "description": "数据",
            "type": {
              "name": "Number"
            }
          },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onKeyDown": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "键盘按下",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "键盘按下",
          "params": [],
          "returns": null
        },
        "onFocus": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "焦点获得",
          "docblock": "焦点获得",
          "params": [],
          "returns": null
        },
        "onBlur": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "焦点失去",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "焦点失去",
          "params": [],
          "returns": null
        },
        "onCorrect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "数值订正后的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "数值订正后的回调\n@param {Object} obj {currentValue,oldValue:String}",
          "params": [{
            "name": "obj",
            "description": "{currentValue,oldValue:String}",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "max": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最大值",
          "defaultValue": {
            "value": "Infinity",
            "computed": true
          },
          "docblock": "最大值"
        },
        "min": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最小值",
          "defaultValue": {
            "value": "-Infinity",
            "computed": false
          },
          "docblock": "最小值"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义class",
          "docblock": "自定义class"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内联样式",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "自定义内联样式",
          "properties": []
        },
        "format": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "格式化当前值",
          "docblock": "格式化当前值\n@param {Number} value\n@return {String|Number}",
          "params": [{
            "name": "value",
            "description": null,
            "type": {
              "name": "Number"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "union",
              "value": [
                "String",
                "Number"
              ]
            }
          }
        },
        "upBtnProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "增加按钮的props",
          "docblock": "增加按钮的props",
          "properties": []
        },
        "downBtnProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "减少按钮的props",
          "docblock": "减少按钮的props",
          "properties": []
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "内联 label",
          "docblock": "内联 label"
        },
        "innerAfter": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "inner after",
          "docblock": "inner after"
        }
      },
      "methods": [{
        "name": "hackChrome",
        "docblock": "fix bug in chrome browser\n0.28 + 0.01 = 0.29000000000000004\n0.29 - 0.01 = 0.27999999999999997\n@param {Number} value value",
        "modifiers": [],
        "params": [{
          "name": "value",
          "description": "value",
          "type": {
            "name": "Number"
          }
        }],
        "returns": null,
        "description": "fix bug in chrome browser\n0.28 + 0.01 = 0.29000000000000004\n0.29 - 0.01 = 0.27999999999999997"
      }],
      "subComponents": []
    },
    {
      "name": "Overlay",
      "title": "弹层",
      "typeId": 6,
      "props": {
        "children": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "弹层内容",
          "docblock": "弹层内容"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示弹层",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示弹层"
        },
        "onRequestClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层请求关闭时触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层请求关闭时触发事件的回调函数\n@param {String} type 弹层关闭的来源\n@param {Object} e DOM 事件",
          "params": [{
            "name": "type",
            "description": "弹层关闭的来源",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "e",
              "description": "DOM 事件",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "target": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "弹层定位的参照元素",
          "defaultValue": {
            "value": "Position.VIEWPORT",
            "computed": true
          },
          "docblock": "弹层定位的参照元素"
        },
        "align": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "弹层相对于参照元素的定位, 详见开发指南的[定位部分](#定位)",
          "defaultValue": {
            "value": "'tl bl'",
            "computed": false
          },
          "docblock": "弹层相对于参照元素的定位, 详见开发指南的[定位部分](#定位)"
        },
        "offset": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px",
          "defaultValue": {
            "value": "[0, 0]",
            "computed": false
          },
          "docblock": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px"
        },
        "container": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点",
          "docblock": "渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点"
        },
        "hasMask": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示遮罩",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示遮罩"
        },
        "canCloseByEsc": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持 esc 按键关闭弹层",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否支持 esc 按键关闭弹层"
        },
        "canCloseByOutSideClick": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "点击弹层外的区域是否关闭弹层，不显示遮罩时生效",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "点击弹层外的区域是否关闭弹层，不显示遮罩时生效"
        },
        "canCloseByMask": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "点击遮罩区域是否关闭弹层，显示遮罩时生效",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "点击遮罩区域是否关闭弹层，显示遮罩时生效"
        },
        "beforeOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层打开前触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层打开前触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "onOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层打开时触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层打开时触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "afterOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层打开后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层打开后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "params": [],
          "returns": null
        },
        "beforeClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层关闭前触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层关闭前触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "onClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层关闭时触发事件的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层关闭时触发事件的回调函数",
          "params": [],
          "returns": null
        },
        "afterClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层关闭后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层关闭后触发事件的回调函数, 如果有动画，则在动画结束后触发",
          "params": [],
          "returns": null
        },
        "beforePosition": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层定位完成前触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层定位完成前触发的事件",
          "params": [],
          "returns": null
        },
        "onPosition": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层定位完成时触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层定位完成时触发的事件\n@param {Object} config 定位的参数\n@param {Array} config.align 对齐方式，如 ['cc', 'cc']（如果开启 needAdjust，可能和预先设置的 align 不同）\n@param {Number} config.top 距离视口顶部距离\n@param {Number} config.left 距离视口左侧距离\n@param {Object} node 定位参照的容器节点",
          "params": [{
            "name": "config",
            "description": "定位的参数",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "config.align",
              "description": "对齐方式，如 ['cc', 'cc']（如果开启 needAdjust，可能和预先设置的 align 不同）",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "config.top",
              "description": "距离视口顶部距离",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "config.left",
              "description": "距离视口左侧距离",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "node",
              "description": "定位参照的容器节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "shouldUpdatePosition": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否在每次弹层重新渲染后强制更新定位信息，一般用于弹层内容区域大小发生变化时，仍需保持原来的定位方式",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否在每次弹层重新渲染后强制更新定位信息，一般用于弹层内容区域大小发生变化时，仍需保持原来的定位方式"
        },
        "autoFocus": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层打开时是否让其中的元素自动获取焦点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "弹层打开时是否让其中的元素自动获取焦点"
        },
        "needAdjust": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当弹层由于页面滚动等情况不在可视区域时，是否自动调整定位以出现在可视区域",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "当弹层由于页面滚动等情况不在可视区域时，是否自动调整定位以出现在可视区域"
        },
        "disableScroll": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用页面滚动",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用页面滚动"
        },
        "cache": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "隐藏时是否保留子节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "隐藏时是否保留子节点"
        },
        "safeNode": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "安全节点，当点击 document 的时候，如果包含该节点则不会关闭弹层，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点，或者以上值组成的数组",
          "docblock": "安全节点，当点击 document 的时候，如果包含该节点则不会关闭弹层，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点，或者以上值组成的数组"
        },
        "wrapperClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层的根节点的样式类",
          "docblock": "弹层的根节点的样式类"
        },
        "wrapperStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层的根节点的内联样式",
          "docblock": "弹层的根节点的内联样式",
          "properties": []
        },
        "animation": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "配置动画的播放方式，支持 { in: 'enter-class', out: 'leave-class' } 的对象参数，如果设置为 false，则不播放动画。 请参考 Animate 组件的文档获取可用的动画名",
          "docblock": "配置动画的播放方式，支持 { in: 'enter-class', out: 'leave-class' } 的对象参数，如果设置为 false，则不播放动画。 请参考 Animate 组件的文档获取可用的动画名\n@default { in: 'expandInDown', out: 'expandOutUp' }",
          "defaultValue": {
            "value": "{ in: 'expandInDown', out: 'expandOutUp' }",
            "computed": false
          }
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Popup",
        "title": "触发弹层",
        "props": {
          "children": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "弹层内容",
            "docblock": "弹层内容"
          },
          "visible": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "弹层当前是否显示",
            "docblock": "弹层当前是否显示"
          },
          "onRequestClose": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层请求关闭时触发事件的回调函数",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层请求关闭时触发事件的回调函数\n@param {String} type 弹层关闭的来源\n@param {Object} e DOM 事件",
            "params": [{
              "name": "type",
              "description": "弹层关闭的来源",
              "type": {
                "name": "String"
              }
            },
              {
                "name": "e",
                "description": "DOM 事件",
                "type": {
                  "name": "Object"
                }
              }
            ],
            "returns": null
          },
          "target": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "弹层定位的参照元素",
            "docblock": "弹层定位的参照元素\n@default target 属性，即触发元素",
            "defaultValue": {
              "value": "target 属性，即触发元素",
              "computed": false
            }
          },
          "align": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "bool"
                }
              ]
            },
            "required": false,
            "description": "弹层相对于参照元素的定位, 详见开发指南的[定位部分](#定位)",
            "defaultValue": {
              "value": "'tl bl'",
              "computed": false
            },
            "docblock": "弹层相对于参照元素的定位, 详见开发指南的[定位部分](#定位)"
          },
          "offset": {
            "type": {
              "name": "array"
            },
            "required": false,
            "description": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px",
            "defaultValue": {
              "value": "[0, 0]",
              "computed": false
            },
            "docblock": "弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量\ne.g. [100, 100] 表示往右(RTL 模式下是往左) 、下分布偏移100px"
          },
          "container": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点",
            "docblock": "渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点"
          },
          "hasMask": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否显示遮罩",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否显示遮罩"
          },
          "canCloseByEsc": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否支持 esc 按键关闭弹层",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "是否支持 esc 按键关闭弹层"
          },
          "canCloseByOutSideClick": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "点击弹层外的区域是否关闭弹层，不显示遮罩时生效",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "点击弹层外的区域是否关闭弹层，不显示遮罩时生效"
          },
          "canCloseByMask": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "点击遮罩区域是否关闭弹层，显示遮罩时生效",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "点击遮罩区域是否关闭弹层，显示遮罩时生效"
          },
          "beforeOpen": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层打开前触发事件的回调函数",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层打开前触发事件的回调函数",
            "params": [],
            "returns": null
          },
          "onOpen": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层打开时触发事件的回调函数",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层打开时触发事件的回调函数",
            "params": [],
            "returns": null
          },
          "afterOpen": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层打开后触发事件的回调函数, 如果有动画，则在动画结束后触发",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层打开后触发事件的回调函数, 如果有动画，则在动画结束后触发",
            "params": [],
            "returns": null
          },
          "beforeClose": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层关闭前触发事件的回调函数",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层关闭前触发事件的回调函数",
            "params": [],
            "returns": null
          },
          "onClose": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层关闭时触发事件的回调函数",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层关闭时触发事件的回调函数",
            "params": [],
            "returns": null
          },
          "afterClose": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层关闭后触发事件的回调函数, 如果有动画，则在动画结束后触发",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层关闭后触发事件的回调函数, 如果有动画，则在动画结束后触发",
            "params": [],
            "returns": null
          },
          "beforePosition": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层定位完成前触发的事件",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层定位完成前触发的事件",
            "params": [],
            "returns": null
          },
          "onPosition": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层定位完成时触发的事件",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层定位完成时触发的事件\n@param {Object} config 定位的参数\n@param {Array} config.align 对齐方式，如 ['cc', 'cc']（如果开启 needAdjust，可能和预先设置的 align 不同）\n@param {Number} config.top 距离视口顶部距离\n@param {Number} config.left 距离视口左侧距离\n@param {Object} node 定位参照的容器节点",
            "params": [{
              "name": "config",
              "description": "定位的参数",
              "type": {
                "name": "Object"
              }
            },
              {
                "name": "config.align",
                "description": "对齐方式，如 ['cc', 'cc']（如果开启 needAdjust，可能和预先设置的 align 不同）",
                "type": {
                  "name": "Array"
                }
              },
              {
                "name": "config.top",
                "description": "距离视口顶部距离",
                "type": {
                  "name": "Number"
                }
              },
              {
                "name": "config.left",
                "description": "距离视口左侧距离",
                "type": {
                  "name": "Number"
                }
              },
              {
                "name": "node",
                "description": "定位参照的容器节点",
                "type": {
                  "name": "Object"
                }
              }
            ],
            "returns": null
          },
          "shouldUpdatePosition": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否在每次弹层重新渲染后强制更新定位信息，一般用于弹层内容区域大小发生变化时，仍需保持原来的定位方式",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否在每次弹层重新渲染后强制更新定位信息，一般用于弹层内容区域大小发生变化时，仍需保持原来的定位方式"
          },
          "autoFocus": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "弹层打开时是否让其中的元素自动获取焦点",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "弹层打开时是否让其中的元素自动获取焦点"
          },
          "needAdjust": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "当弹层由于页面滚动等情况不在可视区域时，是否自动调整定位以出现在可视区域",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "当弹层由于页面滚动等情况不在可视区域时，是否自动调整定位以出现在可视区域"
          },
          "disableScroll": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁用页面滚动",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否禁用页面滚动"
          },
          "cache": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "隐藏时是否保留子节点",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "隐藏时是否保留子节点"
          },
          "safeNode": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "安全节点，当点击 document 的时候，如果包含该节点则不会关闭弹层，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点，或者以上值组成的数组",
            "docblock": "安全节点，当点击 document 的时候，如果包含该节点则不会关闭弹层，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点，或者以上值组成的数组"
          },
          "wrapperClassName": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "弹层的根节点的样式类",
            "docblock": "弹层的根节点的样式类"
          },
          "wrapperStyle": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "弹层的根节点的内联样式",
            "docblock": "弹层的根节点的内联样式",
            "properties": []
          },
          "animation": {
            "type": {
              "name": "union",
              "value": [{
                "name": "object"
              },
                {
                  "name": "bool"
                }
              ]
            },
            "required": false,
            "description": "配置动画的播放方式，支持 { in: 'enter-class', out: 'leave-class' } 的对象参数，如果设置为 false，则不播放动画。 请参考 Animate 组件的文档获取可用的动画名",
            "docblock": "配置动画的播放方式，支持 { in: 'enter-class', out: 'leave-class' } 的对象参数，如果设置为 false，则不播放动画。 请参考 Animate 组件的文档获取可用的动画名\n@default { in: 'expandInDown', out: 'expandOutUp' }",
            "defaultValue": {
              "value": "{ in: 'expandInDown', out: 'expandOutUp' }",
              "computed": false
            }
          },
          "trigger": {
            "type": {
              "name": "element"
            },
            "required": false,
            "description": "触发弹层显示或隐藏的元素",
            "docblock": "触发弹层显示或隐藏的元素"
          },
          "triggerType": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "触发弹层显示或隐藏的操作类型，可以是 'click'，'hover'，'focus'，或者它们组成的数组，如 ['hover', 'focus']",
            "defaultValue": {
              "value": "'hover'",
              "computed": false
            },
            "docblock": "触发弹层显示或隐藏的操作类型，可以是 'click'，'hover'，'focus'，或者它们组成的数组，如 ['hover', 'focus']"
          },
          "triggerClickKeycode": {
            "type": {
              "name": "union",
              "value": [{
                "name": "number"
              },
                {
                  "name": "array"
                }
              ]
            },
            "required": false,
            "description": "当 triggerType 为 click 时才生效，可自定义触发弹层显示的键盘码",
            "defaultValue": {
              "value": "[KEYCODE.SPACE, KEYCODE.ENTER]",
              "computed": false
            },
            "docblock": "当 triggerType 为 click 时才生效，可自定义触发弹层显示的键盘码"
          },
          "defaultVisible": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "弹层默认是否显示",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "弹层默认是否显示"
          },
          "onVisibleChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层显示或隐藏时触发的回调函数",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层显示或隐藏时触发的回调函数\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发\n@param {Object} e DOM事件",
            "params": [{
              "name": "visible",
              "description": "弹层是否显示",
              "type": {
                "name": "Boolean"
              }
            },
              {
                "name": "type",
                "description": "触发弹层显示或隐藏的来源 fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
                "type": {
                  "name": "String"
                }
              },
              {
                "name": "e",
                "description": "DOM事件",
                "type": {
                  "name": "Object"
                }
              }
            ],
            "returns": null
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "设置此属性，弹层无法显示或隐藏",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "设置此属性，弹层无法显示或隐藏"
          },
          "delay": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "弹层显示或隐藏的延时时间（以毫秒为单位），在 triggerType 被设置为 hover 时生效",
            "defaultValue": {
              "value": "200",
              "computed": false
            },
            "docblock": "弹层显示或隐藏的延时时间（以毫秒为单位），在 triggerType 被设置为 hover 时生效"
          },
          "canCloseByTrigger": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "trigger 是否可以关闭弹层",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "trigger 是否可以关闭弹层"
          },
          "followTrigger": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否跟随trigger滚动",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否跟随trigger滚动"
          }
        },
        "methods": [],
        "description": "继承 Overlay 的 API，除非特别说明"
      }]
    },
    {
      "name": "Pagination",
      "title": "翻页器",
      "typeId": 2,
      "props": {
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义国际化文案对象",
          "defaultValue": {
            "value": "zhCN.Pagination",
            "computed": true
          },
          "docblock": "自定义国际化文案对象",
          "properties": []
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'simple'",
                "computed": false
              },
              {
                "value": "'mini'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "分页组件类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "分页组件类型"
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'arrow-only'",
                "computed": false
              },
              {
                "value": "'arrow-prev-only'",
                "computed": false
              },
              {
                "value": "'no-border'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "前进后退按钮样式",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "前进后退按钮样式"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "分页组件大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "分页组件大小"
        },
        "current": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "（受控）当前页码",
          "docblock": "（受控）当前页码"
        },
        "defaultCurrent": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "（非受控）初始页码",
          "defaultValue": {
            "value": "1",
            "computed": false
          },
          "docblock": "（非受控）初始页码"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "页码发生改变时的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "页码发生改变时的回调函数\n@param {Number} current 改变后的页码数\n@param {Object} e 点击事件对象",
          "params": [{
            "name": "current",
            "description": "改变后的页码数",
            "type": {
              "name": "Number"
            }
          },
            {
              "name": "e",
              "description": "点击事件对象",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "total": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "总记录数",
          "defaultValue": {
            "value": "100",
            "computed": false
          },
          "docblock": "总记录数"
        },
        "totalRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "总数的渲染函数",
          "docblock": "总数的渲染函数\n@param {Number} total 总数\n@param {Array} range 当前数据在总数中的区间",
          "params": [{
            "name": "total",
            "description": "总数",
            "type": {
              "name": "Number"
            }
          },
            {
              "name": "range",
              "description": "当前数据在总数中的区间",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "pageShowCount": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "页码显示的数量，更多的使用...代替",
          "defaultValue": {
            "value": "5",
            "computed": false
          },
          "docblock": "页码显示的数量，更多的使用...代替"
        },
        "pageSize": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "一页中的记录数",
          "defaultValue": {
            "value": "10",
            "computed": false
          },
          "docblock": "一页中的记录数"
        },
        "pageSizeSelector": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "false",
              "computed": false
            },
              {
                "value": "'filter'",
                "computed": false
              },
              {
                "value": "'dropdown'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "每页显示选择器类型",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "每页显示选择器类型"
        },
        "pageSizeList": {
          "type": {
            "name": "union",
            "value": [{
              "name": "arrayOf",
              "value": {
                "name": "number"
              }
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "shape",
                  "value": {
                    "label": {
                      "name": "string",
                      "required": false
                    },
                    "value": {
                      "name": "number",
                      "required": false
                    }
                  }
                }
              }
            ]
          },
          "required": false,
          "description": "每页显示选择器可选值",
          "defaultValue": {
            "value": "[5, 10, 20]",
            "computed": false
          },
          "docblock": "每页显示选择器可选值"
        },
        "pageNumberRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义页码渲染函数，函数作用于页码button以及当前页/总页数的数字渲染",
          "defaultValue": {
            "value": "index => index",
            "computed": false
          },
          "docblock": "自定义页码渲染函数，函数作用于页码button以及当前页/总页数的数字渲染\n@param {Number} index 分页的页码，从1开始\n@return {ReactNode} 返回渲染结果",
          "params": [{
            "name": "index",
            "description": "分页的页码，从1开始",
            "type": {
              "name": "Number"
            }
          }],
          "returns": {
            "description": "返回渲染结果",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "pageSizePosition": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'start'",
              "computed": false
            },
              {
                "value": "'end'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "每页显示选择器在组件中的位置",
          "defaultValue": {
            "value": "'start'",
            "computed": false
          },
          "docblock": "每页显示选择器在组件中的位置"
        },
        "useFloatLayout": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "存在每页显示选择器时是否使用浮动布局",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "存在每页显示选择器时是否使用浮动布局"
        },
        "onPageSizeChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "每页显示记录数量改变时的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "每页显示记录数量改变时的回调函数\n@param {Number} pageSize 改变后的每页显示记录数",
          "params": [{
            "name": "pageSize",
            "description": "改变后的每页显示记录数",
            "type": {
              "name": "Number"
            }
          }],
          "returns": null
        },
        "hideOnlyOnePage": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当分页数为1时，是否隐藏分页器",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "当分页数为1时，是否隐藏分页器"
        },
        "showJump": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "type 设置为 normal 时，在页码数超过5页后，会显示跳转输入框与按钮，当设置 showJump 为 false 时，不再显示该跳转区域",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "type 设置为 normal 时，在页码数超过5页后，会显示跳转输入框与按钮，当设置 showJump 为 false 时，不再显示该跳转区域"
        },
        "link": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "设置页码按钮的跳转链接，它的值为一个包含 {page} 的模版字符串，如：http://xxx.com/{page}",
          "docblock": "设置页码按钮的跳转链接，它的值为一个包含 {page} 的模版字符串，如：http://xxx.com/{page}"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层组件属性，透传给Popup",
          "docblock": "弹层组件属性，透传给Popup",
          "properties": []
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Paragraph",
      "title": "段落",
      "typeId": 1,
      "props": {
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "额外的样式名 会附加到 root dom 上",
          "docblock": "额外的样式名 会附加到 root dom 上"
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'long'",
              "computed": false,
              "description": "展示所有文本"
            },
              {
                "value": "'short'",
                "computed": false,
                "description": "展示三行以内（非强制）"
              }
            ]
          },
          "required": false,
          "description": "什么方式展示段落",
          "defaultValue": {
            "value": "'long'",
            "computed": false
          },
          "docblock": "什么方式展示段落\n@enumdesc 展示所有文本, 展示三行以内（非强制）",
          "value": [{
            "value": "'long'",
            "computed": false,
            "description": "展示所有文本"
          },
            {
              "value": "'short'",
              "computed": false,
              "description": "展示三行以内（非强制）"
            }
          ]
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'medium'",
              "computed": false,
              "description": "中号"
            },
              {
                "value": "'small'",
                "computed": false,
                "description": "小号"
              }
            ]
          },
          "required": false,
          "description": "组件大小。",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "组件大小。\n@enumdesc 中号, 小号",
          "value": [{
            "value": "'medium'",
            "computed": false,
            "description": "中号"
          },
            {
              "value": "'small'",
              "computed": false,
              "description": "小号"
            }
          ]
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Progress",
      "title": "进度指示器",
      "typeId": 4,
      "props": {
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'circle'",
              "computed": false
            },
              {
                "value": "'line'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "形态",
          "defaultValue": {
            "value": "'line'",
            "computed": false
          },
          "docblock": "形态"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "尺寸"
        },
        "percent": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "所占百分比",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "所占百分比"
        },
        "state": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'success'",
                "computed": false
              },
              {
                "value": "'error'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "进度状态, 显示优先级: color > progressive > state",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "进度状态, 显示优先级: color > progressive > state"
        },
        "progressive": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否为色彩阶段变化模式, 显示优先级: color > progressive > state",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否为色彩阶段变化模式, 显示优先级: color > progressive > state"
        },
        "hasBorder": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否添加 Border（只适用于 Line Progress)",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否添加 Border（只适用于 Line Progress)"
        },
        "textRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "文本渲染函数",
          "defaultValue": {
            "value": "percent => `${Math.floor(percent)}%`",
            "computed": false
          },
          "docblock": "文本渲染函数\n@param {Number} percent 当前的进度信息\n@param {Object} option 额外的参数\n@property {Boolean} option.rtl 是否在rtl 模式下渲染\n@return {ReactNode} 返回文本节点",
          "params": [{
            "name": "percent",
            "description": "当前的进度信息",
            "type": {
              "name": "Number"
            }
          },
            {
              "name": "option",
              "description": "额外的参数",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": {
            "description": "返回文本节点",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "color": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "进度条颜色, 显示优先级: color > progressive > state",
          "docblock": "进度条颜色, 显示优先级: color > progressive > state"
        },
        "backgroundColor": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "背景色",
          "docblock": "背景色"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Radio",
      "title": "单选框",
      "typeId": 3,
      "props": {
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        },
        "id": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "组件input的id",
          "docblock": "组件input的id"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内敛样式",
          "docblock": "自定义内敛样式",
          "properties": []
        },
        "checked": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "设置radio是否选中",
          "docblock": "设置radio是否选中"
        },
        "defaultChecked": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "设置radio是否默认选中",
          "docblock": "设置radio是否默认选中"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "通过属性配置label",
          "docblock": "通过属性配置label"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "状态变化时触发的事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "状态变化时触发的事件\n@param {Boolean} checked 是否选中\n@param {Event} e Dom 事件对象",
          "params": [{
            "name": "checked",
            "description": "是否选中",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "e",
              "description": "Dom 事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onMouseEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "鼠标进入enter事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "鼠标进入enter事件\n@param {Event} e Dom 事件对象",
          "params": [{
            "name": "e",
            "description": "Dom 事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        },
        "onMouseLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "鼠标离开事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "鼠标离开事件\n@param {Event} e Dom 事件对象",
          "params": [{
            "name": "e",
            "description": "Dom 事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "radio是否被禁用",
          "docblock": "radio是否被禁用"
        },
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "number"
              },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "radio 的value",
          "docblock": "radio 的value"
        },
        "name": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "name",
          "docblock": "name"
        }
      },
      "methods": [],
      "order": 1,
      "subComponents": [{
        "name": "Group",
        "title": "单选框组",
        "props": {
          "prefix": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "样式类名的品牌前缀",
            "defaultValue": {
              "value": "'next-'",
              "computed": false
            },
            "docblock": "样式类名的品牌前缀"
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义类名",
            "docblock": "自定义类名"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "自定义内敛样式",
            "docblock": "自定义内敛样式",
            "properties": []
          },
          "name": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "name",
            "docblock": "name"
          },
          "value": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                },
                {
                  "name": "bool"
                }
              ]
            },
            "required": false,
            "description": "radio group的选中项的值",
            "docblock": "radio group的选中项的值"
          },
          "defaultValue": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                },
                {
                  "name": "bool"
                }
              ]
            },
            "required": false,
            "description": "radio group的默认值",
            "docblock": "radio group的默认值"
          },
          "component": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "设置标签类型",
            "defaultValue": {
              "value": "'div'",
              "computed": false
            },
            "docblock": "设置标签类型"
          },
          "onChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "选中值改变时的事件",
            "defaultValue": {
              "value": "() => {}",
              "computed": false
            },
            "docblock": "选中值改变时的事件\n@param {String/Number} value 选中项的值\n@param {Event} e Dom 事件对象",
            "params": [{
              "name": "value",
              "description": "选中项的值",
              "type": {
                "name": "String/Number"
              }
            },
              {
                "name": "e",
                "description": "Dom 事件对象",
                "type": {
                  "name": "Event"
                }
              }
            ],
            "returns": null
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "表示radio被禁用",
            "docblock": "表示radio被禁用"
          },
          "shape": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'button'",
                "computed": false,
                "description": "按钮状"
              }]
            },
            "required": false,
            "description": "可以设置成 button 展示形状",
            "docblock": "可以设置成 button 展示形状\n@enumdesc 按钮状",
            "value": [{
              "value": "'button'",
              "computed": false,
              "description": "按钮状"
            }]
          },
          "size": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'large'",
                "computed": false,
                "description": "大"
              },
                {
                  "value": "'medium'",
                  "computed": false,
                  "description": "中"
                },
                {
                  "value": "'small'",
                  "computed": false,
                  "description": "小"
                }
              ]
            },
            "required": false,
            "description": "与 `shape` 属性配套使用，shape设为button时有效",
            "defaultValue": {
              "value": "'medium'",
              "computed": false
            },
            "docblock": "与 `shape` 属性配套使用，shape设为button时有效\n@enumdesc 大, 中, 小",
            "value": [{
              "value": "'large'",
              "computed": false,
              "description": "大"
            },
              {
                "value": "'medium'",
                "computed": false,
                "description": "中"
              },
              {
                "value": "'small'",
                "computed": false,
                "description": "小"
              }
            ]
          },
          "dataSource": {
            "type": {
              "name": "arrayOf",
              "value": {
                "name": "any"
              }
            },
            "required": false,
            "description": "可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']`",
            "defaultValue": {
              "value": "[]",
              "computed": false
            },
            "docblock": "可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']`"
          },
          "children": {
            "type": {
              "name": "union",
              "value": [{
                "name": "arrayOf",
                "value": {
                  "name": "element"
                }
              },
                {
                  "name": "element"
                }
              ]
            },
            "required": false,
            "description": "通过子元素方式设置内部radio",
            "docblock": "通过子元素方式设置内部radio"
          },
          "itemDirection": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'hoz'",
                "computed": false
              },
                {
                  "value": "'ver'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "子项目的排列方式\n- hoz: 水平排列 (default)\n- ver: 垂直排列",
            "defaultValue": {
              "value": "'hoz'",
              "computed": false
            },
            "docblock": "子项目的排列方式\n- hoz: 水平排列 (default)\n- ver: 垂直排列"
          }
        },
        "methods": [],
        "order": 2
      }]
    },
    {
      "name": "Range",
      "title": "区段选择器",
      "typeId": 3,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式类名的品牌前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式类名的品牌前缀"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内敛样式",
          "docblock": "自定义内敛样式",
          "properties": []
        },
        "slider": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false,
              "description": "单个"
            },
              {
                "value": "'double'",
                "computed": false,
                "description": "两个"
              }
            ]
          },
          "required": false,
          "description": "滑块个数",
          "defaultValue": {
            "value": "'single'",
            "computed": false
          },
          "docblock": "滑块个数\n@enumdesc 单个, 两个",
          "value": [{
            "value": "'single'",
            "computed": false,
            "description": "单个"
          },
            {
              "value": "'double'",
              "computed": false,
              "description": "两个"
            }
          ]
        },
        "min": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最小值",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "最小值"
        },
        "max": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最大值",
          "defaultValue": {
            "value": "100",
            "computed": false
          },
          "docblock": "最大值"
        },
        "step": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "步长，取值必须大于 0，并且可被 (max - min) 整除。",
          "defaultValue": {
            "value": "1",
            "computed": false
          },
          "docblock": "步长，取值必须大于 0，并且可被 (max - min) 整除。"
        },
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "number"
                }
              }
            ]
          },
          "required": false,
          "description": "设置当前取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`",
          "docblock": "设置当前取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`"
        },
        "defaultValue": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "number"
                }
              }
            ]
          },
          "required": false,
          "description": "设置初始取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`",
          "docblock": "设置初始取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`"
        },
        "marks": {
          "type": {
            "name": "union",
            "value": [{
              "name": "bool"
            },
              {
                "name": "number"
              },
              {
                "name": "arrayOf",
                "value": {
                  "name": "number"
                }
              },
              {
                "name": "object"
              }
            ]
          },
          "required": false,
          "description": "刻度数值显示逻辑（false 代表不显示，array 枚举显示的值，number 代表按 number 平分，object 表示按 key 划分，value 值显示）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "刻度数值显示逻辑（false 代表不显示，array 枚举显示的值，number 代表按 number 平分，object 表示按 key 划分，value 值显示）"
        },
        "marksPosition": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'above'",
              "computed": false
            },
              {
                "value": "'below'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "marks显示在上方('above')or下方('below')",
          "defaultValue": {
            "value": "'above'",
            "computed": false
          },
          "docblock": "marks显示在上方('above')or下方('below')"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "值为 `true` 时，滑块为禁用状态",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "值为 `true` 时，滑块为禁用状态"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "当 Range 的值发生改变后，会触发 onChange 事件，并把改变后的值作为参数传入, 如果设置了value, 要配合此函数做受控使用",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "当 Range 的值发生改变后，会触发 onChange 事件，并把改变后的值作为参数传入, 如果设置了value, 要配合此函数做受控使用\n@param {String/number} value",
          "params": [{
            "name": "value",
            "description": null,
            "type": {
              "name": "String/number"
            }
          }],
          "returns": null
        },
        "onProcess": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "滑块拖动的时候触发的事件,不建议在这里setState, 一般情况下不需要用, 滑动时有特殊需求时使用",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "滑块拖动的时候触发的事件,不建议在这里setState, 一般情况下不需要用, 滑动时有特殊需求时使用\n@param {String/number} value",
          "params": [{
            "name": "value",
            "description": null,
            "type": {
              "name": "String/number"
            }
          }],
          "returns": null
        },
        "hasTip": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示 tip",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示 tip"
        },
        "tipRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义 tip 显示内容",
          "defaultValue": {
            "value": "value => value",
            "computed": false
          },
          "docblock": "自定义 tip 显示内容\n@param {Number|String} value 值\n@return {ReactNode} 显示内容",
          "params": [{
            "name": "value",
            "description": "值",
            "type": {
              "name": "union",
              "value": [
                "Number",
                "String"
              ]
            }
          }],
          "returns": {
            "description": "显示内容",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "reverse": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "选中态反转",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "选中态反转"
        },
        "pure": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否pure render",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否pure render"
        },
        "fixedWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否为拖动线段类型,默认slider为double, defaultValue必传且指定区间",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否为拖动线段类型,默认slider为double, defaultValue必传且指定区间"
        },
        "tooltipVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "tooltip是否默认展示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "tooltip是否默认展示"
        },
        "rtl": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否已rtl模式展示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否已rtl模式展示"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Rating",
      "title": "评分",
      "typeId": 3,
      "props": {
        "defaultValue": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "默认值",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "默认值"
        },
        "value": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "值",
          "docblock": "值"
        },
        "count": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "评分的总数",
          "defaultValue": {
            "value": "5",
            "computed": false
          },
          "docblock": "评分的总数"
        },
        "showGrade": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示 grade",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示 grade"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "尺寸"
        },
        "allowHalf": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否允许半星评分",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否允许半星评分"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "用户点击评分时触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "用户点击评分时触发的回调\n@param {String} value 评分值",
          "params": [{
            "name": "value",
            "description": "评分值",
            "type": {
              "name": "String"
            }
          }],
          "returns": null
        },
        "onHoverChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "用户hover评分时触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "用户hover评分时触发的回调\n@param {String} value 评分值",
          "params": [{
            "name": "value",
            "description": "评分值",
            "type": {
              "name": "String"
            }
          }],
          "returns": null
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "readAs": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "评分文案生成方法，传入id支持无障碍时，读屏软件可读",
          "defaultValue": {
            "value": "val => val",
            "computed": false
          },
          "docblock": "评分文案生成方法，传入id支持无障碍时，读屏软件可读",
          "params": [],
          "returns": null
        },
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义国际化文案对象",
          "defaultValue": {
            "value": "zhCN.Rating",
            "computed": true
          },
          "docblock": "自定义国际化文案对象",
          "properties": []
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Search",
      "title": "搜索",
      "typeId": 3,
      "props": {
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'large'",
              "computed": false,
              "description": "'大'"
            },
              {
                "value": "'medium'",
                "computed": false,
                "description": "'小'"
              }
            ]
          },
          "required": false,
          "description": "大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "大小\n@enumdesc '大', '小'",
          "value": [{
            "value": "'large'",
            "computed": false,
            "description": "'大'"
          },
            {
              "value": "'medium'",
              "computed": false,
              "description": "'小'"
            }
          ]
        },
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "number"
              }
            ]
          },
          "required": false,
          "description": "搜索框数值",
          "docblock": "搜索框数值"
        },
        "defaultValue": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "搜索框默认值",
          "docblock": "搜索框默认值"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "默认提示",
          "docblock": "默认提示"
        },
        "autoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "下拉菜单是否与选择器对齐",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "下拉菜单是否与选择器对齐"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义内联 label",
          "docblock": "自定义内联 label"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示清除按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示清除按钮"
        },
        "state": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'error'",
              "computed": false
            },
              {
                "value": "'loading'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "校验状态",
          "docblock": "校验状态"
        },
        "readOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只读，只读模式下可以展开弹层但不能选",
          "docblock": "是否只读，只读模式下可以展开弹层但不能选"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "自定义渲染的的下拉框",
          "docblock": "自定义渲染的的下拉框"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层初始化是否显示",
          "docblock": "弹层初始化是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层显示或隐藏时触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层显示或隐藏时触发的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层是否显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupContainer": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "弹层挂载的容器节点",
          "docblock": "弹层挂载的容器节点"
        },
        "popupClassName": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "弹层的 className",
          "docblock": "弹层的 className"
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层的内联样式",
          "docblock": "弹层的内联样式",
          "properties": []
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "添加到弹层上的属性",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "添加到弹层上的属性",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "popupContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义渲染的的下拉框",
          "docblock": "自定义渲染的的下拉框"
        },
        "filterLocal": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否使用本地过滤，在数据源为远程的时候需要关闭此项",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否使用本地过滤，在数据源为远程的时候需要关闭此项"
        },
        "filter": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "选择器",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "选择器"
        },
        "onToggleHighlightItem": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "键盘上下键切换菜单高亮选项的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "键盘上下键切换菜单高亮选项的回调",
          "params": [],
          "returns": null
        },
        "useVirtual": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启虚拟滚动模式",
          "docblock": "是否开启虚拟滚动模式"
        },
        "dataSource": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "搜索框下拉联想列表",
          "docblock": "搜索框下拉联想列表"
        },
        "itemRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "渲染 MenuItem 内容的方法",
          "docblock": "渲染 MenuItem 内容的方法\n@param {Object} item 渲染节点的 item\n@return {ReactNode} item node",
          "params": [{
            "name": "item",
            "description": "渲染节点的 item",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "item node",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "输入关键字时的回掉",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "输入关键字时的回掉\n@param {Object} value 输入值",
          "params": [{
            "name": "value",
            "description": "输入值",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "fillProps": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "填充到选择框里的值的 key\b\b，默认是 value",
          "defaultValue": {
            "value": "'value'",
            "computed": false
          },
          "docblock": "填充到选择框里的值的 key\b\b，默认是 value"
        },
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式前缀"
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'simple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "形状",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "形状"
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'primary'",
              "computed": false
            },
              {
                "value": "'secondary'",
                "computed": false
              },
              {
                "value": "'normal'",
                "computed": false
              },
              {
                "value": "'dark'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "类型 shape=normal: primary/secondary; shape=simple: normal/dark;",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "类型 shape=normal: primary/secondary; shape=simple: normal/dark;"
        },
        "onSearch": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击搜索按钮触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "点击搜索按钮触发的回调\n@param {Object} value 输入值",
          "params": [{
            "name": "value",
            "description": "输入值",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "defaultFilterValue": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "选择器默认值",
          "docblock": "选择器默认值"
        },
        "filterValue": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "选择器值",
          "docblock": "选择器值"
        },
        "onFilterChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选择器发生变化时回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "选择器发生变化时回调\n@param {Object} filter value",
          "params": [{
            "name": "filter",
            "description": "value",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "searchText": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "button 的内容",
          "docblock": "button 的内容"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义样式",
          "docblock": "自定义样式",
          "properties": []
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式名称",
          "docblock": "样式名称"
        },
        "filterProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "选择器的props",
          "docblock": "选择器的props",
          "properties": []
        },
        "buttonProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "按钮的额外属性",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "按钮的额外属性",
          "properties": []
        },
        "hasIcon": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示搜索按钮",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示搜索按钮"
        }
      },
      "methods": [],
      "description": "输入框部分继承 Select.AutoComplete 的能力，可以直接用AutoComplete 的 api",
      "subComponents": []
    },
    {
      "name": "Select",
      "title": "选择器",
      "typeId": 3,
      "props": {
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选择器尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "选择器尺寸"
        },
        "value": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "当前值，用于受控模式",
          "docblock": "当前值，用于受控模式"
        },
        "defaultValue": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "初始的默认值",
          "docblock": "初始的默认值"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "没有值的时候的占位符",
          "docblock": "没有值的时候的占位符"
        },
        "autoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "下拉菜单是否与选择器对齐",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "下拉菜单是否与选择器对齐"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义内联 label",
          "docblock": "自定义内联 label"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有清除按钮（单选模式有效）",
          "docblock": "是否有清除按钮（单选模式有效）"
        },
        "state": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'error'",
              "computed": false
            },
              {
                "value": "'loading'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "校验状态",
          "docblock": "校验状态"
        },
        "readOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只读，只读模式下可以展开弹层但不能选",
          "docblock": "是否只读，只读模式下可以展开弹层但不能选"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用选择器",
          "docblock": "是否禁用选择器"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当前弹层是否显示",
          "docblock": "当前弹层是否显示"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层初始化是否显示",
          "docblock": "弹层初始化是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层显示或隐藏时触发的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层显示或隐藏时触发的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层是否显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupContainer": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "弹层挂载的容器节点",
          "docblock": "弹层挂载的容器节点"
        },
        "popupClassName": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "弹层的 className",
          "docblock": "弹层的 className"
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层的内联样式",
          "docblock": "弹层的内联样式",
          "properties": []
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "添加到弹层上的属性",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "添加到弹层上的属性",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "popupContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义弹层的内容",
          "docblock": "自定义弹层的内容"
        },
        "filterLocal": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否使用本地过滤，在数据源为远程的时候需要关闭此项",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否使用本地过滤，在数据源为远程的时候需要关闭此项"
        },
        "filter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "本地过滤方法，返回一个 Boolean 值确定是否保留",
          "defaultValue": {
            "value": "filter",
            "computed": true
          },
          "docblock": "本地过滤方法，返回一个 Boolean 值确定是否保留",
          "params": [],
          "returns": null
        },
        "onToggleHighlightItem": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "键盘上下键切换菜单高亮选项的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "键盘上下键切换菜单高亮选项的回调",
          "params": [],
          "returns": null
        },
        "useVirtual": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启虚拟滚动模式",
          "docblock": "是否开启虚拟滚动模式"
        },
        "dataSource": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "union",
              "value": [{
                "name": "shape",
                "value": {
                  "value": {
                    "name": "any",
                    "required": false
                  },
                  "label": {
                    "name": "any",
                    "required": false
                  },
                  "disabled": {
                    "name": "bool",
                    "required": false
                  },
                  "children": {
                    "name": "array",
                    "required": false
                  }
                }
              },
                {
                  "name": "bool"
                },
                {
                  "name": "number"
                },
                {
                  "name": "string"
                }
              ]
            }
          },
          "required": false,
          "description": "传入的数据源，可以动态渲染子项，详见 [dataSource的使用](#dataSource的使用)",
          "docblock": "传入的数据源，可以动态渲染子项，详见 [dataSource的使用](#dataSource的使用)"
        },
        "itemRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "渲染 MenuItem 内容的方法",
          "docblock": "渲染 MenuItem 内容的方法\n@param {Object} item 渲染节点的item\n@param {String} searchValue 搜索关键字（如果开启搜索）\n@return {ReactNode} item node",
          "params": [{
            "name": "item",
            "description": "渲染节点的item",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "searchValue",
              "description": "搜索关键字（如果开启搜索）",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": {
            "description": "item node",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "mode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              },
              {
                "value": "'tag'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选择器模式",
          "defaultValue": {
            "value": "'single'",
            "computed": false
          },
          "docblock": "选择器模式"
        },
        "notFoundContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "弹层内容为空的文案",
          "docblock": "弹层内容为空的文案"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "Select发生改变时触发的回调",
          "docblock": "Select发生改变时触发的回调\n@param {*} value 选中的值\n@param {String} actionType 触发的方式, 'itemClick', 'enter', 'tag'\n@param {*} item 选中的值的对象数据 (useDetailValue=false有效)",
          "params": [{
            "name": "value",
            "description": "选中的值",
            "type": {
              "name": "mixed"
            }
          },
            {
              "name": "actionType",
              "description": "触发的方式, 'itemClick', 'enter', 'tag'",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "item",
              "description": "选中的值的对象数据 (useDetailValue=false有效)",
              "type": {
                "name": "mixed"
              }
            }
          ],
          "returns": null
        },
        "hasBorder": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有边框",
          "docblock": "是否有边框"
        },
        "hasArrow": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有下拉箭头",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否有下拉箭头"
        },
        "showSearch": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "展开后是否能搜索（tag 模式下固定为true）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "展开后是否能搜索（tag 模式下固定为true）"
        },
        "onSearch": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "当搜索框值变化时回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "当搜索框值变化时回调\n@param {String} value 数据",
          "params": [{
            "name": "value",
            "description": "数据",
            "type": {
              "name": "String"
            }
          }],
          "returns": null
        },
        "onSearchClear": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "当搜索框值被清空时候的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "当搜索框值被清空时候的回调\n@param {String} actionType 触发的方式, 'select'(选择清空), 'popupClose'(弹窗关闭清空)",
          "params": [{
            "name": "actionType",
            "description": "触发的方式, 'select'(选择清空), 'popupClose'(弹窗关闭清空)",
            "type": {
              "name": "String"
            }
          }],
          "returns": null
        },
        "hasSelectAll": {
          "type": {
            "name": "union",
            "value": [{
              "name": "bool"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "多选模式下是否有全选功能",
          "docblock": "多选模式下是否有全选功能"
        },
        "fillProps": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "填充到选择框里的值的 key\b\b",
          "docblock": "填充到选择框里的值的 key\b\b"
        },
        "useDetailValue": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "onChange 返回的 value 使用 dataSource 的对象",
          "docblock": "onChange 返回的 value 使用 dataSource 的对象"
        },
        "cacheValue": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "dataSource 变化的时是否保留已选的内容",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "dataSource 变化的时是否保留已选的内容"
        },
        "valueRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "渲染 Select 展现内容的方法",
          "defaultValue": {
            "value": "item => item.label \\|\\| item.value",
            "computed": false
          },
          "docblock": "渲染 Select 展现内容的方法\n@param {Object} item 渲染节点的item\n@return {ReactNode} 展现内容\n@default item => item.label \\|\\| item.value",
          "params": [{
            "name": "item",
            "description": "渲染节点的item",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "展现内容",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "searchValue": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "受控搜索值，一般不需要设置",
          "docblock": "受控搜索值，一般不需要设置\n@type {[type]}"
        },
        "tagInline": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否一行显示，仅在 mode 为 multiple 的时候生效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否一行显示，仅在 mode 为 multiple 的时候生效"
        },
        "maxTagCount": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最多显示多少个 tag",
          "docblock": "最多显示多少个 tag"
        },
        "maxTagPlaceholder": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "隐藏多余 tag 时显示的内容，在 maxTagCount 生效时起作用",
          "docblock": "隐藏多余 tag 时显示的内容，在 maxTagCount 生效时起作用\n@param {number} selectedValues 当前已选中的元素\n@param {number} totalValues 总待选元素",
          "params": [{
            "name": "selectedValues",
            "description": "当前已选中的元素",
            "type": {
              "name": "number"
            }
          },
            {
              "name": "totalValues",
              "description": "总待选元素",
              "type": {
                "name": "number"
              }
            }
          ],
          "returns": null
        },
        "hiddenSelected": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "选择后是否立即隐藏菜单 (mode=multiple/tag 模式生效)",
          "docblock": "选择后是否立即隐藏菜单 (mode=multiple/tag 模式生效)"
        },
        "onRemove": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "tag 删除回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "tag 删除回调\n@param {object} item 渲染节点的item",
          "params": [{
            "name": "item",
            "description": "渲染节点的item",
            "type": {
              "name": "object"
            }
          }],
          "returns": null
        },
        "onFocus": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "焦点事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "焦点事件",
          "params": [],
          "returns": null
        },
        "onBlur": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "失去焦点事件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "失去焦点事件",
          "params": [],
          "returns": null
        }
      },
      "methods": [{
        "name": "handleMenuSelect",
        "docblock": "Menu.Item onSelect\n@private\n@param  {Array<string>} keys\n@",
        "modifiers": [],
        "params": [{
          "name": "keys",
          "description": null,
          "type": {
            "name": "Array"
          }
        },
          {
            "name": "item"
          }
        ],
        "returns": null,
        "description": "Menu.Item onSelect"
      },
        {
          "name": "handleSingleSelect",
          "docblock": "单选模式",
          "modifiers": [],
          "params": [{
            "name": "key"
          },
            {
              "name": "triggerType"
            }
          ],
          "returns": null,
          "description": "单选模式"
        },
        {
          "name": "handleMultipleSelect",
          "docblock": "多选模式 multiple/tag",
          "modifiers": [],
          "params": [{
            "name": "keys"
          },
            {
              "name": "triggerType"
            },
            {
              "name": "key"
            }
          ],
          "returns": null,
          "description": "多选模式 multiple/tag"
        },
        {
          "name": "handleSearch",
          "docblock": "Handle search input change event\n@param {Event} e change Event",
          "modifiers": [],
          "params": [{
            "name": "value"
          }],
          "returns": null,
          "description": "Handle search input change event"
        },
        {
          "name": "handleTagClose",
          "docblock": "Handle Tag close event\n@param  {Object} item\n@return {Boolean} false  return false to prevent auto close\n----\nIt MUST be multiple mode, needn't additional judgement",
          "modifiers": [],
          "params": [{
            "name": "item",
            "description": null,
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "false  return false to prevent auto close\n----\nIt MUST be multiple mode, needn't additional judgement",
            "type": {
              "name": "Boolean"
            }
          },
          "description": "Handle Tag close event"
        },
        {
          "name": "handleDeleteTag",
          "docblock": "Handle BACKSPACE key event\n@param {Event} e keyDown event\n---\nIt MUST be multiple mode",
          "modifiers": [],
          "params": [{
            "name": "e",
            "description": "keyDown event\n---\nIt MUST be multiple mode",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null,
          "description": "Handle BACKSPACE key event"
        },
        {
          "name": "handleSelectAll",
          "docblock": "Handle SelectAll span click event\n@param {Event} e click event",
          "modifiers": [],
          "params": [{
            "name": "e",
            "description": "click event",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null,
          "description": "Handle SelectAll span click event"
        },
        {
          "name": "renderValues",
          "docblock": "如果用户是自定义的弹层，则直接以 value 为准，不再校验 dataSource\n@param {object} props",
          "modifiers": [],
          "params": [],
          "returns": null,
          "description": "如果用户是自定义的弹层，则直接以 value 为准，不再校验 dataSource"
        },
        {
          "name": "handleWrapClick",
          "docblock": "1. fix flash while click <label/>\n2. fix onBlur while has clear\n@returns",
          "modifiers": [],
          "params": [{
            "name": "e"
          }],
          "returns": null,
          "description": "1. fix flash while click <label/>\n2. fix onBlur while has clear"
        },
        {
          "name": "renderExtraNode",
          "docblock": "render arrow\n@param {object} props\n@param {function} [clickHandler]",
          "modifiers": [],
          "params": [],
          "returns": null,
          "description": "render arrow"
        },
        {
          "name": "renderSelect",
          "docblock": "选择器\n@override\n@param {object} props",
          "modifiers": [],
          "params": [],
          "returns": null,
          "description": "选择器"
        },
        {
          "name": "renderMenuHeader",
          "docblock": "渲染弹层的 header 内容\n@override\n@param {object} props",
          "modifiers": [],
          "params": [],
          "returns": null,
          "description": "渲染弹层的 header 内容"
        }
      ],
      "subComponents": [{
        "name": "AutoComplete",
        "title": "自动补全",
        "props": {
          "size": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'small'",
                "computed": false
              },
                {
                  "value": "'medium'",
                  "computed": false
                },
                {
                  "value": "'large'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "选择器尺寸",
            "defaultValue": {
              "value": "'medium'",
              "computed": false
            },
            "docblock": "选择器尺寸"
          },
          "value": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "当前值，用于受控模式",
            "docblock": "当前值，用于受控模式"
          },
          "defaultValue": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "number"
                }
              ]
            },
            "required": false,
            "description": "初始化的默认值",
            "docblock": "初始化的默认值"
          },
          "placeholder": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "没有值的时候的占位符",
            "docblock": "没有值的时候的占位符"
          },
          "autoWidth": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "下拉菜单是否与选择器对齐",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "下拉菜单是否与选择器对齐"
          },
          "label": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "自定义内联 label",
            "docblock": "自定义内联 label"
          },
          "hasClear": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否有清除按钮（单选模式有效）",
            "docblock": "是否有清除按钮（单选模式有效）"
          },
          "state": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'error'",
                "computed": false
              },
                {
                  "value": "'loading'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "校验状态",
            "docblock": "校验状态"
          },
          "readOnly": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否只读，只读模式下可以展开弹层但不能选",
            "docblock": "是否只读，只读模式下可以展开弹层但不能选"
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁用选择器",
            "docblock": "是否禁用选择器"
          },
          "visible": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "当前弹层是否显示",
            "docblock": "当前弹层是否显示"
          },
          "defaultVisible": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "弹层初始化是否显示",
            "docblock": "弹层初始化是否显示"
          },
          "onVisibleChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "弹层显示或隐藏时触发的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "弹层显示或隐藏时触发的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
            "params": [{
              "name": "visible",
              "description": "弹层是否显示",
              "type": {
                "name": "Boolean"
              }
            },
              {
                "name": "type",
                "description": "触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
                "type": {
                  "name": "String"
                }
              }
            ],
            "returns": null
          },
          "popupContainer": {
            "type": {
              "name": "union",
              "value": [{
                "name": "string"
              },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "弹层挂载的容器节点",
            "docblock": "弹层挂载的容器节点"
          },
          "popupClassName": {
            "type": {
              "name": "any"
            },
            "required": false,
            "description": "弹层的 className",
            "docblock": "弹层的 className"
          },
          "popupStyle": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "弹层的内联样式",
            "docblock": "弹层的内联样式",
            "properties": []
          },
          "popupProps": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "添加到弹层上的属性",
            "defaultValue": {
              "value": "{}",
              "computed": false
            },
            "docblock": "添加到弹层上的属性",
            "properties": []
          },
          "followTrigger": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否跟随滚动",
            "docblock": "是否跟随滚动"
          },
          "popupContent": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "自定义弹层的内容",
            "docblock": "自定义弹层的内容"
          },
          "filterLocal": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否使用本地过滤，在数据源为远程的时候需要关闭此项",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "是否使用本地过滤，在数据源为远程的时候需要关闭此项"
          },
          "filter": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "本地过滤方法，返回一个 Boolean 值确定是否保留",
            "defaultValue": {
              "value": "filter",
              "computed": true
            },
            "docblock": "本地过滤方法，返回一个 Boolean 值确定是否保留",
            "params": [],
            "returns": null
          },
          "onToggleHighlightItem": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "键盘上下键切换菜单高亮选项的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "键盘上下键切换菜单高亮选项的回调",
            "params": [],
            "returns": null
          },
          "useVirtual": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否开启虚拟滚动模式",
            "docblock": "是否开启虚拟滚动模式"
          },
          "dataSource": {
            "type": {
              "name": "arrayOf",
              "value": {
                "name": "union",
                "value": [{
                  "name": "shape",
                  "value": {
                    "value": {
                      "name": "string",
                      "required": false
                    },
                    "label": {
                      "name": "any",
                      "required": false
                    },
                    "disabled": {
                      "name": "bool",
                      "required": false
                    },
                    "children": {
                      "name": "array",
                      "required": false
                    }
                  }
                },
                  {
                    "name": "string"
                  }
                ]
              }
            },
            "required": false,
            "description": "传入的数据源，可以动态渲染子项",
            "docblock": "传入的数据源，可以动态渲染子项"
          },
          "itemRender": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "渲染 MenuItem 内容的方法",
            "docblock": "渲染 MenuItem 内容的方法\n@param {Object} item 渲染节点的 item\n@return {ReactNode} item node",
            "params": [{
              "name": "item",
              "description": "渲染节点的 item",
              "type": {
                "name": "Object"
              }
            }],
            "returns": {
              "description": "item node",
              "type": {
                "name": "ReactNode"
              }
            }
          },
          "onChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "Select发生改变时触发的回调",
            "docblock": "Select发生改变时触发的回调\n@param {*} value 选中的值\n@param {String} actionType 触发的方式, 'itemClick', 'enter', 'change'\n@param {*} item 选中的值的对象数据",
            "params": [{
              "name": "value",
              "description": "选中的值",
              "type": {
                "name": "mixed"
              }
            },
              {
                "name": "actionType",
                "description": "触发的方式, 'itemClick', 'enter', 'change'",
                "type": {
                  "name": "String"
                }
              },
              {
                "name": "item",
                "description": "选中的值的对象数据",
                "type": {
                  "name": "mixed"
                }
              }
            ],
            "returns": null
          },
          "fillProps": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "填充到选择框里的值的 key\b\b，默认是 value",
            "defaultValue": {
              "value": "'value'",
              "computed": false
            },
            "docblock": "填充到选择框里的值的 key\b\b，默认是 value"
          }
        },
        "methods": [{
          "name": "handleTriggerKeyDown",
          "docblock": "Handle trigger keydown event\n@param {Event} e",
          "modifiers": [],
          "params": [{
            "name": "e",
            "description": null,
            "type": {
              "name": "Event"
            }
          }],
          "returns": null,
          "description": "Handle trigger keydown event"
        },
          {
            "name": "renderSelect",
            "docblock": "选择器\n@override\n@param {object} props",
            "modifiers": [],
            "params": [{
              "name": "props",
              "description": null,
              "type": {
                "name": "object"
              }
            }],
            "returns": null,
            "description": "选择器"
          }
        ]
      },
        {
          "name": "OptionGroup",
          "title": "选择分组",
          "props": {
            "label": {
              "type": {
                "name": "node"
              },
              "required": false,
              "description": "设置分组的文案",
              "docblock": "设置分组的文案"
            }
          },
          "methods": []
        },
        {
          "name": "Option",
          "title": "选择项",
          "props": {
            "value": {
              "type": {
                "name": "any"
              },
              "required": true,
              "description": "选项值",
              "docblock": "选项值"
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用",
              "docblock": "是否禁用"
            }
          },
          "methods": []
        }
      ]
    },
    {
      "name": "Slider",
      "title": "图片轮播",
      "typeId": 4,
      "props": {
        "className": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "自定义传入的样式",
          "docblock": "自定义传入的样式"
        },
        "adaptiveHeight": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否使用自适应高度",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否使用自适应高度"
        },
        "animation": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "bool"
              }
            ]
          },
          "required": false,
          "description": "动效类型，默认是'slide'",
          "defaultValue": {
            "value": "'slide'",
            "computed": false
          },
          "docblock": "动效类型，默认是'slide'"
        },
        "arrows": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示箭头",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示箭头"
        },
        "arrowSize": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'medium'",
              "computed": false
            },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "导航箭头大小 可选值: 'medium', 'large'",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "导航箭头大小 可选值: 'medium', 'large'"
        },
        "arrowPosition": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'inner'",
              "computed": false
            },
              {
                "value": "'outer'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "导航箭头位置 可选值: 'inner', 'outer'",
          "defaultValue": {
            "value": "'inner'",
            "computed": false
          },
          "docblock": "导航箭头位置 可选值: 'inner', 'outer'"
        },
        "arrowDirection": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hoz'",
              "computed": false
            },
              {
                "value": "'ver'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "导航箭头的方向 可选值: 'hoz', 'ver'",
          "defaultValue": {
            "value": "'hoz'",
            "computed": false
          },
          "docblock": "导航箭头的方向 可选值: 'hoz', 'ver'"
        },
        "autoplay": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动播放",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否自动播放"
        },
        "autoplaySpeed": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "自动播放的速度",
          "defaultValue": {
            "value": "3000",
            "computed": false
          },
          "docblock": "自动播放的速度"
        },
        "nextArrow": {
          "type": {
            "name": "element"
          },
          "required": false,
          "description": "向后箭头",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "向后箭头"
        },
        "prevArrow": {
          "type": {
            "name": "element"
          },
          "required": false,
          "description": "向前箭头",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "向前箭头"
        },
        "centerMode": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否启用居中模式",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否启用居中模式"
        },
        "dots": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示导航锚点",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否显示导航锚点"
        },
        "dotsDirection": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hoz'",
              "computed": false
            },
              {
                "value": "'ver'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "导航锚点位置",
          "defaultValue": {
            "value": "'hoz'",
            "computed": false
          },
          "docblock": "导航锚点位置"
        },
        "dotRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义导航锚点",
          "docblock": "自定义导航锚点",
          "params": [],
          "returns": null
        },
        "draggable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否可拖拽",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否可拖拽"
        },
        "infinite": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否使用无穷循环模式",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否使用无穷循环模式"
        },
        "defaultActiveIndex": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "初始被激活的轮播图",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "初始被激活的轮播图"
        },
        "lazyLoad": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否启用懒加载",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否启用懒加载"
        },
        "slideDirection": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hoz'",
              "computed": false
            },
              {
                "value": "'ver'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "轮播方向",
          "defaultValue": {
            "value": "'hoz'",
            "computed": false
          },
          "docblock": "轮播方向"
        },
        "slidesToShow": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "同时展示的图片数量",
          "defaultValue": {
            "value": "1",
            "computed": false
          },
          "docblock": "同时展示的图片数量"
        },
        "slidesToScroll": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "同时滑动的图片数量",
          "defaultValue": {
            "value": "1",
            "computed": false
          },
          "docblock": "同时滑动的图片数量"
        },
        "speed": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "轮播速度",
          "defaultValue": {
            "value": "500",
            "computed": false
          },
          "docblock": "轮播速度"
        },
        "activeIndex": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "跳转到指定的轮播图（受控）",
          "docblock": "跳转到指定的轮播图（受控）"
        },
        "triggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "锚点导航触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "锚点导航触发方式"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "轮播切换的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "轮播切换的回调函数\n@param {Number} index 幻灯片的索引",
          "params": [{
            "name": "index",
            "description": "幻灯片的索引",
            "type": {
              "name": "Number"
            }
          }],
          "returns": null
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义传入的class",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "自定义传入的class",
          "properties": []
        },
        "centerPadding": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "Side padding when in center mode (px or %); 展示部分为center，pading会产生前后预览",
          "defaultValue": {
            "value": "'50px'",
            "computed": false
          },
          "docblock": "Side padding when in center mode (px or %); 展示部分为center，pading会产生前后预览"
        },
        "cssEase": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "CSS3 Animation Easing,默认‘ease’",
          "defaultValue": {
            "value": "'ease'",
            "computed": false
          },
          "docblock": "CSS3 Animation Easing,默认‘ease’"
        },
        "focusOnSelect": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "多图轮播时，点击选中后自动居中",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "多图轮播时，点击选中后自动居中"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "SplitButton",
      "title": "分隔按钮",
      "typeId": 1,
      "props": {
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'primary'",
                "computed": false
              },
              {
                "value": "'secondary'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "按钮的类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "按钮的类型"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "按钮组的尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "按钮组的尺寸"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "主按钮的文案",
          "docblock": "主按钮的文案"
        },
        "component": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'button'",
              "computed": false
            },
              {
                "value": "'a'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "设置标签类型",
          "docblock": "设置标签类型"
        },
        "ghost": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'light'",
              "computed": false
            },
              {
                "value": "'dark'",
                "computed": false
              },
              {
                "value": "false",
                "computed": false
              },
              {
                "value": "true",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "是否为幽灵按钮",
          "docblock": "是否为幽灵按钮"
        },
        "defaultSelectedKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "默认激活的菜单项（用法同 Menu 非受控）",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "默认激活的菜单项（用法同 Menu 非受控）"
        },
        "selectedKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "激活的菜单项（用法同 Menu 受控）",
          "docblock": "激活的菜单项（用法同 Menu 受控）"
        },
        "selectMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'single'",
              "computed": false
            },
              {
                "value": "'multiple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "菜单的选择模式",
          "docblock": "菜单的选择模式"
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选择菜单项时的回调，参考 Menu",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "选择菜单项时的回调，参考 Menu",
          "params": [],
          "returns": null
        },
        "onItemClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击菜单项时的回调，参考 Menu",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "点击菜单项时的回调，参考 Menu",
          "params": [],
          "returns": null
        },
        "triggerProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "触发按钮的属性（支持 Button 的所有属性透传）",
          "docblock": "触发按钮的属性（支持 Button 的所有属性透传）",
          "properties": []
        },
        "autoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层菜单的宽度是否与按钮组一致",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "弹层菜单的宽度是否与按钮组一致"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层是否显示",
          "docblock": "弹层是否显示"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层默认是否显示",
          "docblock": "弹层默认是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层显示状态变化时的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层显示状态变化时的回调函数\n@param {Boolean} visible 弹层显示状态\n@param {String} type 触发弹层显示或隐藏的来源 menuSelect 表示由menu触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层显示状态",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示或隐藏的来源 menuSelect 表示由menu触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupTriggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "弹层的触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "弹层的触发方式"
        },
        "popupAlign": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层对齐方式, 详情见Overlay align",
          "docblock": "弹层对齐方式, 详情见Overlay align"
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层自定义样式",
          "docblock": "弹层自定义样式",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层自定义样式类",
          "docblock": "弹层自定义样式类"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传给弹层的属性",
          "docblock": "透传给弹层的属性",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "menuProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传给 Menu 的属性",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "透传给 Menu 的属性",
          "properties": []
        },
        "leftButtonProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传给 左侧按钮 的属性",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "透传给 左侧按钮 的属性",
          "properties": []
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Step",
      "title": "步骤",
      "typeId": 2,
      "props": {
        "current": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "当前步骤",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "当前步骤"
        },
        "direction": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hoz'",
              "computed": false
            },
              {
                "value": "'ver'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "展示方向",
          "defaultValue": {
            "value": "'hoz'",
            "computed": false
          },
          "docblock": "展示方向"
        },
        "labelPlacement": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hoz'",
              "computed": false
            },
              {
                "value": "'ver'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "横向布局时的内容排列",
          "defaultValue": {
            "value": "'ver'",
            "computed": false
          },
          "docblock": "横向布局时的内容排列"
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'circle'",
              "computed": false
            },
              {
                "value": "'arrow'",
                "computed": false
              },
              {
                "value": "'dot'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "类型",
          "defaultValue": {
            "value": "'circle'",
            "computed": false
          },
          "docblock": "类型"
        },
        "readOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只读模式",
          "docblock": "是否只读模式"
        },
        "animation": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启动效",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否开启动效"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义样式名",
          "docblock": "自定义样式名"
        },
        "itemRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "StepItem 的自定义渲染",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "StepItem 的自定义渲染\n@param {Number} index   节点索引\n@param {String} status  节点状态\n@returns {Node} 节点的渲染结果",
          "params": [{
            "name": "index",
            "description": "节点索引",
            "type": {
              "name": "Number"
            }
          },
            {
              "name": "status",
              "description": "节点状态",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": {
            "description": "节点的渲染结果",
            "type": {
              "name": "Node"
            }
          }
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Item",
        "title": "步骤项",
        "props": {
          "status": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'wait'",
                "computed": false
              },
                {
                  "value": "'process'",
                  "computed": false
                },
                {
                  "value": "'finish'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "步骤的状态，如不传，会根据外层的 Step 的 current 属性生成，可选值为 `wait`, `process`, `finish`",
            "docblock": "步骤的状态，如不传，会根据外层的 Step 的 current 属性生成，可选值为 `wait`, `process`, `finish`"
          },
          "title": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "标题",
            "docblock": "标题"
          },
          "icon": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "图标",
            "docblock": "图标"
          },
          "content": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "内容，用于垂直状态下的内容填充",
            "docblock": "内容，用于垂直状态下的内容填充"
          },
          "itemRender": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "StepItem 的自定义渲染, 会覆盖父节点设置的itemRender",
            "docblock": "StepItem 的自定义渲染, 会覆盖父节点设置的itemRender\n@param {Number} index   节点索引\n@param {String} status  节点状态\n@returns {Node} 节点的渲染结果",
            "params": [{
              "name": "index",
              "description": "节点索引",
              "type": {
                "name": "Number"
              }
            },
              {
                "name": "status",
                "description": "节点状态",
                "type": {
                  "name": "String"
                }
              }
            ],
            "returns": {
              "description": "节点的渲染结果",
              "type": {
                "name": "Node"
              }
            }
          },
          "percent": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "百分比",
            "docblock": "百分比"
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁用",
            "docblock": "是否禁用"
          },
          "onClick": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "点击步骤时的回调",
            "defaultValue": {
              "value": "() => {}",
              "computed": false
            },
            "docblock": "点击步骤时的回调\n@param {Number} index 节点索引",
            "params": [{
              "name": "index",
              "description": "节点索引",
              "type": {
                "name": "Number"
              }
            }],
            "returns": null
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义样式",
            "docblock": "自定义样式"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Switch",
      "title": "开关",
      "typeId": 3,
      "props": {
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内敛样式",
          "docblock": "自定义内敛样式",
          "properties": []
        },
        "checkedChildren": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "打开时的内容",
          "docblock": "打开时的内容"
        },
        "unCheckedChildren": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "关闭时的内容",
          "docblock": "关闭时的内容"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "开关状态改变是触发此事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "开关状态改变是触发此事件\n@param {Boolean} checked 是否为打开状态\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "checked",
            "description": "是否为打开状态",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "checked": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "开关当前的值(针对受控组件)",
          "docblock": "开关当前的值(针对受控组件)"
        },
        "defaultChecked": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "开关默认值 (针对非受控组件)",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "开关默认值 (针对非受控组件)"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表示开关被禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "表示开关被禁用"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'medium'",
              "computed": false,
              "description": "正常大小"
            },
              {
                "value": "'small'",
                "computed": false,
                "description": "缩小版大小"
              }
            ]
          },
          "required": false,
          "description": "switch的尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "switch的尺寸\n@enumdesc 正常大小, 缩小版大小",
          "value": [{
            "value": "'medium'",
            "computed": false,
            "description": "正常大小"
          },
            {
              "value": "'small'",
              "computed": false,
              "description": "缩小版大小"
            }
          ]
        },
        "onClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "鼠标点击事件",
          "docblock": "鼠标点击事件\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "e",
            "description": "DOM事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        },
        "onKeyDown": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "键盘按键事件",
          "docblock": "键盘按键事件\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "e",
            "description": "DOM事件对象",
            "type": {
              "name": "Event"
            }
          }],
          "returns": null
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Tab",
      "title": "选项卡",
      "typeId": 2,
      "props": {
        "activeKey": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "被激活的选项卡的 key, 赋值则tab为受控组件, 用户无法切换",
          "docblock": "被激活的选项卡的 key, 赋值则tab为受控组件, 用户无法切换"
        },
        "defaultActiveKey": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "初始化时被激活的选项卡的 key",
          "docblock": "初始化时被激活的选项卡的 key"
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'pure'",
              "computed": false
            },
              {
                "value": "'wrapped'",
                "computed": false
              },
              {
                "value": "'text'",
                "computed": false
              },
              {
                "value": "'capsule'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "外观形态",
          "defaultValue": {
            "value": "'pure'",
            "computed": false
          },
          "docblock": "外观形态"
        },
        "animation": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启动效",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否开启动效"
        },
        "excessMode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'slide'",
              "computed": false
            },
              {
                "value": "'dropdown'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选项卡过多时的滑动模式",
          "defaultValue": {
            "value": "'slide'",
            "computed": false
          },
          "docblock": "选项卡过多时的滑动模式"
        },
        "tabPosition": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'top'",
              "computed": false
            },
              {
                "value": "'bottom'",
                "computed": false
              },
              {
                "value": "'left'",
                "computed": false
              },
              {
                "value": "'right'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "导航选项卡的位置，只适用于包裹型（wrapped）选项卡",
          "defaultValue": {
            "value": "'top'",
            "computed": false
          },
          "docblock": "导航选项卡的位置，只适用于包裹型（wrapped）选项卡"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "尺寸"
        },
        "triggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'hover'",
              "computed": false
            },
              {
                "value": "'click'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "激活选项卡的触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "激活选项卡的触发方式"
        },
        "lazyLoad": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否延迟加载 TabPane 的内容, 默认开启, 即不提前渲染",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否延迟加载 TabPane 的内容, 默认开启, 即不提前渲染"
        },
        "unmountInactiveTabs": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动卸载未处于激活状态的选项卡",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否自动卸载未处于激活状态的选项卡"
        },
        "navStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "导航条的自定义样式",
          "docblock": "导航条的自定义样式",
          "properties": []
        },
        "navClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "导航条的自定义样式类",
          "docblock": "导航条的自定义样式类"
        },
        "contentStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "内容区容器的自定义样式",
          "docblock": "内容区容器的自定义样式",
          "properties": []
        },
        "contentClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "内容区容器的自定义样式类",
          "docblock": "内容区容器的自定义样式类"
        },
        "extra": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "导航栏附加内容",
          "docblock": "导航栏附加内容"
        },
        "onClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击单个选项卡时触发的回调",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击单个选项卡时触发的回调",
          "params": [],
          "returns": null
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选项卡发生切换时的事件回调",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "选项卡发生切换时的事件回调\n@param {String|Number} key 改变后的 key",
          "params": [{
            "name": "key",
            "description": "改变后的 key",
            "type": {
              "name": "union",
              "value": [
                "String",
                "Number"
              ]
            }
          }],
          "returns": null
        },
        "onClose": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选项卡被关闭时的事件回调",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "选项卡被关闭时的事件回调\n@param {String|Number} key   关闭的选项卡的 key",
          "params": [{
            "name": "key",
            "description": "关闭的选项卡的 key",
            "type": {
              "name": "union",
              "value": [
                "String",
                "Number"
              ]
            }
          }],
          "returns": null
        },
        "tabRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义选项卡模板渲染函数",
          "docblock": "自定义选项卡模板渲染函数\n@param {String} key 当前 Tab.Item 的 key 值\n@param {Object} props 传给 Tab.Item 的所有属性键值对\n@return {ReactNode} 返回自定义组件",
          "params": [{
            "name": "key",
            "description": "当前 Tab.Item 的 key 值",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "props",
              "description": "传给 Tab.Item 的所有属性键值对",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": {
            "description": "返回自定义组件",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层属性透传, 只有当 excessMode 为 dropdown 时生效",
          "docblock": "弹层属性透传, 只有当 excessMode 为 dropdown 时生效",
          "properties": []
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Item",
        "title": "选项卡项",
        "props": {
          "title": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "选项卡标题",
            "docblock": "选项卡标题"
          },
          "closeable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "单个选项卡是否可关闭",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "单个选项卡是否可关闭"
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "选项卡是否被禁用",
            "docblock": "选项卡是否被禁用"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Table",
      "title": "表格",
      "typeId": 4,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式类名的品牌前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式类名的品牌前缀"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内联样式",
          "docblock": "自定义内联样式",
          "properties": []
        },
        "dataSource": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "表格展示的数据源",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "表格展示的数据源"
        },
        "onRowClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击表格每一行触发的事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击表格每一行触发的事件\n@param {Object} record 该行所对应的数据\n@param {Number} index 该行所对应的序列\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "record",
            "description": "该行所对应的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "index",
              "description": "该行所对应的序列",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onRowMouseEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "悬浮在表格每一行的时候触发的事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "悬浮在表格每一行的时候触发的事件\n@param {Object} record 该行所对应的数据\n@param {Number} index 该行所对应的序列\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "record",
            "description": "该行所对应的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "index",
              "description": "该行所对应的序列",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onRowMouseLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "离开表格每一行的时候触发的事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "离开表格每一行的时候触发的事件\n@param {Object} record 该行所对应的数据\n@param {Number} index 该行所对应的序列\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "record",
            "description": "该行所对应的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "index",
              "description": "该行所对应的序列",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "onSort": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击列排序触发的事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击列排序触发的事件\n@param {String} dataIndex 指定的排序的字段\n@param {String} order 排序对应的顺序, 有`desc`和`asc`两种",
          "params": [{
            "name": "dataIndex",
            "description": "指定的排序的字段",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "order",
              "description": "排序对应的顺序, 有`desc`和`asc`两种",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "onFilter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击过滤确认按钮触发的事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "点击过滤确认按钮触发的事件\n@param {Object} filterParams 过滤的字段信息",
          "params": [{
            "name": "filterParams",
            "description": "过滤的字段信息",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "onResizeChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "重设列尺寸的时候触发的事件",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "重设列尺寸的时候触发的事件\n@param {String} dataIndex 指定重设的字段\n@param {Number} value 列宽变动的数值",
          "params": [{
            "name": "dataIndex",
            "description": "指定重设的字段",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "value",
              "description": "列宽变动的数值",
              "type": {
                "name": "Number"
              }
            }
          ],
          "returns": null
        },
        "rowProps": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "设置每一行的属性，如果返回值和其他针对行操作的属性冲突则无效。",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "设置每一行的属性，如果返回值和其他针对行操作的属性冲突则无效。\n@param {Object} record 该行所对应的数据\n@param {Number} index 该行所对应的序列\n@returns {Object} 需要设置的行属性",
          "params": [{
            "name": "record",
            "description": "该行所对应的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "index",
              "description": "该行所对应的序列",
              "type": {
                "name": "Number"
              }
            }
          ],
          "returns": {
            "description": "需要设置的行属性",
            "type": {
              "name": "Object"
            }
          }
        },
        "cellProps": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "设置单元格的属性，通过该属性可以进行合并单元格",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "设置单元格的属性，通过该属性可以进行合并单元格\n@param {Number} rowIndex 该行所对应的序列\n@param {Number} colIndex 该列所对应的序列\n@param {String} dataIndex 该列所对应的字段名称\n@param {Object} record 该行对应的记录\n@returns {Object} 返回td元素的所支持的属性对象",
          "params": [{
            "name": "rowIndex",
            "description": "该行所对应的序列",
            "type": {
              "name": "Number"
            }
          },
            {
              "name": "colIndex",
              "description": "该列所对应的序列",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "dataIndex",
              "description": "该列所对应的字段名称",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "record",
              "description": "该行对应的记录",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": {
            "description": "返回td元素的所支持的属性对象",
            "type": {
              "name": "Object"
            }
          }
        },
        "hasBorder": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表格是否具有边框",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "表格是否具有边框"
        },
        "hasHeader": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表格是否具有头部",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "表格是否具有头部"
        },
        "isZebra": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表格是否是斑马线",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "表格是否是斑马线"
        },
        "loading": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表格是否在加载中",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "表格是否在加载中"
        },
        "loadingComponent": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义 Loading 组件\n请务必传递 props, 使用方式： loadingComponent={props => <Loading {...props}/>}",
          "docblock": "自定义 Loading 组件\n请务必传递 props, 使用方式： loadingComponent={props => <Loading {...props}/>}\n@param {Object} props 当前点击行的key",
          "params": [{
            "name": "props",
            "description": "当前点击行的key",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "filterParams": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "当前过滤的的keys,使用此属性可以控制表格的头部的过滤选项中哪个菜单被选中,格式为 {dataIndex: {selectedKeys:[]}}\n示例:\n假设要控制dataIndex为id的列的过滤菜单中key为one的菜单项选中\n`<Table filterParams={{id: {selectedKeys: ['one']}}}/>`",
          "docblock": "当前过滤的的keys,使用此属性可以控制表格的头部的过滤选项中哪个菜单被选中,格式为 {dataIndex: {selectedKeys:[]}}\n示例:\n假设要控制dataIndex为id的列的过滤菜单中key为one的菜单项选中\n`<Table filterParams={{id: {selectedKeys: ['one']}}}/>`",
          "properties": []
        },
        "sort": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "当前排序的字段,使用此属性可以控制表格的字段的排序,格式为{dataIndex: 'asc'}",
          "docblock": "当前排序的字段,使用此属性可以控制表格的字段的排序,格式为{dataIndex: 'asc'}",
          "properties": []
        },
        "sortIcons": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义排序按钮，例如上下排布的: `{desc: <Icon style={{top: '6px', left: '4px'}} type={'arrow-down'} size=\"small\" />, asc: <Icon style={{top: '-6px', left: '4px'}} type={'arrow-up'} size=\"small\" />}`",
          "docblock": "自定义排序按钮，例如上下排布的: `{desc: <Icon style={{top: '6px', left: '4px'}} type={'arrow-down'} size=\"small\" />, asc: <Icon style={{top: '-6px', left: '4px'}} type={'arrow-up'} size=\"small\" />}`",
          "properties": []
        },
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义国际化文案对象",
          "defaultValue": {
            "value": "zhCN.Table",
            "computed": true
          },
          "docblock": "自定义国际化文案对象\n@property {String} ok 过滤器中确认按钮文案\n@property {String} reset 过滤器中重置按钮文案\n@property {String} empty 没有数据情况下 table内的文案\n@property {String} asc 排序升序状态下的文案\n@property {String} desc 排序将序状态下的文案\n@property {String} expanded 可折叠行，展开状态下的文案\n@property {String} folded 可折叠行，折叠状态下的文案\n@property {String} filter 过滤器文案\n@property {String} selectAll header里全选的按钮文案",
          "properties": [{
            "name": "ok",
            "description": "过滤器中确认按钮文案",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "reset",
              "description": "过滤器中重置按钮文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "empty",
              "description": "没有数据情况下 table内的文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "asc",
              "description": "排序升序状态下的文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "desc",
              "description": "排序将序状态下的文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "expanded",
              "description": "可折叠行，展开状态下的文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "folded",
              "description": "可折叠行，折叠状态下的文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "filter",
              "description": "过滤器文案",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "selectAll",
              "description": "header里全选的按钮文案",
              "type": {
                "name": "String"
              }
            }
          ]
        },
        "emptyContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "设置数据为空的时候的表格内容展现",
          "docblock": "设置数据为空的时候的表格内容展现"
        },
        "primaryKey": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "dataSource当中数据的主键，如果给定的数据源中的属性不包含该主键，会造成选择状态全部选中",
          "defaultValue": {
            "value": "'id'",
            "computed": false
          },
          "docblock": "dataSource当中数据的主键，如果给定的数据源中的属性不包含该主键，会造成选择状态全部选中"
        },
        "expandedRowRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "额外渲染行的渲染函数",
          "docblock": "额外渲染行的渲染函数\n@param {Object} record 该行所对应的数据\n@param {Number} index 该行所对应的序列\n@returns {Element} 渲染内容",
          "params": [{
            "name": "record",
            "description": "该行所对应的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "index",
              "description": "该行所对应的序列",
              "type": {
                "name": "Number"
              }
            }
          ],
          "returns": {
            "description": "渲染内容",
            "type": {
              "name": "Element"
            }
          }
        },
        "expandedRowIndent": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "额外渲染行的缩进",
          "docblock": "额外渲染行的缩进"
        },
        "openRowKeys": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "默认情况下展开的渲染行或者Tree, 传入此属性为受控状态",
          "docblock": "默认情况下展开的渲染行或者Tree, 传入此属性为受控状态"
        },
        "hasExpandedRowCtrl": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示点击展开额外渲染行的+号按钮",
          "docblock": "是否显示点击展开额外渲染行的+号按钮"
        },
        "getExpandedColProps": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "设置额外渲染行的属性",
          "docblock": "设置额外渲染行的属性",
          "params": [],
          "returns": null
        },
        "onRowOpen": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "在额外渲染行或者Tree展开或者收起的时候触发的事件",
          "docblock": "在额外渲染行或者Tree展开或者收起的时候触发的事件\n@param {Array} openRowKeys 展开的渲染行的key\n@param {String} currentRowKey 当前点击的渲染行的key\n@param {Boolean} expanded 当前点击是展开还是收起\n@param {Object} currentRecord 当前点击额外渲染行的记录",
          "params": [{
            "name": "openRowKeys",
            "description": "展开的渲染行的key",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "currentRowKey",
              "description": "当前点击的渲染行的key",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "expanded",
              "description": "当前点击是展开还是收起",
              "type": {
                "name": "Boolean"
              }
            },
            {
              "name": "currentRecord",
              "description": "当前点击额外渲染行的记录",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "onExpandedRowClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击额外渲染行触发的事件",
          "docblock": "点击额外渲染行触发的事件\n@param {Object} record 该行所对应的数据\n@param {Number} index 该行所对应的序列\n@param {Event} e DOM事件对象",
          "params": [{
            "name": "record",
            "description": "该行所对应的数据",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "index",
              "description": "该行所对应的序列",
              "type": {
                "name": "Number"
              }
            },
            {
              "name": "e",
              "description": "DOM事件对象",
              "type": {
                "name": "Event"
              }
            }
          ],
          "returns": null
        },
        "fixedHeader": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表头是否固定，该属性配合maxBodyHeight使用，当内容区域的高度超过maxBodyHeight的时候，在内容区域会出现滚动条",
          "docblock": "表头是否固定，该属性配合maxBodyHeight使用，当内容区域的高度超过maxBodyHeight的时候，在内容区域会出现滚动条"
        },
        "maxBodyHeight": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "string"
              }
            ]
          },
          "required": false,
          "description": "最大内容区域的高度,在`fixedHeader`为`true`的时候,超过这个高度会出现滚动条",
          "docblock": "最大内容区域的高度,在`fixedHeader`为`true`的时候,超过这个高度会出现滚动条"
        },
        "rowSelection": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "是否启用选择模式",
          "docblock": "是否启用选择模式\n@property {Function} getProps `Function(record, index)=>Object` 获取selection的默认属性\n@property {Function} onChange `Function(selectedRowKeys:Array, records:Array)` 选择改变的时候触发的事件，**注意:** 其中records只会包含当前dataSource的数据，很可能会小于selectedRowKeys的长度。\n@property {Function} onSelect `Function(selected:Boolean, record:Object, records:Array)` 用户手动选择/取消选择某行的回调\n@property {Function} onSelectAll `Function(selected:Boolean, records:Array)` 用户手动选择/取消选择所有行的回调\n@property {Array} selectedRowKeys 设置了此属性,将rowSelection变为受控状态,接收值为该行数据的primaryKey的值\n@property {String} mode 选择selection的模式, 可选值为`single`, `multiple`，默认为`multiple`\n@property {Function} columnProps `Function()=>Object` 选择列 的props，例如锁列、对齐等，可使用`Table.Column` 的所有参数\n@property {Function} titleProps `Function()=>Object` 选择列 表头的props，仅在 `multiple` 模式下生效\n@property {Function} titleAddons `Function()=>Node` 选择列 表头添加的元素，在`single` `multiple` 下都生效",
          "properties": [{
            "name": "getProps",
            "description": "`Function(record, index)=>Object` 获取selection的默认属性",
            "type": {
              "name": "Function"
            }
          },
            {
              "name": "onChange",
              "description": "`Function(selectedRowKeys:Array, records:Array)` 选择改变的时候触发的事件，**注意:** 其中records只会包含当前dataSource的数据，很可能会小于selectedRowKeys的长度。",
              "type": {
                "name": "Function"
              }
            },
            {
              "name": "onSelect",
              "description": "`Function(selected:Boolean, record:Object, records:Array)` 用户手动选择/取消选择某行的回调",
              "type": {
                "name": "Function"
              }
            },
            {
              "name": "onSelectAll",
              "description": "`Function(selected:Boolean, records:Array)` 用户手动选择/取消选择所有行的回调",
              "type": {
                "name": "Function"
              }
            },
            {
              "name": "selectedRowKeys",
              "description": "设置了此属性,将rowSelection变为受控状态,接收值为该行数据的primaryKey的值",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "mode",
              "description": "选择selection的模式, 可选值为`single`, `multiple`，默认为`multiple`",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "columnProps",
              "description": "`Function()=>Object` 选择列 的props，例如锁列、对齐等，可使用`Table.Column` 的所有参数",
              "type": {
                "name": "Function"
              }
            },
            {
              "name": "titleProps",
              "description": "`Function()=>Object` 选择列 表头的props，仅在 `multiple` 模式下生效",
              "type": {
                "name": "Function"
              }
            },
            {
              "name": "titleAddons",
              "description": "`Function()=>Node` 选择列 表头添加的元素，在`single` `multiple` 下都生效",
              "type": {
                "name": "Function"
              }
            }
          ]
        },
        "stickyHeader": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "表头是否是sticky",
          "docblock": "表头是否是sticky"
        },
        "offsetTop": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "距离窗口顶部达到指定偏移量后触发",
          "docblock": "距离窗口顶部达到指定偏移量后触发"
        },
        "affixProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "affix组件的的属性",
          "docblock": "affix组件的的属性",
          "properties": []
        },
        "indent": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "在tree模式下的缩进尺寸， 仅在isTree为true时候有效",
          "docblock": "在tree模式下的缩进尺寸， 仅在isTree为true时候有效"
        },
        "isTree": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "开启Table的tree模式, 接收的数据格式中包含children则渲染成tree table",
          "docblock": "开启Table的tree模式, 接收的数据格式中包含children则渲染成tree table"
        },
        "useVirtual": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启虚拟滚动",
          "docblock": "是否开启虚拟滚动"
        },
        "rowHeight": {
          "type": {
            "name": "union",
            "value": [{
              "name": "number"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "设置行高",
          "docblock": "设置行高"
        },
        "onBodyScroll": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "在内容区域滚动的时候触发的函数",
          "docblock": "在内容区域滚动的时候触发的函数",
          "params": [],
          "returns": null
        },
        "expandedIndexSimulate": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "开启时，getExpandedColProps() / rowProps() / expandedRowRender() 的第二个参数 index (该行所对应的序列) 将按照01,2,3,4...的顺序返回，否则返回真实index(0,2,4,6... / 1,3,5,7...)",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "开启时，getExpandedColProps() / rowProps() / expandedRowRender() 的第二个参数 index (该行所对应的序列) 将按照01,2,3,4...的顺序返回，否则返回真实index(0,2,4,6... / 1,3,5,7...)"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Column",
        "title": "表格列",
        "props": {
          "dataIndex": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "指定列对应的字段，支持`a.b`形式的快速取值",
            "docblock": "指定列对应的字段，支持`a.b`形式的快速取值"
          },
          "cell": {
            "type": {
              "name": "union",
              "value": [{
                "name": "element"
              },
                {
                  "name": "node"
                },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "行渲染的逻辑\nvalue, rowIndex, record, context四个属性只可读不可被更改\nFunction(value, index, record) => Element",
            "defaultValue": {
              "value": "value => value",
              "computed": false
            },
            "docblock": "行渲染的逻辑\nvalue, rowIndex, record, context四个属性只可读不可被更改\nFunction(value, index, record) => Element"
          },
          "title": {
            "type": {
              "name": "union",
              "value": [{
                "name": "element"
              },
                {
                  "name": "node"
                },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "表头显示的内容",
            "docblock": "表头显示的内容"
          },
          "sortable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否支持排序",
            "docblock": "是否支持排序"
          },
          "width": {
            "type": {
              "name": "union",
              "value": [{
                "name": "number"
              },
                {
                  "name": "string"
                }
              ]
            },
            "required": false,
            "description": "列宽，注意在锁列的情况下一定需要配置宽度",
            "docblock": "列宽，注意在锁列的情况下一定需要配置宽度"
          },
          "align": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'left'",
                "computed": false
              },
                {
                  "value": "'center'",
                  "computed": false
                },
                {
                  "value": "'right'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "单元格的对齐方式",
            "docblock": "单元格的对齐方式"
          },
          "alignHeader": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'left'",
                "computed": false
              },
                {
                  "value": "'center'",
                  "computed": false
                },
                {
                  "value": "'right'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "单元格标题的对齐方式, 不配置默认读取align值",
            "docblock": "单元格标题的对齐方式, 不配置默认读取align值"
          },
          "filters": {
            "type": {
              "name": "arrayOf",
              "value": {
                "name": "shape",
                "value": {
                  "label": {
                    "name": "string",
                    "required": false
                  },
                  "value": {
                    "name": "union",
                    "value": [{
                      "name": "node"
                    },
                      {
                        "name": "string"
                      }
                    ],
                    "required": false
                  }
                }
              }
            },
            "required": false,
            "description": "生成标题过滤的菜单, 格式为`[{label:'xxx', value:'xxx'}]`",
            "docblock": "生成标题过滤的菜单, 格式为`[{label:'xxx', value:'xxx'}]`"
          },
          "filterMode": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'single'",
                "computed": false
              },
                {
                  "value": "'multiple'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "过滤的模式是单选还是多选",
            "defaultValue": {
              "value": "'multiple'",
              "computed": false
            },
            "docblock": "过滤的模式是单选还是多选"
          },
          "filterMenuProps": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "filter 模式下传递给 Menu 菜单的属性， 默认继承 `Menu` 组件的API",
            "defaultValue": {
              "value": "{\n    subMenuSelectable: false,\n}",
              "computed": false
            },
            "docblock": "filter 模式下传递给 Menu 菜单的属性， 默认继承 `Menu` 组件的API\n@property {Boolean} subMenuSelectable 默认为`false` subMenu是否可选择\n@property {Boolean} isSelectIconRight 默认为`false` 是否将选中图标居右。注意：SubMenu 上的选中图标一直居左，不受此API控制",
            "properties": [{
              "name": "subMenuSelectable",
              "description": "默认为`false` subMenu是否可选择",
              "type": {
                "name": "Boolean"
              }
            },
              {
                "name": "isSelectIconRight",
                "description": "默认为`false` 是否将选中图标居右。注意：SubMenu 上的选中图标一直居左，不受此API控制",
                "type": {
                  "name": "Boolean"
                }
              }
            ]
          },
          "lock": {
            "type": {
              "name": "union",
              "value": [{
                "name": "bool"
              },
                {
                  "name": "string"
                }
              ]
            },
            "required": false,
            "description": "是否支持锁列,可选值为`left`,`right`, `true`",
            "docblock": "是否支持锁列,可选值为`left`,`right`, `true`"
          },
          "resizable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否支持列宽调整, 当该值设为true，table的布局方式会修改为fixed.",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否支持列宽调整, 当该值设为true，table的布局方式会修改为fixed."
          }
        },
        "methods": [],
        "order": 0
      },
        {
          "name": "ColumnGroup",
          "title": "表格列组",
          "props": {
            "title": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "element"
                },
                  {
                    "name": "node"
                  },
                  {
                    "name": "func"
                  }
                ]
              },
              "required": false,
              "description": "表头显示的内容",
              "defaultValue": {
                "value": "'column-group'",
                "computed": false
              },
              "docblock": "表头显示的内容"
            }
          },
          "methods": [],
          "order": 1
        },
        {
          "name": "GroupHeader",
          "title": "表格头",
          "props": {
            "cell": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "element"
                },
                  {
                    "name": "node"
                  },
                  {
                    "name": "func"
                  }
                ]
              },
              "required": false,
              "description": "行渲染的逻辑",
              "defaultValue": {
                "value": "() => ''",
                "computed": false
              },
              "docblock": "行渲染的逻辑"
            },
            "hasChildrenSelection": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否在Children上面渲染selection",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否在Children上面渲染selection"
            },
            "hasSelection": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否在GroupHeader上面渲染selection",
              "defaultValue": {
                "value": "true",
                "computed": false
              },
              "docblock": "是否在GroupHeader上面渲染selection"
            },
            "useFirstLevelDataWhenNoChildren": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "当 dataSouce 里没有 children 时，是否使用内容作为数据",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "当 dataSouce 里没有 children 时，是否使用内容作为数据"
            }
          },
          "methods": [],
          "order": 2
        },
        {
          "name": "GroupFooter",
          "title": "表格尾",
          "props": {
            "cell": {
              "type": {
                "name": "union",
                "value": [{
                  "name": "element"
                },
                  {
                    "name": "node"
                  },
                  {
                    "name": "func"
                  }
                ]
              },
              "required": false,
              "description": "行渲染的逻辑",
              "defaultValue": {
                "value": "() => ''",
                "computed": false
              },
              "docblock": "行渲染的逻辑"
            }
          },
          "methods": [],
          "order": 3
        }
      ]
    },
    {
      "name": "Tag",
      "title": "标签",
      "typeId": 4,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "标签类名前缀,提供给二次开发者用",
          "defaultValue": {
            "value": "next-",
            "computed": false
          },
          "docblock": "标签类名前缀,提供给二次开发者用\n@default next-"
        },
        "type": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'primary'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "标签的类型",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "标签的类型"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "标签的尺寸（large 尺寸为兼容表单场景 large = medium）",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "标签的尺寸（large 尺寸为兼容表单场景 large = medium）"
        },
        "animation": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启动效",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否开启动效"
        },
        "afterAppear": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "标签出现动画结束后执行的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "标签出现动画结束后执行的回调",
          "params": [],
          "returns": null
        },
        "onClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "点击回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "点击回调",
          "params": [],
          "returns": null
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Closeable",
        "title": "可关闭标签",
        "props": {
          "closeArea": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'tag'",
                "computed": false
              },
                {
                  "value": "'tail'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "closeable 标签的 onClose 响应区域, tag: 标签体, tail(默认): 关闭按钮",
            "docblock": "closeable 标签的 onClose 响应区域, tag: 标签体, tail(默认): 关闭按钮"
          },
          "onClose": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "点击关闭按钮时的回调",
            "docblock": "点击关闭按钮时的回调\n@param {String} from 事件来源, tag: 标签体点击, tail: 关闭按钮点击\n@returns {Boolean} true则关闭, false阻止关闭",
            "params": [{
              "name": "from",
              "description": "事件来源, tag: 标签体点击, tail: 关闭按钮点击",
              "type": {
                "name": "String"
              }
            }],
            "returns": {
              "description": "true则关闭, false阻止关闭",
              "type": {
                "name": "Boolean"
              }
            }
          },
          "afterClose": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "标签关闭后执行的回调",
            "docblock": "标签关闭后执行的回调",
            "params": [],
            "returns": null
          },
          "onClick": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "点击回调",
            "docblock": "点击回调",
            "params": [],
            "returns": null
          },
          "size": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'small'",
                "computed": false
              },
                {
                  "value": "'medium'",
                  "computed": false
                },
                {
                  "value": "'large'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "标签的尺寸（large 尺寸为兼容表单场景 large = medium）",
            "docblock": "标签的尺寸（large 尺寸为兼容表单场景 large = medium）"
          }
        },
        "methods": []
      },
        {
          "name": "Selectable",
          "title": "可选中标签",
          "props": {
            "checked": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "标签是否被选中，受控用法\ntag checked or not, a controlled way",
              "docblock": "标签是否被选中，受控用法\ntag checked or not, a controlled way"
            },
            "defaultChecked": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "标签是否默认被选中，非受控用法\ntag checked or not by default, a uncontrolled way",
              "docblock": "标签是否默认被选中，非受控用法\ntag checked or not by default, a uncontrolled way"
            },
            "onChange": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "选中状态变化时触发的事件",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "选中状态变化时触发的事件\n@param {Boolean} checked 是否选中\n@param {Event} e Dom 事件对象",
              "params": [{
                "name": "checked",
                "description": "是否选中",
                "type": {
                  "name": "Boolean"
                }
              },
                {
                  "name": "e",
                  "description": "Dom 事件对象",
                  "type": {
                    "name": "Event"
                  }
                }
              ],
              "returns": null
            },
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "标签是否被禁用",
              "docblock": "标签是否被禁用"
            }
          },
          "methods": []
        }
      ]
    },
    {
      "name": "TimePicker",
      "title": "时间选择框",
      "typeId": 3,
      "props": {
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "按钮的文案",
          "docblock": "按钮的文案"
        },
        "state": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'error'",
              "computed": false
            },
              {
                "value": "'success'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "输入框状态",
          "docblock": "输入框状态"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "输入框提示",
          "docblock": "输入框提示"
        },
        "value": {
          "type": {
            "name": "custom",
            "raw": "checkDateValue"
          },
          "required": false,
          "description": "时间值（moment 对象或时间字符串，受控状态使用）",
          "docblock": "时间值（moment 对象或时间字符串，受控状态使用）"
        },
        "defaultValue": {
          "type": {
            "name": "custom",
            "raw": "checkDateValue"
          },
          "required": false,
          "description": "时间初值（moment 对象或时间字符串，非受控状态使用）",
          "docblock": "时间初值（moment 对象或时间字符串，非受控状态使用）"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "时间选择框的尺寸",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "时间选择框的尺寸"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否允许清空时间",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否允许清空时间"
        },
        "format": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "时间的格式\nhttps://momentjs.com/docs/#/parsing/string-format/",
          "defaultValue": {
            "value": "'HH:mm:ss'",
            "computed": false
          },
          "docblock": "时间的格式\nhttps://momentjs.com/docs/#/parsing/string-format/"
        },
        "hourStep": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "小时选项步长",
          "docblock": "小时选项步长"
        },
        "minuteStep": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "分钟选项步长",
          "docblock": "分钟选项步长"
        },
        "secondStep": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "秒钟选项步长",
          "docblock": "秒钟选项步长"
        },
        "disabledHours": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "禁用小时函数",
          "docblock": "禁用小时函数\n@param {Number} index 时 0 - 23\n@return {Boolean} 是否禁用",
          "params": [{
            "name": "index",
            "description": "时 0 - 23",
            "type": {
              "name": "Number"
            }
          }],
          "returns": {
            "description": "是否禁用",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "disabledMinutes": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "禁用分钟函数",
          "docblock": "禁用分钟函数\n@param {Number} index 分 0 - 59\n@return {Boolean} 是否禁用",
          "params": [{
            "name": "index",
            "description": "分 0 - 59",
            "type": {
              "name": "Number"
            }
          }],
          "returns": {
            "description": "是否禁用",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "disabledSeconds": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "禁用秒钟函数",
          "docblock": "禁用秒钟函数\n@param {Number} index 秒 0 - 59\n@return {Boolean} 是否禁用",
          "params": [{
            "name": "index",
            "description": "秒 0 - 59",
            "type": {
              "name": "Number"
            }
          }],
          "returns": {
            "description": "是否禁用",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层是否显示（受控）",
          "docblock": "弹层是否显示（受控）"
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "弹层默认是否显示（非受控）",
          "docblock": "弹层默认是否显示（非受控）"
        },
        "popupContainer": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层容器",
          "docblock": "弹层容器\n@param {Object} target 目标节点\n@return {ReactNode} 容器节点",
          "params": [{
            "name": "target",
            "description": "目标节点",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "容器节点",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "popupAlign": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层对齐方式, 详情见Overlay 文档",
          "defaultValue": {
            "value": "'tl tl'",
            "computed": false
          },
          "docblock": "弹层对齐方式, 详情见Overlay 文档"
        },
        "popupTriggerType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'click'",
              "computed": false
            },
              {
                "value": "'hover'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "弹层触发方式",
          "defaultValue": {
            "value": "'click'",
            "computed": false
          },
          "docblock": "弹层触发方式"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "弹层展示状态变化时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否隐藏和显示\n@param {String} type 触发弹层显示和隐藏的来源 fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
          "params": [{
            "name": "visible",
            "description": "弹层是否隐藏和显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发弹层显示和隐藏的来源 fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层自定义样式",
          "docblock": "弹层自定义样式",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "弹层自定义样式类",
          "docblock": "弹层自定义样式类"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "弹层属性",
          "docblock": "弹层属性",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "时间值改变时的回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "时间值改变时的回调\n@param {Object|String} value 时间对象或时间字符串",
          "params": [{
            "name": "value",
            "description": "时间对象或时间字符串",
            "type": {
              "name": "union",
              "value": [
                "Object",
                "String"
              ]
            }
          }],
          "returns": null
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Timeline",
      "title": "时间轴",
      "typeId": 4,
      "props": {
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式的品牌前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式的品牌前缀"
        },
        "fold": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "自定义折叠选项 示例`[{foldArea: [startIndex, endIndex], foldShow: boolean}]`",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "自定义折叠选项 示例`[{foldArea: [startIndex, endIndex], foldShow: boolean}]`"
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义类名",
          "docblock": "自定义类名"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Item",
        "title": "时间轴项",
        "props": {
          "state": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'done'",
                "computed": false
              },
                {
                  "value": "'process'",
                  "computed": false
                },
                {
                  "value": "'error'",
                  "computed": false
                },
                {
                  "value": "'success'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "节点状态",
            "defaultValue": {
              "value": "'done'",
              "computed": false
            },
            "docblock": "节点状态"
          },
          "icon": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "图标",
            "docblock": "图标"
          },
          "dot": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "自定义时间轴节点",
            "docblock": "自定义时间轴节点"
          },
          "time": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "格式化后的时间",
            "docblock": "格式化后的时间"
          },
          "title": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "标题",
            "docblock": "标题"
          },
          "timeLeft": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "左侧时间",
            "docblock": "左侧时间"
          },
          "content": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "右侧内容",
            "docblock": "右侧内容"
          },
          "animation": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "动画",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "动画"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "Transfer",
      "title": "穿梭框",
      "typeId": 3,
      "props": {
        "mode": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'normal'",
              "computed": false
            },
              {
                "value": "'simple'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "移动选项模式",
          "defaultValue": {
            "value": "'normal'",
            "computed": false
          },
          "docblock": "移动选项模式"
        },
        "dataSource": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "object"
            }
          },
          "required": false,
          "description": "数据源",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "数据源"
        },
        "value": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于受控）当前值",
          "docblock": "（用于受控）当前值"
        },
        "defaultValue": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于非受控）初始值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "（用于非受控）初始值"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "值发生改变的时候触发的回调函数",
          "docblock": "值发生改变的时候触发的回调函数\n@param {Array} value 右面板值\n@param {Array} data 右面板数据\n@param {Object} extra 额外参数\n@param {Array} extra.leftValue 左面板值\n@param {Array} extra.leftData 左面板数据\n@param {Array} extra.movedValue 发生移动的值\n@param {Object} extra.movedData 发生移动的数据\n@param {String} extra.direction 移动的方向，值为'left'或'right'",
          "params": [{
            "name": "value",
            "description": "右面板值",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "data",
              "description": "右面板数据",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.leftValue",
              "description": "左面板值",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.leftData",
              "description": "左面板数据",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.movedValue",
              "description": "发生移动的值",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.movedData",
              "description": "发生移动的数据",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.direction",
              "description": "移动的方向，值为'left'或'right'",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "leftDisabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用左侧面板",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用左侧面板"
        },
        "rightDisabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用右侧面板",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用右侧面板"
        },
        "itemRender": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "列表项渲染函数",
          "defaultValue": {
            "value": "data => data.label",
            "computed": false
          },
          "docblock": "列表项渲染函数\n@param {Object} data 数据\n@return {ReactNode} 列表项内容",
          "params": [{
            "name": "data",
            "description": "数据",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "列表项内容",
            "type": {
              "name": "ReactNode"
            }
          }
        },
        "showSearch": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示搜索框",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示搜索框"
        },
        "filter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义搜索函数",
          "defaultValue": {
            "value": "根据 label 属性匹配",
            "computed": false
          },
          "docblock": "自定义搜索函数\n@param {String} searchedValue 搜索的内容\n@param {Object} data 数据\n@return {Boolean} 是否匹配到\n@default 根据 label 属性匹配",
          "params": [{
            "name": "searchedValue",
            "description": "搜索的内容",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "data",
              "description": "数据",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": {
            "description": "是否匹配到",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "onSearch": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "搜索框输入时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "搜索框输入时触发的回调函数\n@param {String} searchedValue 搜索的内容\n@param {String} position 搜索面板的位置",
          "params": [{
            "name": "searchedValue",
            "description": "搜索的内容",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "position",
              "description": "搜索面板的位置",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "searchPlaceholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "搜索框占位符",
          "docblock": "搜索框占位符"
        },
        "notFoundContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "列表为空显示内容",
          "defaultValue": {
            "value": "'Not Found'",
            "computed": false
          },
          "docblock": "列表为空显示内容"
        },
        "titles": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "node"
            }
          },
          "required": false,
          "description": "左右面板标题",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "左右面板标题"
        },
        "operations": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "node"
            }
          },
          "required": false,
          "description": "向右向左移动按钮显示内容",
          "defaultValue": {
            "value": "[<Icon type=\"arrow-right\" />, <Icon type=\"arrow-left\" />]",
            "computed": false
          },
          "docblock": "向右向左移动按钮显示内容\n@default [<Icon type=\"arrow-right\" />, <Icon type=\"arrow-left\" />]"
        },
        "defaultLeftChecked": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "左面板默认选中值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "左面板默认选中值"
        },
        "defaultRightChecked": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "右面板默认选中值",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "右面板默认选中值"
        },
        "listClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "左右面板列表自定义样式类名",
          "docblock": "左右面板列表自定义样式类名"
        },
        "listStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "左右面板列表自定义样式对象",
          "docblock": "左右面板列表自定义样式对象",
          "properties": []
        },
        "sortable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否允许拖拽排序",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否允许拖拽排序"
        },
        "onSort": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "拖拽排序时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "拖拽排序时触发的回调函数\n@param {Array} value 排序后的值\n@param {String} position 拖拽的面板位置，值为：left 或 right",
          "params": [{
            "name": "value",
            "description": "排序后的值",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "position",
              "description": "拖拽的面板位置，值为：left 或 right",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "locale": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义国际化文案对象",
          "defaultValue": {
            "value": "zhCN.Transfer",
            "computed": true
          },
          "docblock": "自定义国际化文案对象",
          "properties": []
        },
        "id": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "请设置 id 以保证transfer的可访问性",
          "docblock": "请设置 id 以保证transfer的可访问性"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Tree",
      "title": "树形控件",
      "typeId": 4,
      "props": {
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "树节点",
          "docblock": "树节点"
        },
        "dataSource": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "数据源，该属性优先级高于 children",
          "docblock": "数据源，该属性优先级高于 children"
        },
        "showLine": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示树的线",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示树的线"
        },
        "selectable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持选中节点",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否支持选中节点"
        },
        "selectedKeys": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于受控）当前选中节点 key 的数组",
          "docblock": "（用于受控）当前选中节点 key 的数组"
        },
        "defaultSelectedKeys": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于非受控）默认选中节点 key 的数组",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "（用于非受控）默认选中节点 key 的数组"
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选中或取消选中节点时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "选中或取消选中节点时触发的回调函数\n@param {Array} selectedKeys 选中节点key的数组\n@param {Object} extra 额外参数\n@param {Array} extra.selectedNodes 选中节点的数组\n@param {Object} extra.node 当前操作的节点\n@param {Boolean} extra.selected 当前操作是否是选中",
          "params": [{
            "name": "selectedKeys",
            "description": "选中节点key的数组",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.selectedNodes",
              "description": "选中节点的数组",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.node",
              "description": "当前操作的节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.selected",
              "description": "当前操作是否是选中",
              "type": {
                "name": "Boolean"
              }
            }
          ],
          "returns": null
        },
        "multiple": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持多选",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否支持多选"
        },
        "checkable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持勾选节点的复选框",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否支持勾选节点的复选框"
        },
        "checkedKeys": {
          "type": {
            "name": "union",
            "value": [{
              "name": "arrayOf",
              "value": {
                "name": "string"
              }
            },
              {
                "name": "object"
              }
            ]
          },
          "required": false,
          "description": "（用于受控）当前勾选复选框节点 key 的数组或 `{checked: Array, indeterminate: Array}` 的对象",
          "docblock": "（用于受控）当前勾选复选框节点 key 的数组或 `{checked: Array, indeterminate: Array}` 的对象"
        },
        "defaultCheckedKeys": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于非受控）默认勾选复选框节点 key 的数组",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "（用于非受控）默认勾选复选框节点 key 的数组"
        },
        "checkStrictly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "勾选节点复选框是否完全受控（父子节点选中状态不再关联）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "勾选节点复选框是否完全受控（父子节点选中状态不再关联）"
        },
        "checkedStrategy": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'all'",
              "computed": false,
              "description": "返回所有选中的节点"
            },
              {
                "value": "'parent'",
                "computed": false,
                "description": "父子节点都选中时只返回父节点"
              },
              {
                "value": "'child'",
                "computed": false,
                "description": "父子节点都选中时只返回子节点"
              }
            ]
          },
          "required": false,
          "description": "定义选中时回填的方式",
          "defaultValue": {
            "value": "'all'",
            "computed": false
          },
          "docblock": "定义选中时回填的方式\n@enumdesc 返回所有选中的节点, 父子节点都选中时只返回父节点, 父子节点都选中时只返回子节点",
          "value": [{
            "value": "'all'",
            "computed": false,
            "description": "返回所有选中的节点"
          },
            {
              "value": "'parent'",
              "computed": false,
              "description": "父子节点都选中时只返回父节点"
            },
            {
              "value": "'child'",
              "computed": false,
              "description": "父子节点都选中时只返回子节点"
            }
          ]
        },
        "onCheck": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "勾选或取消勾选复选框时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "勾选或取消勾选复选框时触发的回调函数\n@param {Array} checkedKeys 勾选复选框节点key的数组\n@param {Object} extra 额外参数\n@param {Array} extra.checkedNodes 勾选复选框节点的数组\n@param {Array} extra.checkedNodesPositions 包含有勾选复选框节点和其位置的对象的数组\n@param {Array} extra.indeterminateKeys 半选复选框节点 key 的数组\n@param {Object} extra.node 当前操作的节点\n@param {Boolean} extra.checked 当前操作是否是勾选",
          "params": [{
            "name": "checkedKeys",
            "description": "勾选复选框节点key的数组",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.checkedNodes",
              "description": "勾选复选框节点的数组",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.checkedNodesPositions",
              "description": "包含有勾选复选框节点和其位置的对象的数组",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.indeterminateKeys",
              "description": "半选复选框节点 key 的数组",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "extra.node",
              "description": "当前操作的节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.checked",
              "description": "当前操作是否是勾选",
              "type": {
                "name": "Boolean"
              }
            }
          ],
          "returns": null
        },
        "expandedKeys": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于受控）当前展开的节点 key 的数组",
          "docblock": "（用于受控）当前展开的节点 key 的数组"
        },
        "defaultExpandedKeys": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "（用于非受控）默认展开的节点 key 的数组",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "（用于非受控）默认展开的节点 key 的数组"
        },
        "defaultExpandAll": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否默认展开所有节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否默认展开所有节点"
        },
        "autoExpandParent": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否自动展开父节点",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否自动展开父节点"
        },
        "onExpand": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "展开或收起节点时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "展开或收起节点时触发的回调函数\n@param {Array} expandedKeys 展开的节点key的数组\n@param {Object} extra 额外参数\n@param {Object} extra.node 当前操作的节点\n@param {Boolean} extra.expanded 当前操作是否是展开",
          "params": [{
            "name": "expandedKeys",
            "description": "展开的节点key的数组",
            "type": {
              "name": "Array"
            }
          },
            {
              "name": "extra",
              "description": "额外参数",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.node",
              "description": "当前操作的节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "extra.expanded",
              "description": "当前操作是否是展开",
              "type": {
                "name": "Boolean"
              }
            }
          ],
          "returns": null
        },
        "editable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持编辑节点内容",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否支持编辑节点内容"
        },
        "onEditFinish": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "编辑节点内容完成时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "编辑节点内容完成时触发的回调函数\n@param {String} key 编辑节点的 key\n@param {String} label 编辑节点完成时节点的文本\n@param {Object} node 当前编辑的节点",
          "params": [{
            "name": "key",
            "description": "编辑节点的 key",
            "type": {
              "name": "String"
            }
          },
            {
              "name": "label",
              "description": "编辑节点完成时节点的文本",
              "type": {
                "name": "String"
              }
            },
            {
              "name": "node",
              "description": "当前编辑的节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "draggable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持拖拽节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否支持拖拽节点"
        },
        "onDragStart": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "开始拖拽节点时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "开始拖拽节点时触发的回调函数\n@param {Object} info 拖拽信息\n@param {Object} info.event 事件对象\n@param {Object} info.node 拖拽的节点",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "拖拽的节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "onDragEnter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "拖拽节点进入目标节点时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "拖拽节点进入目标节点时触发的回调函数\n@param {Object} info 拖拽信息\n@param {Object} info.event 事件对象\n@param {Object} info.node 目标节点\n@param {Array} info.expandedKeys 当前展开的节点key的数组",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "目标节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.expandedKeys",
              "description": "当前展开的节点key的数组",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "onDragOver": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "拖拽节点在目标节点上移动的时候触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "拖拽节点在目标节点上移动的时候触发的回调函数\n@param {Object} info 拖拽信息\n@param {Object} info.event 事件对象\n@param {Object} info.node 目标节点",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "目标节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "onDragLeave": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "拖拽节点离开目标节点时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "拖拽节点离开目标节点时触发的回调函数\n@param {Object} info 拖拽信息\n@param {Object} info.event 事件对象\n@param {Object} info.node 目标节点",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "目标节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "onDragEnd": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "拖拽节点拖拽结束时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "拖拽节点拖拽结束时触发的回调函数\n@param {Object} info 拖拽信息\n@param {Object} info.event 事件对象\n@param {Object} info.node 目标节点",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "目标节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "onDrop": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "拖拽节点放入目标节点内或前后触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "拖拽节点放入目标节点内或前后触发的回调函数\n@param {Object} info 拖拽信息\n@param {Object} info.event 事件对象\n@param {Object} info.node 目标节点\n@param {Object} info.dragNode 拖拽的节点\n@param {Array} info.dragNodesKeys 拖拽的节点和其子节点 key 的数组\n@param {Number} info.dropPosition 放置位置，-1代表当前节点前，0代表当前节点里，1代表当前节点后",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "目标节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.dragNode",
              "description": "拖拽的节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.dragNodesKeys",
              "description": "拖拽的节点和其子节点 key 的数组",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "info.dropPosition",
              "description": "放置位置，-1代表当前节点前，0代表当前节点里，1代表当前节点后",
              "type": {
                "name": "Number"
              }
            }
          ],
          "returns": null
        },
        "canDrop": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "节点是否可被作为拖拽的目标节点",
          "defaultValue": {
            "value": "() => true",
            "computed": false
          },
          "docblock": "节点是否可被作为拖拽的目标节点\n@param {Object} info 拖拽信息\n@param {Object} info.node 目标节点\n@param {Object} info.dragNode 拖拽的节点\n@param {Array} info.dragNodesKeys 拖拽的节点和其子节点 key 的数组\n@param {Number} info.dropPosition 放置位置，-1代表当前节点前，0代表当前节点里，1代表当前节点后\n@return {Boolean} 是否可以被当作目标节点",
          "params": [{
            "name": "info",
            "description": "拖拽信息",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.node",
              "description": "目标节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.dragNode",
              "description": "拖拽的节点",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.dragNodesKeys",
              "description": "拖拽的节点和其子节点 key 的数组",
              "type": {
                "name": "Array"
              }
            },
            {
              "name": "info.dropPosition",
              "description": "放置位置，-1代表当前节点前，0代表当前节点里，1代表当前节点后",
              "type": {
                "name": "Number"
              }
            }
          ],
          "returns": {
            "description": "是否可以被当作目标节点",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "loadData": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "异步加载数据的函数",
          "docblock": "异步加载数据的函数\n@param {Object} node 被点击展开的节点",
          "params": [{
            "name": "node",
            "description": "被点击展开的节点",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "filterTreeNode": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "按需筛选高亮节点",
          "docblock": "按需筛选高亮节点\n@param {Object} node 待筛选的节点\n@return {Boolean} 是否被筛选中",
          "params": [{
            "name": "node",
            "description": "待筛选的节点",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "是否被筛选中",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "onRightClick": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "右键点击节点时触发的回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "右键点击节点时触发的回调函数\n@param {Object} info 信息对象\n@param {Object} info.event 事件对象\n@param {Object} info.node 点击的节点",
          "params": [{
            "name": "info",
            "description": "信息对象",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "info.event",
              "description": "事件对象",
              "type": {
                "name": "Object"
              }
            },
            {
              "name": "info.node",
              "description": "点击的节点",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": null
        },
        "isLabelBlock": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "设置节点是否占满剩余空间，一般用于统一在各节点右侧添加元素(借助 flex 实现，暂时只支持 ie10+)",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "设置节点是否占满剩余空间，一般用于统一在各节点右侧添加元素(借助 flex 实现，暂时只支持 ie10+)"
        },
        "isNodeBlock": {
          "type": {
            "name": "union",
            "value": [{
              "name": "bool"
            },
              {
                "name": "object"
              }
            ]
          },
          "required": false,
          "description": "设置节点是否占满一行",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "设置节点是否占满一行"
        },
        "animation": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否开启展开收起动画",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否开启展开收起动画"
        },
        "focusedKey": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "当前获得焦点的子菜单或菜单项 key 值",
          "docblock": "当前获得焦点的子菜单或菜单项 key 值"
        }
      },
      "methods": [],
      "subComponents": [{
        "name": "Node",
        "title": "树形控件节点",
        "props": {
          "children": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "树节点",
            "docblock": "树节点"
          },
          "label": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "节点文本内容",
            "defaultValue": {
              "value": "'---'",
              "computed": false
            },
            "docblock": "节点文本内容"
          },
          "selectable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "单独设置是否支持选中，覆盖 Tree 的 selectable",
            "docblock": "单独设置是否支持选中，覆盖 Tree 的 selectable"
          },
          "checkable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "单独设置是否出现复选框，覆盖 Tree 的 checkable",
            "docblock": "单独设置是否出现复选框，覆盖 Tree 的 checkable"
          },
          "editable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "单独设置是否支持编辑，覆盖 Tree 的 editable",
            "docblock": "单独设置是否支持编辑，覆盖 Tree 的 editable"
          },
          "draggable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "单独设置是否支持拖拽，覆盖 Tree 的 draggable",
            "docblock": "单独设置是否支持拖拽，覆盖 Tree 的 draggable"
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁止节点响应",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否禁止节点响应"
          },
          "checkboxDisabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否禁止勾选节点复选框",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否禁止勾选节点复选框"
          },
          "isLeaf": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否是叶子节点，设置loadData时生效",
            "defaultValue": {
              "value": "false",
              "computed": false
            },
            "docblock": "是否是叶子节点，设置loadData时生效"
          }
        },
        "methods": []
      }]
    },
    {
      "name": "TreeSelect",
      "title": "树形选择器",
      "typeId": 3,
      "props": {
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "树节点",
          "docblock": "树节点"
        },
        "size": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'small'",
              "computed": false
            },
              {
                "value": "'medium'",
                "computed": false
              },
              {
                "value": "'large'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "选择框大小",
          "defaultValue": {
            "value": "'medium'",
            "computed": false
          },
          "docblock": "选择框大小"
        },
        "placeholder": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "选择框占位符",
          "docblock": "选择框占位符"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否禁用",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否禁用"
        },
        "hasArrow": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有下拉箭头",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否有下拉箭头"
        },
        "hasBorder": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有边框",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否有边框"
        },
        "hasClear": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否有清空按钮",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否有清空按钮"
        },
        "label": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "自定义内联 label",
          "docblock": "自定义内联 label"
        },
        "readOnly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否只读，只读模式下可以展开弹层但不能选择",
          "docblock": "是否只读，只读模式下可以展开弹层但不能选择"
        },
        "autoWidth": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "下拉框是否与选择器对齐",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "下拉框是否与选择器对齐"
        },
        "dataSource": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "object"
            }
          },
          "required": false,
          "description": "数据源，该属性优先级高于 children",
          "docblock": "数据源，该属性优先级高于 children"
        },
        "value": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "string"
                }
              }
            ]
          },
          "required": false,
          "description": "（受控）当前值",
          "docblock": "（受控）当前值"
        },
        "defaultValue": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "arrayOf",
                "value": {
                  "name": "string"
                }
              }
            ]
          },
          "required": false,
          "description": "（非受控）默认值",
          "defaultValue": {
            "value": "null",
            "computed": false
          },
          "docblock": "（非受控）默认值"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选中值改变时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "选中值改变时触发的回调函数\n@param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组\n@param {Object|Array} data 选中的数据，包括 value, label, pos, key属性，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点",
          "params": [{
            "name": "value",
            "description": "选中的值，单选时返回单个值，多选时返回数组",
            "type": {
              "name": "union",
              "value": [
                "String",
                "Array"
              ]
            }
          },
            {
              "name": "data",
              "description": "选中的数据，包括 value, label, pos, key属性，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点",
              "type": {
                "name": "union",
                "value": [
                  "Object",
                  "Array"
                ]
              }
            }
          ],
          "returns": null
        },
        "showSearch": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否显示搜索框",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否显示搜索框"
        },
        "onSearch": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "在搜索框中输入时触发的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "在搜索框中输入时触发的回调函数\n@param {String} keyword 输入的关键字",
          "params": [{
            "name": "keyword",
            "description": "输入的关键字",
            "type": {
              "name": "String"
            }
          }],
          "returns": null
        },
        "notFoundContent": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "无数据时显示内容",
          "defaultValue": {
            "value": "'Not Found'",
            "computed": false
          },
          "docblock": "无数据时显示内容"
        },
        "multiple": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否支持多选",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "是否支持多选"
        },
        "treeCheckable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "下拉框中的树是否支持勾选节点的复选框",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "下拉框中的树是否支持勾选节点的复选框"
        },
        "treeCheckStrictly": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联）",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联）"
        },
        "treeCheckedStrategy": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'all'",
              "computed": false,
              "description": "返回所有选中的节点"
            },
              {
                "value": "'parent'",
                "computed": false,
                "description": "父子节点都选中时只返回父节点"
              },
              {
                "value": "'child'",
                "computed": false,
                "description": "父子节点都选中时只返回子节点"
              }
            ]
          },
          "required": false,
          "description": "定义选中时回填的方式",
          "defaultValue": {
            "value": "'parent'",
            "computed": false
          },
          "docblock": "定义选中时回填的方式\n@enumdesc 返回所有选中的节点, 父子节点都选中时只返回父节点, 父子节点都选中时只返回子节点",
          "value": [{
            "value": "'all'",
            "computed": false,
            "description": "返回所有选中的节点"
          },
            {
              "value": "'parent'",
              "computed": false,
              "description": "父子节点都选中时只返回父节点"
            },
            {
              "value": "'child'",
              "computed": false,
              "description": "父子节点都选中时只返回子节点"
            }
          ]
        },
        "treeDefaultExpandAll": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "下拉框中的树是否默认展开所有节点",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "下拉框中的树是否默认展开所有节点"
        },
        "treeDefaultExpandedKeys": {
          "type": {
            "name": "arrayOf",
            "value": {
              "name": "string"
            }
          },
          "required": false,
          "description": "下拉框中的树默认展开节点key的数组",
          "defaultValue": {
            "value": "[]",
            "computed": false
          },
          "docblock": "下拉框中的树默认展开节点key的数组"
        },
        "treeLoadData": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "下拉框中的树异步加载数据的函数，使用请参考[Tree的异步加载数据Demo](https://fusion.design/component/tree)",
          "docblock": "下拉框中的树异步加载数据的函数，使用请参考[Tree的异步加载数据Demo](https://fusion.design/component/tree)\n@param {ReactElement} node 被点击展开的节点",
          "params": [{
            "name": "node",
            "description": "被点击展开的节点",
            "type": {
              "name": "ReactElement"
            }
          }],
          "returns": null
        },
        "treeProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传到 Tree 的属性对象",
          "defaultValue": {
            "value": "{}",
            "computed": false
          },
          "docblock": "透传到 Tree 的属性对象",
          "properties": []
        },
        "defaultVisible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "初始下拉框是否显示",
          "defaultValue": {
            "value": "false",
            "computed": false
          },
          "docblock": "初始下拉框是否显示"
        },
        "visible": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "当前下拉框是否显示",
          "docblock": "当前下拉框是否显示"
        },
        "onVisibleChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "下拉框显示或关闭时触发事件的回调函数",
          "defaultValue": {
            "value": "() => {}",
            "computed": false
          },
          "docblock": "下拉框显示或关闭时触发事件的回调函数\n@param {Boolean} visible 是否显示\n@param {String} type 触发显示关闭的操作类型",
          "params": [{
            "name": "visible",
            "description": "是否显示",
            "type": {
              "name": "Boolean"
            }
          },
            {
              "name": "type",
              "description": "触发显示关闭的操作类型",
              "type": {
                "name": "String"
              }
            }
          ],
          "returns": null
        },
        "popupStyle": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "下拉框自定义样式对象",
          "docblock": "下拉框自定义样式对象",
          "properties": []
        },
        "popupClassName": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "下拉框样式自定义类名",
          "docblock": "下拉框样式自定义类名"
        },
        "popupContainer": {
          "type": {
            "name": "union",
            "value": [{
              "name": "string"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "下拉框挂载的容器节点",
          "docblock": "下拉框挂载的容器节点"
        },
        "popupProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传到 Popup 的属性对象",
          "docblock": "透传到 Popup 的属性对象",
          "properties": []
        },
        "followTrigger": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否跟随滚动",
          "docblock": "是否跟随滚动"
        }
      },
      "methods": [],
      "subComponents": []
    },
    {
      "name": "Upload",
      "title": "上传组件",
      "typeId": 3,
      "props": {
        "action": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "上传的地址",
          "docblock": "上传的地址"
        },
        "accept": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)",
          "docblock": "接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)"
        },
        "data": {
          "type": {
            "name": "union",
            "value": [{
              "name": "object"
            },
              {
                "name": "func"
              }
            ]
          },
          "required": false,
          "description": "上传额外传参",
          "docblock": "上传额外传参"
        },
        "headers": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "设置上传的请求头部",
          "docblock": "设置上传的请求头部",
          "properties": []
        },
        "withCredentials": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "是否允许请求携带 cookie",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "是否允许请求携带 cookie"
        },
        "beforeUpload": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "可选参数, 详见 [beforeUpload](#beforeUpload)",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "可选参数, 详见 [beforeUpload](#beforeUpload)\n@param {Object} file 所有文件\n@param {Object} options 参数\n@returns {Boolean|Object|Promise} 返回值作用见demo",
          "params": [{
            "name": "file",
            "description": "所有文件",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "options",
              "description": "参数",
              "type": {
                "name": "Object"
              }
            }
          ],
          "returns": {
            "description": "返回值作用见demo",
            "type": {
              "name": "union",
              "value": [
                "Boolean",
                "Object",
                "Promise"
              ]
            }
          }
        },
        "onProgress": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "上传中",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "上传中",
          "params": [],
          "returns": null
        },
        "onSuccess": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "可选参数，上传成功回调函数，参数为请求下响应信息以及文件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "可选参数，上传成功回调函数，参数为请求下响应信息以及文件\n@param {Object} file 文件\n@param {Array<Object>} value 值",
          "params": [{
            "name": "file",
            "description": "文件",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "value",
              "description": "值",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "onError": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件\n@param {Object} file 出错的文件\n@param {Array} value 当前值",
          "params": [{
            "name": "file",
            "description": "出错的文件",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "value",
              "description": "当前值",
              "type": {
                "name": "Array"
              }
            }
          ],
          "returns": null
        },
        "children": {
          "type": {
            "name": "node"
          },
          "required": false,
          "description": "子元素",
          "docblock": "子元素"
        },
        "timeout": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "设置上传超时,单位ms",
          "docblock": "设置上传超时,单位ms"
        },
        "method": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'post'",
              "computed": false
            },
              {
                "value": "'put'",
                "computed": false
              }
            ]
          },
          "required": false,
          "description": "上传方法",
          "defaultValue": {
            "value": "'post'",
            "computed": false
          },
          "docblock": "上传方法"
        },
        "request": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "自定义上传方法",
          "docblock": "自定义上传方法\n@param {Object} option\n@return {Object} object with abort method",
          "params": [{
            "name": "option",
            "description": null,
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "object with abort method",
            "type": {
              "name": "Object"
            }
          }
        },
        "name": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "文件名字段",
          "docblock": "文件名字段"
        },
        "onSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "选择文件回调",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "选择文件回调",
          "params": [],
          "returns": null
        },
        "onDrop": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "放文件",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "放文件",
          "params": [],
          "returns": null
        },
        "prefix": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "样式前缀",
          "defaultValue": {
            "value": "'next-'",
            "computed": false
          },
          "docblock": "样式前缀"
        },
        "value": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "文件列表",
          "docblock": "文件列表"
        },
        "defaultValue": {
          "type": {
            "name": "array"
          },
          "required": false,
          "description": "默认文件列表",
          "docblock": "默认文件列表"
        },
        "shape": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'card'",
              "computed": false
            }]
          },
          "required": false,
          "description": "上传按钮形状",
          "docblock": "上传按钮形状"
        },
        "listType": {
          "type": {
            "name": "enum",
            "value": [{
              "value": "'text'",
              "computed": false,
              "description": "文字"
            },
              {
                "value": "'image'",
                "computed": false,
                "description": "图文"
              },
              {
                "value": "'card'",
                "computed": false,
                "description": "卡片"
              }
            ]
          },
          "required": false,
          "description": "上传列表的样式",
          "docblock": "上传列表的样式\n@enumdesc 文字, 图文, 卡片",
          "value": [{
            "value": "'text'",
            "computed": false,
            "description": "文字"
          },
            {
              "value": "'image'",
              "computed": false,
              "description": "图文"
            },
            {
              "value": "'card'",
              "computed": false,
              "description": "卡片"
            }
          ]
        },
        "formatter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)",
          "docblock": "数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)\n@param {Object} response 返回\n@param {File} file 文件对象",
          "params": [{
            "name": "response",
            "description": "返回",
            "type": {
              "name": "Object"
            }
          },
            {
              "name": "file",
              "description": "文件对象",
              "type": {
                "name": "File"
              }
            }
          ],
          "returns": null
        },
        "limit": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最大文件上传个数",
          "defaultValue": {
            "value": "Infinity",
            "computed": true
          },
          "docblock": "最大文件上传个数"
        },
        "dragable": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "可选参数，是否支持拖拽上传，`ie10+` 支持。",
          "docblock": "可选参数，是否支持拖拽上传，`ie10+` 支持。"
        },
        "useDataURL": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "可选参数，是否本地预览",
          "docblock": "可选参数，是否本地预览"
        },
        "disabled": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "可选参数，是否禁用上传功能",
          "docblock": "可选参数，是否禁用上传功能"
        },
        "onChange": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "上传文件改变时的状态",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "上传文件改变时的状态\n@param {Object} info 文件事件对象",
          "params": [{
            "name": "info",
            "description": "文件事件对象",
            "type": {
              "name": "Object"
            }
          }],
          "returns": null
        },
        "afterSelect": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.\n@param {Object} file\n@returns {Boolean} 返回false会阻止上传,其他则表示正常",
          "params": [{
            "name": "file",
            "description": null,
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "返回false会阻止上传,其他则表示正常",
            "type": {
              "name": "Boolean"
            }
          }
        },
        "onRemove": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "移除文件回调函数",
          "defaultValue": {
            "value": "func.noop",
            "computed": true
          },
          "docblock": "移除文件回调函数\n@param {Object} file 文件\n@returns {Boolean|Promise} 返回 false、Promise.resolve(false)、 Promise.reject() 将阻止文件删除",
          "params": [{
            "name": "file",
            "description": "文件",
            "type": {
              "name": "Object"
            }
          }],
          "returns": {
            "description": "返回 false、Promise.resolve(false)、 Promise.reject() 将阻止文件删除",
            "type": {
              "name": "union",
              "value": [
                "Boolean",
                "Promise"
              ]
            }
          }
        },
        "className": {
          "type": {
            "name": "string"
          },
          "required": false,
          "description": "自定义class",
          "docblock": "自定义class"
        },
        "style": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "自定义内联样式",
          "docblock": "自定义内联样式",
          "properties": []
        },
        "autoUpload": {
          "type": {
            "name": "bool"
          },
          "required": false,
          "description": "自动上传",
          "defaultValue": {
            "value": "true",
            "computed": false
          },
          "docblock": "自动上传"
        },
        "progressProps": {
          "type": {
            "name": "object"
          },
          "required": false,
          "description": "透传给Progress props",
          "docblock": "透传给Progress props",
          "properties": []
        }
      },
      "methods": [{
        "name": "selectFiles",
        "docblock": "对外暴露API, 添加文件\n@param files",
        "modifiers": [],
        "params": [{
          "name": "files",
          "description": null,
          "type": null
        }],
        "returns": null,
        "description": "对外暴露API, 添加文件"
      },
        {
          "name": "startUpload",
          "docblock": "对外暴露api，控制文件上传",
          "modifiers": [],
          "params": [],
          "returns": null,
          "description": "对外暴露api，控制文件上传"
        },
        {
          "name": "removeFile",
          "docblock": "删除文件\n@param {File} file\n@return {void}",
          "modifiers": [],
          "params": [{
            "name": "file",
            "description": null,
            "type": {
              "name": "File"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "void"
            }
          },
          "description": "删除文件"
        },
        {
          "name": "abort",
          "docblock": "取消上传\n@param {File} file\n@return {void}",
          "modifiers": [],
          "params": [{
            "name": "file",
            "description": null,
            "type": {
              "name": "File"
            }
          }],
          "returns": {
            "description": null,
            "type": {
              "name": "void"
            }
          },
          "description": "取消上传"
        }
      ],
      "subComponents": [{
        "name": "Card",
        "title": "卡片上传",
        "props": {
          "action": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "上传的地址",
            "docblock": "上传的地址"
          },
          "accept": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)",
            "docblock": "接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)"
          },
          "data": {
            "type": {
              "name": "union",
              "value": [{
                "name": "object"
              },
                {
                  "name": "func"
                }
              ]
            },
            "required": false,
            "description": "上传额外传参",
            "docblock": "上传额外传参"
          },
          "headers": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "设置上传的请求头部",
            "docblock": "设置上传的请求头部",
            "properties": []
          },
          "withCredentials": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "是否允许请求携带 cookie",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "是否允许请求携带 cookie"
          },
          "beforeUpload": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "可选参数, 详见 [beforeUpload](#beforeUpload)",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "可选参数, 详见 [beforeUpload](#beforeUpload)\n@param {Object} file 所有文件\n@param {Object} options 参数\n@returns {Boolean|Object|Promise} 返回值作用见demo",
            "params": [{
              "name": "file",
              "description": "所有文件",
              "type": {
                "name": "Object"
              }
            },
              {
                "name": "options",
                "description": "参数",
                "type": {
                  "name": "Object"
                }
              }
            ],
            "returns": {
              "description": "返回值作用见demo",
              "type": {
                "name": "union",
                "value": [
                  "Boolean",
                  "Object",
                  "Promise"
                ]
              }
            }
          },
          "onProgress": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "上传中",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "上传中",
            "params": [],
            "returns": null
          },
          "onSuccess": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "可选参数，上传成功回调函数，参数为请求下响应信息以及文件",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "可选参数，上传成功回调函数，参数为请求下响应信息以及文件\n@param {Object} file 文件\n@param {Array<Object>} value 值",
            "params": [{
              "name": "file",
              "description": "文件",
              "type": {
                "name": "Object"
              }
            },
              {
                "name": "value",
                "description": "值",
                "type": {
                  "name": "Array"
                }
              }
            ],
            "returns": null
          },
          "onError": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件\n@param {Object} file 出错的文件\n@param {Array} value 当前值",
            "params": [{
              "name": "file",
              "description": "出错的文件",
              "type": {
                "name": "Object"
              }
            },
              {
                "name": "value",
                "description": "当前值",
                "type": {
                  "name": "Array"
                }
              }
            ],
            "returns": null
          },
          "children": {
            "type": {
              "name": "node"
            },
            "required": false,
            "description": "子元素",
            "docblock": "子元素"
          },
          "timeout": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "设置上传超时,单位ms",
            "docblock": "设置上传超时,单位ms"
          },
          "method": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'post'",
                "computed": false
              },
                {
                  "value": "'put'",
                  "computed": false
                }
              ]
            },
            "required": false,
            "description": "上传方法",
            "defaultValue": {
              "value": "'post'",
              "computed": false
            },
            "docblock": "上传方法"
          },
          "request": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "自定义上传方法",
            "docblock": "自定义上传方法\n@param {Object} option\n@return {Object} object with abort method",
            "params": [{
              "name": "option",
              "description": null,
              "type": {
                "name": "Object"
              }
            }],
            "returns": {
              "description": "object with abort method",
              "type": {
                "name": "Object"
              }
            }
          },
          "name": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "文件名字段",
            "docblock": "文件名字段"
          },
          "onSelect": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "选择文件回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "选择文件回调",
            "params": [],
            "returns": null
          },
          "onDrop": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "放文件",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "放文件",
            "params": [],
            "returns": null
          },
          "prefix": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "样式前缀",
            "defaultValue": {
              "value": "'next-'",
              "computed": false
            },
            "docblock": "样式前缀"
          },
          "value": {
            "type": {
              "name": "array"
            },
            "required": false,
            "description": "文件列表",
            "docblock": "文件列表"
          },
          "defaultValue": {
            "type": {
              "name": "array"
            },
            "required": false,
            "description": "默认文件列表",
            "docblock": "默认文件列表"
          },
          "shape": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'card'",
                "computed": false
              }]
            },
            "required": false,
            "description": "上传按钮形状",
            "docblock": "上传按钮形状"
          },
          "listType": {
            "type": {
              "name": "enum",
              "value": [{
                "value": "'text'",
                "computed": false,
                "description": "文字"
              },
                {
                  "value": "'image'",
                  "computed": false,
                  "description": "图文"
                },
                {
                  "value": "'card'",
                  "computed": false,
                  "description": "卡片"
                }
              ]
            },
            "required": false,
            "description": "上传列表的样式",
            "docblock": "上传列表的样式\n@enumdesc 文字, 图文, 卡片",
            "value": [{
              "value": "'text'",
              "computed": false,
              "description": "文字"
            },
              {
                "value": "'image'",
                "computed": false,
                "description": "图文"
              },
              {
                "value": "'card'",
                "computed": false,
                "description": "卡片"
              }
            ]
          },
          "formatter": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)",
            "docblock": "数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)\n@param {Object} response 返回\n@param {File} file 文件对象",
            "params": [{
              "name": "response",
              "description": "返回",
              "type": {
                "name": "Object"
              }
            },
              {
                "name": "file",
                "description": "文件对象",
                "type": {
                  "name": "File"
                }
              }
            ],
            "returns": null
          },
          "limit": {
            "type": {
              "name": "number"
            },
            "required": false,
            "description": "最大文件上传个数",
            "defaultValue": {
              "value": "Infinity",
              "computed": true
            },
            "docblock": "最大文件上传个数"
          },
          "dragable": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "可选参数，是否支持拖拽上传，`ie10+` 支持。",
            "docblock": "可选参数，是否支持拖拽上传，`ie10+` 支持。"
          },
          "useDataURL": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "可选参数，是否本地预览",
            "docblock": "可选参数，是否本地预览"
          },
          "disabled": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "可选参数，是否禁用上传功能",
            "docblock": "可选参数，是否禁用上传功能"
          },
          "onChange": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "改变时候的回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "改变时候的回调",
            "params": [],
            "returns": null
          },
          "afterSelect": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.\n@param {Object} file\n@returns {Boolean} 返回false会阻止上传,其他则表示正常",
            "params": [{
              "name": "file",
              "description": null,
              "type": {
                "name": "Object"
              }
            }],
            "returns": {
              "description": "返回false会阻止上传,其他则表示正常",
              "type": {
                "name": "Boolean"
              }
            }
          },
          "onRemove": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "点击移除的回调",
            "docblock": "点击移除的回调",
            "params": [],
            "returns": null
          },
          "className": {
            "type": {
              "name": "string"
            },
            "required": false,
            "description": "自定义class",
            "docblock": "自定义class"
          },
          "style": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "自定义内联样式",
            "docblock": "自定义内联样式",
            "properties": []
          },
          "autoUpload": {
            "type": {
              "name": "bool"
            },
            "required": false,
            "description": "自动上传",
            "defaultValue": {
              "value": "true",
              "computed": false
            },
            "docblock": "自动上传"
          },
          "progressProps": {
            "type": {
              "name": "object"
            },
            "required": false,
            "description": "透传给Progress props",
            "docblock": "透传给Progress props",
            "properties": []
          },
          "onPreview": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "点击图片回调",
            "defaultValue": {
              "value": "func.noop",
              "computed": true
            },
            "docblock": "点击图片回调",
            "params": [],
            "returns": null
          },
          "onCancel": {
            "type": {
              "name": "func"
            },
            "required": false,
            "description": "取消上传的回调",
            "docblock": "取消上传的回调",
            "params": [],
            "returns": null
          }
        },
        "methods": [],
        "description": "继承 Upload 的 API，除非特别说明"
      },
        {
          "name": "Dragger",
          "title": "拖拽上传",
          "props": {
            "prefix": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "样式前缀",
              "defaultValue": {
                "value": "'next-'",
                "computed": false
              },
              "docblock": "样式前缀"
            }
          },
          "methods": [],
          "description": "IE10+ 支持。继承 Upload 的 API，除非特别说明"
        },
        {
          "name": "Selecter",
          "title": "自定义上传",
          "props": {
            "disabled": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否禁用上传功能",
              "docblock": "是否禁用上传功能"
            },
            "multiple": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件",
              "defaultValue": {
                "value": "false",
                "computed": false
              },
              "docblock": "是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件"
            },
            "dragable": {
              "type": {
                "name": "bool"
              },
              "required": false,
              "description": "是否支持拖拽上传，`ie10+` 支持。",
              "docblock": "是否支持拖拽上传，`ie10+` 支持。"
            },
            "accept": {
              "type": {
                "name": "string"
              },
              "required": false,
              "description": "接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)",
              "docblock": "接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)"
            },
            "onSelect": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "文件选择回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "文件选择回调",
              "params": [],
              "returns": null
            },
            "onDragOver": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "拖拽经过回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "拖拽经过回调",
              "params": [],
              "returns": null
            },
            "onDragLeave": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "拖拽离开回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "拖拽离开回调",
              "params": [],
              "returns": null
            },
            "onDrop": {
              "type": {
                "name": "func"
              },
              "required": false,
              "description": "拖拽完成回调",
              "defaultValue": {
                "value": "func.noop",
                "computed": true
              },
              "docblock": "拖拽完成回调",
              "params": [],
              "returns": null
            }
          },
          "methods": [{
            "name": "onClick",
            "docblock": "点击上传按钮\n@return {void}",
            "modifiers": [],
            "params": [],
            "returns": {
              "description": null,
              "type": {
                "name": "void"
              }
            },
            "description": "点击上传按钮"
          },
            {
              "name": "onKeyDown",
              "docblock": "键盘事件\n@param  {SyntheticEvent} e\n@return {void}",
              "modifiers": [],
              "params": [{
                "name": "e",
                "description": null,
                "type": {
                  "name": "SyntheticEvent"
                }
              }],
              "returns": {
                "description": null,
                "type": {
                  "name": "void"
                }
              },
              "description": "键盘事件"
            },
            {
              "name": "onDrop",
              "docblock": "拖拽\n@param  {SyntheticEvent} e\n@return {void}",
              "modifiers": [],
              "params": [{
                "name": "e",
                "description": null,
                "type": {
                  "name": "SyntheticEvent"
                }
              }],
              "returns": {
                "description": null,
                "type": {
                  "name": "void"
                }
              },
              "description": "拖拽"
            }
          ],
          "description": "[底层能力] 可自定义样式的文件选择器"
        }
      ]
    },
    {
      "name": "VirtualList",
      "title": "虚拟滚动列表",
      "typeId": 6,
      "props": {
        "children": {
          "type": {
            "name": "any"
          },
          "required": false,
          "description": "渲染的子节点",
          "docblock": "渲染的子节点"
        },
        "minSize": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "最小加载数量",
          "defaultValue": {
            "value": "1",
            "computed": false
          },
          "docblock": "最小加载数量"
        },
        "pageSize": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "一屏数量",
          "defaultValue": {
            "value": "10",
            "computed": false
          },
          "docblock": "一屏数量"
        },
        "itemsRenderer": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "父渲染函数，默认为 (items, ref) => <ul ref={ref}>{items}</ul>",
          "defaultValue": {
            "value": "(items, ref) => <ul ref={ref}>{items}</ul>",
            "computed": false
          },
          "docblock": "父渲染函数，默认为 (items, ref) => <ul ref={ref}>{items}</ul>",
          "params": [],
          "returns": null
        },
        "threshold": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "缓冲区高度",
          "defaultValue": {
            "value": "100",
            "computed": false
          },
          "docblock": "缓冲区高度"
        },
        "itemSizeGetter": {
          "type": {
            "name": "func"
          },
          "required": false,
          "description": "获取item高度的函数",
          "docblock": "获取item高度的函数",
          "params": [],
          "returns": null
        },
        "jumpIndex": {
          "type": {
            "name": "number"
          },
          "required": false,
          "description": "设置跳转位置，需要设置 itemSizeGetter 才能生效, 不设置认为元素等高并取第一个元素高度作为默认高",
          "defaultValue": {
            "value": "0",
            "computed": false
          },
          "docblock": "设置跳转位置，需要设置 itemSizeGetter 才能生效, 不设置认为元素等高并取第一个元素高度作为默认高"
        }
      },
      "methods": [],
      "subComponents": []
    }
  ]
}
