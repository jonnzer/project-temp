<template>
  <div>
    Home page
    <router-link to="/">Login</router-link>
    <el-button type="primary" @click="getList">request test</el-button>
  </div>
</template>

<script setup lang="ts">
import { getCourseList } from '@/api/index'
const getList = () => {
  getCourseList()
    .then(res => {
      console.log('res :>> ', res)
    })
    .catch(err => {
      console.log('err :>> ', err)
    })
}
</script>

<style lang="scss" scoped></style>
