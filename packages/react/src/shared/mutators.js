import { isArr, isNum, toArr } from '../utils'

const flatArr = arr =>
  arr.reduce((buf, item) => {
    return isArr(item) ? buf.concat(flatArr(item)) : buf.concat(item)
  }, [])

export const createMutators = props => {
  return {
    change(value) {
      props.form.setValue(props.name, value)
    },
    dispatch(name, payload) {
      props.form.triggerEffect(name, {
        name: props.name,
        path: props.path,
        payload
      })
    },
    errors(errors, ...args) {
      props.form.setErrors(props.name, flatArr(toArr(errors)), ...args)
    },
    push(value) {
      const arr = toArr(props.form.getValue(props.name))
      props.form.setValue(props.name, arr.concat(value))
    },
    pop() {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.pop()
      props.form.setValue(props.name, arr)
    },
    insert(index, value) {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.splice(index, 0, value)
      props.form.setValue(props.name, arr)
    },
    remove(index) {
      let val = props.form.getValue(props.name)
      if (isNum(index) && isArr(val)) {
        val = [].concat(val)
        val.splice(index, 1)
        props.form.setValue(props.name, val)
      } else {
        props.form.removeValue(props.name)
      }
    },
    unshift(value) {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.unshift(value)
      props.form.setValue(props.name, arr)
    },
    shift() {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.shift()
      props.form.setValue(props.name, arr)
    },
    move($from, $to) {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      const item = arr[$from]
      arr.splice($from, 1)
      arr.splice($to, 0, item)
      props.form.setValue(props.name, arr)
    }
  }
}
