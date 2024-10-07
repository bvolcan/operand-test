<script setup lang="ts">
import { useUserStore } from '~/stores'
import type { TaskData } from '~/types'

const userStore = useUserStore()

defineProps<{
    taskList: Required<TaskData[]>
    taskIndex: number
    handleNewTask: () => void
}>()

const emit = defineEmits<{
    (event: 'selectTask', value: number): void
}>()

const isDesktop = useMediaQuery('(min-width: 1024px)')
const openSidebar = ref(false)
const isSidebarOpen = computed(() => isDesktop.value || openSidebar.value)

function handleSelectTask(key: string) {
    emit('selectTask', Number(key))
}

function handleLogout() {
    userStore.logout()
}

</script>

<template>
    <div flex="~" h="100%">
        <el-menu flex="!~ !col" h="100%" bg="!#1D3557" text-color="#F1FAEE" :collapse="!isSidebarOpen" :default-active="String(taskIndex)" unique-opened @open="handleSelectTask">
            <el-row items="center" p="4" gap="x-5">
                <h2 v-if="isSidebarOpen" text="#F1FAEE">Suas tarefas</h2>
                <el-button p="!x-2" color="#E63946" @click="handleNewTask">
                    <p v-if="isSidebarOpen">
                        Criar Tarefa
                    </p>
                    <el-icon v-else><Plus /></el-icon>
                </el-button>
            </el-row>
            <div flex="~ col !1" items="space-between">
                <el-scrollbar :key="taskList.length">
                    <el-menu-item v-for="task, index in taskList"
                        :key="task.id"
                        bg="#1D3557"
                        text="hover:#E63946"
                        :index="`${index}`"
                    >
                        <el-icon >
                            <SuccessFilled v-if="task.status" color="!#4BB543"/>
                            <Clock v-else color="!#A8DADC" />
                        </el-icon>
                        <template #title>
                            <span>
                                {{ task.title }}
                            </span>
                        </template>
                    </el-menu-item>
                </el-scrollbar>
                <el-button text size="large" @click="handleLogout">
                    <div text="#E63946">
                        Sair
                    </div>
                </el-button>
            </div>
        </el-menu>
        <div v-if="!isDesktop" flex="~" items="center">
            <el-button pos="absolute" m="-5" p="!1" z="1" size="large" color="#1D3557" circle :icon="openSidebar ? 'ArrowLeft' : 'ArrowRight'" @click="() => openSidebar = !openSidebar" />
        </div>
    </div>
</template>