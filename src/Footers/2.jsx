import { Icon } from "@iconify/react";

export default function Footer1() {
     //Remove this function to allow the user to click on the links
     const handleClick = (e) => {
       e.preventDefault();
    };

    return (
        <div className="flex flex-row items-start justify-center gap-32 px-8 py-4 bg-white">
            <div className="grid grid-cols-2 gap-1 hover:-translate-y-2 transition-all duration-300">
                <div className="h-5 w-5 border-4 border-black rounded-full"></div>
                <div className="h-5 w-5 border-4 border-black"></div>
                <div className="h-5 w-5 border-4 border-black"></div>
                <div className="h-5 w-5 border-4 border-black rounded-full"></div>
            </div>

            <div>
                <h1 className="text-lg font-bold">Menu</h1>
                <p className="text-sm text-black font-bold hover:text-primary">Item 1</p>
                <p className="text-sm text-black font-bold hover:text-primary">Item 2</p>
                <p className="text-sm text-black font-bold hover:text-primary">Item 3</p>
            </div>

            <div>
                <h1 className="text-lg font-bold">Contact</h1>
                <p className="text-sm text-black font-bold hover:text-primary">Item 1</p>
                <p className="text-sm text-black font-bold hover:text-primary">Item 2</p>
                <p className="text-sm text-black font-bold hover:text-primary">Item 3</p>
            </div>

            <div>
                <h1 className="text-lg font-bold">Links</h1>
                <div className="flex flex-col gap-4 mt-2">
                    <a href="#" aria-label="Instagram" target="_blank" onClick={handleClick} className="flex flex-row gap-2 items-center hover:translate-x-2 transition-all duration-300">
                        <Icon icon="mdi:file-pdf" className="text-2xl text-black" />
                        <p className="text-sm text-black font-bold">PDF Link 1</p>
                    </a>
                    <a href="#" aria-label="Facebook" target="_blank" onClick={handleClick} className="flex flex-row gap-2 items-center hover:translate-x-2 transition-all duration-300">
                        <Icon icon="mdi:file-pdf" className="text-2xl text-black" />
                        <p className="text-sm text-black font-bold">PDF Link 2</p>
                    </a>
                    <a href="#" aria-label="WhatsApp" target="_blank" onClick={handleClick} className="flex flex-row gap-2 items-center hover:translate-x-2 transition-all duration-300">
                        <Icon icon="mdi:file-pdf" className="text-2xl text-black" />
                        <p className="text-sm text-black font-bold">PDF Link 3</p>
                    </a>
                </div>
            </div>
        </div>
    );
}