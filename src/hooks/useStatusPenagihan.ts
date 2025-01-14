import { ProgressModel } from "@/models/progres-model";
import api from "@/services/api";
import { useSvgRef } from "@mui/x-charts";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";


export function useStatusPenagihan(){
    const [statuspenagihan, setStatusPenagihan] = useState<ProgressModel | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    
    useEffect(()=>{
        async function fetchStatusPenagihan() {
            setLoading(true)
            try {
                const response = await api.get('/status_penagihan', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch status penagihan")
                }
                const data: ProgressModel = response.data.data
                setStatusPenagihan(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch status penagihan")
            } finally {
                setLoading(false)
            }
        }

        fetchStatusPenagihan()
    },[])

    return {statuspenagihan, loading, error}
}