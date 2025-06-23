import React from 'react'

import { autorun, batch, reaction, observable } from '@formily/reactive'

const fieldA = observable({
  value: '',
  visible: true,
})

const fieldB = observable({
  value: '',
  visible: true,
  cache: '',
})

const fieldC = observable({
  value: '',
  visible: true,
  cache: '',
})

// ===== fieldB reaction =====
reaction(
  () => fieldB.value,
  () => {
    if (fieldB.value && fieldB.visible === false) {
      fieldB.cache = fieldB.value
      // 删除 fieldB.value 时，会重新 runReaction
      delete fieldB.value
    }
  }
)

reaction(
  () => fieldB.visible,
  () => {
    if (fieldB.visible === true) {
      // debugger
      console.log('fieldB.cache: ', fieldB.cache)
      // 执行到这里时，不会执行 fieldB.value 的 autorun，因为在上面 delete fieldB.value 时，已经执行了
      fieldB.value = fieldB.cache
    }
  }
)

// ===== fieldC reaction =====
reaction(
  () => fieldC.value,
  () => {
    if (fieldC.value && fieldC.visible === false) {
      fieldC.cache = fieldC.value
      delete fieldC.value
    }
  }
)

reaction(
  () => fieldC.visible,
  () => {
    if (fieldC.visible === true) {
      fieldC.value = fieldC.cache
    }
  }
)

// ===== schema 渲染 =====
autorun(() => {
  fieldB.visible = fieldA.value === 'fieldA'
}, 'A')

autorun(() => {
  fieldC.visible = fieldB.value === 'fieldB'
}, 'B')

// fieldB.value = 'fieldB'
// fieldC.value = 'fieldC'
// fieldA.value = 'fieldA'

batch(() => {
  fieldB.value = 'fieldB'
  fieldC.value = 'fieldC'
  // debugger
  fieldA.value = 'fieldA'
  // window.xxx = true
})

console.log(
  'fieldA.visible:',
  fieldA.visible,
  'fieldB.visible:',
  fieldB.visible,
  'fieldC.visible:',
  fieldC.visible
)

const App = () => <div>123123</div>

export default App
