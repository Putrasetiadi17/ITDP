'use client'

import DashboardLayout from "@/layouts/dashboard-layout";
import { FaRegUser } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { RiProgress2Line } from "react-icons/ri";
import PieChartComponent from "@/components/charts/piechart";
import { SideBarMenuNav } from "@/constants/navigator";
import { BreadcrumbItem } from "@/components/breadcrumb/breadcrumbs";
import { useState } from "react"
import TableAkanJatuhTempo from "@/contents/raport-account-officer/table-akan-jatuh-tempo";
import TableSudahJatuhTempo from "@/contents/raport-account-officer/table-sudah-jatuh-tempo";
import { useStatusPenagihan } from "@/hooks/useStatusPenagihan";
import { useTotalDebitur } from "@/hooks/useTotalDebitur";
import { useUpdateSudahJatuhTempo } from "@/hooks/useUpdateSudahJatuhTempo";
import { GrHostMaintenance } from "react-icons/gr";
import PieChartComponentAccountMaintenance from "@/components/charts/piechart-account-maintenance";

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState(0)
    const { storeNewUpdateSudahJatuhTempo } = useUpdateSudahJatuhTempo();

    function onCLickSemuaDebitur() {
        setSelectedTab(0)
    }
    function onCLickTelatBayar() {
        setSelectedTab(1)
    }

    const index = 6
    const bcItems = [
        { label: SideBarMenuNav[index].name },
        { label: SideBarMenuNav[index].subMenu[0].name, path: SideBarMenuNav[index].subMenu[0].ref },
    ] as BreadcrumbItem[]

    const {
        statuspenagihan
    } = useStatusPenagihan()

    const {
        totaldebitur
    } = useTotalDebitur()

    const onUpdate = () => {
        // e.preventDefault();
        storeNewUpdateSudahJatuhTempo(); 
    };

    return (
        <DashboardLayout label="Testing" bcItems={bcItems}>
            <div className="container mx-auto w-full">
                <div className="text-xl font-semibold pb-8">
                    <h2>UMKM</h2>
                </div>
                <div className="text-xl font-sm pb-8">
                    <h2>Monitoring Account Maintenance</h2>
                </div>
                 {/* Konten Atas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Konten Box 1 */}
                    <div className="bg-white shadow-md rounded-[20px] p-6 flex flex-col flex-1">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <FaRegUser className="text-blue-500 text-2xl" />
                                    <h2 className="text-base font-semibold text-gray-800 pl-4">Debitur</h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-sm font-medium text-gray-600">Debitur Kelolaan</h1>
                                    <span className="text-xl font-bold text-gray-800">{totaldebitur?.all_deb}</span>
                                </div>
                            </div>
                        </div>
                        {/* Informasi Jatuh Tempo */}
                        <div className="pt-4 flex items-center h-full w-full">
                            <div className="flex justify-between items-center w-full h-full">
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{(totaldebitur?.all_deb || 0) - (totaldebitur?.all_jt || 0)}</span>
                                        <p className="text-xs font-medium text-gray-600">Sudah Jatuh Tempo</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-[60%] bg-gray-100 mx-3"></div>
                                <div className="pt-4">
                                    <div className="flex flex-col items-start">
                                        <span className="text-3xl font-bold">{totaldebitur?.all_jt}</span>
                                        <p className="text-xs font-medium text-gray-600">Akan Jatuh Tempo</p>
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
                                    <h2 className="text-base font-semibold text-gray-800 pl-4">Progres Monitoring
                                    <span className="text-xs text-gray-600"> /bulan</span>
                                    </h2>
                                </div>
                            </div>
                            <PieChartComponentAccountMaintenance />
                        </div>
                    </div>
                </div>

                
                {/* Konten Bawah */}
                <div className="text-xl font-sm pb-8 mt-8">
                    <h1>Monitoring Pipeline</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {/* Konten Box 2 */}
                    <div className="bg-white shadow-md rounded-[20px] p-4 sm:p-6 lg:p-8 flex flex-col items-start w-full h-full">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <GoChecklist className="text-green-500 text-2xl" />
                                    <h2 className="text-base font-semibold text-gray-800 pl-4">Status Pipeline</h2>
                                </div>
                            </div>
                        </div>
                        {/* Informasi Status Penagihan */}
                        <div className="pt-4 flex items-center h-full w-full">
                            <div className="flex justify-between items-center w-full h-full">
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{statuspenagihan?.tahap_pengingat}</span>
                                        <p className="text-xs font-medium text-gray-600">Tahap Pengingat</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-[60%] bg-gray-100 mx-3"></div>
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{statuspenagihan?.tahap_penagihan}</span>
                                        <p className="text-xs font-medium text-gray-600">Tahap Penagihan</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-[60%] bg-gray-100 mx-3"></div>
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{statuspenagihan?.closing}</span>
                                        <p className="text-xs font-medium text-gray-600">Closing</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-[60%] bg-gray-100 mx-3"></div>
                                <div className="pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{statuspenagihan?.tidak_bayar}</span>
                                        <p className="text-xs font-medium text-gray-600">Tidak Bayar</p>
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
                            <PieChartComponent />
                        </div>
                    </div> 
                </div>

                {/* Section Debitur Jatuh Tempo */}

                <div className="container mx-auto pt-8 w-full">
                    <div className="text-xl font-semibold pb-6">
                        <h2>
                            Debitur Jatuh Tempo
                            <span className="text-sm text-gray-400"> /7 hari sebelum jatuh tempo</span>
                        </h2>
                    </div>

                    {/* Tabs and Tombol Update */}
                    <div className="flex justify-between items-center pb-6">
                        <div className="flex gap-6">
                            <button
                                onClick={onCLickSemuaDebitur}
                                className={selectedTab == 0 ? "text-blue-600" : "text-gray-400"}
                            >
                                Akan Jatuh Tempo
                            </button>
                            <button
                                onClick={onCLickTelatBayar}
                                className={selectedTab == 1 ? "text-blue-600" : "text-gray-400"}
                            >
                                Sudah Jatuh Tempo
                            </button>
                        </div>
                        {selectedTab === 1 && (
                           <button 
                                onClick={onUpdate} 
                                className="border border-blue-500 text-blue-500 text-sm font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-500 hover:text-white">
                           Update
                       </button>
                        )}
                    </div>

                    {/* Tab Tabel Informasi Debitur */}
                    {selectedTab === 0 && <TableAkanJatuhTempo />}
                    {selectedTab === 1 && <TableSudahJatuhTempo />}
                </div>
            </div>
        </DashboardLayout>
    );
}