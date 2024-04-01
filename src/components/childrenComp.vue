<template>
  <button @click="updatedLocation">
    {{location}}
  </button>
  <grand-child-comp/>
</template>

<script setup>
import {inject} from 'vue'
import GrandChildComp from "@/components/grandChildComp.vue";
const {location, updatedLocation} = inject('location')
</script>