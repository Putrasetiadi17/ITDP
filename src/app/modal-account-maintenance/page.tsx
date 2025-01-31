import React, {ChangeEvent, use, useState } from "react";
import Modal from "@/components/modal/modal-popups";
import { IoWarningOutline } from "react-icons/io5";
import { JatuhTempoModel } from "@/models/jatuh-tempo-model";
import { useStoreHistoryAccountOfficer } from "@/hooks/useHistoryAccountMaintenance";

interface DashboardModalPopupProps {
    isModalOpen: boolean;
    onCloseModal: Function;
    selectedJatuhTempo: JatuhTempoModel | null
}


export default function DashboardModalAccountMaintenancePopup(props: DashboardModalPopupProps) {
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

    //Drop down terbaru

    const optionsJenisMonitoring = [
        "Kunjungan Langsung",
        "Via Telepon",
        "Debitur datang ke Cabang"
    ]

    const optionsKeberadaanDebitur = [
        "Ada",
        "Tidak ada ditempat"
    ]

    const optionsJenisUsaha = [
        "Perdagangan",
        "Jasa",
        "Industri"
    ]

    const optionsKewajaranPenggunaanKredit = [
        "Pinjaman baru untuk menutupi kesulitan keunagan",
        "Pinjaman baru untuk memenuhi kewajiban jatuh tempo"
    ]

    const optionsProspekUsaha = [
        "Prospek usaha naik/stabil",
        "Prospek usaha menurun",
        "Bangkrut"
    ]

    const optionsKesesuaianPenggunaan = [
        "Sesuai",
        "Tidak sesuai"
    ]


    const optionsDebiturMemilikiPinjamanBaru = [
        "Tidak",
        "Ya, sebutkan pinjaman baru tersebut"
    ]

    // const terbaru
    
    const [selectedJenisMonitoring, setSelectedJenisMonitoring] = useState("")

    const [selectedKeberadaanDebitur, setSelectedKeberadaanDebitur] = useState("")

    const [selectedJenisUsaha, setSelectedJenisUsaha] = useState("")

    const [selectedKewajaranPenggunaanKredit, setSelectedKewajaranPenggunaanKredit] = useState("")

    const [selectedProspekUsaha, setSelectedProspekUsaha] = useState("")

    const [selectedKesesuaianPenggunaan, setSelectedKesesuaianPenggunaan] = useState("")

    const [selectedDebiturMemilikiPinjamanBaru, setSelectedDebiturMemilikiPinjamanBaru] = useState("")

    const [penjelasanKeberadaan, setPenjelasanKeberadaan] = useState("")

    const [penjelasaanPinjamanBaruDebitur, setPenjelasanPinjamanDebitur] = useState("")

    // const lama
     
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

    const [kesepakatanAwal, setKesepakatanAwal] = useState("")
    function onChangeKesepakatanAwal(e: ChangeEvent<HTMLInputElement>){
        setKesepakatanAwal(e.target.value)
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

    // submit form
    const {storeNewHistoryAccountOfficer} = useStoreHistoryAccountOfficer()
    async function onSubmitForm(){
        const formData = new FormData
        formData.append('tanggal_kunjungan', selectedTanggal)
        formData.append('kesepakatan_awal',  kesepakatanAwal)
        formData.append('deskripsi', deskripsi)
        formData.append('file_bukti', uploadedFile as unknown as Blob)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        await storeNewHistoryAccountOfficer(props.selectedJatuhTempo?.id as string, formData)
        onConfirmModalClose()
    }

    return (
        <>
            <Modal onClose={onClose}>
                <div className="flex flex-col h-full gap-4">
                    <div className="w-full">
                        <h2 className="text-lg font-bold mb-4">Tambah Realisasi</h2>
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
                                <p>Kualitas Kredit</p>
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
                            <p>Saldo</p>
                                <input
                                    type="text" 
                                    disabled
                                    placeholder={props.selectedJatuhTempo?.total_angsuran.toString()}
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
                                <p>Upload Document</p>
                                <input 
                                    type={"file"} 
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={onFileChange}
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Jenis Monitoring</p>
                                <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedJenisMonitoring}
                                    onChange={(e) => setSelectedJenisMonitoring(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Jenis Monitoring</option>
                                    {optionsJenisMonitoring.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-3 text-sm">
                                <p>Keberadaan Debitur</p>
                                    <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedKeberadaanDebitur}
                                    onChange={(e) => setSelectedKeberadaanDebitur(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Keberadaan Debitur</option>
                                    {optionsKeberadaanDebitur.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Penjelasan Keberadaan Debitur</p>
                                <input
                                    type="text" 
                                    disabled={selectedKeberadaanDebitur !== "Tidak ada ditempat"}
                                    placeholder="Tulis penjelasan keberadaan debitur"
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={(e) => setPenjelasanKeberadaan(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Jenis Usaha</p>
                                <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedJenisUsaha}
                                    onChange={(e) => setSelectedJenisUsaha(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Jenis Usaha</option>
                                    {optionsJenisUsaha.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Kewajaran Penggunaan Kredit dari pinjaman baru</p>
                                <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedKewajaranPenggunaanKredit}
                                    onChange={(e) => setSelectedKewajaranPenggunaanKredit(e.target.value)}
                                >
                                   <option value="" disabled>Pilih Jenis Kewajaran Kredit pinjaman baru</option>
                                   {optionsKewajaranPenggunaanKredit.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                   ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Prospek Usaha</p>
                                <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedProspekUsaha}
                                    onChange={(e) => setSelectedProspekUsaha(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Jenis Prospek Usaha</option>
                                    {optionsProspekUsaha.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Kesesuaian Penggunaan</p>
                                <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedKesesuaianPenggunaan}
                                    onChange={(e) => setSelectedKesesuaianPenggunaan(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Kesesuaian Penggunaan</option>
                                    {optionsKesesuaianPenggunaan.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Tanggal Kunjungan</p>
                                <input
                                    type="date"
                                    value={selectedTanggal}
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={onChangeTanggal}
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Kesepakatan Awal</p>
                                <input 
                                    type="text" 
                                    value={kesepakatanAwal}
                                    placeholder="Tuliskan kesepakatan awal disini"
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={onChangeKesepakatanAwal}
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Debitur Memiliki Pinjaman Baru di Tempat Lain</p>
                                <select
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    value={selectedDebiturMemilikiPinjamanBaru}
                                    onChange={(e) => setSelectedDebiturMemilikiPinjamanBaru(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Keterangan</option>
                                    {optionsDebiturMemilikiPinjamanBaru.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Penjelasan Pinjaman Baru Debitur</p>
                                <input
                                    type="text" 
                                    disabled={selectedDebiturMemilikiPinjamanBaru !== "Ya, sebutkan pinjaman baru tersebut"}
                                    placeholder="Tulis penjelasan pinjaman baru debitur"
                                    className="border px-6 py-2 w-full rounded-[12px]"
                                    onChange={(e) => setPenjelasanPinjamanDebitur(e.target.value)}
                                />
                            </div>              
                            <div className="flex flex-col gap-3 text-sm">
                                <p>Deskripsi</p>
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
                    <div className="flex justify-end gap-4 text-sm">
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