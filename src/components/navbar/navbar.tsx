import { LuBell } from "react-icons/lu";
import { CiDark } from "react-icons/ci";
import Image from "next/image";
import '@fontsource/poppins/300.css';



export default function Navbar(){
    return(
        <div className="flex items-center bg-white p-4 gap-4 shadow-md">
            <div className="w-[240px] px-2">
                <CiDark/>   
            </div>
            <div className="flex items-center justify-end w-full px-4">
                <div className="flex items-center gap-4">
                    <LuBell/>
                    <div className="flex flex-col items-end">
                        <h1 className="text-base">PUTRA SETIADI</h1>
                        <h1 className="text-xs text-gray-400">Staf AO Komersial - KC UTAMA BANDUNG</h1>
                    </div>
                    <Image src={"/images/profile-5.jpg"} alt="profile" width={40} height={40} className="rounded-full"/>
                </div>
            </div>
        </div>
    )
}