import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validar campos obrigatórios
    if (
      !body.nome ||
      !body.cpf ||
      !body.telefone ||
      !body.email ||
      !body.endereco
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Por favor, preencha todos os campos obrigatórios.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const url =
      "https://n8n-delipe-n8n.mogwag.easypanel.host/webhook/api/email";

    // Preparar dados do e-mail com todas as informações do formulário
    const emailData = {
      body: {
        email: "sac@playmais.net.br",
        subject: body.subject || `Nova Indicação | ${body.nome} - Site`,
        text:
          body.text ||
          `
                    <h2>Nova Indicação Recebida</h2>

                    <h3>Dados da Indicação:</h3>
                    <ul>
                        <li><strong>Nome do Indicado:</strong> ${body.nome || "Não informado"}</li>
                        <li><strong>CPF do Titular do Contrato:</strong> ${body.cpf || "Não informado"}</li>
                        <li><strong>Telefone do Indicado:</strong> ${body.telefone || "Não informado"}</li>
                        <li><strong>E-mail do Indicado:</strong> ${body.email || "Não informado"}</li>
                        <li><strong>Endereço do Indicado:</strong> ${body.endereco || "Não informado"}</li>
                        ${body.mensagem ? `<li><strong>Mensagem:</strong> ${body.mensagem}</li>` : ""}
                    </ul>
                `,
      },
    };

    console.log("Enviando e-mail com dados:", {
      nome: body.nome,
      cpf: body.cpf,
      telefone: body.telefone,
      email: body.email,
      endereco: body.endereco,
      mensagem: body.mensagem ? "Presente" : "Não informada",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do webhook:", response.status, errorText);
      throw new Error(`Erro no webhook: ${response.status}`);
    }

    const data = await response.json();
    console.log("Email enviado com sucesso:", data);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Indicação enviada com sucesso! Entraremos em contato em breve.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro ao processar a solicitação. Por favor, tente novamente.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};