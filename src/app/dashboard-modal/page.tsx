import React, { useState} from "react";
import Modal from "@/components/modal/modal-popups";

export default function DashboardModalPopup(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Open Modal</button>
                
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-lg font-bold mb-4">Reminder</h2>
                    <p className="text-gray-700">Modal Testing Nih</p>
                    <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
                        Close
                    </button>
                </Modal>
        </div>
    )
}