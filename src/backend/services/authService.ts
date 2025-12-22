import { pb } from '../config/pb'

async function login(email: string, password: string): Promise<any> {
    return await pb.collection('users').authWithPassword(email, password)
}

async function register(email: string, password: string, passwordConfirm: string, name?: string): Promise<any> {
    return await pb.collection('users').create({
        email,
        password,
        passwordConfirm,
        name: name || ''
    })
}

function logout(): void {
    pb.authStore.clear()
}

function isLoggedIn(): boolean {
    return pb.authStore.isValid && !!pb.authStore.token && !!pb.authStore.model
}

function getCurrentUser(): any {
    return pb.authStore.model
}

export { login, logout, isLoggedIn, getCurrentUser, register }