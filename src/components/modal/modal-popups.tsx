import React, { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean; // Untuk menentukan apakah modal ditampilkan
    onClose: () => void; // Fungsi untuk menutup modal
    children: ReactNode; // Konten yang akan ditampilkan di dalam modal
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                >
                    Reminder
                </button>
                {/* Modal Content */}
                {children}
            </div>
        </div>
    );
}
