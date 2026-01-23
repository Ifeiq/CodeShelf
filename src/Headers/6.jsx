import { Icon } from "@iconify/react";

export default function TopHeader() {
    //Remove this function to allow the user to click on the links
    const handleClick = (e) => {
        e.preventDefault();
    };

    const items = [
        { text: "item 1", link: "" },
        { text: "item 2", link: "" },
        { text: "item 3", link: "" },
        { text: "item 4", link: "" },
    ];

    return (
        <div className="w-full h-24 bg-white flex flex-row items-center justify-center px-[5%] py-2 select-none">
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
        </div>
    );
}