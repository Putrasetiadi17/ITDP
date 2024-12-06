'use client';

import { FiChevronLeft, FiMenu } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { SideBarMenuNav } from "@/constants/navigator";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    // State untuk mengontrol dropdown
    const [openDropDown, setOpenDropdown] = useState<number | null>(null);

    // Fungsi untuk toggle dropdown
    const toggleDropDown = (index: number) => {
        if (openDropDown === index) {
            setOpenDropdown(null); // Menutup dropdown jika sama diklik
        } else {
            setOpenDropdown(index); // Membuka dropdown untuk menu yang dipilih
        }
    };

    return (
        <div className="flex w-[340px] min-h-screen bg-white">
            <div className="text-center w-full py-12">
                <h1 className="text-primary-color font-bold text-lg">Best Salmon</h1>
                <div className="text-left p-6">
                    {SideBarMenuNav.map((menu, index) => (
                        <div key={index} className="text-sm pt-2">
                            {/* Cek apakah menu memiliki submenu */}
                            {menu.subMenu ? (
                                <div>
                                    {/* Tombol untuk membuka dropdown */}
                                    <button
                                        onClick={() => toggleDropDown(index)}
                                        className="text-sm/[16px] block w-full px-4 py-2 rounded-lg text-left flex items-center justify-between 
                                            hover:bg-blue-500 hover:text-white
                                            focus:bg-blue-200 focus:text-blue-700 focus:outline-none"
                                    >
                                        <div className="flex items-center">                            
                                            <FiChevronsRight className="mr-2" /> {/* Icon Chevron di sebelah kiri */}                                            
                                            {menu.name}
                                        </div>
                                        <FiChevronDown
                                            className={`transition-transform ${
                                                openDropDown === index ? "transform rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {/* Submenu yang hanya muncul jika dropdown terbuka */}
                                    {openDropDown === index && (
                                        <div className="ml-6 mt-2 space-y-2">                                    
                                            {menu.subMenu.map((subMenuItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    className="text-xs block px-4 py-2 rounded-lg text-left flex items-center justify-start 
                                                        hover:bg-blue-500 hover:text-white
                                                        hover:scale-105 hover:shadow-md 
                                                        focus:bg-blue-200 focus:text-blue-700 focus:outline-none"
                                                    href={subMenuItem.ref}        
                                                >
                                                    <FiChevronRight className="mr-2"/> {/* Chevron di sebelah kiri submenu */}
                                                    <span>{subMenuItem.name}</span>                                          
                                        
                                                </Link>                                                
                                            ))}                                            
                                        </div>                                        
                                    )}
                                </div>
                            ) : (
                                // Jika menu tidak memiliki submenu, render dengan icon di kiri dan kanan
                                <Link
                                    className="text-sm/[16px] block px-4 py-2 rounded-lg flex items-center justify-between
                                        hover:bg-blue-500 hover:text-white
                                        hover:scale-105 hover:shadow-md 
                                        focus:bg-blue-200 focus:text-blue-700 focus:outline-none"
                                    href={menu.ref}
                                >
                                    <div className="flex items-center">
                                        <FiChevronsRight className="mr-2" /> {/* Icon Chevron di sebelah kiri */}
                                        {menu.name}
                                    </div>                                    
                                    <FiChevronRight /> {/* Icon Chevron di sebelah kanan */}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}