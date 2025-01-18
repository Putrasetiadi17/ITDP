import Image from "next/image";
import DashboardModalPopup from "@/app/dashboard-modal/page";
import { useState } from "react";
import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import { useSudahJatuhTempo } from "@/hooks/useSudahJatuhTempo";
import CircularLoading from "@/components/loading/circular-loading";
import { AccountMaintenanceModel } from "@/models/account-maintenance-model";
import { useAccountMaintenance } from "@/hooks/useAccountMaintenance";
import DashboardModalAccountMaintenancePopup from "@/app/modal-account-maintenance/page";

export default function TableAccountMaintenance() {
    const debiturData = [
        {
            id: 1,
            name: "Joko",
            profileImg: "/images/profile-1.jpg",
            skorKredit: "Kol-2B",
            jatuhTempo: "2024/12/31",
            alamat: "Jl. Example No. 123, Jakarta",
        },
        {
            id: 2,
            name: "Purnomo",
            profileImg: "/images/profile-2.jpg",
            skorKredit: "Kol-2B",
            jatuhTempo: "2024/11/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
        {
            id: 3,
            name: "Putri",
            profileImg: "/images/profile-3.jpg",
            skorKredit: "Kol-2C",
            jatuhTempo: "2024/12/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
        {
            id: 4,
            name: "Angelina",
            profileImg: "/images/profile-4.jpg",
            skorKredit: "Kol-2C",
            jatuhTempo: "2024/12/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJatuhTempo, setSelectedJatuhTempo] = useState<AccountMaintenanceModel>()
    function openModal(selectedData: AccountMaintenanceModel){
        setIsModalOpen(true)
        setSelectedJatuhTempo(selectedData)
    }

    //fecth sudah jatuh tempo
    const {jatuhTempo, loading, error} = useAccountMaintenance()

    console.log(jatuhTempo);


    return (
        <div className="w-full">
            {/* Konten Box */}
            <div className="bg-white pt-[4px] pb-[4px] px-4 rounded-[20px] shadow-md">
            {
                    loading ? (
                        <CircularLoading/>
                    ) : (
                        error ? (
                            <p>error: {error}</p>
                        ) : (
                            (jatuhTempo && jatuhTempo?.length > 0) ? (
                                <div className="overflow-x-auto w-full">
                                    <table className="w-full bg-white border-separate border-spacing-y-4 rounded-lg">
                                        <thead className="bg-gray-100">
                                            <tr className="text-left">
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-l-lg">Debitur</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Skor Kredit</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Jatuh Tempo</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Angsuran</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Kesepakatan Awal</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Deskripsi</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">File Upload</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-r-lg">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jatuhTempo?.map((debitur) => (
                                                <tr key={debitur.id} className="border-b border-gray-300 rounded-lg">
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y border-l rounded-l-xl">
                                                        <div className="flex items-center gap-4">
                                                            <Image
                                                                src={"/images/profile-1.jpg"}
                                                                alt={`Profile`}
                                                                width={30}
                                                                height={30}
                                                                className="rounded-full"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.credit_id}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.kesepakatan_awal}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.deskripsi}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.tanggal_kunjungan}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y border-r rounded-r-xl">
                                                        <button onClick={()=>openModal(debitur)} className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-700">
                                                            Create Pipeline
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>data kosong</p>
                            )
                        )
                    )
                }
            </div>
            {/* {
                isModalOpen ? <DashboardModalAccountMaintenancePopup isModalOpen={isModalOpen} onCloseModal={setIsModalOpen} selectedJatuhTempo={selectedJatuhTempo || null}/> : null
            } */}
        </div>
    );
}    