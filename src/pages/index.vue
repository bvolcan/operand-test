<route>
    name: Welcome
</route>

<script setup lang="ts">

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
    router.push({ name: 'Login' })
})

</script>

<template>
    <div />
</template>
