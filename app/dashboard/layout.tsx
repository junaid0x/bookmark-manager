"use client"

import { BookmarkIcon, Code, LogOut, Menu, MoveRight, Plus, SquareX, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const username = "John Doe";

    const router = useRouter()

    const initials = username
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    const handleSignOut = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        router.push("/login");
    };



    return (
        <div className="md:w-screen flex flex-col justify-center items-between border-b-2 border-[#C7C4D8] md:flex-row bg-[#F8F9FF]">
            <aside className={`
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            fixed md:static
            top-0 left-0
            bg-white
            md:bg-[#F8F9FF]
            z-50
            w-70
            p-6
            h-screen
            flex
            flex-col
            justify-between
            border-r-2
            border-[#C7C4D8]
            transition-transform
            duration-300
            ease-in-out
            `}>
                <div>
                    {/* Logo */}
                    <div className="flex flex-row justify-start items-center gap-2 mt-3">
                        <div className="w-10 h-10 bg-[#3525CD] text-white font-bold rounded-full flex items-center justify-center">
                            {initials}
                        </div>
                        <div className="">
                            <h1 className="font-black text-[18px] text-[#3525CD]">{username}</h1>
                            <p className="text-[12px] text-[#464555]">Bookmarkly User</p>
                        </div>
                        <div className="md:hidden flex-1 flex flex-row justify-end">
                            <SquareX onClick={() => setSidebarOpen(false)} color="#ed2d1c" />
                        </div>
                    </div>



                    {/* Categories */}
                    <div className="mt-10 flex flex-col gap-6">
                        <h2 className="flex flex-row gap-1 text-[#464555] font-semibold">
                            <BookmarkIcon color="#464555" />
                            All Bookmarks
                        </h2>
                        <h2 className="flex flex-row gap-1 text-[#464555] font-semibold">
                            <Star color="#464555" />
                            Favorites
                        </h2>
                    </div>
                </div>
                <div>
                    {/* Button */}
                    <div className="flex flex-col md:items-start items-start mt-10">
                        <button onClick={handleSignOut} className="text-white bg-[#ed2d1c] flex flex-row justify-center items-center md:py-3 md:px-12 py-3 px-15  font-semibold gap-2 rounded">
                            <LogOut />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            <header className="md:hidden flex flex-row justify-between p-2 ">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        <Menu onClick={() => setSidebarOpen(true)} />
                    </div>
                    <div>
                        <h1 className="text-[#3525CD] font-black text-[22px]">Bookmarkly</h1>
                    </div>

                </div>
                <div>
                    <div className="flex flex-row justify-start items-center gap-2 mt-3">
                        <div className="w-11 h-11 bg-[#3525CD] text-white font-bold rounded-full flex items-center justify-center">
                            {initials}
                        </div>

                    </div>
                </div>
            </header>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="md:flex-1 ">
                {children}
            </main>
        </div>
    )
}