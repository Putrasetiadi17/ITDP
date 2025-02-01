export interface AccountMaintenanceModel {
    id: string;
    nama: string;
    credit_id: string;
    tanggal_kunjungan: string;
    jenis_usaha: number;
    jenis_monitoring: number;
    keberadaan_debitur: number;
    penjelasan?: string;
    kesepakatan_awal: string;
    kesesuaian_penggunaan: number;
    file_bukti?: string | null;
    kewajaran_penggunaan_kredit?: number | null;
    debitur_memiliki_pinjaman_baru?: number | null;
    tujuan_pinjaman?: string | null;
    prospek_usaha?: number | null;
    status?: number;
}
