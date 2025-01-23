import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import toast from "react-hot-toast";


export function useUpdateSudahJatuhTempo(){

    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    async function storeNewUpdateSudahJatuhTempo() {
        const toastId = toast.loading("create update...")
        setLoading(true)
        try {
            const response = await api.post('/update-collect', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })

            if(response.status != 200){
                throw new Error(response.data.message || "Failed to store update sudah jatuh tempo")
            }
            const data = response.data
            setResponse(data)
            toast.success("berhasil membuat update sudah jatuh tempo", {id: toastId})
        } catch (error: unknown) {
            toast.success("gagal membuat update sudah jatuh tempo", {id: toastId})
            setError(error instanceof Error ? error.message : "Failed to store update sudah jatuh tempo")
        } finally {
            setLoading(false)
        }
    }

    return {storeNewUpdateSudahJatuhTempo ,response, loading, error}
}