<script setup lang="ts">
import { useLoaderStore } from '~/stores'

const loaderStore = useLoaderStore()
</script>

<template>
  <main v-loading="loaderStore.isLoading">
    <router-view v-slot="{ Component: component }">
        <component :is="component" />
    </router-view>
  </main>
</template>
