<template>
  <view class="content">
    {{ title }}
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'home',
  setup () {
    return {
      title: '首页'
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 32rpx;
  color: #000;
  display: block;
  margin-top: 20rpx;
}
</style>
