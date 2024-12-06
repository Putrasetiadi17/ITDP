import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumbs"
import { SideBarMenuNav } from "@/constants/navigator"
import DashboardLayout from "@/layouts/dashboard-layout"

export default function Dashboard(){
    const index = 5
    const bcItems = [
        {label: SideBarMenuNav[index].name,path: SideBarMenuNav[index].ref}
    ] as BreadcrumbItem[]

    return(
        <DashboardLayout label="Testing" bcItems={bcItems}>
            <>
            </>
        </DashboardLayout>
    )
}