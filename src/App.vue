<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { useLoaderStore } from '~/stores'

const loaderStore = useLoaderStore()
</script>

<template>
  <main v-loading="loaderStore.isLoading">
    <el-button v-if="$route.name !== 'Login' && $route.name !== 'Tasks List'" pos="absolute" m="5" link @click="() => $router.push({ name: 'Login' })">
      <el-icon>
        <ArrowLeft />
      </el-icon>
      <span>
        Voltar
      </span>
    </el-button>
    <router-view v-slot="{ Component: component }">
        <component :is="component" />
    </router-view>
  </main>
</template>
