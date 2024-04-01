<template>
  <children-comp/>
</template>

<script setup>
import {provide, ref} from "vue";
import ChildrenComp from "@/components/childrenComp.vue";

// 注入子组件
const location = ref('North Pole')
const updatedLocation = () => {
  location.value = 'South North'
}
provide('location', {
  location,
  updatedLocation
})

// 注入孙子组件
const name = ref('allen')
const changeName = () => {
  name.value = 'Lisa'
}
provide('name', {
  name,
  changeName
})
</script>