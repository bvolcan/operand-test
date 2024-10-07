<route>
    name: Forgot Password
</route>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import formRules from '~/helpers/formRules'
import handleMessages from '~/helpers/handleMessages'
import { userAuth } from '~/services'
import { useLoaderStore } from '~/stores'

const router = useRouter()
const loaderStore = useLoaderStore()

const formRef = ref<FormInstance>()
const recoveryEmail = reactive<{email: string}>({
    email: ''
})

const {
        mutateAsync: requestRecovery,
        isLoading: isSendingEmail,
} = useMutation({
    mutationFn: userAuth.recoverPassword,
    onError: (error) => {
        handleMessages.errorMessage(error.message)
    },
    onSuccess: () => {
        handleMessages.successMessage('Email enviado.')
        router.push({ name: 'Login' })
    }
})

async function handleSendEmail(formEl: FormInstance | undefined) {
    if (!formEl) return
    else {
        await requestRecovery({
            email: recoveryEmail.email,
            baseUrl: window.location.origin
        })
    }
}

watch(isSendingEmail, () => {
    loaderStore.setLoader(isSendingEmail.value)
})

</script>

<template>
    <div flex="~ 1" items="center" h="100vh" justify="center" bg="#f1faee">
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
            <el-text size="large" text="!3xl" m="!2">Recuperação de Senha</el-text>
            <el-text w="80%" m="!t-2">
                Esqueceu sua senha? Sem problemas. Insira o seu endereço de e-mail abaixo e envie uma mensagem de recuperação de senha.
            </el-text>
            <el-form :model="recoveryEmail" :rules="formRules.sendEmail" flex="~ col" w="full" items="center">
                <div flex="~ col" m="y-4" w="80%">
                    <el-form-item label-position="top" label="E-mail" prop="email">
                        <el-input v-model="recoveryEmail.email" type="email" size="large" placeholder="nome@email.com"/>
                    </el-form-item>
                </div>
                <el-button w="80%" size="large" color="#457B9D" @click="handleSendEmail(formRef)">
                    Enviar E-mail
                </el-button>
            </el-form>
        </div>
    </div>
</template>
