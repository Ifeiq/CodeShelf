export default function About1() {
    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col mx-auto gap-16 p-8">
                <div className="">
                    <h1 className="text-2xl font-bold editable">Lorem Ipsum</h1>
                </div>
                <div className="flex flex-row items-start gap-16">
                    <div className="p-16 border-2 border-black flex items-center justify-center editable">Image</div>

                    <div className=" flex flex-col gap-4">
                        <p className="editable">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis, elit at cursus feugiat.</p>

                        <div className="flex flex-row items-center gap-8">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold editable">+999</p>
                                <p className="text-sm text-black font-medium editable">Lorem</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold editable">+999</p>
                                <p className="text-sm text-black font-medium editable">Lorem</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold editable">+999</p>
                                <p className="text-sm text-black font-medium editable">Lorem</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}