<template>
  <h1>{{ msg }}</h1>
  <ul>
    <li><el-tag>vue3</el-tag></li>
    <li><el-tag>vite</el-tag></li>
    <li><el-tag>dart-sass</el-tag></li>
    <li><el-tag>Typescript</el-tag></li>
    <li><el-tag>router</el-tag></li>
    <li><el-tag>Vuex</el-tag></li>
    <li><el-tag>element plus</el-tag></li>
    <li><el-tag>axios</el-tag></li>
    <li><el-tag>utils</el-tag></li>
  </ul>
  <h3>Installed kingsun-cli Plugins</h3>
  <ul>
    <li>
      <a
        href="https://v3.cn.vuejs.org/guide/introduction.html"
        target="_blank"
        rel="noopener"
        >vue3</a
      >
    </li>
    <li>
      <a
        href="https://vitejs.cn/guide/why.html#slow-server-start"
        target="_blank"
        rel="noopener"
        >vite</a
      >
    </li>
    <li>
      <a
        href="https://next.router.vuejs.org/zh/guide/"
        target="_blank"
        rel="noopener"
        >router</a
      >
    </li>
    <li>
      <a
        href="https://next.vuex.vuejs.org/zh/index.html"
        target="_blank"
        rel="noopener"
        >vuex</a
      >
    </li>
    <li>
      <a
        href="https://element-plus.gitee.io/zh-CN/"
        target="_blank"
        rel="noopener"
        >element-plus</a
      >
    </li>
    <li>
      <a
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
        target="_blank"
        rel="noopener"
        >typescript</a
      >
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{ msg: string }>()

const count = ref(0)
const router = useRouter()
const msgTest = () => {
  // ElMessage.success('test')
  router.push({
    path: '/login'
  })
}
</script>
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
