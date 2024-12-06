import { ReactNode } from "react"
import Navbar from "@/components/navbar/navbar"
import Sidebar from "@/components/sidebar/sidebar"
import Breadcrumb, { BreadcrumbItem } from "@/components/breadcrumb/breadcrumbs";

interface DashboardLayoutProps {
    label: string;
    children: ReactNode;
    bcItems: BreadcrumbItem[];
    onClickBC?: Function;
}

export default function DashboardLayout(props:DashboardLayoutProps){
    return(
        <div className="flex">
            {/* sidebar */}
            <Sidebar/>
            <div className="flex flex-col w-full p-8 gap-4">
                {/* navbar */}
                <Navbar/>
                {/* content */}
                <div>
                    <Breadcrumb items={props.bcItems} onClick={props.onClickBC}/>
                </div>
                <div className="flex w-full background">
                    {props.children}
                </div>
            </div>
        </div>
    )
}