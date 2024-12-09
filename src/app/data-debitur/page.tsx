'use client'

import TableSemuaDebitur from "@/contents/raport-account-officer/table-akan-jatuh-tempo";
import TableTelatBayar from "@/contents/raport-account-officer/table-sudah-jatuh-tempo";
import DashboardLayout from "@/layouts/dashboard-layout";
import { useState } from "react";
import { SideBarMenuNav } from "@/constants/navigator";
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumbs";

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState(0)
    function onCLickSemuaDebitur(){
        setSelectedTab(0)
    }
    function onCLickTelatBayar(){
        setSelectedTab(1)
    }
    
    const index = 6
    const bcItems = [
        {label: SideBarMenuNav[index].name},
        {label: SideBarMenuNav[index].subMenu[1].name, path: SideBarMenuNav[index].subMenu[1].ref},
    ] as BreadcrumbItem[]
    return (
        <DashboardLayout label="Testing" bcItems={bcItems}>
            <div className="container mx-auto w-full flex flex-col gap-6">
                <div className="text-xl font-semibold flex flex-col gap-6">
                    <h2>UMKM</h2>
                    <p className="text-sm text-gray-400 flex items-center">
                        Total Debitur
                        <span className="text-[28px] font-bold text-gray-900 ml-4">2</span>
                    </p>
                </div>

                <div className="flex gap-6">
                    <button onClick={onCLickSemuaDebitur} className={selectedTab == 0 ? "text-blue-600" : "text-gray-400"}>Semua Debitur</button>
                    <button onClick={onCLickTelatBayar} className={selectedTab == 1 ? "text-blue-600" : "text-gray-400"}>Debitur Telat Bayar</button>
                </div>

                {/* Tabel Informasi Debitur */}
                {
                    (selectedTab == 0) && (
                        <TableSemuaDebitur/>
                    )
                }
                {
                    (selectedTab == 1) && (
                        <TableTelatBayar/>
                    )
                }
            </div>
        </DashboardLayout>
    );
}