import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { Features as FeaturesSnippets } from "@/components/Imports";

export default function Feature() {
    const handleDownload = (snippet: any) => {
        if (!snippet?.code || !snippet?.id) return;

        const codeToDownload = typeof snippet.code === 'string' ? snippet.code : String(snippet.code);
        const fileExtension = snippet.fileType || 'tsx';
        const fileName = `${snippet.id}.${fileExtension}`;

        const blob = new Blob([codeToDownload], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success(`${fileName} downloaded!`, {
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
                    <h1 className="text-6xl font-bold text-primary">Plugins</h1>
                    <h2 className="text-xl font-bold text-secondary w-160">Download Plugins</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {FeaturesSnippets.map((snippet) => {
                    const fileExtension = snippet.fileType || 'tsx';
                    const iconMap: { [key: string]: string } = {
                        'tsx': 'vscode-icons:file-type-typescript',
                        'ts': 'vscode-icons:file-type-typescript-official'
                    };

                    return (
                        <div
                            key={snippet.id}
                            onClick={() => handleDownload(snippet)}
                            className="flex flex-col items-center justify-center gap-4 p-8 bg-[#1d1e22] rounded-xl cursor-pointer hover:bg-[#2a2b30] hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary"
                        >
                            <Icon
                                icon={iconMap[fileExtension] || 'vscode-icons:file-type-typescript'}
                                className="text-6xl"
                            />
                            <div className="flex flex-col items-center justify-center gap-1">
                                <p className="text-white font-bold text-center text-sm">{snippet.id}.{fileExtension}</p>
                                <p className="text-secondary text-xs">Click to download</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}