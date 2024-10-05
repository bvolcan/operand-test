import { defineStore } from 'pinia'

const useLoaderStore = defineStore('Loader', () => {
    const isLoading = ref(false)

    function setLoader(state: boolean) {
        isLoading.value = state
    }
  
    return { isLoading, setLoader }
  }
)

export default useLoaderStore