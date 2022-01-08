<template>
  <view class="login-box">
    <view class="logo">
      <image src="../../static/images/logo.png" mode="aspectFit" />
      {{ title }}
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'login',
  setup () {
    return {
      title: 'login page'
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  padding: 0 135rpx;
  .logo {
    margin-top: 130rpx;
    margin-bottom: 43rpx;
    text-align: center;
    image {
      width: 155rpx;
      height: 122rpx;
    }
  }
}
</style>
