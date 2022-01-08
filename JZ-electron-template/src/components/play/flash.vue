<template>
  <object :width="flashWidth" height="100%">
    <embed
      ref="flashObject"
      :src="playUrl"
      base="."
      quality="high"
      name="myMovieName"
      :width="flashWidth"
      class="flash"
      type="application/x-shockwave-flash"
      pluginspage="/public/flash"
      wmode="transparent"
      menu="false"
    />
  </object>
</template>

<script lang="ts">
import { px2rem } from '@/utils/utils'
import { defineComponent, toRefs, reactive, computed, watch, ref } from 'vue'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: ''
    },
    // 类型
    type: {
      type: Number,
      default: 1
    },
    isFullScreen: Boolean,
    isHideWin: Boolean,
    data: {
      type: [Array, Object]
    }
  },
  emits: ['hideLoading'],
  setup (props, context) {
    const state = reactive({
      playUrl: props.url,
      flashW: px2rem(800, false) as any, // flash默认尺寸
      flashH: px2rem(600, false) as any,
      height: px2rem(535, false) as any,
      interNum: 0
    })
    const flashWidth = computed(() => {
      return Number((state.height * (state.flashW / state.flashH)).toFixed(2))
    })
    // 加载flash
    const flashObject = ref()
    function loadFlash () {
      // console.log('flashObject :>> ', flashObject)
      const intervalId = setInterval(function () {
        try {
          console.log('loaded-->', flashObject.value.PercentLoaded())
          if (flashObject.value.PercentLoaded() === 100) {
            context.emit('hideLoading')
            clearInterval(intervalId)
          } else {
            state.interNum++
            if (state.interNum > 10) {
              context.emit('hideLoading')
              clearInterval(intervalId)
            }
          }
        } catch (e) {
          clearInterval(intervalId)
          console.log('error-->', e)
        }
      }, 500)
    }
    // 动态计算宽度
    function calcWidth () {
      const viewHeight = document.documentElement.clientHeight
      state.height = props.isFullScreen ? viewHeight - Number(px2rem(130, false)) : px2rem(535, false)
      // console.log('watch height  :>> ', viewHeight, vHeight, state.height)
    }
    loadFlash()
    calcWidth()
    watch(
      () => props.url,
      () => {
        state.playUrl = props.url
        calcWidth()
        loadFlash()
      }
    )
    watch(
      () => props.isFullScreen,
      () => {
        calcWidth()
      }
    )
    watch(
      () => props.isHideWin,
      () => {
        state.playUrl = props.isHideWin ? '' : props.url
        console.log('flash paus :>> ', props.isHideWin)
      }
    )
    return { ...toRefs(state), flashWidth, flashObject }
  }
})
</script>

<style lang="scss" scoped>
.flash {
  border-radius: 10px 10px 0 0;
  height: 100%;
  background-color: #fff;
}
html {
  height: 535px;
}
</style>
