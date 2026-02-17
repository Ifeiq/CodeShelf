import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { allSnippets } from "./Imports";

export default function TopHeaders() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedSnippet = allSnippets[selectedIndex];
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

    const handleDownload = () => {
        if (!selectedSnippet?.code || !selectedSnippet?.id) return;
        
        const codeToDownload = typeof selectedSnippet.code === 'string' ? selectedSnippet.code : String(selectedSnippet.code);
        const fileName = `TopHeader.tsx`;
        
        const blob = new Blob([codeToDownload], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('File downloaded!', {
            duration: 2000,
            position: 'top-right',
            style: {
                background: '#1d1e22',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '8px',
            },
        });
    };

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32 gap-32 flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2 items-start justify-start">
                    <h1 className="text-6xl max-lg:text-center max-lg:text-3xl font-bold text-primary">Top Headers</h1>
                    <h2 className="text-xl max-lg:text-center max-lg:text-sm font-bold text-secondary px-4 md:w-160">Make a Strong First Impression with Top Headers</h2>
                </div>
                <img src="/images/Top_Headers.png" alt="Top Headers" className="w-1/2 max-lg:hidden" />
            </div>

            <div className="flex flex-row max-lg:flex-col max-lg:gap-32 items-start justify-between w-full">
                <div className="h-120 w-100 max-lg:w-full bg-[#1d1e22] flex flex-col gap-8 rounded-xl p-8 overflow-y-auto">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row gap-6">
                            <h1 className="text-primary font-bold">React</h1>
                            <h1 className="text-primary font-bold">Tailwind</h1>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Icon 
                                icon="solar:copy-outline" 
                                className="text-white font-bold text-2xl cursor-pointer hover:text-primary transition-all duration-300" 
                                onClick={handleCopyCode}
                            />
                            <Icon 
                                icon="solar:download-outline" 
                                className="text-white font-bold text-2xl cursor-pointer hover:text-primary transition-all duration-300" 
                                onClick={handleDownload}
                            />
                        </div>
                    </div>

                    <div className="text-white text-justify text-sm font-bold select-none">
                        <code className="text-white whitespace-pre-wrap">
                            {typeof selectedSnippet?.code === 'string' ? selectedSnippet.code : ''}
                        </code>
                    </div>
                </div>

                <div className="w-1/2 max-lg:w-full flex flex-col gap-8 pr-8 overflow-y-auto h-120 relative">
                    {allSnippets.map((snippet, index) => {
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