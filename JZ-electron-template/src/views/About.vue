<template>
  <div class="about play-box">
    <div class="play-item">
      <h1>flash test</h1>
      <!-- <play-flash :url="flashUrl"></play-flash> -->
    </div>
    <div class="play-item">
      <h1>video test</h1>
      <play-video :url="videoUrl"></play-video>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
// import playFlash from '@/components/play/flash.vue'
import playVideo from '@/components/play/video.vue'
import { getLocalPath } from '@/utils/utils'
export default defineComponent({
  components: {
    // playFlash,
    playVideo
  },
  setup () {
    // test
    const state = reactive({
      flashUrl: getLocalPath() + '/flash/180a0d1a9867a8df0b717e1e57173253/U2/start.swf',
      videoUrl: getLocalPath() + '/test.mp4'
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.play-box {
  width: 100%;
  display: flex;
  .play-item {
    flex: 1;
    background-color: #ccc;
    margin-right: 10px;
    h1 {
      background-color: #fff;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
