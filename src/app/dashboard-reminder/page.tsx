'use client'

import DashboardLayout from "@/layouts/dashboard-layout";
import { FaRegUser } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { RiProgress2Line } from "react-icons/ri";
import PieChartComponent from "@/components/charts/piechart";
import { SideBarMenuNav } from "@/constants/navigator";
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumbs";
import TableSemuaDebitur from "@/contents/raport-account-officer/table-semua-debitur";
import TableTelatBayar from "@/contents/raport-account-officer/table-telat-bayar";
import { use, useState } from "react"

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
        {label: SideBarMenuNav[index].subMenu[0].name, path: SideBarMenuNav[index].subMenu[0].ref},
    ] as BreadcrumbItem[]

    return (
        <DashboardLayout label="Testing" bcItems={bcItems}>
            <div className="container mx-auto w-full">
                <div className="text-xl font-semibold pb-8">
                    <h2>UMKM</h2>
                </div>
                {/* Wrapper untuk 3 Konten Box yang mengisi full screen column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Konten Box 1 */}
                    <div className="bg-white shadow-md rounded-[20px] p-4 sm:p-6 lg:p-8 flex flex-col items-start w-full h-full">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <FaRegUser className="text-blue-500 text-2xl" />
                                    <h2 className="text-base font-semibold text-gray-800 pl-4">Debitur</h2>    
                                </div>
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-sm font-medium text-gray-600">Total Debitur</h1>
                                    <span className="text-xl font-bold text-gray-800">8</span>
                                </div>
                            </div>
                        </div>
                        {/* Informasi Jatuh Tempo */}
                        <div className="pt-4 flex items-center h-full w-full">
                            <div className="flex justify-between items-center w-full h-full ">
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">4</span>
                                        <p className="text-xs font-medium text-gray-600">Yang Akan Jatuh Tempo</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-[60%] bg-gray-100"></div>
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                    <span className="text-3xl font-bold">4</span>
                                    <p className="text-xs font-medium text-gray-600">Jatuh Tempo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    {/* Konten Box 2 */}
                    <div className="bg-white shadow-md rounded-[20px] p-4 sm:p-6 lg:p-8 flex flex-col items-start w-full h-full">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <GoChecklist className="text-green-500 text-2xl" />
                                    <h2 className="text-base font-semibold text-gray-800 pl-4">Status Penagihan</h2>
                                </div>
                            </div>
                        </div>
                    {/* Informasi Status Penagihan */}
                    <div className="pt-4 flex items-center h-full w-full">
                        <div className="flex justify-between items-center w-full h-full">
                            <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">10</span>
                                        <p className="text-xs font-medium text-gray-600">Terbayar</p>
                                    </div>
                            </div>
                            <div className="w-[2px] h-[60%] bg-gray-100"></div>
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">1</span>
                                         <p className="text-xs font-medium text-gray-600">Belum Terbayar</p>
                                    </div>
                                </div>
                            
                        <div className="w-[2px] h-[60%] bg-gray-100"></div>
                            <div className="pt-4">
                                <div className="flex flex-col">
                                <span className="text-3xl font-bold">2</span>
                                <p className="text-xs font-medium text-gray-600">Reminded</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
             
                    {/* Konten Box 3 */}
                    <div className="bg-white shadow-md rounded-[20px] gap-6 p-4 sm:p-6 lg:p-8 flex flex-col items-start justify-between w-full h-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <RiProgress2Line className="text-yellow-500 text-2xl" />
                                <h2 className="text-base font-semibold text-gray-800 pl-4">
                                    Progress <span className="text-xs text-gray-600">/total</span>
                                </h2>
                            </div>
                        </div>
                        <div>
                            <PieChartComponent/>
                        </div>
                    </div>
                </div>

                {/* Section Debitur Jatuh Tempo */}
                <div className="container mx-auto pt-8 w-full">
                    <div className="text-xl font-semibold pb-6">
                        <h2>Debitur Jatuh Tempo
                            <span className="text-sm text-gray-400"> /7 hari sebelum jatuh tempo</span>
                        </h2>
                    </div>
                    <div className="flex gap-6 pb-6">
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
            </div>
        </DashboardLayout>
    );
}