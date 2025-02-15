'use client'

import React, {ChangeEvent, useState } from "react";
import Modal from "@/components/modal/modal-popups";
import { IoWarningOutline } from "react-icons/io5";
import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import { useStoreHistory } from "@/hooks/useStoreHistory";

interface DashboardModalPopupProps {
    isModalOpen: boolean;
    onCloseModal: Function;
    selectedJatuhTempo: JatuhTempoModel | null
}

export default function DashboardModalPopup(props: DashboardModalPopupProps) {
    const optionsStatusNasabah = [
        "Tahap Pengingat", 
        "Tahap Penagihan",
        "Closing",
        "Tidak Bayar"
    ]

    const optionsStatusPertimbangan = [
        "Mengirimkan pesan pengingat kepada nasabah melalui telepon",
        "Mengirimkan pesan pengingat kepada nasabah melalui Whatsapp",
    ]

    const optionsStatusPertimbangan1 = [
        "Melakukan kunjungan nasabah",
        "Melakukan kesepakatan pembayaran jatuh tempo pada nasabah",
    ]

    const optionsStatusPertimbangan2 = [
        "Sudah Bayar",
    ]

    const optionsStatusPertimbangan3 = [
        "Keadaan ekonomi atau force majeur",
        "Di PHK dari pekerjaan",
        "Debitur kabur(pindah rumah dan no telepon tidak bisa dihubungi)"
    ]
     
    const [selectedStatusNasabah, setSelectedStatusNasabah] = useState("")

    const [selectedStatusPertimbangan, setSelectedStatusPertimbangan] = useState("")
    const [selectedStatusPertimbangan1, setSelectedStatusPertimbangan1] = useState("")
    const [selectedStatusPertimbangan2, setSelectedStatusPertimbangan2] = useState("")
    const [selectedStatusPertimbangan3, setSelectedStatusPertimbangan3] = useState("")  
    
    const [isCloseModal, setIsCloseModal] = useState(false)

    function clearState(){
        setSelectedStatusPertimbangan("")
        setSelectedStatusPertimbangan1("")
        setSelectedStatusPertimbangan2("")
        setSelectedStatusPertimbangan3("")
    }
    function onSelectStatusNasabah(value: string){
        clearState()
        setSelectedStatusNasabah(value)
    }
    function onSelectPertimbangan(value: string){
        switch(selectedStatusNasabah){
            case "Tahap Pengingat":
                setSelectedStatusPertimbangan(value)
            case "Tahap Penagihan":
                setSelectedStatusPertimbangan1(value)
            case "Closing":
                setSelectedStatusPertimbangan2(value)
            case "Tidak Bayar":
                setSelectedStatusPertimbangan3(value)
            default:
                setSelectedStatusPertimbangan(value)
        }
    }

    function getValueOption(){
        switch(selectedStatusNasabah){
            case "Tahap Pengingat":
                return selectedStatusPertimbangan
            case "Tahap Penagihan":
                return selectedStatusPertimbangan1
            case "Closing":
                return selectedStatusPertimbangan2
            case "Tidak Bayar":
                return selectedStatusPertimbangan3
            default:
                return selectedStatusPertimbangan
        }

    }

    function onClose() {
        setIsCloseModal(true);
    }
    
    function onSave(){
        props.onCloseModal(false);
    }

    function onCloseModalClose(){
        setIsCloseModal(false);
    }

    function onConfirmModalClose(){
        props.onCloseModal(false)
        setIsCloseModal(false)
    }

    //input state
    const [deskripsi, setDeskripsi] = useState("")
    function onChangeDeskripsi(e: ChangeEvent<HTMLInputElement>){
        setDeskripsi(e.target.value)
    }

    //Function state for uploaded file
    const [uploadedFile, setUploadedFile] = useState<any | null>(null);

    //Handler for file input change
    function onFileChange(event: ChangeEvent<HTMLInputElement>){
        if (event.target.files && event.target.files[0]){
            console.log(event.target.files[0])
            setUploadedFile(event.target.files[0])
        }
    }

    const [selectedTanggal, setSelectedTanggal] = useState("")
    function onChangeTanggal(tanggal: any){
        setSelectedTanggal(tanggal.target.value)
    }

    function searchStringInArray (str: string, strArray: string[]) {
        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].match(str)) return j;
        }
        return -1;
    }

    //submit form
    const {storeNewHistory} = useStoreHistory()
    async function onSubmitForm(){
        const statusPembayaran = searchStringInArray(selectedStatusNasabah, optionsStatusNasabah) +1
        let pertimbanganId
        switch(statusPembayaran){
            case 1:
                pertimbanganId = optionsStatusPertimbangan
                break
            case 2:
                pertimbanganId = optionsStatusPertimbangan1
                break
            case 3:
                pertimbanganId = optionsStatusPertimbangan2
                break
            case 4:
                pertimbanganId = optionsStatusPertimbangan3
                break
            default:
                pertimbanganId = optionsStatusPertimbangan
        }
        const pertimbangan = searchStringInArray(selectedStatusPertimbangan, pertimbanganId) +1
        const formData = new FormData
        formData.append('tanggal_pembayaran', selectedTanggal)
        formData.append('status_pembayaran', statusPembayaran as unknown as string)
        formData.append('pertimbangan', pertimbangan as unknown as string)
        formData.append('deskripsi', deskripsi)
        formData.append('file_bukti', uploadedFile as unknown as Blob)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        await storeNewHistory(props.selectedJatuhTempo?.id as string, formData)
        onConfirmModalClose()
    }

    return (
        <>
            <Modal onClose={onClose}>
                <div className="flex flex-col h-full gap-4">
                    <div className="w-full">
                        <h2 className="text-lg font-bold mb-4">Tambah Eksekusi Penagihan</h2>
                    </div>
                    <div className="h-full overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Nama Debitur</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.debitur.nama}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Nama Account Officer</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder="Priono"
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Segmen</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder="UMKM"
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Collect</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.collect.toString()}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Tanggal Cair</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.tanggal_cair}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Tanggal Jatuh Tempo</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.tanggal_jatuh_tempo}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Tanggal Lunas</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.tanggal_cair}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Date Past Due</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={`${props.selectedJatuhTempo?.lama_collect} hari`}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Pokok</p>
                                <input
                                    type="text" 
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.outstanding.toString()}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Interest</p>
                                <input
                                    type="text" 
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.interest.toString()}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Total Angsuran</p>
                                <input
                                    type="text" 
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.total_angsuran.toString()}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Saldo</p>
                                <input
                                    type="text" 
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.total_angsuran.toString()}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Tanggal Input</p>
                                <input
                                    type="date"
                                    value={selectedTanggal}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={onChangeTanggal}
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Status Eksekusi</p>
                                <select
                                    value={selectedStatusNasabah}
                                    onChange={(e) => onSelectStatusNasabah(e.target.value)}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                >
                                    <option value="" disabled>
                                        Pilih Salah Satu Status
                                    </option>
                                    {
                                        optionsStatusNasabah.map((opt, index) => (
                                            <option key={index} value={opt}>{opt}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Pertimbangan</p>
                                    <select
                                        value={getValueOption()}
                                        onChange={(e) => onSelectPertimbangan(e.target.value)}
                                        className="border px-6 py-2 w-full rounded-[12px]"
                                    >
                                        <option value="" disabled>
                                            Pilih Salah Satu Pertimbangan
                                        </option>
                                        {
                                            selectedStatusNasabah == "Tahap Pengingat" && optionsStatusPertimbangan.map((opt, i)=>(
                                                <option key={i} value={opt}>{opt}</option>
                                            ))
                                        }
                                        {
                                            selectedStatusNasabah == "Tahap Penagihan" && optionsStatusPertimbangan1.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))
                                        }
                                        {
                                            selectedStatusNasabah == "Closing" && optionsStatusPertimbangan2.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))
                                        }
                                        {
                                            selectedStatusNasabah == "Tidak Bayar" && optionsStatusPertimbangan3.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))
                                        }
                                    </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Upload Bukti</p>
                                <input 
                                    type="file" 
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={onFileChange}
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Deskripsi Pesan Pengingat</p>
                                <input
                                    type="text" 
                                    value={deskripsi}
                                    placeholder="Tuliskan deskripsi disini"
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={onChangeDeskripsi}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="mt-4 text-red-700 px-4 py-2 rounded-md w-[90px] hover:bg-red-600 w-[300px] border border-red-600 hover:text-white"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onSubmitForm}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-[90px] hover:bg-blue-600 w-[300px]"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </Modal>
            {
                isCloseModal && (
                    <Modal onClose={onClose}>
                        <div className="flex flex-col items-center justify-center h-full gap-8 p-20">
                            <div className="flex flex-col items-center">
                                <IoWarningOutline size={150} className="text-red-600"/>
                                <h2>Yakin ingin membatalkan proses eksekusi</h2>
                            </div>
                            <div className="flex flex-col gap-4 w-[400px] items-center">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-[330px] hover:bg-blue-600 w-[100px]" onClick={onCloseModalClose}>Tidak</button>
                                <button className="border border-red-600 text-red-600 px-4 py-2 rounded-md w-[330px] hover:bg-red-600 hover:text-white w-[300px]" onClick={onConfirmModalClose}>
                                    Ya</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    );
}
