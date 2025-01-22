import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import api from "@/services/api";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { AccountMaintenanceModel } from "@/models/account-maintenance-model";


export function useAccountMaintenance(){
    const [jatuhTempo, setJatuhTempo] = useState<AccountMaintenanceModel[] | null>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const cookies = useCookies()
    const token = cookies.get('auth-token')

    useEffect(()=>{
        async function fetchAccountMaintenance() {
            setLoading(true)
            try {
                const response = await api.get('/historymaintenance', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(response.status != 200){
                    throw new Error(response.data.message || "Failed to fetch sudah account maintenance")
                }
                const data: AccountMaintenanceModel[] = response.data.data
                setJatuhTempo(data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Failed to fetch sudah maintenance")
            } finally {
                setLoading(false)
            }
        }

        fetchAccountMaintenance()
    },[])

    return {jatuhTempo, loading, error}
}