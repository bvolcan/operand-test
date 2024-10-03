<route>
    name: Login
</route>

<script setup lang="ts">

const formLogin = reactive({
    email: '',
    password: '',
})

function handleSubmit() {
    console.log(formLogin)
}

</script>

<template>
    <div flex="~" items="center" justify="center" bg="#f1faee">
        <div flex="~ col" w="200" h="130" shadow="2xl" rounded="2xl" justify="center" items="center" bg="#A8DADC" >
            <h1>Hello login</h1>
            <el-form :model="formLogin">
                <el-input v-model="formLogin.email"/>
                <el-input v-model="formLogin.password" type="password"/>
                <el-button @click="handleSubmit">
                    Login
                </el-button>
            </el-form>
        </div>
    </div>
</template>
