'use client'

import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumbs"
import { SideBarMenuNav } from "@/constants/navigator"
import DashboardLayout from "@/layouts/dashboard-layout"
import TableHistoryAccountMaintenance from "@/contents/raport-account-officer/table-history-account-maintenance"

export default function RaportAccountOfficer(){    
    const index = 6
    const bcItems = [
        {label: SideBarMenuNav[index].name},
        {label: SideBarMenuNav[index].subMenu[3].name, path: SideBarMenuNav[index].subMenu[0].ref},
    ] as BreadcrumbItem[]
    
    
    return(
        <DashboardLayout label="Testing" bcItems={bcItems}>
            <div className="text-xl pb-8 w-full">
                <TableHistoryAccountMaintenance/>
            </div>
        </DashboardLayout>
    )
}