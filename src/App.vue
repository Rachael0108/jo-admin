<script setup>
import { ref } from 'vue';
import UseDialog from '@/components/useDialog.vue'

const show = ref(false)
const showPop = () => {
  useDialog.value.show()
}
const useDialog = ref(null)
</script>

<template>
  <el-button @click="showPop">click</el-button>
  <UseDialog ref="useDialog"/>
<!--  <router-view></router-view>-->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

</style>
