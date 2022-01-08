<template>
  <div class="video-box">
    <Xgplayer :config="config" @player="Player = $event" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Xgplayer from 'xgplayer-vue'

export default defineComponent({
  components: {
    Xgplayer
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    isClose: Boolean,
    isHideWin: Boolean,
    // 窗口尺寸
    height: {
      type: Number,
      default: 535
    }
  },
  emits: ['hideLoading'],
  setup (props, context) {
    const state = reactive({
      msg: '视频播放',
      config: {
        id: 'vs',
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        width: '100%',
        height: props.height,
        videoInit: true,
        url: props.url
      },
      Player: null as any,
      playUrl: '' as any
    })
    context.emit('hideLoading')
    watch(
      () => props.url,
      () => {
        state.Player.src = props.url
        state.Player.reload()
        context.emit('hideLoading')
        // console.log('props.url :>> ', props.url, state.Player)
      }
    )
    watch([() => props.isClose, () => props.isHideWin], () => {
      state.Player.pause()
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.video-box {
  height: 100%;
}
.xgplayer-skin-default {
  height: 100% !important;
  ::v-deep(.xgplayer-progress-played) {
    background: linear-gradient(270deg, #6249ee 0%, #9020cd 100%);
  }
  ::v-deep(.xgplayer-playbackrate) ul {
    left: 20px;
  }
}
</style>
