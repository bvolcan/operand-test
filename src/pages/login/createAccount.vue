<route>
    name: Create Account
</route>

<script setup lang="ts">
import type { AuthError } from '@supabase/supabase-js'
import type { FormInstance } from 'element-plus'
import formRules from '~/helpers/formRules'
import handleMessages from '~/helpers/handleMessages'
import { userAuth } from '~/services'
import { useLoaderStore } from '~/stores'
import type { UserLoginData, ChangePassword } from '~/types'

const router = useRouter()
const loaderStore = useLoaderStore()

const formRef = ref<FormInstance>()
const signUpForm = reactive<UserLoginData & ChangePassword>({
    email: '',
    password: '',
    confirmPassword: ''
})

const {
    mutateAsync: signUp,
    isLoading: isCreatingAccount,
} = useMutation({
    mutationFn: userAuth.signUp,
    onError: (error: AuthError) => {
        handleMessages.errorMessage(error.message)
    },
    onSuccess: () => {
        handleMessages.successMessage('Conta criada com sucesso.')
        router.push({ name: 'Login' })
    }
})

async function handleCreateAccount(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            await signUp({email: signUpForm.email, password: signUpForm.password})
            router.push({ name: 'Login' })
        }
    })
}

watch(isCreatingAccount, () => {
    loaderStore.setLoader(isCreatingAccount.value)
})

</script>
<template>
    <div flex="~ 1" items="center" h="100vh" justify="center" bg="#f1faee">
        <Card>
            <el-text size="large" text="!3xl" m="!2">Criação de conta</el-text>
            <el-form ref="formRef" :model="signUpForm" :rules="formRules.createAccount(signUpForm.password)" flex="~ col" w="full" items="center">
                <div flex="~ col" m="t-4 b-8" w="80%">
                    <el-form-item label-position="top" label="E-mail" prop="email">
                        <el-input v-model="signUpForm.email" type="email" size="large" placeholder="nome@email.com"/>
                    </el-form-item>
                    <el-form-item label-position="top" label="Senha" prop="password" m="!b-3">
                        <el-input v-model="signUpForm.password" type="password" size="large" show-password placeholder="**********"/>
                    </el-form-item>
                    <el-form-item label-position="top" label="Confirme a senha" prop="confirmPassword" m="!b-2">
                        <el-input v-model="signUpForm.confirmPassword" type="password" size="large" show-password placeholder="**********"/>
                    </el-form-item>
                </div>
                <el-button w="80%" size="large" color="#457B9D" @click="handleCreateAccount(formRef)">
                    Salvar
                </el-button>
            </el-form>
        </Card>
    </div>
</template>
