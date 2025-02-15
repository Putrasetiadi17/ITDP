import Image from "next/image";
import DashboardModalPopup from "@/app/dashboard-modal/page";
import { useState } from "react";
import { useJatuhTempo } from "@/hooks/useJatuhTempo";
import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import CircularLoading from "@/components/loading/circular-loading";

export default function TableAkanJatuhTempo() {
    const debiturData = [
        {
            id: 1,
            name: "Joko",
            profileImg: "/images/profile-1.jpg",
            skorKredit: "Kol-2A",
            jatuhTempo: "2024/12/31",
            alamat: "Jl. Example No. 123, Jakarta",
        },
        {
            id: 2,
            name: "Purnomo",
            profileImg: "/images/profile-2.jpg",
            skorKredit: "Kol-2A",
            jatuhTempo: "2024/11/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
        {
            id: 3,
            name: "Putri",
            profileImg: "/images/profile-3.jpg",
            skorKredit: "Kol-2B",
            jatuhTempo: "2024/12/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
        {
            id: 4,
            name: "Angelina",
            profileImg: "/images/profile-4.jpg",
            skorKredit: "Kol-2B",
            jatuhTempo: "2024/12/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJatuhTempo, setSelectedJatuhTempo] = useState<JatuhTempoModel>()
    function openModal(selectedData: JatuhTempoModel){
        setSelectedJatuhTempo(selectedData)
        setIsModalOpen(true)
    }

    //fetch jatuh tempo
    const {jatuhTempo, loading, error} = useJatuhTempo()

    return (
        <div className="w-full">
            {/* Konten Box */}
            <div className="bg-white pt-[4px] pb-[4px] px-4 rounded-[20px] shadow-md w-full">
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
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Collect</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Jatuh Tempo</th>                                                
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Date Past Due</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Pokok</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Interest</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Saldo</th>
                                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Total Tagihan</th>
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
                                                                alt={`${debitur.debitur.nama} Profile`}
                                                                width={30}
                                                                height={30}
                                                                className="rounded-full"
                                                            />
                                                            {debitur.debitur.nama}
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.collect}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.tanggal_jatuh_tempo}</td>                                                    
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.lama_collect} <span className="text-gray-500">hari</span></td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.outstanding}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.interest}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.debitur.account_balance}</td>
                                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.total_angsuran}</td>
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
            {
                isModalOpen ? <DashboardModalPopup 
                    isModalOpen={isModalOpen} 
                    onCloseModal={setIsModalOpen}
                    selectedJatuhTempo={selectedJatuhTempo || null}
                /> : null
            }
        </div>
    );
}    