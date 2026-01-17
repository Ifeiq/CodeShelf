import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

interface TemplagePageProps {
    h1: string;
    h2: string;
    img: string;
    code: string;
    component: React.ReactNode;
}

export default function TemplagePage({ h1, h2, img, code, component }: TemplagePageProps) {
    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
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
        <section className="bg-[#0d0d0d] py-8 px-8 md:px-32 gap-32 flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2 items-start justify-start">
                    <h1 className="text-8xl font-bold text-primary">{h1}</h1>
                    <h2 className="text-3xl font-bold text-secondary px-4 w-160">{h2}</h2>
                </div>
                <img src={img} alt={h1} className="w-1/2" />
            </div>

            <div className="flex flex-row items-start justify-between ">
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
                        <code className="text-white whitespace-pre-wrap">{code}</code>
                    </div>
                </div>

                <div className="w-1/2" >
                    {component}
                </div>
                
            </div>
        </section>
    );
}