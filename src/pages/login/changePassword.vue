<route>
    name: Change Password
</route>

<script setup lang="ts">
import type { AuthError } from '@supabase/supabase-js'
import type { FormInstance } from 'element-plus'
import formRules from '~/helpers/formRules'
import handleMessages from '~/helpers/handleMessages'
import { userAuth } from '~/services'
import { useLoaderStore } from '~/stores'
import type { ChangePassword } from '~/types'

const router = useRouter()
const loaderStore = useLoaderStore()

const formRef = ref<FormInstance>()
const changePasswordForm = reactive<ChangePassword>({
    password: '',
    confirmPassword: ''
})

const {
    mutateAsync: savePassword,
    isLoading: isSavingPassword,
} = useMutation({
    mutationFn: userAuth.changePassword,
    onError: (error: AuthError) => {
        handleMessages.errorMessage(error.message)
    },
    onSuccess: () => {
        handleMessages.successMessage('Nova senha salva.')
        router.push({ name: 'Login' })
    }
})

async function handleSaveNewPassord(formEl: FormInstance | undefined) {
    console.log(formEl)
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            await savePassword(changePasswordForm.password)
            router.push({ name: 'Login' })
        }
    })
}

watch(isSavingPassword, () => {
    loaderStore.setLoader(isSavingPassword.value)
})

</script>
<template>
    <div flex="~ 1" items="center" h="100vh" justify="center" bg="#f1faee">
        <div
            flex="~ col"
            w="150"
            p="6 y-10"
            shadow="2xl"
            rounded="2xl"
            justify="center"
            items="center"
            bg="white"
        >
            <el-text size="large" text="!3xl" m="!2">Recuperação de Senha</el-text>
            <el-form ref="formRef" :model="changePasswordForm" :rules="formRules.changePassword(changePasswordForm.password)" flex="~ col" w="full" items="center">
                <div flex="~ col" m="t-4 b-8" w="80%">
                    <el-form-item label-position="top" label="Nova Senha" prop="password" m="!b-3">
                        <el-input v-model="changePasswordForm.password" type="password" size="large" show-password placeholder="**********"/>
                    </el-form-item>
                    <el-form-item label-position="top" label="Confirme a senha" prop="confirmPassword" m="!b-2">
                        <el-input v-model="changePasswordForm.confirmPassword" type="password" size="large" show-password placeholder="**********"/>
                    </el-form-item>
                </div>
                <el-button w="80%" size="large" color="#457B9D" @click="handleSaveNewPassord(formRef)">
                    Salvar
                </el-button>
            </el-form>
        </div>
    </div>
</template>
