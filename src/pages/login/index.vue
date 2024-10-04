<route>
    name: Login
</route>

<script setup lang="ts">

const router = useRouter()

const formLogin = reactive({
    email: '',
    password: '',
})

function handleSubmit() {
    console.log(formLogin)
    router.push({ name: 'Tasks list' })
}

</script>

<template>
    <div flex="~" items="center" justify="center" bg="#f1faee">
        <div
            flex="~ col"
            w="150"
            h="100"
            p="6"
            shadow="2xl"
            rounded="2xl"
            justify="center"
            items="center"
            bg="white"
        >
            <el-text size="large" text="!3xl" m="!2">Login</el-text>
            <el-form :model="formLogin" flex="~ col" w="full" items="center">
                <div flex="~ col" m="t-4 b-8" w="80%">
                    <el-form-item label-position="top" label="E-mail">
                        <el-input v-model="formLogin.email" size="large" placeholder="nome@email.com"/>
                    </el-form-item>
                    <el-form-item label-position="top" label="Senha" m="!b-2">
                        <el-input v-model="formLogin.password" type="password" size="large" show-password placeholder="**********"/>
                    </el-form-item>
                    <div>
                        <el-link class="!text-[#457B9D]" :underline="false">Esqueceu sua senha?</el-link>
                    </div>
                </div>
                <el-button w="80%" size="large" color="#457B9D" @click="handleSubmit">
                    Login
                </el-button>
            </el-form>
        </div>
    </div>
</template>
