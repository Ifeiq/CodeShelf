import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.REMOVEBG_API_KEY || "z18EhbYec3NvMuHZtBibCV21";

  try {
    const formData = await request.formData();
    const image = formData.get("image") || formData.get("image_file");

    if (!image || !(image instanceof File)) {
      return new Response(
        JSON.stringify({ error: "Envie uma imagem no campo 'image' ou 'image_file'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = new FormData();
    body.append("size", "auto");
    body.append("image_file", image);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(
        JSON.stringify({ error: `Remove.bg: ${response.status} - ${text}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const buffer = await response.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment; filename=\"no-bg.png\"",
      },
    });
  } catch (err) {
    console.error("removebg error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Erro interno" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
