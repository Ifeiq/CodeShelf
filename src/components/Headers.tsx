import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Headers as HeadersSnippets } from "./Imports";

export default function Headers() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedSnippet = HeadersSnippets[selectedIndex];
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
                    <h1 className="text-6xl font-bold text-primary">Headers</h1>
                    <h2 className="text-xl font-bold text-secondary w-160">Complete Header Components for Your Website</h2>
                </div>

                <div className="bg-white h-32 w-1/2 px-8 flex items-center justify-between">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="h-5 w-5 border-4 border-black rounded-full"></div>
                        <div className="h-5 w-5 border-4 border-black"></div>
                        <div className="h-5 w-5 border-4 border-black"></div>
                        <div className="h-5 w-5 border-4 border-black rounded-full"></div>
                    </div>
                
                    <div className="flex flex-row gap-8 font-bold">
                        <div>item 1</div>
                        <div>item 2</div>
                        <div>item 3</div>
                        <div>item 4</div>
                    </div>

                   <h1 className="text-black font-bold text-sm border-2 border-black rounded-full px-8 py-2">button</h1>
                </div>

            </div>

            <div className="flex flex-row items-start justify-between w-full">
                <div className="h-120 w-100 bg-[#1d1e22] flex flex-col gap-8 rounded-xl p-8 overflow-y-auto">
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="text-primary font-bold">React</h1>
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
                    {HeadersSnippets.map((snippet, index) => {
                        const Component = snippet.component as React.ComponentType<any>;
                        const isSelected = selectedIndex === index;

                        return (
                            <div
                                key={snippet.id}
                                className={`w-full transition-all duration-300 cursor-pointer ${
                                    isSelected ? 'border-4 border-primary' : ''
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