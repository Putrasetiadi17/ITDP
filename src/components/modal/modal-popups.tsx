import React, { ReactNode } from "react";

interface ModalProps {
    onClose: Function; // Fungsi untuk menutup modal
    children: ReactNode; // Konten yang akan ditampilkan di dalam modal
}

export default function Modal({onClose, children }: ModalProps) {
    function onCloseModal(){
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative w-[70vw] h-[90vh]">
                {/* Close Button */}
                {/* Modal Content */}
                {children}
            </div>
        </div>
    );
}
