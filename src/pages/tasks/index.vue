<route>
    name: Tasks list
    path: /tarefas
</route>
<script setup lang="ts">

const LOREM_IPSUM_MOCK = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare purus ac nulla auctor, quis imperdiet elit cursus. Vestibulum sit amet commodo metus. Fusce pharetra aliquam orci, non tincidunt metus mattis ut. Nullam id imperdiet nulla. Morbi vulputate interdum urna, ut posuere purus vehicula vel. Maecenas rhoncus cursus tristique."

const TASKS_MOCK = [
    {
        id: 1,
        title: "Tarefa exemplo 1",
        // TODO icon:
        // checklist: [
        //     {
        //         subtask: 'descrição de teste'
        //     }
        // ],
        status: "inProgress",
        description: LOREM_IPSUM_MOCK
    },
    {   
        id: 2,
        title: "Tarefa exemplo 2",
        // TODO icon:
        // checklist: [],
        status: "done",
        description: LOREM_IPSUM_MOCK
    },
    {   
        id: 3,
        title: "Tarefa exemplo 3",
        // TODO icon:
        // checklist: [],
        status: "inProgress",
        description: LOREM_IPSUM_MOCK
    },
    {   
        id: 4,
        title: "Tarefa exemplo 4",
        // TODO icon:
        // checklist: [],
        status: "pending",
        description: LOREM_IPSUM_MOCK
    },
    {   
        id: 5,
        title: "Tarefa exemplo 5",
        // TODO icon:
        // checklist: [],
        status: "inProgress",
        description: LOREM_IPSUM_MOCK
    }
]

const statusOptions = [
    {
        value: 'done',
        label: 'Finalizado'
    },
    {
        value: 'pending',
        label: 'Pendente'
    },
    {
        value: 'inProgress',
        label: 'Em progresso'
    }
]

const userTasks = ref(TASKS_MOCK)
const selectedTaskId = ref()
const selectedTaskDescription = ref('')
const selectedTaskStatus = ref('')
const selectedTaskTitle = ref('')
// const selectedTaskChecklist = ref([])
// const isSubtaskDone = ref(false)
const isEditingTitle = ref(false)

function handleMenuOpen(key: string) {
    selectedTaskId.value = key
    selectedTaskDescription.value = userTasks.value[Number(key)].description
    selectedTaskStatus.value = userTasks.value[Number(key)].status
    selectedTaskTitle.value = userTasks.value[Number(key)].title
    // selectedTaskChecklist.value = userTasks.value[Number(key)].checklist
}

function handleStatusSelect(status: string) {

}

function handleNewTask() {
    
}

</script>
<template>
    <el-container>
        <el-aside bg="#1D3557">
            <div flex="~ col" h="full">
                <el-scrollbar>
                    <el-row justify="space-between" items="center" p="4">
                        <h2 text="#F1FAEE">Suas tarefas</h2>
                        <el-button p="!x-2" color="#E63946" @click="handleNewTask">
                            Criar Tarefa
                        </el-button>
                    </el-row>
                    <el-menu text-color="#F1FAEE" unique-opened @open="handleMenuOpen">
                        <el-menu-item v-for="task, index in TASKS_MOCK" :key="task.id" bg="#1D3557" text="hover:#E63946" :index="`${index}`">
                            <template #title>
                                <span>
                                    {{ task.title  }}
                                </span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
                <el-button  text size="large" @click="$router.push({ name: 'Login' })">
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
                <div v-if="selectedTaskId" flex="~ col 1" w="full" gap="y-4">
                    <el-row justify="space-between">
                        <div flex="~" gap="3" items="center">
                            <h2 v-if="!isEditingTitle">
                                {{ selectedTaskTitle }}
                            </h2>
                            <el-input v-else v-model="selectedTaskTitle" />
                            <el-button @click="() => isEditingTitle = !isEditingTitle">
                                {{ isEditingTitle ? 'Salvar' : 'Editar' }}
                            </el-button>
                        </div>
                        <el-select v-model="selectedTaskStatus" size="large" w="!35">
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
                        v-model="selectedTaskDescription"
                        type="textarea"
                        w="full"
                        h="full"
                        resize="none"
                        :style="{ height: '100%' }"
                    />
                </div>
                    <h1 v-else>
                        TEMP
                    </h1>
            </div>
        </el-main>
    </el-container>
</template>