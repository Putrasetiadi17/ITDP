'use client'

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen">
            {/* Bagian Kiri */}
            <div className="w-1/2 bg-blue-500 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">Best Salmon</h1>
            </div>

            {/* Bagian Kanan */}
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-[28px]">
                    {/* Gambar */}
                    <div className="flex justify-center mb-4">
                        <Image
                            src={"/images/bank_bjb.png"}
                            alt="profile"
                            width={95}
                            height={40}
                        />
                    </div>

                    {/* Judul */}
                    <h2 className="text-base text-center mb-2">Login</h2>
                    <h2 className="text-xl font-semibold text-center mb-4">Selamat Datang</h2>

                    {/* Input Username */}
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-600 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tuliskan nama Anda"
                        />
                    </div>

                    {/* Input Password dengan Lihat Password */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-600 mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tuliskan password Anda"
                        />
                        {/* Icon Lihat Password */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-14 right-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A9.956 9.956 0 0112 19c-4.477 0-8.268-2.943-9.542-7 .434-1.399 1.17-2.69 2.117-3.786m1.93-1.966A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7-.434 1.399-1.17 2.69-2.117 3.786M9.878 9.878a3 3 0 104.243 4.243"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3l18 18"
                                    />
                                </svg>
                            )}
                        </button>

                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-sm text-blue-500 hover:underline">Lupa Password?</a>
                        </div>
                    </div>

                    {/* Tombol Login */}
                    <div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
