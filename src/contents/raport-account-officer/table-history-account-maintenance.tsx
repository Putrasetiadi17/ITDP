import Image from "next/image";
import { useState } from "react";
import CircularLoading from "@/components/loading/circular-loading";
import { AccountMaintenanceModel } from "@/models/account-maintenance-model";
import { useAccountMaintenance } from "@/hooks/useAccountMaintenance";
import { Span } from "next/dist/trace";

export default function TableAccountMaintenance() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJatuhTempo, setSelectedJatuhTempo] = useState<AccountMaintenanceModel | null>(null);

    function openModal(selectedData: AccountMaintenanceModel) {
        setIsModalOpen(true);
        setSelectedJatuhTempo(selectedData);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedJatuhTempo(null);
    }

    // Fetch data jatuh tempo
    const { jatuhTempo, loading, error } = useAccountMaintenance();

    return (
        <div className="w-full">
            <div className="text-xl font-semibold pb-8">
                <h2>List History Realisasi</h2>
            </div>
            <div className="bg-white pt-4 pb-4 px-4 rounded-2xl shadow-md">
                {loading ? (
                    <CircularLoading />
                ) : error ? (
                    <p>Error: {error}</p>
                ) : jatuhTempo && jatuhTempo.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full bg-white border-separate border-spacing-y-4 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr className="text-left">
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-l-lg">Debitur</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Tanggal Cair</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Kesesuaian Kesepakatan</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Tanggal Kunjungan</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Keberadaan Debitur</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Penjelasan Keberadaan Debitur</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Pinjaman Baru di Tempat Lain</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Penjelasan Baru di Tempat Lain</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-r-lg">File Upload</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {jatuhTempo.map((debitur) => (
                                    <tr key={debitur.id} className="border-b border-gray-300 rounded-lg">
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y border-l rounded-l-xl">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={"/images/profile-1.jpg"}
                                                    alt="Profile"
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                {debitur.nama}
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.tanggal_kunjungan}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.kesesuaian_penggunaan === 1 ? "Sesuai" : "Tidak Sesuai"}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.tanggal_kunjungan ? debitur.tanggal_kunjungan : <span className="text-gray-500 italic">Belum dijadwalkan</span>}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.keberadaan_debitur === 1 ? "Ada" : "Tidak ada ditempat"}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.penjelasan ? debitur.penjelasan : <span className="text-gray-500 italic">Debitur ada ditempat</span>} </td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.debitur_memiliki_pinjaman_baru === 1 ? "Ya, sebutkan pinjaman baru tersebut" : "Tidak"}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.tujuan_pinjaman ? debitur.tujuan_pinjaman : <span className="text-gray-500 italic">Debitur Tidak Memiliki Pinjaman Baru</span>}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y border-r rounded-r-xl">
                                            {debitur.file_bukti ? (
                                                <a 
                                                    href={debitur.file_bukti}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline hover:text-blue-700 text-sm"
                                                >
                                                    Lihat Bukti
                                                </a>
                                            ) : (
                                                <span className="text-gray-500 italic">Tidak ada file</span>
                                            )}
                                        </td>
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
    );
}