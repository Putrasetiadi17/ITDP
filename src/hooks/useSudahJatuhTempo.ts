import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import api from "@/services/api";
import { useSvgRef } from "@mui/x-charts";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";


export function useSudahJatuhTempo(){
    const [jatuhTempo, setJatuhTempo] = useState<JatuhTempoModel[] | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    
    useEffect(()=>{
        async function fetchAllJatuhTempo() {
            setLoading(true)
            try {
                const response = await api.get('/data-all-debitur-sudah-jatuh-tempo', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch sudah jatuh tempo")
                }
                const data: JatuhTempoModel[] = response.data.all_sjt
                setJatuhTempo(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch sudah jatuh tempo")
            } finally {
                setLoading(false)
            }
        }

        fetchAllJatuhTempo()
    },[])

    return {jatuhTempo, loading, error}
}