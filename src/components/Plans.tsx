import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Plans as PlansSnippets } from "./Imports";

export default function Plans() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedSnippet = PlansSnippets[selectedIndex];
    const SelectedComponent = selectedSnippet?.component as React.ComponentType<any> | undefined;

    const handleCopyCode = async () => {
        if (!selectedSnippet?.code) return;

        const codeToCopy = typeof selectedSnippet.code === 'string' ? selectedSnippet.code : String(selectedSnippet.code);

        try {
            await navigator.clipboard.writeText(codeToCopy);
            toast.success('Code copied to clipboard!', {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#1d1e22',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: '8px',
                },
            });
        } catch (err) {
            console.error('Error copying code:', err);
            toast.error('Failed to copy code', {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#1d1e22',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: '8px',
                },
            });
        }
    };

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32 gap-32 flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2 items-start justify-start">
                    <h1 className="text-6xl font-bold text-primary">Plans</h1>
                    <h2 className="text-xl font-bold text-secondary w-160">Pricing Plans for Every Need</h2>
                </div>

                <div className="flex flex-row gap-8 items-center justify-center relative">
                    <div className="w-50 h-80 bg-white rounded-xl py-8">
                        <h1 className="text-2xl font-bold text-black text-center">Plan 1</h1>

                        <div className="flex flex-col gap-4 items-center justify-center mt-4">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">Item 1</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-blac font-bold">Item 2</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">Item 3</span>
                            </div>
                        </div>

                        <h1 className="text-xl font-bold text-black text-center mt-8">$99,99</h1>

                        <h1 className="text-lg w-1/2 mx-auto border-2 border-black rounded-full px-8 py-1 font-bold text-black text-center mt-4">Buy</h1>
                    </div>

                    <div className="w-50 h-80 bg-white rounded-xl py-8">
                        <h1 className="text-2xl font-bold text-black text-center">Plan 2</h1>

                        <div className="flex flex-col gap-4 items-center justify-center mt-4">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">Item 1</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-blac font-bold">Item 2</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">Item 3</span>
                            </div>
                        </div>

                        <h1 className="text-xl font-bold text-black text-center mt-8">$99,99</h1>

                        <h1 className="text-lg w-1/2 mx-auto border-2 border-black rounded-full px-8 py-1 font-bold text-black text-center mt-4">Buy</h1>
                    </div>

                    <div className="w-50 h-80 bg-white rounded-xl py-8">
                        <h1 className="text-2xl font-bold text-black text-center">Plan 3</h1>

                        <div className="flex flex-col gap-4 items-center justify-center mt-4">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">Item 1</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-blac font-bold">Item 2</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon="tdesign:icon" className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">Item 3</span>
                            </div>
                        </div>

                        <h1 className="text-xl font-bold text-black text-center mt-8">$99,99</h1>

                        <h1 className="text-lg w-1/2 mx-auto border-2 border-black rounded-full px-8 py-1 font-bold text-black text-center mt-4">Buy</h1>
                    </div>

                    <div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <Icon icon="weui:arrow-outlined" className="text-4xl text-white" />
                        </div>

                        <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 ">
                            <Icon icon="weui:arrow-outlined" className="text-4xl text-white rotate-180" />
                        </div>
                    </div>
                </div>



            </div>

            <div className="flex flex-row items-start justify-between w-full">
                <div className="h-120 w-100 bg-[#1d1e22] flex flex-col gap-8 rounded-xl p-8 overflow-y-auto">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row gap-6">
                            <h1 className="text-primary font-bold">React</h1>
                            <h1 className="text-primary font-bold">Tailwind</h1>
                        </div>
                        <Icon
                            icon="solar:copy-outline"
                            className="text-white font-bold text-2xl cursor-pointer hover:text-primary transition-all duration-300"
                            onClick={handleCopyCode}
                        />
                    </div>

                    <div className="text-white text-justify text-sm font-bold select-none">
                        <code className="text-white whitespace-pre-wrap">
                            {typeof selectedSnippet?.code === 'string' ? selectedSnippet.code : ''}
                        </code>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col gap-8 pr-8 overflow-y-auto h-120 relative">
                    {PlansSnippets.map((snippet, index) => {
                        const Component = snippet.component as React.ComponentType<any>;
                        const isSelected = selectedIndex === index;

                        return (
                            <div
                                key={snippet.id}
                                className={`w-full transition-all duration-300 p-8 cursor-pointer ${isSelected ? 'border-4 border-primary' : ''
                                    }`}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <Component />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}