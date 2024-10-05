import { defineStore } from 'pinia'
import { userAuth } from '~/services'
import type { UserLoginData } from '~/types'
import useLoaderStore from './loader'

const useUserStore = defineStore('User', () => {
    const loaderStore = useLoaderStore()
    const router = useRouter()

    const id = ref()
    const email = ref()
    const authData = ref()

    const {
        mutateAsync: authenticate,
        isLoading: isLoggingIn,
    } = useMutation(userAuth.userLogin)

    const {
        mutateAsync: requestLogout,
        isLoading: isLoggingOut,
    } = useMutation(userAuth.logout)

    const isLoading = computed(() => isLoggingIn.value || isLoggingOut.value)

    watch(isLoading, () => loaderStore.setLoader(isLoading.value))
    
    async function login(loginData: UserLoginData) {
        try {
            const data = await authenticate(loginData)
            console.log(data)
            authData.value = data
        } catch (error) {
            console.log(error)
        } finally {
            id.value = authData.value.user.id
            email.value = authData.value.user.email
        }
    }

    async function logout() {

        try {
            await requestLogout()
            id.value = ''
            email.value = ''
        } catch(error) {
            console.log(error)
        } finally {
            router.push({ name: 'Login' })
        }
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