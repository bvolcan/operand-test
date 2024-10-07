import { supabase } from "~/providers"
import type { PasswordRecovery, UserLoginData } from "~/types"

async function signUp(userData: UserLoginData) {
    const { data, error } = await supabase.auth.signUp(userData)

    if (error)
        throw error

    return data
}

async function userLogin(userData: UserLoginData) {
    const { data, error } = await supabase.auth.signInWithPassword(userData)

    if (error)
        throw error

    return data
}

async function recoverPassword(recoveryData: PasswordRecovery) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(recoveryData.email, { redirectTo: `${recoveryData.baseUrl}/login/changepassword`})

    if (error)
        throw error

    return data
}

async function changePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password })

    if (error)
        throw error

    return data
}

async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error)
        throw error
}

export default {
    signUp,
    userLogin,
    recoverPassword,
    changePassword,
    logout
}