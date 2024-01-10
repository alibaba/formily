<template>
  <Button @click="handleOpen">点击打开表单</Button>
</template>

<script>
import { FormDrawer, FormLayout, FormItem, Input } from '@formily/element'
import { Button } from 'element-ui'
import { Field } from '@formily/vue'

export default {
  components: { Button },
  data() {
    return {}
  },
  methods: {
    handleOpen() {
      FormDrawer('抽屉表单', () => (
        <FormLayout labelCol={6} wrapperCol={10}>
          <Field
            name="aaa"
            required
            title="输入框1"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="bbb"
            required
            title="输入框2"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="ccc"
            required
            title="输入框3"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="ddd"
            required
            title="输入框4"
            decorator={[FormItem]}
            component={[Input]}
          />
          <FormDrawer.Footer>
            <span style={{ marginLeft: '4px' }}>扩展文案</span>
          </FormDrawer.Footer>
        </FormLayout>
      ))
        .open({
          initialValues: {
            aaa: '123',
          },
        })
        .then((values) => {
          console.log('values', values)
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
