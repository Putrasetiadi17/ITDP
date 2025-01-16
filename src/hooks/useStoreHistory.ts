import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import toast from "react-hot-toast";


export function useStoreHistory(){

    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    async function storeNewHistory(idCredit: string, formData: FormData) {
        const toastId = toast.loading("create history...")
        setLoading(true)
        try {
            const response = await api.post('/reminder/'+idCredit, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status != 200){
                throw new Error(response.data.message || "Failed to store new history")
            }
            const data = response.data
            setResponse(data)
            toast.success("berhasil membuat history", {id: toastId})
        } catch (error: unknown) {
            toast.success("gagal membuat history", {id: toastId})
            setError(error instanceof Error ? error.message : "Failed to store new history")
        } finally {
            setLoading(false)
        }
    }

    return {storeNewHistory, response, loading, error}
}