<template>
  <view>{{ title }}</view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'myInfo',
  setup () {
    return {
      title: '我的'
    }
  }
})
</script>

<style lang="scss" scoped></style>
