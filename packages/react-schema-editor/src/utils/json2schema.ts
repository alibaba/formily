/**
 * JSON 转换为 Schema
 * @param json
 * @param parentsPath
 */
export function json2schema(json: any, parentsPath?: string) {
  let schema: any
  const newParentsPath = parentsPath || 'root'
  const type = getType(json)
  const component = getBasicComponent(type)

  if (type === 'object') {
    schema = schema || {
      title: '',
      type,
      properties: Object.keys(json).reduce((result, key) => {
        result[key] = json2schema(json[key], newParentsPath + '.' + key)
        return result
      }, {}),
      description: ''
    }
  } else if (type === 'array') {
    schema = schema || {
      title: '',
      type,
      items:
        json.length <= 0 ? null : json2schema(json[0], newParentsPath + '[0]'),
      description: '',
      'x-component': component
    }
  } else {
    schema = {
      title: '',
      type,
      example: json,
      enum: [],
      description: '',
      'x-component': component
    }
  }

  return schema
}

function isPlainObject(obj: any) {
  return obj
    ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype
    : false
}

/**
 * 获取值类型
 * @param data
 */
function getType(data: any) {
  let type = ''

  if (isPlainObject(data)) {
    type = 'object'
  }

  if (Array.isArray(data)) {
    type = 'array'
  }

  return type || typeof data
}

/**
 * 根据数据推算出对应的组件类型
 * 策略：
 * 1. 如果是数组类型，如果子元素是一个对象，则更有可能是重复组件
 * 2. 默认是 Input 输入框
 * 3. Object 类型不处理
 * 4. 如果文本超过 40 个字，默认推导为 textArea
 * @param data
 */
function getBasicComponent(data: any) {
  const type = getType(data)
  const typeMap = {
    string: 'Input',
    number: 'Number',
    boolean: 'Switch',
    array: 'CardList'
  }

  let component = ''
  if (type === 'array') {
    component = getType(data[0]) === 'object' ? 'CardList' : 'Checkbox'
  } else if (type === 'string' && type.length >= 40) {
    component = 'TextArea'
  } else {
    component = typeMap[type]
  }

  return component || 'Input'
}
