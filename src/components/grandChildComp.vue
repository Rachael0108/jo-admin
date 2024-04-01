<template>
  <button @click="changeName">
    {{name}}
  </button>
</template>

<script setup>
import {inject} from 'vue'
const {name, changeName} = inject('name')
</script>