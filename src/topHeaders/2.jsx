import { Icon } from "@iconify/react";

export default function TopHeader() {
    return (
        <div className="w-full h-12 bg-white flex flex-row items-center justify-between px-[5%] select-none">
            <div className="flex flex-row items-center justify-center gap-2">
                <Icon icon="mdi:whatsapp" className="text-black text-2xl font-bold" />
                <p className="text-black text-sm font-bold">99 99999-9999</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <h1 className="text-black text-sm font-bold border-2 border-black rounded-full px-8 py-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Button 1</h1>
                <h1 className="text-black text-sm font-bold border-2 border-black rounded-full px-8 py-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Button 2</h1>
            </div>
        </div>
    );
}