import { defineStore } from 'pinia'
import { userAuth } from '~/services'
import type { UserLoginData } from '~/types'
import useLoaderStore from './loader'
import handleMessages from '~/helpers/handleMessages'
import type { AuthError } from '@supabase/supabase-js'

const useUserStore = defineStore('User', () => {
    const loaderStore = useLoaderStore()
    const router = useRouter()

    const id = ref()
    const email = ref()

    const {
        mutateAsync: authenticate,
        isLoading: isLoggingIn,
    } = useMutation({
        mutationFn: userAuth.userLogin,
        onError: (error: AuthError) => {
            handleMessages.errorMessage(error.message)
        },
        onSuccess: (data) => {
            id.value = data.user?.id
            email.value = data.user?.email
        }
    })

    const {
        mutateAsync: requestLogout,
        isLoading: isLoggingOut,
    } = useMutation({
        mutationFn: userAuth.logout,
        onError: (error: AuthError) => {
            handleMessages.errorMessage(error.message)
        },
        onSuccess: () => {
            id.value = ''
            email.value = ''
            router.push({ name: 'Login' })
        }
    })

    const isLoading = computed(() => isLoggingIn.value || isLoggingOut.value)

    watch(isLoading, () => loaderStore.setLoader(isLoading.value))
    
    async function login(loginData: UserLoginData) {
        await authenticate(loginData)
    }

    async function logout() {
        await requestLogout() 
    }

    function isLogged() {
        return !!id.value
    }
  
    return { id, email, login, logout, isLogged }
  },
  {
    persist: {
        storage: sessionStorage,
        pick: ['id']
    }
  }
)

export default useUserStore