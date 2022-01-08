<template>
  <div class="dashboard">
    <drag-header @drag="mouseDrag"></drag-header>
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DragHeader from '@/components/drag-header.vue'

const { ipcRenderer } = window.require('electron')
export default defineComponent({
  name: 'dashboard',
  components: {
    DragHeader
  },
  setup () {
    const mouseDrag = function (pos: { x: number; y: number }) {
      ipcRenderer.send('move-main', {
        baseX: pos.x,
        baseY: pos.y
      })
    }

    return {
      mouseDrag
    }
  }
})
</script>
<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 26px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
