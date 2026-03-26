import React, { useState } from "react";
import toast from "react-hot-toast";

const imageActions = [
    {
        label: "Remover fundo",
        onClickKey: "removeBackground",
    },
    {
        label: "Converter para PNG",
        onClickKey: "convertToPng",
    },
    {
        label: "Converter para JPG",
        onClickKey: "convertToJpg",
    },
    // Adicione mais opções aqui conforme necessário
];

type ResultType = "removeBg" | "convertPng" | "convertJpg" | null;

export default function Imagens() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [resultType, setResultType] = useState<ResultType>(null);
    const [isRemovingBg, setIsRemovingBg] = useState(false);
    const [isConverting, setIsConverting] = useState(false);

    const setResult = (blob: Blob, type: ResultType, revokePrevious?: string | null) => {
        if (revokePrevious) URL.revokeObjectURL(revokePrevious);
        setResultBlob(blob);
        setResultType(type);
        setResultUrl(URL.createObjectURL(blob));
    };

    const handleRemoveBackground = async () => {
        if (!selectedImage) return;
        setIsRemovingBg(true);
        setResultUrl(null);
        setResultBlob(null);
        setResultType(null);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        try {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const res = await fetch("/api/removebg", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || `Erro ${res.status}`);
            }

            const blob = await res.blob();
            setResult(blob, "removeBg", resultUrl);
            toast.success("Fundo removido! Confira a prévia e baixe se desejar.");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Falha ao remover fundo");
        } finally {
            setIsRemovingBg(false);
        }
    };

    const convertImageWithCanvas = (file: File, format: "png" | "jpeg"): Promise<Blob> =>
        new Promise((resolve, reject) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Canvas não suportado"));
                    return;
                }
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => (blob ? resolve(blob) : reject(new Error("Falha na conversão"))),
                    format === "png" ? "image/png" : "image/jpeg",
                    format === "jpeg" ? 0.92 : undefined
                );
            };
            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Falha ao carregar imagem"));
            };
            img.src = objectUrl;
        });

    const handleDownloadResult = () => {
        if (!resultUrl || !resultBlob || !resultType) return;
        const filename = resultType === "removeBg" ? "imagem-sem-fundo.png" : resultType === "convertPng" ? "converted.png" : "converted.jpg";
        const a = document.createElement("a");
        a.href = resultUrl;
        a.download = filename;
        a.click();
        toast.success(`${filename} baixado!`);
    };

    const handleConvertToPng = async () => {
        if (!selectedImage) return;
        setIsConverting(true);
        setResultUrl(null);
        setResultBlob(null);
        setResultType(null);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        try {
            const res = await fetch("/api/convertPNG", {
                method: "POST",
                body: (() => {
                    const fd = new FormData();
                    fd.append("image", selectedImage);
                    return fd;
                })(),
            });
            if (res.ok) {
                const blob = await res.blob();
                setResult(blob, "convertPng", resultUrl);
                toast.success("Convertido para PNG! Confira a prévia e baixe se desejar.");
            } else {
                const blob = await convertImageWithCanvas(selectedImage, "png");
                setResult(blob, "convertPng", resultUrl);
                toast.success("Convertido para PNG! Confira a prévia e baixe se desejar.");
            }
        } catch (err) {
            try {
                const blob = await convertImageWithCanvas(selectedImage, "png");
                setResult(blob, "convertPng", resultUrl);
                toast.success("Convertido para PNG! Confira a prévia e baixe se desejar.");
            } catch (e) {
                toast.error(err instanceof Error ? err.message : "Falha ao converter para PNG");
            }
        } finally {
            setIsConverting(false);
        }
    };

    const handleConvertToJpg = async () => {
        if (!selectedImage) return;
        setIsConverting(true);
        setResultUrl(null);
        setResultBlob(null);
        setResultType(null);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        try {
            const res = await fetch("/api/convertJPG", {
                method: "POST",
                body: (() => {
                    const fd = new FormData();
                    fd.append("image", selectedImage);
                    return fd;
                })(),
            });
            if (res.ok) {
                const blob = await res.blob();
                setResult(blob, "convertJpg", resultUrl);
                toast.success("Convertido para JPG! Confira a prévia e baixe se desejar.");
            } else {
                const blob = await convertImageWithCanvas(selectedImage, "jpeg");
                setResult(blob, "convertJpg", resultUrl);
                toast.success("Convertido para JPG! Confira a prévia e baixe se desejar.");
            }
        } catch (err) {
            try {
                const blob = await convertImageWithCanvas(selectedImage, "jpeg");
                setResult(blob, "convertJpg", resultUrl);
                toast.success("Convertido para JPG! Confira a prévia e baixe se desejar.");
            } catch (e) {
                toast.error(err instanceof Error ? err.message : "Falha ao converter para JPG");
            }
        } finally {
            setIsConverting(false);
        }
    };

    const actionHandlers: Record<string, () => void> = {
        removeBackground: handleRemoveBackground,
        convertToPng: handleConvertToPng,
        convertToJpg: handleConvertToJpg,
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (resultUrl) URL.revokeObjectURL(resultUrl);
            const file = event.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResultUrl(null);
            setResultBlob(null);
            setResultType(null);
        }
    };

    const getResultLabel = () => {
        if (resultType === "removeBg") return "Resultado (sem fundo)";
        if (resultType === "convertPng") return "Resultado (PNG)";
        if (resultType === "convertJpg") return "Resultado (JPG)";
        return "Prévia:";
    };

    const isConvertingOrRemoving = (key: string) =>
        (key === "removeBackground" && isRemovingBg) || ((key === "convertToPng" || key === "convertToJpg") && isConverting);

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32 gap-16 flex flex-col">
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-6xl font-bold text-primary">Imagens</h1>
                    <h2 className="text-xl font-bold text-secondary max-w-md text-center">
                        Edite e converta suas imagens com total liberdade
                    </h2>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-12 gap-4">
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300"
                >
                    Selecionar imagem
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
                {previewUrl && (
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-secondary mb-2">{getResultLabel()}</span>
                            <img
                                src={resultUrl || previewUrl}
                                alt={resultType ? "Resultado" : "Preview da imagem"}
                                className="max-w-xs max-h-72 rounded-lg shadow-lg bg-neutral-800/50"
                            />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {resultUrl && (
                                <button
                                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 focus:outline-none"
                                    onClick={handleDownloadResult}
                                >
                                    Baixar imagem
                                </button>
                            )}
                            {imageActions.map((action) => (
                                <button
                                    key={action.onClickKey}
                                    className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    onClick={actionHandlers[action.onClickKey]}
                                    disabled={isConvertingOrRemoving(action.onClickKey)}
                                >
                                    {action.onClickKey === "removeBackground" && isRemovingBg
                                        ? "Removendo..."
                                        : (action.onClickKey === "convertToPng" || action.onClickKey === "convertToJpg") && isConverting
                                          ? "Convertendo..."
                                          : action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}