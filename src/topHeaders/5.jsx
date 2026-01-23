import { Icon } from "@iconify/react";

export default function TopHeader() {
    return (
        <div className="w-full h-12 bg-white flex flex-row items-center justify-between px-[5%] select-none">
            <div className="flex flex-row items-center justify-center gap-2">
                <Icon icon="mdi:whatsapp" className="text-black text-2xl font-bold" />
                <p className="text-black text-sm font-bold">99 99999-9999</p>
            </div>

            <div className="flex flex-row items-center justify-center gap-8">
                <div className="flex flex-row items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300">
                    <Icon icon="mdi:account" className="text-black text-2xl font-bold " />
                    <h1 className="text-black text-sm font-bold">Login</h1>
                </div>

                <div className="flex flex-row items-center justify-center gap-2">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:instagram" className="text-black text-2xl font-bold hover:text-primary transition-colors duration-200" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:facebook" className="text-black text-2xl font-bold hover:text-primary transition-colors duration-200" />
                    </a>
                </div>
            </div>
        </div>
    );
}