import { Icon } from "@iconify/react";

export default function TopHeader() {
    //Remove this function to allow the user to click on the links
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    };

    const items = [
        { text: "item 1", link: "" },
        { text: "item 2", link: "" },
        { text: "item 3", link: "" },
    ];

    return (
        <div className="w-full h-24 bg-white flex flex-row items-center justify-between px-[5%] py-4 select-none">
            <div className="flex flex-row gap-8 font-bold">
                {items.map((item, index) => (
                    <a 
                        key={index} 
                        href={item.link} 
                        onClick={handleClick} 
                        className="hover:text-primary transition-all duration-300 cursor-pointer"
                    >
                        {item.text}
                    </a>
                ))}
            </div>

            <div className="flex flex-row gap-4 items-center justify-center">
                <h1 className="text-black font-bold text-sm border-2 border-black rounded-full px-8 py-2 hover:scale-110 transition-all duration-300">button</h1>
                <h1 className="text-black font-bold text-sm border-2 border-black rounded-full px-8 py-2 hover:scale-110 transition-all duration-300 flex flex-row items-center justify-center gap-2">
                    <Icon icon="mdi:account" className="text-xl text-black" />
                    <span className="text-black font-bold text-sm">login</span>
                </h1>
            </div>
        </div>
    );
}