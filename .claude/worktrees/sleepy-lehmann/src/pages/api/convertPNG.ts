import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.FREECONVERT_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "FREECONVERT_API_KEY não configurada. Use conversão no cliente.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image") || formData.get("image_file");

    if (!image || !(image instanceof File)) {
      return new Response(
        JSON.stringify({
          error: "Envie uma imagem no campo 'image' ou 'image_file'",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Create import task
    const importRes = await fetch("https://api.freeconvert.com/v1/process/import/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!importRes.ok) {
      const text = await importRes.text();
      throw new Error(`FreeConvert import: ${importRes.status} - ${text}`);
    }

    const importData = (await importRes.json()) as {
      id?: string;
      result?: { form?: { url?: string; parameters?: Record<string, string> } };
    };

    const uploadUrl = importData.result?.form?.url;
    const params = importData.result?.form?.parameters;

    if (!uploadUrl || !params) {
      throw new Error("Resposta inválida do FreeConvert");
    }

    // 2. Upload file to FreeConvert
    const uploadForm = new FormData();
    for (const [key, value] of Object.entries(params)) {
      uploadForm.append(key, value);
    }
    uploadForm.append("file", image);

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      throw new Error(`Upload FreeConvert: ${uploadRes.status} - ${text}`);
    }

    const uploadResult = (await uploadRes.json()) as { id?: string };
    const importTaskId = uploadResult.id || importData.id;

    if (!importTaskId) {
      throw new Error("ID da tarefa de import não encontrado");
    }

    // 3. Create convert task
    const inputFormat = image.type.includes("jpeg") ? "jpg" : image.type.split("/")[1] || "png";
    const convertRes = await fetch("https://api.freeconvert.com/v1/process/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: importTaskId,
        input_format: inputFormat,
        output_format: "png",
      }),
    });

    if (!convertRes.ok) {
      const text = await convertRes.text();
      throw new Error(`FreeConvert convert: ${convertRes.status} - ${text}`);
    }

    const convertData = (await convertRes.json()) as { id?: string };
    const convertTaskId = convertData.id;

    if (!convertTaskId) {
      throw new Error("ID da tarefa de conversão não encontrado");
    }

    // 4. Create export task (export to URL)
    const exportRes = await fetch("https://api.freeconvert.com/v1/process/export/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: convertTaskId,
      }),
    });

    if (!exportRes.ok) {
      const text = await exportRes.text();
      throw new Error(`FreeConvert export: ${exportRes.status} - ${text}`);
    }

    const exportData = (await exportRes.json()) as {
      status?: string;
      result?: { url?: string };
    };

    // FreeConvert tasks can be async - poll or wait for completion
    let downloadUrl = exportData.result?.url;
    let taskStatus = exportData.status;
    let attempts = 0;
    const maxAttempts = 30;

    while (taskStatus !== "completed" && taskStatus !== "ready" && !downloadUrl && attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 1000));
      const statusRes = await fetch(`https://api.freeconvert.com/v1/tasks/${convertTaskId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const statusData = (await statusRes.json()) as { status?: string; result?: { files?: { url?: string }[] } };
      taskStatus = statusData.status;
      downloadUrl = statusData.result?.files?.[0]?.url || exportData.result?.url;
      attempts++;
    }

    if (!downloadUrl) {
      throw new Error("Timeout aguardando conversão");
    }

    const fileRes = await fetch(downloadUrl);
    if (!fileRes.ok) throw new Error("Falha ao baixar arquivo convertido");

    const buffer = await fileRes.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="converted.png"',
      },
    });
  } catch (err) {
    console.error("convertPNG error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Erro interno",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
