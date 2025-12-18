"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isWhiteBgPage = pathname === "/contact" || pathname === "/privacy-policy" || pathname === "/terms-of-use";
    
    return (
        <nav className={`w-full ${isWhiteBgPage ? "bg-white" : "bg-[#E1F4FD]"} py-4`}>
            <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
                <Link href="/">
                    <Image 
                    src="/logo.svg" 
                    alt="Auto AssureRates" 
                    width={100} 
                    height={100} 
                    className="w-50 h-auto object-contain"
                    />
                </Link>
            </div>
        </nav>
    )
}