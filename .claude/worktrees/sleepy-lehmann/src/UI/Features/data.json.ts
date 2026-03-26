import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    const url = 'https://n8n-delipe-n8n.mogwag.easypanel.host/webhook/api/email';

    const emailData = {
        body: {
            email: "comercial@g2gfibra.com.br",
            subject: body.subject || "Formulário de contato | Site",
            text: body.text || `
                <h2>Novo contato recebido através do site:</h2>

                <h3>Dados do Contato:</h3>
                <ul>
                    <li>Nome: ${body.nome}</li>
                    <li>Email: ${body.email}</li>
                    <li>Telefone: ${body.telefone}</li>
                    <li>Endereço: ${body.endereco}</li>
                    <li>Área de Interesse: ${body.area}</li>
                </ul>
            `
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });

        const data = await response.json();
        console.log('Email enviado:', data);

        return new Response(
            JSON.stringify({
                success: true,
                message: 'E-mail enviado com sucesso'
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Erro ao enviar e-mail'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}


// import nodemailer from "nodemailer"
// export const prerender = false;

// export const POST: APIRoute = async ({ params, request,  }) => {
//     const body = await request.json();


//         console.log(body)
//         // Configurações do serviço de e-mail
//         const emailConfig = {
//             host: import.meta.env.SMTP_HOST,
//             port: Number(import.meta.env.SMTP_PORT),
//             secure: import.meta.env.SMTP_SECURE==="true",
//             auth: {
//                 user: import.meta.env.SMTP_AUTH_USER,
//                 pass: import.meta.env.SMTP_AUTH_PASSWORD,
//             },
//         };

//         // Crie um objeto de transporte de e-mail
//         const transporter = nodemailer.createTransport(emailConfig);

//         // Defina os detalhes do e-mail a ser enviado
//         const mailOptions = {
//             from: import.meta.env.SMTP_FROM,
//             to: import.meta.env.SMTP_CLIENT_EMAIL,
//             subject: "Formulário Site | Área de cobertura",
//             text: `Nome: ${body.nome}\nTelefone: ${body.telefone}\nCEP: ${body.cep}`,
//         };

//         // Envie o e-mail
//         await transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log("Erro ao enviar e-mail:", error);
//             } else {
//                 console.log("E-mail enviado:", info.response);
//             }
//         });



//     return new Response(
//       JSON.stringify({
//         name: "anakin"
//       })
//     )
//   }