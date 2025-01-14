import { ProgressModel } from "@/models/progres-model";
import api from "@/services/api";
import { useSvgRef } from "@mui/x-charts";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";


export function useProgress(){
    const [progres, setProgress] = useState<ProgressModel | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    
    useEffect(()=>{
        async function fetchProgress() {
            setLoading(true)
            try {
                const response = await api.get('/progress', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch progress")
                }
                const data: ProgressModel = response.data.data
                console.log(data)
                setProgress(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch progress")
            } finally {
                setLoading(false)
            }
        }

        fetchProgress()
    },[])

    return {progres, loading, error}
}