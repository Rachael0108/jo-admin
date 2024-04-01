<template>
  <el-dialog v-model="dialogVisible" :title="title">
    <h2>im a dialog</h2>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, defineExpose} from 'vue';
const dialogVisible = ref(false);
const title = ref('新增');
const show = () => {
  dialogVisible.value = true
}
const handleClose = () => {
  dialogVisible.value = false
}
defineExpose({
  show,
})

</script>
