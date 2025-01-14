import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import { TotalDebiturModel } from "@/models/total-debitur";
import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";


export function useTotalDebitur(){
    const [totaldebitur, setTotalDebitur] = useState<TotalDebiturModel | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    
    useEffect(()=>{
        async function fetchTotalDebitur() {
            setLoading(true)
            try {
                const response = await api.get('/total-debitur', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch sudah total debitur")
                }
                const data: TotalDebiturModel = response.data
                setTotalDebitur(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch sudah total debitur")
            } finally {
                setLoading(false)
            }
        }

        fetchTotalDebitur()
    },[])

    return {totaldebitur, loading, error}
}