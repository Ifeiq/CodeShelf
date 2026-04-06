import type { APIRoute } from "astro";

export const prerender = false;

const TARGET_API_URL = "https://code-shelf-backend.vercel.app/api/top-headers";

type TopHeaderPayload = {
    site: string;
    url: string;
    code: string;
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = (await request.json()) as Partial<TopHeaderPayload>;

        const payload: TopHeaderPayload = {
            site: (body.site ?? "").trim(),
            url: (body.url ?? "").trim(),
            code: (body.code ?? "").trim(),
        };

        if (!payload.site || !payload.url || !payload.code) {
            return new Response(
                JSON.stringify({ error: "Campos obrigatórios: site, url, code." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const upstreamResponse = await fetch(TARGET_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const contentType = upstreamResponse.headers.get("content-type") ?? "application/json";
        const rawBody = await upstreamResponse.text();

        return new Response(rawBody, {
            status: upstreamResponse.status,
            headers: {
                "Content-Type": contentType,
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Erro interno no servidor.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
