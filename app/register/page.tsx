"use client"

import { Bookmark, ChevronRight, Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";


export default function Register(){

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            if(!response.ok){
                toast.error("Error")
                return
                
            }
            

            toast.success("Login Now")
            router.push("/login")



        } catch (error) {
            console.log("Error", error)
            toast.error("Something went wrong");
        }
    }


    return(
       <div className="h-screen w-screen flex flex-row items-center justify-center bg-[#F8F9FF]">
            <div className="lg:w-150 py-8 lg:p-4  bg-white border border-[#C7C4D8] rounded">
                {/* Logo */}
                <div className="flex flex-col gap-1 items-center text-center lg:p-4">
                    <div className="w-full flex flex-row justify-center gap-1 items-center">
                        <Bookmark  className="text-[#1E00A9] lg:w-10 lg:h-10 w-8 h-8"/>
                        <h1 className="lg:text-[32px] text-[24px] font-bold text-[#1E00A9]">
                            Bookmarkly
                        </h1>
                    </div>
                    <div className="w-[85%] flex flex-row items-center justify-center align-middle">
                        <p className="text-[#464555] lg:text-[18px] text-[16px] align-middle">Create an account to start managing your digital brain.</p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="px-10 py-4 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                        <div className="flex flex-col gap-1 relative">
                             <label htmlFor="" className="font-bold"> Username</label>
                            <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="John Doe" className="py-2 pl-9 border border-[#C7C4D8]"/>
                            <User color="#777587" className="absolute bottom-2.5 left-1.5"/>
                        </div>
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
                                Create Account
                                <ChevronRight/>
                            </button>
                        </div>
                    </form>

                </div>

                {/*last line */} 
                <div className="flex flex-col items-center p-4 gap-2">
                    <hr className="mx-auto w-[90%] border-[#C7C4D8]" />
                    <div className="mt-3">
                        <p className="font-[Geist] lg:text-[16px] text-14px text-[#464555]">Already have an account? <Link href="/login" className="font-medium text-[#1E00A9]">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}