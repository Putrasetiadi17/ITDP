import { HistoryDebiturModels } from "@/models/history-debitur-model";
import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";


export function useHistoryDebitur(){
    const [historyDebitur, setHistoryDebitur] = useState<HistoryDebiturModels[] | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    
    useEffect(()=>{
        async function fetchHistoryDebitur() {
            setLoading(true)
            try {
                const response = await api.get('/history', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch history debitur")
                }
                const data: HistoryDebiturModels[] = response.data.data
                setHistoryDebitur(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch history debitur")
            } finally {
                setLoading(false)
            }
        }

        fetchHistoryDebitur()
    },[])

    return {historyDebitur, loading, error}
}