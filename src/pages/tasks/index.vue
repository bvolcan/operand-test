<route>
    name: Tasks List
</route>

<script setup lang="ts">
import type { AuthError } from '@supabase/supabase-js'
import { useQuery } from 'vue-query'
import handleMessages from '~/helpers/handleMessages'
import { taskServices } from '~/services'
import { useLoaderStore, useUserStore } from '~/stores'
import { type TaskData } from '~/types'

const userStore = useUserStore()
const loaderStore = useLoaderStore()

const statusOptions = [
    {
        value: false,
        label: 'Pendente'
    },
    {
        value: true,
        label: 'Finalizado'
    }
]

const userTasks = ref<Required<TaskData>[]>([])
const isEditingTitle = ref(false)
const isDialogVisible = ref(false)
const selectedTaskIndex = ref(0)
const selectedTask = computed(() => userTasks.value[selectedTaskIndex.value])

const { isFetching: isFetchingTasks, refetch: refetchUserTasks } = useQuery('fetchUserTasks', () => taskServices.fetchTasks(userStore.id), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
        userTasks.value = data || []
        selectedTaskIndex.value = 0
    },
    onError: (error: AuthError) => {
        handleMessages.errorMessage(error.message)
    }
})

const {
        mutateAsync: createTask,
        isLoading: isCreatingtask,
} = useMutation({
    mutationFn: taskServices.createTask,
    onError: (error: AuthError) => {
        handleMessages.errorMessage(error.message)
    },
    onSuccess: () => {
        handleMessages.successMessage('Tarefa criada com sucesso.')
    }
})

const {
        mutateAsync: updateTask
} = useMutation({
    mutationFn: taskServices.updateTask,
    onError: (error: AuthError) => {
        handleMessages.errorMessage(error.message)
    },
    onSuccess: () => {
        handleMessages.successMessage('Tarefa atualizada com sucesso.')
    }
})

const {
        mutateAsync: removeTask,
        isLoading: isRemovingtask,
} = useMutation({
    mutationFn: taskServices.removeTask,
    onError: (error: AuthError) => {
        handleMessages.errorMessage(error.message)
    },
    onSettled: () => {
        isDialogVisible.value = false
    },
    onSuccess: () => {
        handleMessages.successMessage('Tarefa removida com sucesso.')
    }
})

async function handleNewTask() {
    await createTask({
        user_id: userStore.id,
        title: 'Nova Tarefa',
        status: false,
        description: ''
    })
    await refetchUserTasks.value()
}

async function handleEdition() {
    await updateTask({
        user_id: userStore.id,
        ...selectedTask.value
    })

}

function handleTitleEdition() {
    if (isEditingTitle.value)
        handleEdition()

    isEditingTitle.value = !isEditingTitle.value
}

async function handleRemoveTask() {
    await removeTask(selectedTask.value.id)
    await refetchUserTasks.value()
}

onBeforeMount(() => {
    if (!userStore.isLogged())
        userStore.logout()
})

const isLoading = computed(() => isFetchingTasks.value || isCreatingtask.value || isRemovingtask.value)

watch(isLoading, () => loaderStore.setLoader(isLoading.value), { immediate: true })

</script>
<template>
    <div h="100vh">
        <el-container h="100%">
            <el-aside w="!auto" bg="#1D3557">
                <Sidebar 
                    :taskList="userTasks"
                    :task-index="selectedTaskIndex"
                    :handle-new-task="handleNewTask"
                    @select-task="key => selectedTaskIndex = key"
                />
            </el-aside>
            <el-main flex="!~" w="!full" justify="center" p="!0 lg:!10" bg="#F1FAEE">
                <div
                    flex="~ col"
                    bg="white"
                    h="full"
                    w="full"
                    max-w="250"
                    p="6"
                    shadow="2xl"
                    rounded="2xl"
                    justify="center"
                    items="center"
                >
                    <div v-if="!!selectedTask" flex="~ col 1" w="full" gap="y-4">
                        <div flex="~ col-reverse lg:row" justify="between" gap="y-3">
                            <div flex="~" gap="3" items="center">
                                <h2 v-if="!isEditingTitle">
                                    {{ selectedTask.title }}
                                </h2>
                                <el-input v-else v-model="selectedTask.title" />
                                <el-button @click="handleTitleEdition">
                                    {{ isEditingTitle ? 'Salvar' : 'Editar' }}
                                </el-button>
                            </div>
                            <el-select v-model="selectedTask.status" size="large" w="!35" @change="handleEdition">
                                <el-option
                                    v-for="option in statusOptions"
                                    :key="option.label"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                        </div>
                        <el-input
                            v-model="selectedTask.description"
                            type="textarea"
                            w="full"
                            h="full"
                            resize="none"
                            :style="{ height: '100%' }"
                            placeholder="Digite aqui a descrição e os detalhes de sua tarefa"
                        />
                        <div flex="~" w="full">
                            <el-button flex="1" size="large" color="#457B9D" @click="handleEdition">
                                Salvar descrição
                            </el-button>
                            <el-button size="large" p="!x-3" @click="() => isDialogVisible = true">
                                    <el-icon color="#E63946" size="large"><DeleteFilled /></el-icon>
                            </el-button>
                        </div>
                    </div>
                    <div v-else>
                        <h2 text="gray-2">
                            Nenhuma tarefa criada
                        </h2>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
    <el-dialog v-model="isDialogVisible" w="!150" align-center title="Excluir Tarefa">
        <div m="y-5">
            <span>
                Deseja excluir permanentemente esta tarefa?
            </span>
        </div>
        <template #footer>
            <div>
                <el-button @click="() => isDialogVisible = false">
                    Cancelar
                </el-button>
                <el-button color="#E63946" @click="handleRemoveTask">
                    Excluir Tarefa
                </el-button>
            </div>
        </template>

    </el-dialog>
</template>