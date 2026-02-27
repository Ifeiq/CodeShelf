import type { APIRoute } from "astro";

export const prerender = false;

const CLOUDINARY_CLOUD_NAME = "drhbydhfh";
const CLOUDINARY_API_KEY = "912249948569667";
const CLOUDINARY_API_SECRET = "m8qB3qP9TMrbkd7574YsAFlLKUc";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const video = formData.get("video") || formData.get("file");

    if (!video || !(video instanceof File)) {
      return new Response(
        JSON.stringify({
          error: "Envie um vídeo no campo 'video' ou 'file'",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const uploadForm = new FormData();
    uploadForm.append("file", video);
    uploadForm.append("quality", "auto");

    const uploadUrl = `v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`;
    const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      throw new Error(`Cloudinary upload: ${uploadRes.status} - ${text}`);
    }

    const uploadData = (await uploadRes.json()) as {
      public_id?: string;
      secure_url?: string;
      format?: string;
    };

    const publicId = uploadData.public_id;
    const format = uploadData.format || "mp4";

    if (!publicId) {
      throw new Error("public_id não retornado pelo Cloudinary");
    }

    const compressedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto/${publicId}.${format}`;
    const fileRes = await fetch(compressedUrl);

    if (!fileRes.ok) {
      throw new Error("Falha ao buscar vídeo comprimido");
    }

    const buffer = await fileRes.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": `video/${format}`,
        "Content-Disposition": `attachment; filename="video-comprimido.${format}"`,
      },
    });
  } catch (err) {
    console.error("compressVideo error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Erro interno",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
