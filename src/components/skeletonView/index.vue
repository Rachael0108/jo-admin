<script setup lang="ts">
import {loading} from '.'
import { defineProps, computed } from "vue";
import {SkeletonProps} from "element-plus";

type ViewStatus = "loading" | "error" | "success" | "empty";
interface SkeletonProps<T = any> {
  status: ViewStatus;
  result: T;
  placeholderResult: T;
  emptyMsg: string;
  errorMsg: string;
  isEmpty?: (result: T) => boolean;  // result作为泛型传入，返回一个布尔值
}
// withDefaults: 给 props 提供默认值
const props = withDefaults(defineProps<SkeletonProps>(), {
  status: "loading",
  emptyMsg: "暂无数据",
  errorMsg: '未知错误'
})
const emits = defineEmits(["retry"]);
const retryClick = () => {
  emits("retry")
}
const viewStatus = computed(()=>{
  const status = props.status
  if(status === "success") {
    let isEmp = false;
    const result = props.result;
    if(props.isEmpty) {
      isEmp = props.isEmpty(props.result);
    }else {
      if (isArray(result)) {
        isEmp = result.length === 0;
      } else if(!result) {
        isEmp = false
      } else {
        isEmp = false;
      }
    }
    if(isEmp) {
      return "empty";
    }
    return "success";
  }
  return status;
})

const placeholderData = computed(()=>{
  if(props.result) {
    return props.result;
  }
  return props.placeholderResult;
})
const isArray = (array: any) => {
  return Array.isArray(array);
}
</script>

<template>
  <div
      key="empty"
      v-if="viewStatus === 'empty'"
      class="empty_view flex-col">
    <span>{{ emptyMsg }}</span>
    <Button class="mt4 max-w-160px" @click="retryClick">重试</Button>
  </div>

  <div
      key="error"
      v-else-if="viewStatus === 'error'"
      class="empty_view flex-col"
  >
    <span>{{ errorMsg }}</span>
    <Button class="mt4 max-w-160px" @click="retryClick">重试</Button>
  </div>

  <div
      key="loadingOrContent"
      v-else
      :class="[
      placeholderData && viewStatus === 'loading'
        ? 'skeleton-view-empty-view'
        : 'skeleton-view-default-view',
    ]"
  >
    <div
        v-if="!placeholderData && viewStatus === 'loading'"
        class="loading-center"
    >
      <el-icon class="is-loading">
        <Loading style="font-size: 40px; color: #2a6de5"/>
      </el-icon>
    </div>
    <slot
        v-else
        :result="placeholderData"
        :status="viewStatus"
        :success="viewStatus === 'success'"
        :mask="viewStatus === 'loading' ? 'skeleton-mask' : ''"
    ></slot>
  </div>
</template>

<style>
.clam-box {
  width: 100%;
  height: 100%;
}
.empty_view {
  padding-top: 50px;
  padding-bottom: 50px;
  align-items: center;
}
.empty_img {
  width: 310px;
  height: 218px;
}
.trip_text {
  font-size: 20px;
  color: #999999;
}

.mt4 {
  margin-top: 4px;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.loading-center {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skeleton-view-default-view span,
.skeleton-view-default-view a,
.skeleton-view-default-view img,
.skeleton-view-default-view td,
.skeleton-view-default-view button {
  transition-duration: 0.7s;
  transition-timing-function: ease;
  transition-property: background, width;
}

.skeleton-view-empty-view {
  position: relative;
  pointer-events: none;
}

.skeleton-view-empty-view::before {
  content: " ";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(180, 199, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.1) 60%
  );
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: loading 1s ease-in-out infinite;
  z-index: 1;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.skeleton-view-empty-view .skeleton-mask {
  position: relative;
}
.skeleton-view-empty-view .skeleton-mask::before {
  content: " ";
  background-color: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #f5f5f5;
  top: -1px;
  left: -1px;
  z-index: 1;
}

.skeleton-view-empty-view button,
.skeleton-view-empty-view span,
.skeleton-view-empty-view input,
.skeleton-view-empty-view td,
.skeleton-view-empty-view a {
  color: rgba(0, 0, 0, 0) !important;
  border: none;
  background: #f5f5f5 !important;
}
/* [src=""],img:not([src])*/
.skeleton-view-empty-view img {
  content: url(../../assets/img/no_url.png);
  border-radius: 2px;
  background: #f5f5f5 !important;
}
</style>