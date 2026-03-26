export default function CreateHud() {
    return (
        <div className="flex flex-row gap-8 items-center justify-center">
            <h1 className="text-white text-xl font-bold hover:text-primary transition-all duration-300 cursor-pointer">add section</h1>
            <h1 className="text-white text-xl font-bold hover:text-primary transition-all duration-300 cursor-pointer">remove section</h1>
            <h1 className="text-white text-xl font-bold hover:text-primary transition-all duration-300 cursor-pointer">save</h1>
            <h1 className="text-white text-xl font-bold hover:text-primary transition-all duration-300 cursor-pointer">load</h1>
            <h1 className="text-white text-xl font-bold hover:text-primary transition-all duration-300 cursor-pointer">get code</h1>
        </div>
    );
}