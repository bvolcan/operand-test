<route>
    name: Tasks list
    path: /tarefas
</route>

<script setup lang="ts">
import { useQuery } from 'vue-query';
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
    onSuccess: (data) => userTasks.value = data || [],
    onError: (error) => console.log(error)
})

const {
        mutateAsync: createTask,
        isLoading: isCreatingtask,
} = useMutation(taskServices.createTask)

const {
        mutateAsync: updateTask,
        isLoading: isUpdatingtask,
} = useMutation(taskServices.updateTask)

const {
        mutateAsync: removeTask,
        isLoading: isRemovingtask,
} = useMutation(taskServices.removeTask)

async function handleNewTask() {
    try {
        await createTask({
            user_id: userStore.id,
            title: 'Nova Tarefa',
            status: false,
            description: ''
        })
        await refetchUserTasks.value()
    } catch (error) {
        console.log(error)
    }
}

async function handleEdition() {
    try {
        await updateTask({
            user_id: userStore.id,
            ...selectedTask.value
        })
    } catch (error) {
        console.log(error)
    }
}

function handleSelectTask(key: string) {
    selectedTaskIndex.value = Number(key)
}

function handleTitleEdition() {
    if (isEditingTitle.value)
        handleEdition()

    isEditingTitle.value = !isEditingTitle.value
}

async function handleRemoveTask() {
    try {
        await removeTask(selectedTask.value.id)
        await refetchUserTasks.value()
    } catch (error) {
        console.log(error)
    } finally {
        selectedTaskIndex.value = 0
        isDialogVisible.value = false
    }
}

function handleLogout() {
    userStore.logout()
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
            <el-aside bg="#1D3557">
                <div flex="~ col" h="full">
                    <el-scrollbar>
                        <el-row justify="space-between" items="center" p="4">
                            <h2 text="#F1FAEE">Suas tarefas</h2>
                            <el-button p="!x-2" color="#E63946" @click="handleNewTask">
                                Criar Tarefa
                            </el-button>
                        </el-row>
                        <el-menu text-color="#F1FAEE" :default-active="String(selectedTaskIndex)" unique-opened @open="handleSelectTask">
                            <el-menu-item v-for="task, index in userTasks"
                                :key="task.id"
                                bg="#1D3557"
                                text="hover:#E63946"
                                :index="`${index}`"
                            >
                                <template #title>
                                    <span>
                                        {{ task.title  }}
                                    </span>
                                </template>
                            </el-menu-item>
                        </el-menu>
                    </el-scrollbar>
                    <el-button  text size="large" @click="handleLogout">
                        <div text="#E63946">
                            Sair
                        </div>
                    </el-button>
                </div>
            </el-aside>
            <el-main flex="!~" w="!full" justify="center" p="!10" bg="#F1FAEE">
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
                        <el-row justify="space-between">
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
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                        </el-row>
                        <!-- <div flex="~ col" justify="center" gap="y-2">
                            <el-table :data="selectedTaskChecklist" empty-text="Nenhuma Subtarefa Adicionada" w='full' >
                                <el-table-column>
                                    <el-checkbox v-model="isSubtaskDone"/>
                                </el-table-column>
                                <el-table-column prop="subtask" label="Subtarefa" width="full" />
                                <el-table-column>
                                    <el-button size="small">
                                        Editar
                                    </el-button>
                                    <el-button size="small" type="danger">
                                        Excluir
                                    </el-button>
                                </el-table-column>
                            </el-table>
                            <el-button>
                                Adicionar Subtarefa
                            </el-button>
                        </div> -->
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