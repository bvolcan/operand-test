<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <main>
    <router-view v-slot="{ Component: component }">
        <component min-h="100vh" :is="component" />
    </router-view>
  </main>
</template>
