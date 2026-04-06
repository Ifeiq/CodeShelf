import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("=== INÍCIO DO PROCESSAMENTO - TRABALHE CONOSCO ===");

  // Headers CORS para todas as respostas
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  try {
    console.log("Método da requisição:", request.method);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    // Processar FormData do formulário Trabalhe Conosco
    console.log("Processando FormData...");
    const formData = await request.formData();

    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const area = formData.get("area") as string;
    const mensagem = formData.get("mensagem") as string;
    const cvFile = formData.get("cv") as File;

    console.log("Dados recebidos:", {
      nome,
      email,
      telefone,
      area,
      mensagem: !!mensagem,
    });
    console.log("Arquivo CV:", cvFile ? "Presente" : "Ausente");

    // Validar campos obrigatórios
    if (!nome || !email || !telefone || !area) {
      console.log("Campos obrigatórios faltando");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Por favor, preencha todos os campos obrigatórios.",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // Validar tamanho do arquivo
    if (cvFile && cvFile instanceof File && cvFile.size > 5 * 1024 * 1024) {
      // 5MB
      return new Response(
        JSON.stringify({
          success: false,
          message: "O arquivo deve ter no máximo 5MB.",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // Preparar arquivo para envio
    let cvData = null;
    if (cvFile && cvFile instanceof File && cvFile.size > 0) {
      const arrayBuffer = await cvFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = "";
      const chunkSize = 0x8000;

      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }

      const base64 = btoa(binary);

      cvData = {
        filename: cvFile.name,
        content: base64,
        size: cvFile.size,
        type: cvFile.type || "application/pdf",
        encoding: "base64",
      };
    }

    // Preparar dados do email
    const emailData = {
      from: "'Trabalhe Conosco | Site' <site@delipe.com>",
      email: "contato@suanet.net.br",
      subject: `Nova Candidatura - ${area} | ${nome} - Site`,
      text: `NOVA CANDIDATURA - TRABALHE CONOSCO

Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}
Área de Interesse: ${area}
Mensagem: ${mensagem || "N/A"}`,
      candidato: {
        nome: nome,
        email: email,
        telefone: telefone,
        area: area,
        mensagem: mensagem || "",
      },
      cv_file: cvData,
      smtp: "YjI5NmU3ZTA0Y2RkMGYxMTMwNWVjNjMwYmMxMzg1ODNmN2VjZDZjODcwNWU1ZDIxNDIzNGQ0NjM5MTFjMGFlZTA4MGZmNDZjNzMwYWZiNmExZDA4ZDc0NjA2MTZjZWE5OTY1MTdmMzMwOWYzZjNlZWVkMTYzYTM3ZTA4MTBlODhhZGU4NDMxYjkzOTUxOGM3NGJjMWY5NzcyNDY5MjYwZTM5NWNjNjYwNTkyNDk5MTQzNGQyNzYyOGJhYTYyZTY2",
    };

    console.log("Enviando email...");
    console.log(
      "Dados:",
      JSON.stringify(
        {
          ...emailData,
          cv_file: cvData
            ? `Arquivo: ${cvData.filename} (${cvData.size} bytes)`
            : "Nenhum arquivo",
        },
        null,
        2,
      ),
    );

    // Enviar email via webhook
    const webhookUrl =
      "https://n8n-delipe-n8n.mogwag.easypanel.host/webhook/api/email-json-ixfo";

    const emailResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Erro do webhook:", emailResponse.status, errorText);
      throw new Error(`Erro no webhook: ${emailResponse.status}`);
    }

    const result = await emailResponse.json();
    console.log("Email enviado com sucesso:", result);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Obrigado pelo seu interesse em trabalhar conosco. Recebemos seu currículo e entraremos em contato quando tivermos uma vaga adequada ao seu perfil.",
      }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("Erro geral:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Erro ao processar a solicitação. Por favor, tente novamente.",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
};
