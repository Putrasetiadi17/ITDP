import Image from "next/image";

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

    return (
        <div className="container mx-auto w-full">
            {/* Header */}
            <div className="text-xl font-semibold pb-8">
                <h2>Plan Eksekusi Penagihan</h2>
            </div>
            {/* Tabel */}
            <div className="w-full">
                <div className="bg-white pt-[4px] pb-[4px] px-4 rounded-[20px] shadow-md">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full bg-white border-separate border-spacing-y-4 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr className="text-left">
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-l-lg">Debitur</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Skor Kredit</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Segmen</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Status Nasabah</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">Pertimbangan</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700">AO</th>
                                    <th className="py-2 px-4 text-sm font-bold text-gray-700 rounded-r-lg">Jatuh Tempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyDataDebitur.map((debitur) => (
                                    <tr key={debitur.id} className="border-b rounded-lg">
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y border-l rounded-l-xl">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={debitur.profileImg}
                                                    alt={`${debitur.name} Profile`}
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                <span>{debitur.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.skorKredit}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.segmen}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.statusNasabah}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.pertimbangan}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y">{debitur.accountOfficer}</td>
                                        <td className="py-2 px-4 text-sm text-gray-700 border-y border-r rounded-r-xl">{debitur.jatuhTempo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
