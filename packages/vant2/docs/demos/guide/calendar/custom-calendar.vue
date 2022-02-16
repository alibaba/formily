<template>
  <div>
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm" />
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'

export default {
  name: 'CustomCalendar',
  emits: {
    change: null,
  },
  props: {
    value: { type: [String, Date, Array], default: null },
  },
  data() {
    return {
      date: '',
      show: false,
    }
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm(date) {
      this.show = false
      this.date = this.formatDate(date)
      this.$emit('change', this.date)
    },
  },
}
</script>
