import { supabase } from "~/providers"
import type { UserLoginData } from "~/types"

async function signUp(userData: UserLoginData) {
    const { data } = await supabase.auth.signUp(userData)

    return data
}

async function userLogin(userData: UserLoginData) {
    const { data } = await supabase.auth.signInWithPassword(userData)

    return data
}

async function recoverPassword(email: string) {
    const { data } = await supabase.auth.resetPasswordForEmail(email)

    return data
}

async function changePassword(password: string) {
    const { data } = await supabase.auth.updateUser({ password })
}

async function logout() {
    return await supabase.auth.signOut()
}

export default {
    signUp,
    userLogin,
    recoverPassword,
    changePassword,
    logout
}