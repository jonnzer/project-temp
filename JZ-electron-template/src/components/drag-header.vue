<template>
  <div ref="dragHeader" class="drag-header" v-mouse-drag="handleDrag">
    <div class="header-box"><img src="@/assets/images/logo.png" class="ai-img" />AI 金课宝</div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DragHeader',
  setup (props, { emit }) {
    const handleDrag = function (pos: { x: number; y: number }) {
      emit('drag', pos)
    }
    return {
      handleDrag
    }
  }
})
</script>
<style lang="scss" scoped>
.drag-header {
  width: 100%;
  height: 50px;
  background: #171e49;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-box {
    user-select: none;
    display: flex;
    align-items: center;
    // -webkit-app-region: drag;
    color: #fff;
    font-size: 20px;
    .ai-img {
      width: 31px;
      height: 31px;
      margin: 0 24px;
    }
  }
}
</style>
