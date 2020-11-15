# @formily/vue

English | [简体中文](./README.zh-cn.md)

> @formily/vue is based on `vue`(v2.x with `@vue/composition-api`) and @formily/core is already built in. It provide API to manuplate form state and components for rendering support.
> it mainly includes:
>
> - Form
> - Field
> - VirtualField
> - FormaSpy
> - FormProvider
> - FormConsumer(deprecated，pls using FormSpy)
> - createFormActions (create sync API to manuplate form state)
> - createAsyncFormActions (create async API to manuplate form state)
> - FormEffectHooks (LifeCycles Hook)

### Install

```bash
npm install --save @formily/vue
```

### Table Of Contents

<!-- toc -->

- [`Usage`](#Usage)
  - [`Quick Start`](#Quick-Start)
  - [`Basic Field`](#Basic-Field)
  - [`Validation`](#Validation)
  - [`Object Field`](#Object-Field)
  - [`ArrayField`](#ArrayField)
  - [`ArrayField<Object>`](#ArrayField<Object>)
  - [`display and visible`](#display-visible)
  - [`Linkage`](#Linkage)
  - [`Async Linkage`](#Async-Linkage)
  - [`Linkage Validation`](#Linkage-Validation)
  - [`Complex Linkage`](#Complex-Linkage)
  - [`Reuse Effects`](#Reuse-Effects)
  - [`Combo`](#Combo)
  - [`Provide and FormSpy`](#Provide-and-FormSpy)

### Usage

#### Preparation

```javascript
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

#### Quick Start

```html
<template>
  <form :actions="actions" :effects="effects" :on-change="() => {}">
    <label>username: </label>
    <Field name="username">
      <template #default="{ state, mutators }">
        <input
          :disabled="!state.editable"
          :value="state.value || ''"
          @input="mutators.change"
          @blur="mutators.blur"
          @focus="mutators.focus"
        />
        {{ state.errors }} {{ state.warnings }}
      </template>
    </Field>
  </form>
</template>

<script>
  import { Form, Field, FormEffectHooks, createFormActions } from '@formily/vue'

  export default {
    components: { Form, Field },
    data() {
      const { onFormInit$, onFieldValueChange$ } = FormEffectHooks
      const actions = createFormActions()
      const effects = () => {
        onFormInit$().subscribe(() => {
          console.log('initialized')
        })
        onFieldValueChange$().subscribe(state => {
          console.log('field change', state)
        })
      }

      return {
        actions,
        effects
      }
    }
  }
</script>
```

#### Basic Field

Example：Show you how to bind the `<input>` field and subsequent examples are based on this field

```html
<Field v-bind="$attrs">
  <template #default="{ state, mutators }">
    <input
      :disabled="!state.editable"
      :value="state.value || ''"
      @input="mutators.change"
      @blur="mutators.blur"
      @focus="mutators.focus"
    />
    {{ state.errors }} {{ state.warnings }}
  </template>
</Field>
```

#### Validation

Example：required validation + error type validation + warning type validation + custom validation
The type of rules is [ValidatePatternRules](#ValidatePatternRules) which is [InternalFormats](#InternalFormats) | [CustomValidator](#CustomValidator) | [ValidateDescription](#ValidateDescription) | [ValidateArrayRules](#ValidateArrayRules)

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions">
    <h5>required validation</h5>
    <span>username</span>
    <InputField name="username" required />

    <h5>error type validation</h5>
    <span>age</span>
    <InputField
      name="age"
      :rules="[
        val =>
          val === ''
            ? { type: 'error', message: 'age is required' }
            : undefined
      ]"
    />

    <h5>warning type validation</h5>
    <span>gender</span>
    <InputField
      name="gender"
      :rules="[
        val =>
          val === ''
            ? { type: 'warning', message: 'gender is required' }
            : undefined
      ]"
    />

    <h5>built-in validation default to error type validation</h5>
    <span>id</span>
    <InputField
      name="id"
      :rules="[
        {
          format: 'number',
          message: 'id is not a number.'
        }
      ]"
    />

    <h5>custom validation</h5>
    <span>verifyCode</span>
    <InputField
      name="verifyCode"
      :rules="[
        {
          validator(value) {
            return value === undefined
              ? 'This field can not be empty, please enter {{scope.outerVariable}}'
              : undefined
          },
          scope: {
            outerVariable: '456'
          }
        },

        {
          validator(value) {
            return value === '456'
              ? { type: 'error', message: 'This field can not be 456' }
              : undefined
          }
        }
      ]"
    />

    <div>
      <button @click="handleClick">
        validate
      </button>
    </div>
  </form>
</template>

<script>
  import { Form, createFormActions } from '@formily/vue'
  import InputField from './components/input.vue'

  export default {
    components: { Form, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      handleClick() {
        const result = this.actions.validate()
        console.log(this.actions.getFormState(state => state.values))
        result.then(validateResp => {
          console.log(validateResp)
        })
      }
    }
  }
</script>
```

#### Object Field

Example：User info `user(username, age)`

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions">
    <span>user</span>
    <Field
      name="user"
      :initial-value="{
        username: undefined,
        age: undefined
      }"
    >
      <template #default="{ state, mutators }">
        <template v-for="(value, key) in state.value">
          <template v-if="!mutators.exist(key)"></template>
          <div v-else :key="key">
            <span>{{ key }}</span>
            <InputField :name="`user.${key}`" />
            <button
              @click="
                () => {
                  mutators.remove(key)
                }
              "
            >
              x
            </button>
          </div>
        </template>
        <button
          @click="
            () => {
              mutators.change({
                ...state.value,
                [new Date().getTime()]: new Date().getTime()
              })
            }
          "
        >
          +
        </button>
        <button @click="print">
          print
        </button>
      </template>
    </Field>
  </form>
</template>

<script>
  import { Form, Field, createFormActions } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, Field, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      print() {
        console.log(
          'values',
          this.actions.getFormState(state => state.values)
        )
      }
    }
  }
</script>
```

#### ArrayField

Example：Id list

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions">
    <Field name="idList" :initial-value="['1', '2', '3']">
      <template #default="{ state, mutators }">
        <template v-for="(item, index) in state.value">
          <div :key="`${index}-${item}`">
            <InputField :name="`idList[${index}]`" />
            <button @click="() => mutators.remove(index)">
              Remove
            </button>
          </div>
        </template>
        <button @click="() => mutators.push(Math.random())">
          Add Item
        </button>
      </template>
    </Field>
  </form>
</template>

<script>
  import { Form, Field, createFormActions } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, Field, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    }
  }
</script>
```

#### ArrayField<Object>

Example：User list

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions">
    <Field
      name="userList"
      :value="[
        { username: 'bobby', age: 21 },
        { username: 'lily', age: 20 }
      ]"
    >
      <template #default="{ state, mutators }">
        <template v-for="(item, index) in state.value">
          <div :key="`userList[${index}]`">
            <Field :name="`userList[${index}]`">
              <template
                #default="{ state: innerState, mutators: innerMutator }"
              >
                <template v-for="(value, key) in innerState.value">
                  {{ value }}
                  <template v-if="!innerMutator.exist(key)"></template>
                  <div v-else :key="`userList[${index}].${key}`">
                    <InputField :name="`userList[${index}].${key}`" />
                    <button
                      @click="
                        () => {
                          innerMutator.remove(key)
                        }
                      "
                    >
                      x
                    </button>
                  </div>
                </template>
                <button
                  @click="
                    () => {
                      innerMutator.change({
                        ...innerState.value,
                        [new Date().getTime()]: new Date().getTime()
                      })
                    }
                  "
                >
                  +
                </button>
              </template>
            </Field>

            <button @click="() => mutators.remove(index)">
              Remove
            </button>
          </div>
        </template>
        <button
          @click="
            () =>
              mutators.push({
                username: undefined,
                age: undefined
              })
          "
        >
          Add Item
        </button>
        <button @click="print">
          print
        </button>
      </template>
    </Field>
  </form>
</template>

<script>
  import { Form, Field, createFormActions } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, Field, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      print() {
        console.log(this.actions.getFormState(state => state.values))
      }
    }
  }
</script>
```

#### display visible

示例: display 与 visible 对 values 的影响

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

CheckedField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        type="checkbox"
        :checked="!!state.value"
        @change="
          () => {
            mutators.change(!state.value)
          }
        "
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions" :effects="effects">
    <div>
      <CheckedField label="visible" name="visibleTrigger" />
      <InputField name="a" label="a" />
    </div>
    <div>
      <CheckedField label="display" name="displayTrigger" />
      <InputField name="b" label="b" />
    </div>

    <FormSpy>
      <template #default="{ form }">
        <code>
          <pre>
            {{
              JSON.stringify(
                form.getFormState(state => state.values),
                null,
                2
              )
            }}
          </pre>
        </code>
      </template>
    </FormSpy>

    <button @click="print">
      print
    </button>
  </form>
</template>

<script>
  import {
    Form,
    FormSpy,
    createFormActions,
    LifeCycleTypes
  } from '@formily/vue'
  import InputField from './input.vue'
  import CheckedField from './checkbox.vue'

  export default {
    components: { Form, FormSpy, InputField, CheckedField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      print() {
        console.log(this.actions.getFormState(state => state.values))
      },
      effects($, { setFieldState }) {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('displayTrigger', state => (state.value = true))
          setFieldState('visibleTrigger', state => (state.value = true))
          setFieldState('a', state => (state.value = 1))
          setFieldState('b', state => (state.value = 2))
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'visibleTrigger').subscribe(
          fieldState => {
            setFieldState('a', state => {
              state.visible = fieldState.value
            })
          }
        )

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'displayTrigger').subscribe(
          fieldState => {
            setFieldState('b', state => {
              state.display = fieldState.value
            })
          }
        )
      }
    }
  }
</script>
```

#### Linkage

Example：Show/hide field and modified props/value by using effects

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

CheckedField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        type="checkbox"
        :checked="!!state.value"
        @change="
          () => {
            mutators.change(!state.value)
          }
        "
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions" :effects="effects">
    <CheckedField name="trigger" label="show/hide" />
    <InputField label="a" name="a" />
    <InputField label="a-copy" name="a-copy" />
  </form>
</template>

<script>
  import { Form, createFormActions, LifeCycleTypes } from '@formily/vue'
  import InputField from './input.vue'
  import CheckedField from './checkbox.vue'

  export default {
    components: { Form, InputField, CheckedField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      effects($, { setFieldState }) {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('a~', state => (state.visible = false))
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
          triggerState => {
            setFieldState('a~', state => {
              state.visible = triggerState.value
            })
          }
        )

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe(fieldState => {
          setFieldState('a-copy', state => {
            state.value = fieldState.value
          })
        })
      }
    }
  }
</script>
```

#### Async Linkage

Example：Change dataSource in select asynchronously by effects

CheckedField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        type="checkbox"
        :checked="!!state.value"
        @change="
          () => {
            mutators.change(!state.value)
          }
        "
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

SelectField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <select
        :disabled="!state.editable"
        :value="state.value || ''"
        :onChange="mutators.change"
        :onBlur="mutators.blur"
        :onFocus="mutators.focus"
      >
        <template v-for="(item, index) in state.props.dataSource">
          <option :key="index" :value="item.value">
            {{ item.label }}
          </option>
        </template>
      </select>
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions" :effects="effects">
    <CheckedField name="trigger" label="show/reset dataSource" />
    <SelectField label="sync-source" name="sync-source" />
    <SelectField label="async-source" name="async-source" />
  </form>
</template>

<script>
  import { Form, createFormActions, LifeCycleTypes } from '@formily/vue'
  import SelectField from './select.vue'
  import CheckedField from './checkbox.vue'

  export default {
    components: { Form, CheckedField, SelectField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      effects($, { setFieldState }) {
        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
          fieldState => {
            const dataSource = [
              { label: 'aa', value: 'aa' },
              { label: 'bb', value: 'bb' }
            ]
            setFieldState('sync-source', state => {
              state.props.dataSource = fieldState.value ? dataSource : []
            })
            setFieldState('async-source', state => {
              state.props.loading = true
            })

            setTimeout(() => {
              setFieldState('async-source', state => {
                state.props.loading = false
                state.props.dataSource = fieldState.value ? dataSource : []
              })
            }, 300)
          }
        )
      }
    }
  }
</script>
```

#### Linkage Validation

Example：validation when form mounted and re-trigger validation when field change

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions" :effects="effects">
    <InputField label="a" name="a" />
    <InputField label="a-copy" name="a-copy" required />
  </form>
</template>

<script>
  import { Form, createFormActions, LifeCycleTypes } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      effects($, { validate, setFieldState }) {
        $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(() => {
          validate()
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe(fieldState => {
          setFieldState('a-copy', state => {
            state.value = fieldState.value
          })
        })
      }
    }
  }
</script>
```

#### Complex Linkage

Example：See how ArrayField communicate with other field by using effects

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions" :effects="effects">
    <label>show/hide username</label>
    <Field name="trigger">
      <template #default="{ state, mutators }">
        <input
          type="checkbox"
          :checked="state.value ? 'checked' : undefined"
          @change="mutators.change"
        />
      </template>
    </Field>
    <div>
      <Field
        :initial-value="[
          { username: 'bobby', age: 22 },
          { username: 'lily', age: 21 }
        ]"
        name="userList"
      >
        <template #default="{ state, mutators }">
          <template v-for="(item, index) in state.value">
            <div :key="`userList[${index}]`">
              <Field :name="`userList[${index}]`">
                <template
                  #default="{ state: innerState, mutators: innerMutator }"
                >
                  <div
                    v-for="(value, key) in innerState.value"
                    :key="`userList[${index}].${key}`"
                  >
                    <template v-if="!innerMutator.exist(key)"></template>
                    <InputField
                      :label="key"
                      :name="`userList[${index}].${key}`"
                    />
                  </div>
                  <button
                    @click="
                      () => {
                        innerMutator.change({
                          ...innerState.value,
                          [new Date().getTime()]: new Date().getTime()
                        })
                      }
                    "
                  >
                    +
                  </button>
                </template>
              </Field>

              <button @click="() => mutators.remove(index)">
                Remove
              </button>
            </div>
          </template>
          <button
            @click="
              () =>
                mutators.push({
                  username: undefined,
                  age: undefined
                })
            "
          >
            Add Item
          </button>
          <button @click="print">
            print
          </button>
        </template>
      </Field>
    </div>
  </form>
</template>

<script>
  import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, Field, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      print() {
        console.log(actions.getFormState(state => state.values))
      },
      effects($, { validate, setFieldState }) {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('userList.*.username', state => {
            state.visible = false
          })
        })

        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
          fieldState => {
            setFieldState('userList.*.username', state => {
              state.visible = fieldState.value
            })
          }
        )
      }
    }
  }
</script>
```

#### Reuse Effects

Make your own reusable effects.

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

CheckedField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        type="checkbox"
        :checked="!!state.value"
        @change="
          () => {
            mutators.change(!state.value)
          }
        "
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form
    :actions="actions"
    :effects="
      () => {
        getEffects()
      }
    "
  >
    <CheckedField name="trigger" label="show/hide" />
    <InputField label="a" name="a" />
    <InputField label="a-copy" name="a-copy" />
  </form>
</template>

<script>
  import { Form, createFormActions, FormEffectHooks } from '@formily/vue'
  import InputField from './input.vue'
  import CheckedField from './checkbox.vue'

  const { onFormMount$, onFieldValueChange$ } = FormEffectHooks
  export default {
    components: { Form, InputField, CheckedField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    },
    methods: {
      getEffects() {
        const actions = createFormActions()
        onFormMount$().subscribe(() => {
          actions.setFieldState('a~', state => (state.visible = false))
        })

        onFieldValueChange$('trigger').subscribe(triggerState => {
          actions.setFieldState('a~', state => {
            state.visible = triggerState.value
          })
        })

        onFieldValueChange$('a').subscribe(fieldState => {
          actions.setFieldState('a-copy', state => {
            state.value = fieldState.value
          })
        })
      }
    }
  }
</script>
```

#### Combo

Example：Combo value of username and age. Check [FormSpy](#FormSpy) for more inforation.

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

Form:

```html
<template>
  <form :actions="actions">
    <label>username</label>
    <InputField name="username" />
    <label>age</label>
    <InputField name="age" />
    <FormSpy>
      <template #default="{ form }">
        <div>
          name: {{ form.getFieldValue('username') }}
          <br />
          age: {{ form.getFieldValue('age') }}
        </div>
      </template>
    </FormSpy>
  </form>
</template>

<script>
  import { Form, createFormActions, FormSpy } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, InputField, FormSpy },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    }
  }
</script>
```

#### Provide and FormSpy

```typescript
Dictionary
--app
  |---components
  |---customForm
```

Example：Cross-file consumption form state, Check [FormProvider](#FormProvider) and [FormSpy](#FormSpy) for more infomation.

InputField:

```html
<template>
  <Field v-bind="$attrs">
    <template #default="{ state, mutators }">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <template v-if="state.props.loading">
        loading...
      </template>
      <input
        v-else
        :disabled="!state.editable"
        :value="state.value || ''"
        @input="mutators.change"
        @blur="mutators.blur"
        @focus="mutators.focus"
      />
      <span :style="{ color: 'red' }">{{ state.errors }}</span>
      <span :style="{ color: 'orange' }">{{ state.warnings }}</span>
    </template>
  </Field>
</template>

<script>
  import { Field } from '@formily/vue'

  export default {
    components: { Field }
  }
</script>
```

CustomForm:

```html
<template>
  <form :actions="actions">
    <label>username</label>
    <InputField name="username" />
    <label>age</label>
    <InputField name="age" />
  </form>
</template>

<script>
  import { Form, createFormActions } from '@formily/vue'
  import InputField from './input.vue'

  export default {
    components: { Form, InputField },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    }
  }
</script>
```

FormProvider:

```html
<template>
  <FormProvider>
    <CustomForm />
    <FormSpy>
      <template #default="{ form }">
        <div>
          name: {{ form.getFieldValue('username') }}
          <br />
          age: {{ form.getFieldValue('age') }}
        </div>
      </template>
    </FormSpy>
  </FormProvider>
</template>

<script>
  import { FormProvider, createFormActions, FormSpy } from '@formily/vue'
  import CustomForm from './custom.vue'

  export default {
    components: { FormProvider, CustomForm, FormSpy },
    data() {
      const actions = createFormActions()
      return {
        actions
      }
    }
  }
</script>
```
