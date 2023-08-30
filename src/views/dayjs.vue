<template>

</template>
<script setup>
import dayjs from "@/plugins/dayjs";

const timeFormat = `YYYY年MM月DD日 HH:mm:ss`
const time = ref(dayjs().format(timeFormat))
</script>
