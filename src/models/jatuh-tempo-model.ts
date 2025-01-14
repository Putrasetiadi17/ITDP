import { DebiturModel } from "./debitur-model";

export interface JatuhTempoModel{
    id: string,
    debitur_id: string,
    officer_id: number,
    segmen_kredit: number,
    tanggal_cair: string,
    tanggal_jatuh_tempo: string,
    tanggal_lunas: string,
    outstanding: number,
    interest: number,
    total_angsuran: number,
    collect: number,
    status: number,
    created_at: string,
    updated_at: string,
    debitur: DebiturModel
}