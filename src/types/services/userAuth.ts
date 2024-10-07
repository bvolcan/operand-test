export interface UserLoginData {
    email: string
    password: string
}

export interface PasswordRecovery {
    email: string
    baseUrl: string
}

export interface ChangePassword {
    password: string,
    confirmPassword: string
}