<template>
  <div class="home">
    <div class="img-box">
      <img alt="Electron logo" src="../assets/images/logo.svg" />
      <div class="img-plus">+</div>
      <img alt="Vue logo" src="../assets/images/logo.png" />
      <div class="img-plus">+</div>
      <img alt="Element logo" src="../assets/images/element-logo.svg" />
    </div>
    <HelloWorld msg="Welcome to Your Electron11 + Vue3 + TypeScript + Element3" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
})
</script>
<style lang="scss" scoped>
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  .img-plus {
    font-size: 30px;
    margin: 0 30px;
  }
  img {
    // width: 60px;
    height: 60px;
  }
}
</style>
