<script setup>
import { ref } from 'vue';
import SoOverlay from 'package/Overlay/index'

const show = ref(false)
const showPop = () => {
  show.value = !show.value
}
</script>

<template>
  <el-button @click="showPop">click</el-button>
  <so-overlay :show="show" class="so-overlay" @click="showPop">
    <div style="width: 20vw; height: 10vh; background: #fff; color: #000; margin: auto; position: relative; top: calc(50% - 10vw);">
      <h1>So ?</h1>
    </div>
  </so-overlay>
</template>
