<template>
  <div class="flex">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      >
        <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
        >
          <el-menu-item index="/">
            <el-icon :size="20">
              <HomeFilled/>
            </el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <template v-for="item in menuList">
            <template v-if="item.children">
              <el-sub-menu :index="item.name" :key="item.id">
                <template #title>
                  <el-icon :size="20">
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{ item.name }}</span>
                </template>
                <template v-for="subItem in item.children">
                  <el-sub-menu
                      v-if="subItem.children"
                      :index="subItem.name"
                      :key="subItem.id"
                  >
                    <template #title>{{ subItem.name }}</template>
                    <el-menu-item
                        v-for="(threeItem, i) in subItem.children"
                        :key="i"
                        :index="threeItem.route"
                    >{{ threeItem.name }}
                    </el-menu-item
                    >
                  </el-sub-menu>
                  <el-menu-item v-else :index="subItem.route" :key="subItem.id">{{
                      subItem.name
                    }}
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="item.route" :key="item.id">
                <el-icon :size="20">
                  <component :is="item.icon"></component>
                </el-icon>
                <template #title>{{ item.name }}</template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
  <div class="contents">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item
      ><a href="/">{{ breadCrumb }}</a></el-breadcrumb-item
      >
    </el-breadcrumb>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useRouter} from 'vue-router';
import {ElScrollbar} from 'element-plus'

const count = ref(0)
const router = useRouter()
const breadCrumb = computed(() => {
  return router.currentRoute.value.meta.title
})
const increment = () => count.value++
const menuList = ref([
  // {
  //   name: '组件封装',
  //   id: '1',
  //   icon: 'Setting',
  //   children: [
  //     {
  //       name: 'baseComponent',
  //       parent_id: '1',
  //       id: '12',
  //       route: 'baseComponent',
  //     }
  //   ]
  // },
  {
    name: 'typeScript学习',
    id: '2',
    icon: 'Location',
    route: 'typeScriptLearn',
  },
  {
    name: '高德地图',
    id: '3',
    icon: 'Location',
    route: 'mapPage',
  },
  {
    name: '可编辑列',
    id: '4',
    icon: 'Location',
    route: 'editRowTable',
  },
  {
    name: '3D地球',
    id: '5',
    icon: 'Location',
    route: 'threeEarth',
  },
  {
    name: '3D江苏',
    id: '6',
    icon: 'SuzhouMap',
    route: 'suzhouMap',
  },
  {
    name: '不规则水波',
    id: '7',
    icon: 'waveAni',
    route: 'waveAni',
  }
])
onMounted(() => {

})
const send = ()=>{
  sendCode().then((res)=>{
    console.log(res)

  })
}
const sendCode = async () => {
  const res = await fetch('/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: '664689413@qq.com'
    })
  })
  const data = await res.json
  console.log(data)
}
</script>
<style>
.el-menu-vertical-demo {
  width: 200px;
}

.contents {
  position: absolute;
  top: 1rem;
  padding: 0 5rem;
  margin-left: 10rem;
}
</style>
