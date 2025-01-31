import { ProgressModelAccountMaintenance } from "@/models/progres-account-maintenance-model";
import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";


export function useProgressAccountMaintenance(){
    const [progres, setProgress] = useState<ProgressModelAccountMaintenance | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    
    useEffect(()=>{
        async function fetchProgressAccountMaintenance() {
            setLoading(true)
            try {
                const response = await api.get('/progressaom', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch progress account maintenance")
                }
                const data: ProgressModelAccountMaintenance = response.data.data
                console.log(data)
                setProgress(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch progress account maintenance")
            } finally {
                setLoading(false)
            }
        }

        fetchProgressAccountMaintenance()
    },[])

    return {progres, loading, error}
}