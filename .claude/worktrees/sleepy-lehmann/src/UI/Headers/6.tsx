import { Icon } from "@iconify/react";

export default function TopHeader() {
    //Remove this function to allow the user to click on the links
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    };



    return (
        <div className="w-full h-24 bg-white flex flex-row items-center justify-center px-[5%] py-2 select-none">
            <div className="flex flex-row gap-8 font-bold">
               <h1 className="text-black text-sm font-bold editable">item 1</h1>
               <h1 className="text-black text-sm font-bold editable">item 2</h1>
               <h1 className="text-black text-sm font-bold editable">item 3</h1>
               <h1 className="text-black text-sm font-bold editable">item 4</h1>
            </div>
        </div>
    );
}