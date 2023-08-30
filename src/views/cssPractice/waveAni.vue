<template>
  <fc-wave-filter delay="0.3" mode="img">
    <img alt class="wave-wrapper" src="../../assets/hero1.png" />
  </fc-wave-filter>
</template>

<script setup>
  import { FcWaveFilter } from 'fancy-components'
  /* eslint-disable no-new */
 const waveFilter =  new FcWaveFilter()
</script>

<style lang="scss">
fc-wave-filter {
  --color: #10bedd;
}
.wave-wrapper {
  width: 100px;
  object-fit: cover;
}
</style>