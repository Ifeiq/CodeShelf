import React, { useState } from "react";

const DNS_TYPES = [
    { label: "A", value: "A" },
    { label: "AAAA", value: "AAAA" },
    { label: "CNAME", value: "CNAME" },
    { label: "NS", value: "NS" },
    { label: "MX", value: "MX" },
];

export default function DNS() {
    const [results, setResults] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dnsType, setDnsType] = useState("A");

    function handleSearch() {
        setError(null);
        setLoading(true);
        setResults(null);
        const domainInput = document.getElementById("domain") as HTMLInputElement;
        const domainValue = domainInput.value;

        const url = `https://dns.google/resolve?name=${domainValue}&type=${dnsType}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                if (data.Answer) {
                    setResults(data.Answer);
                } else if (data.Comment) {
                    setResults([]);
                    setError(data.Comment);
                } else {
                    setResults([]);
                    setError("Nenhum registro encontrado.");
                }
            })
            .catch(error => {
                setLoading(false);
                setError("Ocorreu um erro ao buscar os registros.");
            });
    }

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32  flex flex-col">
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-6xl font-bold text-primary">DNS</h1>
                    <h2 className="text-xl font-bold text-secondary max-w-md text-center">
                        Buscar informações sobre o seu domínio e seus registros DNS.
                    </h2>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-8 mt-16">
                <input
                    id="domain"
                    type="text"
                    placeholder="Digite o domínio"
                    className="w-full text-white bg-transparent px-16 max-w-sm placeholder:text-gray-500 p-3 rounded-full border border-gray-300"
                />
                <select
                    id="dns-type"
                    value={dnsType}
                    onChange={e => setDnsType(e.target.value)}
                    className="text-white bg-transparent border border-gray-300 rounded-full px-8 py-3 h-[48px] focus:outline-none"
                >
                    {DNS_TYPES.map(type => (
                        <option key={type.value} value={type.value} className="text-black">
                            {type.label}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-primary text-white px-8 font-bold py-3 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={handleSearch}
                >
                    Buscar
                </button>
            </div>

            <div id="results" className="flex flex-col items-center justify-center mt-8 min-h-[48px]">
                {loading && <span className="text-secondary">Buscando...</span>}
                {error && <span className="text-red-500">{error}</span>}
                {!loading && results && results.length > 0 && (
                    <table className="mt-4 text-white border border-gray-700 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-[#1a1a1a] text-left">
                                <th className="py-2 px-4">Tipo</th>
                                <th className="py-2 px-4">Nome</th>
                                <th className="py-2 px-4">TTL</th>
                                <th className="py-2 px-4">Dados</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((record: any, idx: number) => (
                                <tr key={idx} className="border-t border-gray-700">
                                    <td className="py-2 px-4">{record.type}</td>
                                    <td className="py-2 px-4">{record.name}</td>
                                    <td className="py-2 px-4">{record.TTL}</td>
                                    <td className="py-2 px-4">{record.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!loading && results && results.length === 0 && !error && (
                    <span className="text-secondary">Nenhum registro encontrado.</span>
                )}
            </div>
        </section>
    );
}