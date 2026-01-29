import { Icon } from "@iconify/react";

export default function Footer1() {
     //Remove this function to allow the user to click on the links
     const handleClick = (e) => {
       e.preventDefault();
    };

    return (
        <div className="flex flex-row items-start justify-center gap-24 py-4 bg-white">
        <div className="grid grid-cols-2 gap-1 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="h-5 w-5 border-4 border-black rounded-full"></div>
            <div className="h-5 w-5 border-4 border-black"></div>
            <div className="h-5 w-5 border-4 border-black"></div>
            <div className="h-5 w-5 border-4 border-black rounded-full"></div>
        </div>

        <div>
            <h1 className="text-lg font-bold">Menu</h1>
            <p className="text-sm text-black font-bold cursor-pointer transition-colors duration-300 hover:text-primary">Item 1</p>
            <p className="text-sm text-black font-bold cursor-pointer transition-colors duration-300 hover:text-primary">Item 2</p>
            <p className="text-sm text-black font-bold cursor-pointer transition-colors duration-300 hover:text-primary">Item 3</p>
        </div>

        <div>
            <h1 className="text-lg font-bold">Contact</h1>
            <p className="text-sm text-black font-bold cursor-pointer transition-colors duration-300 hover:text-primary">Item 1</p>
            <p className="text-sm text-black font-bold cursor-pointer transition-colors duration-300 hover:text-primary">Item 2</p>
            <p className="text-sm text-black font-bold cursor-pointer transition-colors duration-300 hover:text-primary">Item 3</p>
        </div>

        <div>
            <h1 className="text-lg font-bold">Social</h1>
            <div className="flex flex-col gap-4 mt-2">
                <div aria-label="Instagram"  className="flex flex-row gap-2 items-center hover:translate-x-2 duration-300 cursor-pointer group">
                    <Icon icon="mdi:instagram" className="text-2xl text-black group-hover:text-primary transition-colors duration-300" />
                    <p className="text-sm text-black font-bold group-hover:text-primary transition-colors duration-300">Instagram</p>
                </div>
                <div aria-label="Facebook" className="flex flex-row gap-2 items-center hover:translate-x-2 duration-300 cursor-pointer group">
                    <Icon icon="mdi:facebook" className="text-2xl text-black group-hover:text-primary transition-colors duration-300" />
                    <p className="text-sm text-black font-bold group-hover:text-primary transition-colors duration-300">Facebook</p>
                </div>
                <div aria-label="WhatsApp"  className="flex flex-row gap-2 items-center hover:translate-x-2 duration-300 cursor-pointer group">
                    <Icon icon="mdi:whatsapp" className="text-2xl text-black group-hover:text-primary transition-colors duration-300" />
                    <p className="text-sm text-black font-bold group-hover:text-primary transition-colors duration-300">WhatsApp</p>
                </div>
            </div>
        </div>
    </div>
    );
}