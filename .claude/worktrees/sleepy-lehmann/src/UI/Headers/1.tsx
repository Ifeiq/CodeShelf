import { Icon } from "@iconify/react";

export default function TopHeader() {
    //Remove this function to allow the user to click on the links
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    };

    

    return (
        <div className="w-full h-24 bg-white flex flex-row items-center justify-between px-[5%] py-2 select-none">
            <div className="grid grid-cols-2 gap-1 hover:-translate-y-2 transition-all duration-300">
                <div className="h-5 w-5 border-4 border-black rounded-full"></div>
                <div className="h-5 w-5 border-4 border-black"></div>
                <div className="h-5 w-5 border-4 border-black"></div>
                <div className="h-5 w-5 border-4 border-black rounded-full"></div>
            </div>

            <div className="flex flex-row gap-8 font-bold">
               <h1 className="text-black text-sm font-bold editable">item 1</h1>
               <h1 className="text-black text-sm font-bold editable">item 2</h1>
               <h1 className="text-black text-sm font-bold editable">item 3</h1>
               <h1 className="text-black text-sm font-bold editable">item 4</h1>
            </div>

            <h1 className="text-black font-bold text-sm border-2 border-black rounded-full px-8 py-2 hover:scale-110 transition-all duration-300 editable">button</h1>
        </div>
    );
}