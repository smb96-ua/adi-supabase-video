import { supabase } from '../config/supabase'

async function login(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) throw error
    return data
}

async function register(email: string, password: string, passwordConfirm: string, name?: string): Promise<any> {
    // Supabase no requiere passwordConfirm, pero validamos aquí
    if (password !== passwordConfirm) {
        throw new Error('Las contraseñas no coinciden')
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name || ''
            }
        }
    })
    if (error) throw error
    return data
}

async function logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

async function isLoggedIn(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
}

async function getCurrentUser(): Promise<any> {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

// Listener para cambios en la sesión (útil para reactive auth state)
function onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
}

export { login, logout, isLoggedIn, getCurrentUser, register, onAuthStateChange }