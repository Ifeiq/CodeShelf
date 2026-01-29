export default function About1() {
    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <div className="flex flex-row items-center justify-center gap-32 p-8">
                <div className="">
                    <h1 className="text-2xl font-bold">Lorem Ipsum</h1>
                    <div className="text-sm text-black font-bold mt-4">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        <p>Nullam facilisis, elit at cursus feugiat, tortor sem suscipit ipsum, </p>
                        <p>in vehicula nibh urna vitae nunc.</p>
                    </div>
                    <button className="mt-4 border-2 border-black text-black text-xs px-8 font-bold cursor-pointer hover:scale-105 transition-all duration-300 py-2 rounded-full">
                        Learn More
                    </button>
                </div>
                <div className="">
                    <div className="w-50 h-50 border-2 border-black flex items-center justify-center">Image</div>
                </div>
            </div>
        </div>
    )
}