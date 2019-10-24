export default {
  next: [
    {
      name: 'Affix',
      title: '固钉',
      typeId: 6,
      props: {
        container: {
          type: {
            name: 'func'
          },
          required: false,
          description: '设置 Affix 需要监听滚动事件的容器元素',
          defaultValue: {
            value: '() => window',
            computed: false
          },
          docblock:
            '设置 Affix 需要监听滚动事件的容器元素\n@return {ReactElement} 目标容器元素的实例',
          params: [],
          returns: {
            description: '目标容器元素的实例',
            type: {
              name: 'ReactElement'
            }
          }
        },
        offsetTop: {
          type: {
            name: 'number'
          },
          required: false,
          description: '距离窗口顶部达到指定偏移量后触发',
          docblock: '距离窗口顶部达到指定偏移量后触发'
        },
        offsetBottom: {
          type: {
            name: 'number'
          },
          required: false,
          description: '距离窗口底部达到制定偏移量后触发',
          docblock: '距离窗口底部达到制定偏移量后触发'
        },
        onAffix: {
          type: {
            name: 'func'
          },
          required: false,
          description: '当元素的样式发生固钉样式变化时触发的回调函数',
          defaultValue: {
            value: 'func.noop',
            computed: true
          },
          docblock:
            '当元素的样式发生固钉样式变化时触发的回调函数\n@param {Boolean} 元素是否被固钉',
          params: [
            {
              name: '元素是否被固钉',
              description: null,
              type: {
                name: 'Boolean'
              }
            }
          ],
          returns: null
        },
        useAbsolute: {
          type: {
            name: 'bool'
          },
          required: false,
          description: '是否启用绝对布局实现 affix',
          docblock:
            '是否启用绝对布局实现 affix\n@param {Boolean} 是否启用绝对布局'
        }
      },
      methods: [],
      subComponents: []
    }
  ]
}
