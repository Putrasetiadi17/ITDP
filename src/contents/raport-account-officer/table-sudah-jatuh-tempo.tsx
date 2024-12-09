import Image from "next/image";
import Modal from "@/components/modal/modal-popups";
import DashboardModalPopup from "@/app/dashboard-modal/page";
import { useState } from "react";

export default function TableSudahJatuhTempo() {
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
            skorKredit: "Kol-2A",
            jatuhTempo: "2024/12/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
        {
            id: 4,
            name: "Angelina",
            profileImg: "/images/profile-4.jpg",
            skorKredit: "Kol-2A",
            jatuhTempo: "2024/12/30",
            alamat: "Jl. Example No. 456, Bandung",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    function openModal(){
        setIsModalOpen(true)
    }

    return (
        <div className="w-full">
            {/* Konten Box */}
            <div className="bg-white pt-[4px] pb-[4px] px-4 rounded-[20px] shadow-md">
                <div className="overflow-x-auto w-full">
                    <table className="w-full bg-white border-separate border-spacing-y-4 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-l-lg">Check</th>
                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Debitur</th>
                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Skor Kredit</th>
                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Jatuh Tempo</th>
                                <th className="py-2 px-4 text-sm font-bold text-gray-700">Alamat</th>
                                <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-r-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {debiturData.map((debitur) => (
                                <tr key={debitur.id} className="border-b border-gray-300 rounded-lg">
                                    <td className="py-2 px-4 text-sm text-gray-700 border-y border-l rounded-l-xl">
                                        <input type="checkbox" className="mr-8"/>
                                    </td>
                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={debitur.profileImg}
                                                alt={`${debitur.name} Profile`}
                                                width={30}
                                                height={30}
                                                className="rounded-full"
                                            />
                                            {debitur.name}
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.skorKredit}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.jatuhTempo}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.alamat}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700 border-y border-r rounded-r-xl">
                                        <button onClick={openModal} className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-700">
                                            Reminder
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                isModalOpen ? <DashboardModalPopup isModalOpen={isModalOpen} onCloseModal={setIsModalOpen}/> : null
            }
        </div>
    );
}    