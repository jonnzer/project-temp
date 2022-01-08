<template>
  <div class="launch-page" v-mouse-drag="handleDrag">
    <div class="launch-content">
      <p class="title">{{ title }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
const { ipcRenderer } = window.require('electron')

export default defineComponent({
  name: 'launch-page',
  setup () {
    const handleDrag = function (pos: any) {
      ipcRenderer.send('move-launch', {
        baseX: pos.x,
        baseY: pos.y
      })
    }
    return {
      handleDrag,
      title: '正在启动...'
    }
  }
})
</script>
<style lang="scss" scoped>
.launch-page {
  width: 100%;
  height: 100%;
  background: #000000;
}
.launch-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 30px;
  color: #fff;
}
</style>
