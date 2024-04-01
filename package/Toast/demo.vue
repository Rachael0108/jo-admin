<script setup>
import { showToast } from 'package/Toast/index';
const showPop = () => {
  showToast({message: "Hey !!!"})
}
</script>

<template>
  <el-button @click="showPop">click</el-button>
  <!--  <router-view></router-view>-->
</template>
