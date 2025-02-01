import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import toast from "react-hot-toast";


export function useStoreHistoryAccountOfficer(){

    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    async function storeNewHistoryAccountOfficer(idCredit: string, formData: FormData) {
        const toastId = toast.loading("create history account officer...")
        setLoading(true)
        try {
            const response = await api.post('/aksi_ao/'+idCredit, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response);

            if(response.status != 200){
                throw new Error(response.data.message || "Failed to store new history account officer")
            }
            const data = response.data
            setResponse(data)
            toast.success("berhasil membuat history account officer", {id: toastId})
        } catch (error: unknown) {
            toast.success("gagal membuat history account officer", {id: toastId})
            console.log(error);
            setError(error instanceof Error ? error.message : "Failed to store new history account officer")
        } finally {
            setLoading(false)
        }
    }

    return {storeNewHistoryAccountOfficer, response, loading, error}
}