import { useState } from "react"
import { LoginResponseModel } from "@/models/login-response-model";
import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAuth(){

    const [response, setResponse] = useState<LoginResponseModel|null>() 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const cookies = useCookies()
    const router = useRouter()
    
    async function login(username: string, password: string) {
        const inputData = {
            username: username,
            password: password
        }
        const toastId = toast.loading('log in...')
        setLoading(true)
        try {
            const response = await api.post('/login', inputData)
            if(response.status != 200){
                throw new Error(response.data.message || "Failed to login")
            }
            const data: LoginResponseModel = response.data
            cookies.set('auth-token', data.token)
            cookies.set('username', data.user.nama)
            toast.success('login berhasil', {id: toastId})
            router.push('dashboard')
            setResponse(data)
        } catch (error: unknown) {
            toast.error(
                "Failed to login", {id: toastId}
            )
            setError("Failed to login")
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        const token = cookies.get('auth-token')
   
        const toastId = toast.loading('log out...')
        setLoading(true)
        try {
            const response = await api.post('/logout',{}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            if(response.status != 200){
                throw new Error(response.data.message || "Failed to logout")
            }
            const data: LoginResponseModel = response.data
            cookies.remove('auth-token')
            cookies.remove('username')
            toast.success('logout berhasil', {id: toastId})
            router.push('login-page')
            setResponse(data)
        } catch (error: unknown) {
            toast.error(
                "Failed to logout", {id: toastId}
            )
            setError("Failed to logout")
        } finally {
            setLoading(false)
        }
    }

    return {login, logout, response, loading, error}
}