"use client"

import { Bookmark, ChevronRight, Lock, Mail } from "lucide-react"
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if(!response.ok){
                toast.error("Error")
                return
                
            }

            const data = await response.json()
            const token = data.token
            localStorage.setItem("token", token)

            toast.success("Logged in")
            router.push("/dashboard")



        } catch (error) {
            console.log("Error", error)
            toast.error("Something went wrong");
        }
    }

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center bg-[#F8F9FF]">
            <div className="lg:w-150 py-8 w-100 lg:p-4  bg-white border border-[#C7C4D8] rounded">
                {/* Logo */}
                <div className="flex flex-col gap-1 items-center text-center lg:p-4">
                    <div className="w-full flex flex-row justify-center gap-1 items-center">
                        <Bookmark  className="text-[#1E00A9] lg:w-10 lg:h-10 w-8 h-8"/>
                        <h1 className="lg:text-[32px] text-[24px] font-bold text-[#1E00A9]">
                            Bookmarkly
                        </h1>
                    </div>
                    <div className="w-[85%] flex flex-row items-center justify-center align-middle">
                        <p className="text-[#464555] lg:text-[18px] text-[16px] align-middle">Save it. Organize it. Find it.</p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="px-10 py-4 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                        <div className="flex flex-col gap-1 relative">
                            <label htmlFor="" className="font-bold">Email Address</label>
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Example@yahoo.com" className="py-2 pl-9 border border-[#C7C4D8]"/>
                            <Mail color="#777587" className="absolute bottom-2.5 left-1.5"/>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label htmlFor="" className="font-bold">Password</label>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="********" className="py-2 pl-9 border border-[#C7C4D8]"/>
                            <Lock color="#777587" className="absolute bottom-2.5 left-1.5"/>
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <button type="submit" className="flex flex-row justify-center items-center bg-[#1E00A9] py-3 text-white font-bold">
                                Log in
                                <ChevronRight/>
                            </button>
                        </div>
                    </form>

                </div>

                {/*last line */} 
                <div className="flex flex-col items-center p-4 gap-2">
                    <hr className="mx-auto w-[90%] border-[#C7C4D8]" />
                    <div className="mt-3">
                        <p className="font-[Geist] lg:text-[16px] text-14px text-[#464555]">Don't have an account? <Link href="/register" className="font-medium text-[#1E00A9]">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
  );
}
