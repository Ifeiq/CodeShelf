import { useState } from "react";

type TopHeaderPayload = {
    site: string;
    url: string;
    code: string;
};

const API_URL = "/api/top-headers";

export default function AddCollection() {
    const [form, setForm] = useState<TopHeaderPayload>({
        site: "",
        url: "",
        code: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    function updateField(field: keyof TopHeaderPayload, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(null);
        setError(null);

        const payload: TopHeaderPayload = {
            site: form.site.trim(),
            url: form.url.trim(),
            code: form.code.trim(),
        };

        if (!payload.site || !payload.url || !payload.code) {
            setError("Preencha site, url e code.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Falha no envio (${response.status})`);
            }

            setMessage("Collection enviada com sucesso.");
            setForm({ site: "", url: "", code: "" });
        } catch (submitError) {
            const fallbackMessage = "Não foi possível enviar para a API.";
            if (submitError instanceof Error) {
                setError(submitError.message || fallbackMessage);
            } else {
                setError(fallbackMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="bg-[#0d0d0d] py-10 px-8 md:px-32">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
                <div className="space-y-1">
                    <label htmlFor="site" className="text-sm text-secondary font-semibold">
                        Site
                    </label>
                    <input
                        id="site"
                        type="text"
                        value={form.site}
                        onChange={(event) => updateField("site", event.target.value)}
                        placeholder="Nome do site"
                        className="w-full px-4 py-3 rounded-lg bg-[#1d1e22] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="url" className="text-sm text-secondary font-semibold">
                        URL
                    </label>
                    <input
                        id="url"
                        type="text"
                        value={form.url}
                        onChange={(event) => updateField("url", event.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#1d1e22] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="code" className="text-sm text-secondary font-semibold">
                        Code
                    </label>
                    <textarea
                        id="code"
                        value={form.code}
                        onChange={(event) => updateField("code", event.target.value)}
                        placeholder="Cole aqui o código do TopHeader"
                        className="w-full min-h-48 px-4 py-3 rounded-lg bg-[#1d1e22] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-black font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Enviando..." : "Salvar collection"}
                </button>

                {message && <p className="text-green-500 text-sm">{message}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </section>
    );
}