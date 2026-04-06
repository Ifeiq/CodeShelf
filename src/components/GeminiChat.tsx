"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

type ChatMessage = { role: "user" | "model"; text: string };
type DownloadItem = { label: string; url: string };
type UiMessage = ChatMessage & { downloads?: DownloadItem[] };

const STORAGE_KEY = "gemini-chat";

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string")
      .slice(-50);
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
  } catch {
    // ignore
  }
}

export default function GeminiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    saveHistory(messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    const nextMessages: UiMessage[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await res.json()) as { text?: string; error?: string; downloads?: DownloadItem[] };
      if (!res.ok) {
        throw new Error(data.error || "Falha ao chamar Gemini");
      }

      const reply = (data.text || "").trim() || "Não consegui gerar uma resposta agora.";
      setMessages((prev) => [...prev, { role: "model", text: reply, downloads: data.downloads }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao conversar com o Gemini", {
        position: "top-right",
        style: { background: "#1d1e22", color: "#fff", border: "1px solid #333", borderRadius: "8px" },
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <div
      className="fixed right-4 bottom-4 z-50 select-text"
      onCopy={(e) => e.stopPropagation()}
      onCut={(e) => e.stopPropagation()}
      onPaste={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-primary text-black border border-white/10 shadow-lg px-4 py-3 hover:bg-zinc-900 transition"
          aria-label="Abrir chat"
        >
          <Icon icon="line-md:chat-round" width="22" height="22" />
          <span className="hidden sm:inline font-semibold">Chat</span>
        </button>
      )}

      {open && (
        <div className="w-[92vw] max-w-sm sm:max-w-md h-[70vh] max-h-[560px] rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl overflow-hidden select-text">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon icon="mdi:robot" className="text-primary" width="18" height="18" />
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold">Gemini</div>
                <div className="text-xs text-white/60">Assistente do CodeShelf</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clear}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Limpar conversa"
                title="Limpar"
              >
                <Icon icon="mdi:trash-can-outline" width="18" height="18" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Fechar chat"
                title="Fechar"
              >
                <Icon icon="mdi:close" width="18" height="18" />
              </button>
            </div>
          </div>

          <div ref={listRef} className="h-[calc(70vh-120px)] max-h-[440px] overflow-y-auto px-4 py-4 space-y-3 select-text">
            {messages.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Escreva uma pergunta e eu te ajudo. Ex: “Como uso o componente X?”
              </div>
            )}

            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={[
                      "rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap select-text cursor-text",
                      m.role === "user"
                        ? "bg-primary text-black font-medium"
                        : "bg-white/10 text-white border border-white/10",
                    ].join(" ")}
                  >
                    {m.text}
                  </div>

                  {m.role === "model" && m.downloads && m.downloads.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {m.downloads.map((d) => (
                        <a
                          key={`${idx}-${d.url}`}
                          href={d.url}
                          className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-xs text-white hover:bg-white/15 transition select-text"
                          download
                          target="_blank"
                          rel="noreferrer"
                          title={d.url}
                        >
                          <Icon icon="mdi:download" width="16" height="16" />
                          {d.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-white/10 text-white border border-white/10 inline-flex items-center gap-2">
                  <Icon icon="mdi:loading" className="animate-spin" width="16" height="16" />
                  Pensando…
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-white/10">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={1}
                placeholder="Digite sua mensagem…"
                className="flex-1 resize-none rounded-xl bg-[#1d1e22] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={!canSend}
                className="h-[42px] px-4 rounded-xl bg-primary text-black font-bold hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                aria-label="Enviar"
              >
                <Icon icon="mdi:send" width="18" height="18" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

