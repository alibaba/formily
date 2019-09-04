import { isArr, flatArr, isNum, toArr } from '../utils'

export const createMutators = props => {
  return {
    change(value: any): void {
      props.form.setValue(props.name, value)
    },

    dispatch(name: string, payload: any) {
      props.form.dispatchEffect(name, {
        name: props.name,
        path: props.path,
        payload
      })
    },

    errors(errors: string[] | string, ...args) {
      props.form.setErrors(props.name, flatArr(toArr(errors)), ...args)
    },

    push(value: any): void {
      const arr = toArr(props.form.getValue(props.name))
      props.form.setValue(props.name, arr.concat(value))
    },

    pop(): void {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.pop()
      props.form.setValue(props.name, arr)
    },

    insert(index: number, value: any): void {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.splice(index, 0, value)
      props.form.setValue(props.name, arr)
    },

    remove(index: number): void {
      let val = props.form.getValue(props.name)
      if (isNum(index) && isArr(val)) {
        val = [].concat(val)
        val.splice(index, 1)
        props.form.setValue(props.name, val)
      } else {
        props.form.removeValue(props.name)
      }
    },

    unshift(value: any): void {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.unshift(value)
      props.form.setValue(props.name, arr)
    },

    shift(): void {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      arr.shift()
      props.form.setValue(props.name, arr)
    },

    move($from: number, $to: number): void {
      const arr = [].concat(toArr(props.form.getValue(props.name)))
      const item = arr[$from]
      arr.splice($from, 1)
      arr.splice($to, 0, item)
      props.form.setValue(props.name, arr)
    }
  }
}
