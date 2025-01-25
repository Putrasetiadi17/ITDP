'use client';

import { FiChevronDown } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { SideBarMenuNav } from "@/constants/navigator";

export default function Sidebar() {
    // State untuk mengontrol dropdown
    const [openDropDown, setOpenDropdown] = useState<number | null>(null);

    // Get the current route
    const pathname = usePathname();

    // Automatically open the dropdown for the active menu
    useEffect(() => {
        SideBarMenuNav.forEach((menu, index) => {
            if (menu.subMenu && menu.subMenu.some((subMenuItem) => pathname.startsWith(subMenuItem.ref))) {
                setOpenDropdown(index);
            } else if (pathname.startsWith(menu.ref)) {
                setOpenDropdown(index);
            }
        });
    }, [pathname]);

    // Function to toggle dropdown
    const toggleDropDown = (index: number) => {
        if (openDropDown === index) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(index);
        }
    };

    // Logout function
    const { logout } = useAuth();

    return (
        <div className="flex w-[340px] min-h-screen bg-white">
            <div className="text-center w-full py-12">
                <h1 className="text-primary-color font-bold text-lg">Best Salmon</h1>
                <div className="text-left p-6 h-full">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col">
                            {SideBarMenuNav.map((menu, index) => (
                                <div key={index} className="text-sm pt-2">
                                    {/* Check if the menu has a submenu */}
                                    {menu.subMenu ? (
                                        <div>
                                            {/* Button to open dropdown */}
                                            <button
                                                onClick={() => toggleDropDown(index)}
                                                className="text-sm/[16px] block w-full px-4 py-2 rounded-lg text-left flex items-center justify-between 
                                                    hover:bg-blue-500 hover:text-white
                                                    focus:bg-blue-200 focus:text-blue-700 focus:outline-none"
                                            >
                                                <div className="flex items-center">
                                                    <FiChevronsRight className="mr-2" /> {/* Icon Chevron */}
                                                    {menu.name}
                                                </div>
                                                <FiChevronDown
                                                    className={`transition-transform ${openDropDown === index ? "transform rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            {/* Submenu that appears if dropdown is open */}
                                            {openDropDown === index && (
                                                <div className="ml-6 mt-2 space-y-2">
                                                    {menu.subMenu.map((subMenuItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            className={`text-xs block px-4 py-2 rounded-lg text-left flex items-center justify-start 
                                                                hover:bg-blue-500 hover:text-white
                                                                hover:scale-105 hover:shadow-md 
                                                                focus:bg-blue-200 focus:text-blue-700 focus:outline-none ${pathname === subMenuItem.ref ? "bg-blue-500 text-white" : ""
                                                                }`}
                                                            href={subMenuItem.ref}
                                                        >
                                                            <FiChevronRight className="mr-2" /> {/* Chevron for submenu */}
                                                            <span>{subMenuItem.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // Render menu without submenu
                                        <Link
                                            className={`text-sm/[16px] block px-4 py-2 rounded-lg flex items-center justify-between
                                                hover:bg-blue-500 hover:text-white
                                                hover:scale-105 hover:shadow-md 
                                                focus:bg-blue-200 focus:text-blue-700 focus:outline-none ${pathname === menu.ref ? "bg-blue-500 text-white" : ""
                                                }`}
                                            href={menu.ref}
                                        >
                                            <div className="flex items-center">
                                                <FiChevronsRight className="mr-2" /> {/* Icon Chevron */}
                                                {menu.name}
                                            </div>
                                            <FiChevronRight /> {/* Icon Chevron */}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            className="flex items-center gap-x-2 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
                            onClick={logout}
                        >
                            <MdOutlineLogout />
                            <span>Keluar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}