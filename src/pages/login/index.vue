<route>
    name: Login
</route>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import formRules from '~/helpers/formRules'
import { useUserStore } from '~/stores'
import type { UserLoginData } from '~/types'

const router = useRouter()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const formLogin = reactive<UserLoginData>({
    email: '',
    password: '',
})

async function handleLogin(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            await userStore.login(formLogin)
            router.push({ name: 'Tasks List' })
        }
    })
}

onBeforeMount(() => {
    if (userStore.isLogged())
        router.push({ name: 'Tasks List' })
})

</script>

<template>
    <div flex="~ 1" items="center" h="100vh" justify="center" bg="#f1faee" >
        <Card>
            <el-text size="large" text="!3xl" m="!2">Login</el-text>
            <el-form ref="formRef" :model="formLogin" :rules="formRules.login" flex="~ col" w="full" items="center" @keyup.enter="handleLogin(formRef)" >
                <div flex="~ col" m="t-4 b-8" w="80%">
                    <el-form-item label-position="top" label="E-mail" prop="email">
                        <el-input v-model="formLogin.email" type="email" size="large" placeholder="nome@email.com"/>
                    </el-form-item>
                    <el-form-item label-position="top" label="Senha" m="!b-3" prop="password">
                        <el-input v-model="formLogin.password" type="password" size="large" show-password placeholder="**********"/>
                    </el-form-item>
                    <div>
                        <el-link class="!text-[#457B9D]" :underline="false" @click="() => $router.push({ name: 'Forgot Password' })">Esqueceu sua senha?</el-link>
                    </div>
                </div>
                <el-button w="80%" size="large" color="#457B9D" @click="handleLogin(formRef)">
                    Login
                </el-button>
                <div m="t-8">
                    <span text="sm">
                        Não possui conta?
                    </span>
                    <el-link class="!text-[#457B9D]" :underline="false" @click="() => $router.push({ name: 'Create Account' })">
                        Crie aqui
                    </el-link>
                </div>
            </el-form>
        </Card>
    </div>
</template>
