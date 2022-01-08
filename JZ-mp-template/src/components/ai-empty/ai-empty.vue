<template>
  <view class="no-data">
    <view class="empty-box">
      <image src="/static/images/empty.png" />
      <view class="text">{{ text }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  height: 100%;
  align-items: center;
}
.empty-box {
  text-align: center;
  margin: 0 auto;
  image {
    width: 264rpx;
    height: 179rpx;
  }
  .text {
    font-size: 30rpx;
    color: #edc84c;
  }
}
</style>
