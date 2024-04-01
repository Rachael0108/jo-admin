<script setup name="skeletonView" lang="ts">
import SkeletonView from './index.vue';
import {useAutoSkeletonView} from "../useAutoSkelectionView";
import {reactive, ref} from "vue";
import {userList} from "@/api/user";

const tableData = ref([])
const getUserList = () => {
  userList().then((res: { data: never[]; }) => {
    tableData.value = res.data
  })
}
let params = {id: 1}
// 通过 v-bind 绑定 hook抛出的属性
const view = useAutoSkeletonView({
  apiFun:
      userList(params).then((res: { data: never[]; }) => {
        tableData.value = res.data
      }),
});
</script>
<template>
  <div class="col">
    <skeletonView
        v-slot="{ result }"
        v-bind="view.bindProps"
        v-on="view.bindEvents"
    >
      <span>{{ result }}</span>
    </skeletonView>
  </div>
</template>