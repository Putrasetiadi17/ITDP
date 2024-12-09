import React, { useState } from "react";
import Modal from "@/components/modal/modal-popups";

interface DashboardModalPopupProps {
    isModalOpen: boolean;
    onCloseModal: Function;
}

export default function DashboardModalPopup(props: DashboardModalPopupProps) {
    const [nasabahStatus, setNasabahStatus] = useState("");
    const [pertimbangan, setPertimbangan] = useState("");

    function onClose() {
        props.onCloseModal(false);
    }

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col h-full gap-4">
                <div className="w-full">
                    <h2 className="text-lg font-bold mb-4">Tambah Eksekusi Penagihan</h2>
                </div>
                <div className="h-full">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <p>Nama Debitur</p>
                            <input
                                type="text"
                                disabled
                                placeholder="Joko"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Nama Account Officer</p>
                            <input
                                type="text"
                                disabled
                                placeholder="Priono"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Segmen</p>
                            <input
                                type="text"
                                disabled
                                placeholder="UMKM"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Kualitas Kredit</p>
                            <input
                                type="text"
                                disabled
                                placeholder="Kol-2B"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Tanggal Cair</p>
                            <input
                                type="text"
                                disabled
                                placeholder="25/10/2024"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Tanggal Jatuh Tempo</p>
                            <input
                                type="text"
                                disabled
                                placeholder="01/11/2024"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Tanggal Pembayaran</p>
                            <input
                                type="date"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Tanggal Lunas</p>
                            <input
                                type="text"
                                disabled
                                placeholder="31/12/2024"
                                className="border px-6 py-2 w-full rounded-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Status Nasabah</p>
                            <select
                                value={nasabahStatus}
                                onChange={(e) => setNasabahStatus(e.target.value)}
                                className="border px-6 py-2 w-full rounded-[12px]"
                            >
                                <option value="" disabled>
                                    Pilih Salah Satu Status
                                </option>
                                <option value="Mengunjungi Tempat Tinggal Nasabah">Tahap Pengingat</option>
                                <option value="Tidak diteruskan Karena Pertimbangan bjb">Tahap Penagihan</option>
                                <option value="Sedang Memenuhi Berkas/Persyaratan">Closing</option>
                                <option value="Sudah Bayar">Tidak Bayar</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Pertimbangan</p>
                            <select
                                value={pertimbangan}
                                onChange={(e) => setPertimbangan(e.target.value)}
                                className="border px-6 py-2 w-full rounded-[12px]"
                            >
                                <option value="" disabled>
                                    Pilih Salah Satu Pertimbangan
                                </option>
                                <option value="Mengunjungi Tempat Tinggal Nasabah">Tahap Pengingat</option>
                                <option value="Tidak diteruskan Karena Pertimbangan bjb">Tahap Penagihan</option>
                                <option value="Sedang Memenuhi Berkas/Persyaratan">Closing</option>
                                <option value="Sudah Bayar">Tidak Bayar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-[95px]"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-[95px]"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </Modal>
    );
}
