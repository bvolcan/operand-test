import { ElMessage } from 'element-plus'

function errorMessage (message: string) {
    ElMessage({
        message: message,
        type: 'error',
        plain: true
    })
}

function successMessage (message: string) {
    ElMessage({
        message: message,
        type: 'success',
        plain: true
    })
}

export default { errorMessage, successMessage}