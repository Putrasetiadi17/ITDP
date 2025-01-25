'use client'

import Image from "next/image";
import { useHistoryDebitur } from "@/hooks/useHistoryDebitur";
import CircularLoading from "@/components/loading/circular-loading";

export default function TableRaportAccountOfficer() {
    const historyDataDebitur = [
        {
            id: 1,
            name: "Joko",
            profileImg: "/images/profile-1.jpg",
            skorKredit: "Kol-2B",
            segmen: "UMKM",
            statusNasabah: "Tahap Pengingat",
            pertimbangan: "Mengirimkan pesan pengingat melalui telepon",
            accountOfficer: "Priono",
            jatuhTempo: "01/11/2024",
        },
    ];

    // Fetch history debitur
    const { historyDebitur, loading, error } = useHistoryDebitur();

    return (
        <div className="container mx-auto w-full">
            {/* Header */}
            <div className="text-xl font-semibold pb-8">
                <h2>List History Pipeline</h2>
            </div>
            {/* Tabel */}
            <div className="w-full">
                <div className="bg-white pt-[4px] pb-[4px] px-4 rounded-[20px] shadow-md">
                    {loading ? (
                        <CircularLoading />
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : historyDebitur && historyDebitur.length > 0 ? (
                        <div className="overflow-x-auto w-full">
                            <table className="w-full bg-white border-separate border-spacing-y-4 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr className="text-left">
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-l-lg">Debitur</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700">Skor Kredit</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700">Angsuran</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700">Status Nasabah</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700">Pertimbangan</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700">Deskripsi</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700">Tanggal Input</th>
                                        <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-r-lg">Jatuh Tempo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyDebitur?.map((debitur, i) => (
                                        <tr key={i} className="border-b rounded-lg">
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y border-l rounded-l-xl">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src="/images/profile-1.jpg"
                                                        alt="Name Testing"
                                                        width={30}
                                                        height={30}
                                                        className="rounded-full"
                                                    />
                                                    <span>{debitur.nama}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.collect}</td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.total_angsuran}</td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.status_pembayaran}</td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.pertimbangan}</td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.deskripsi}</td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.tanggal_pembayaran}</td>
                                            <td className="py-2 px-4 text-sm text-gray-700 border-y border-r rounded-r-xl">{debitur.tanggal_jatuh_tempo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Data kosong</p>
                    )}
                </div>
            </div>
        </div>
    );
}
