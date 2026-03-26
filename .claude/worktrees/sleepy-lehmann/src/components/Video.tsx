import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Video() {
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);

    const setResult = (blob: Blob, revokePrevious?: string | null) => {
        if (revokePrevious) URL.revokeObjectURL(revokePrevious);
        setResultBlob(blob);
        setResultUrl(URL.createObjectURL(blob));
    };

    const handleCompressVideo = async () => {
        if (!selectedVideo) return;
        setIsCompressing(true);
        setResultUrl(null);
        setResultBlob(null);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        try {
            const formData = new FormData();
            formData.append("video", selectedVideo);

            const res = await fetch("/api/compressVideo", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || `Erro ${res.status}`);
            }

            const blob = await res.blob();
            setResult(blob, resultUrl);
            toast.success("Vídeo comprimido! Confira a prévia e baixe se desejar.");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Falha ao comprimir vídeo");
        } finally {
            setIsCompressing(false);
        }
    };

    const handleDownloadResult = () => {
        if (!resultUrl || !resultBlob) return;
        const a = document.createElement("a");
        a.href = resultUrl;
        a.download = "video-comprimido.mp4";
        a.click();
        toast.success("Vídeo comprimido baixado!");
    };

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (resultUrl) URL.revokeObjectURL(resultUrl);
            const file = event.target.files[0];
            setSelectedVideo(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResultUrl(null);
            setResultBlob(null);
        }
    };

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32 gap-16 flex flex-col">
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-6xl font-bold text-primary">Vídeo</h1>
                    <h2 className="text-xl font-bold text-secondary max-w-md text-center">
                        Comprima seus vídeos com total liberdade
                    </h2>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-12 gap-4">
                <label
                    htmlFor="video-upload"
                    className="cursor-pointer bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300"
                >
                    Selecionar vídeo
                </label>
                <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoChange}
                />
                {previewUrl && (
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-secondary mb-2">
                                {resultUrl ? "Resultado (comprimido)" : "Prévia:"}
                            </span>
                            <video
                                src={resultUrl || previewUrl}
                                controls
                                className="max-w-full max-h-[400px] rounded-lg shadow-lg bg-neutral-800/50"
                            />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {resultUrl && (
                                <button
                                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 focus:outline-none"
                                    onClick={handleDownloadResult}
                                >
                                    Baixar vídeo
                                </button>
                            )}
                            <button
                                className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                onClick={handleCompressVideo}
                                disabled={isCompressing}
                            >
                                {isCompressing ? "Comprimindo..." : "Comprimir vídeo"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
