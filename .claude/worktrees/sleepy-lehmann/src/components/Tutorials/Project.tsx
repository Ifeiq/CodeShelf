import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Project() {
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const steps = [
        {
            number: 1,
            title: "Instalação do AstroJS",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-white text-sm">Para criar um novo projeto Astro, execute o comando:</p>
                    <div className="relative w-fit flex flex-row items-center justify-between gap-8 bg-[#1d1e22] p-4 rounded-lg border-2 border-primary">
                        <code className="text-primary font-mono text-sm">npm create astro@latest</code>

                        <button
                            className="text-primary hover:text-white transition-colors duration-200"
                            title="Copiar comando"
                            onClick={() => {
                                navigator.clipboard.writeText('npm create astro@latest');
                                toast.success('Comando copiado!', {
                                    duration: 2000,
                                    position: 'top-right',
                                    style: {
                                        background: '#1d1e22',
                                        color: '#fff',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                    },
                                });
                            }}
                        >
                            <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                        </button>
                    </div>
                </div>
            )
        },
        {
            number: 2,
            title: "Configurando o AstroJS",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-white text-sm mb-2">Para usarmos o Astro com foco em performance, precisamos instalar algumas bibliotecas principais:</p>
                    <ul className="list-disc list-inside text-white text-sm space-y-2 ml-4">
                        <li><strong className="text-primary">Tailwindcss</strong> - Para estilização</li>
                        <li><strong className="text-primary">React</strong> - Para usarmos arquivos TSX</li>
                        <li><strong className="text-primary">Shadcn</strong> - Biblioteca de componentes</li>
                        <li><strong className="text-primary">Iconfy</strong> - Biblioteca para ícones</li>
                    </ul>
                    <div className="w-fit bg-[#1d1e22] p-4 rounded-lg border-2 border-primary mt-4 flex items-center justify-between gap-8">
                        <code className="text-primary font-mono text-sm select-all">
                            npx astro add react tailwind
                        </code>
                        <button
                            className="ml-4 text-primary hover:text-white transition-colors duration-200"
                            title="Copiar comando"
                            onClick={() => {
                                navigator.clipboard.writeText('npx astro add react tailwind');
                                toast.success('Comando copiado!', {
                                    duration: 2000,
                                    position: 'top-right',
                                    style: {
                                        background: '#1d1e22',
                                        color: '#fff',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                    },
                                });
                            }}
                        >
                            <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                        </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-6">
                        {/* Shadcn Section */}
                        <div className="bg-[#131315] rounded-xl border-2 border-primary p-6">
                            <h4 className="text-primary text-lg font-bold mb-2 flex items-center gap-2">
                                <Icon icon="mdi:cube" className="text-primary" />
                                Instalando <span className="ml-1">Shadcn UI no Astro</span>
                            </h4>
                            <p className="text-white text-sm mb-4">
                                Inicie seu projeto Astro já integrado com Tailwind, React e pronto para adicionar Shadcn:
                            </p>
                            <div className="flex items-center w-fit bg-[#1d1e22] p-3 rounded-lg border border-primary gap-4 mb-2">
                                <code className="text-primary font-mono text-sm select-all">
                                    npx create-astro@latest astro-app  --template with-tailwindcss --install --add react --git
                                </code>
                                <button
                                    className="text-primary hover:text-white transition-colors duration-200"
                                    title="Copiar comando"
                                    onClick={() => {
                                        navigator.clipboard.writeText('npx create-astro@latest astro-app  --template with-tailwindcss --install --add react --git');
                                        toast.success('Comando copiado!', {
                                            duration: 2000,
                                            position: 'top-right',
                                            style: {
                                                background: '#1d1e22',
                                                color: '#fff',
                                                border: '1px solid #333',
                                                borderRadius: '8px',
                                            },
                                        });
                                    }}
                                >
                                    <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                                </button>
                            </div>
                            <p className="text-white text-sm my-3">Em seguida, para configurar aliases de importação otimizados no TypeScript, ajuste seu <span className="text-primary">tsconfig.json</span> assim:</p>
                            <div className="relative bg-[#1d1e22] rounded-lg border border-white/10 p-4 overflow-x-auto mb-2">
                                <button
                                    className="absolute top-3 right-3 text-primary hover:text-white transition-colors duration-200 z-10"
                                    title="Copiar código"
                                    onClick={() => {
                                        const code = `{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}`;
                                        navigator.clipboard.writeText(code);
                                        toast.success('Código copiado!', {
                                            duration: 2000,
                                            position: 'top-right',
                                            style: {
                                                background: '#1d1e22',
                                                color: '#fff',
                                                border: '1px solid #333',
                                                borderRadius: '8px',
                                            },
                                        });
                                    }}
                                >
                                    <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                                </button>
                                <pre className="text-xs text-white select-all">
                                    {`{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}`}
                                </pre>
                            </div>
                            <a
                                href="https://ui.shadcn.com/docs/installation/astro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm flex items-center gap-2 mt-2"
                            >
                                <Icon icon="mdi:link" className="text-lg" />
                                Instalação completa: Documentação oficial Shadcn UI
                            </a>
                        </div>

                        {/* Iconify Section */}
                        <div className="bg-[#131315] rounded-xl border-2 border-primary p-6">
                            <h4 className="text-primary text-lg font-bold mb-2 flex items-center gap-2">
                                <Icon icon="mdi:palette" className="text-primary" />
                                Instalando <span className="ml-1">Iconify para React</span>
                            </h4>
                            <p className="text-white text-sm mb-4">
                                Para usar ícones modernos e customizáveis, instale o pacote do Iconify:
                            </p>
                            <div className="flex items-center w-fit bg-[#1d1e22] p-3 rounded-lg border border-primary gap-4 mb-2">
                                <code className="text-primary font-mono text-sm select-all">
                                    npm install --save-dev @iconify/react
                                </code>
                                <button
                                    className="text-primary hover:text-white transition-colors duration-200"
                                    title="Copiar comando"
                                    onClick={() => {
                                        navigator.clipboard.writeText('npm install --save-dev @iconify/react');
                                        toast.success('Comando copiado!', {
                                            duration: 2000,
                                            position: 'top-right',
                                            style: {
                                                background: '#1d1e22',
                                                color: '#fff',
                                                border: '1px solid #333',
                                                borderRadius: '8px',
                                            },
                                        });
                                    }}
                                >
                                    <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                                </button>
                            </div>
                            <a
                                href="https://iconify.design/docs/icon-components/react/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm flex items-center gap-2 mt-2"
                            >
                                <Icon icon="mdi:link" className="text-lg" />
                                Guia Oficial: Documentação Iconify para React
                            </a>
                        </div>
                    </div>
                </div>
            )
        },
        {
            number: 3,
            title: "Organização de pastas e código",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-white text-sm">O AstroJS já vem com pastas pré-organizadas, mas vamos seguir um outro padrão.</p>

                    <div className="mt-4">
                        <h4 className="text-primary font-bold text-lg mb-2">Dentro da pasta <code className="bg-[#1d1e22] px-2 py-1 rounded">public</code>, vamos criar 3 subpastas:</h4>
                        <ul className="list-disc list-inside text-white text-sm space-y-1 ml-4">
                            <li>Banners</li>
                            <li>Images</li>
                            <li>Fonts</li>
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-primary font-bold text-lg mb-2">Dentro da pasta <code className="bg-[#1d1e22] px-2 py-1 rounded">src</code>, vamos criar:</h4>
                        <ul className="list-disc list-inside text-white text-sm space-y-1 ml-4">
                            <li><strong className="text-primary">Partials</strong> - Onde vamos adicionar o arquivo Header.tsx e Footer.tsx</li>
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-primary font-bold text-lg mb-2">Em <code className="bg-[#1d1e22] px-2 py-1 rounded">Styles</code>, precisamos configurar fontes, cor primária etc:</h4>
                        <div className="relative bg-[#1d1e22] p-4 rounded-lg border-2 border-primary mt-2 overflow-x-auto">
                            <button
                                className="absolute top-3 right-3 text-primary hover:text-white transition-colors duration-200 z-10"
                                title="Copiar código"
                                onClick={() => {
                                    const code = `@import "tailwindcss";

@theme {
  --color-primary: #FF004E;
  --color-secondary: #000;
}

@layer base {
  @font-face {
    font-family: 'UniNeue';
    src: url("/fonts/UniNeueLight.woff2") format("woff2");
    font-weight: 200;
  }
  @font-face {
    font-family: 'UniNeue';
    src: url("/fonts/UniNeueHeavy.woff2") format("woff2");
    font-weight: bold;
  }
  @font-face {
    font-family: 'UniNeue';
    src: url("/fonts/UniNeueRegular.woff2") format("woff2");
    font-weight: normal;
  }
}

body {
  font-family: "UniNeue", sans-serif;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #3B094D;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 15px;
  animation-duration: 3s;
}`;
                                    navigator.clipboard.writeText(code);
                                    toast.success('Código copiado!', {
                                        duration: 2000,
                                        position: 'top-right',
                                        style: {
                                            background: '#1d1e22',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderRadius: '8px',
                                        },
                                    });
                                }}
                            >
                                <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                            </button>
                            <pre className="text-xs text-white">
                                {`@import "tailwindcss";

@theme {
  --color-primary: #FF004E;
  --color-secondary: #000;
}

@layer base {
  @font-face {
    font-family: 'UniNeue';
    src: url("/fonts/UniNeueLight.woff2") format("woff2");
    font-weight: 200;
  }
  @font-face {
    font-family: 'UniNeue';
    src: url("/fonts/UniNeueHeavy.woff2") format("woff2");
    font-weight: bold;
  }
  @font-face {
    font-family: 'UniNeue';
    src: url("/fonts/UniNeueRegular.woff2") format("woff2");
    font-weight: normal;
  }
}

body {
  font-family: "UniNeue", sans-serif;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #3B094D;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 15px;
  animation-duration: 3s;
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-white text-sm mb-2">Em <code className="bg-[#1d1e22] px-2 py-1 rounded">layouts/Layout.astro</code>, atualize adicionando as importações:</p>
                        <div className="relative bg-[#1d1e22] p-4 rounded-lg border-2 border-primary mt-2 overflow-x-auto">
                            <button
                                className="absolute top-3 right-3 text-primary hover:text-white transition-colors duration-200 z-10"
                                title="Copiar código"
                                onClick={() => {
                                    const code = `---
import "@/styles/global.css";
import Header from "@/partials/Header";
import Footer from "@/partials/Footer";
---

<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro Basics</title>
  </head>
  <body>
    <Header client:only />
    <slot />
    <Footer client:only />
  </body>
</html>`;
                                    navigator.clipboard.writeText(code);
                                    toast.success('Código copiado!', {
                                        duration: 2000,
                                        position: 'top-right',
                                        style: {
                                            background: '#1d1e22',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderRadius: '8px',
                                        },
                                    });
                                }}
                            >
                                <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                            </button>
                            <pre className="text-xs text-white">
                                {`---
import "@/styles/global.css";
import Header from "@/partials/Header";
import Footer from "@/partials/Footer";
---

<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro Basics</title>
  </head>
  <body>
    <Header client:only />
    <slot />
    <Footer client:only />
  </body>
</html>`}
                            </pre>
                        </div>
                    </div>
                </div>
            )
        },
        {
            number: 4,
            title: "Subindo nosso site no Github",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-white text-sm mb-2">Para criar um novo repositório, você vai ir na opção <strong className="text-primary">"Organização"</strong> do Github. Lá, você vai em adicionar novo repositório.</p>
                    <p className="text-white text-sm mb-2">Por padrão, no nome colocamos traços, o primeiro e "segundo" nome do provedor. <em className="text-secondary">Ex: jms-telecom (sempre tudo minúsculo)</em></p>

                    <div className="mt-4">
                        <h4 className="text-primary font-bold text-lg mb-2">Para criar o repositório use os seguintes comandos:</h4>
                        <div className="relative w-fit flex flex-row  items-center justify-between gap-12 bg-[#1d1e22] p-4 rounded-lg border-2 border-primary space-y-2">
                            <button
                                className="absolute top-3 right-3 text-primary hover:text-white transition-colors duration-200 z-10"
                                title="Copiar todos comandos"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        [
                                            'git init',
                                            'git add .',
                                            'git commit -m "first commit"',
                                            'git branch -M main',
                                            'git remote add origin [SUBSTITUA AQUI PELA URL DO REPOSITÓRIO]',
                                            'git push -u origin main'
                                        ].join('\n')
                                    );
                                    toast.success('Comandos copiados!', {
                                        duration: 2000,
                                        position: 'top-right',
                                        style: {
                                            background: '#1d1e22',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderRadius: '8px',
                                        },
                                    });
                                }}
                            >
                                <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                            </button>
                            <div className="flex flex-col gap-2">   
                                <code className="text-primary font-mono text-sm block">git init</code>
                                <code className="text-primary font-mono text-sm block">git add .</code>
                                <code className="text-primary font-mono text-sm block">git commit -m "first commit"</code>
                                <code className="text-primary font-mono text-sm block">git branch -M main</code>
                                <code className="text-primary font-mono text-sm block">git remote add origin [SUBSTITUA AQUI PELA URL DO REPOSITÓRIO]</code>
                                <code className="text-primary font-mono text-sm block">git push -u origin main</code>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            number: 5,
            title: "Deploy",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-white text-sm mb-2">Para Deploy, por padrão usamos a <strong className="text-primary">Cloudflare</strong>. Quando vamos subir o site para um cliente, sempre é orientado ele criar uma conta na Cloudflare (Após total aprovação).</p>

                    <div className="mt-4 space-y-3">
                        <p className="text-white text-sm"><strong className="text-primary">Passo 1:</strong> Acesse a conta na Cloudflare, vá na opção <strong className="text-primary">Workers & Pages</strong>.</p>
                        <p className="text-white text-sm"><strong className="text-primary">Passo 2:</strong> Vá em adicionar nova Page, e selecione o repositório do Github.</p>
                        <p className="text-white text-sm"><strong className="text-primary">Passo 3:</strong> Em <strong className="text-primary">Predefinição da estrutura</strong> selecione o Astro.</p>
                        <p className="text-white text-sm"><strong className="text-primary">Passo 4:</strong> Comando da build e Diretório serão definidos, não alterar e não mexer.</p>
                        <p className="text-white text-sm"><strong className="text-primary">Passo 5:</strong> Em <strong className="text-primary">Variáveis de ambiente</strong>, adicione:</p>
                        <div className="relative bg-[#1d1e22] p-4 rounded-lg border-2 border-primary">
                            <button
                                className="absolute top-3 right-3 text-primary hover:text-white transition-colors duration-200 z-10"
                                title="Copiar variável"
                                onClick={() => {
                                    navigator.clipboard.writeText('NODE_VERSION=22.0.0');
                                    toast.success('Variável copiada!', {
                                        duration: 2000,
                                        position: 'top-right',
                                        style: {
                                            background: '#1d1e22',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderRadius: '8px',
                                        },
                                    });
                                }}
                            >
                                <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                            </button>
                            <code className="text-primary font-mono text-sm">NODE_VERSION=22.0.0</code>
                        </div>
                    </div>
                </div>
            )
        },
        {
            number: 6,
            title: "Bugs e resoluções",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-white text-sm mb-2">É comum vermos alguns bugs, principalmente na Cloudflare. Os Logs são bem claros. Porém tem um que é específico entre o Astro e Cloudflare.</p>

                    <div className="mt-4">
                        <h4 className="text-primary font-bold text-lg mb-2">ERRO BUG UNCAUGHT</h4>
                        <p className="text-white text-sm mb-2">Quando usamos o Astro com SSR (Server-side-rendering), precisamos adicionar um adaptador, para ele não funcionar somente estático, mas como um servidor que vai renderizar processos.</p>

                        <p className="text-white text-sm mb-2 mt-4">Para adicionar o adaptador da Cloudflare e do Astro, utilize:</p>
                        <div className="bg-[#1d1e22] p-4 rounded-lg border-2 border-primary flex items-center justify-between gap-8 w-fit">
                            <code className="text-primary font-mono text-sm select-all">npx astro add cloudflare</code>
                            <button
                                className="ml-4 text-primary hover:text-white transition-colors duration-200"
                                title="Copiar comando"
                                onClick={() => {
                                    navigator.clipboard.writeText('npx astro add cloudflare');
                                    toast.success('Comando copiado!', {
                                        duration: 2000,
                                        position: 'top-right',
                                        style: {
                                            background: '#1d1e22',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderRadius: '8px',
                                        },
                                    });
                                }}
                            >
                                <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                            </button>
                        </div>

                        <p className="text-white text-sm mb-2 mt-4">Em resumo, é só ir no <code className="bg-[#1d1e22] px-2 py-1 rounded">Astro.config.mjs</code>, e adicionar o seguinte:</p>
                        <div className="relative bg-[#1d1e22] p-4 rounded-lg border-2 border-primary mt-2 overflow-x-auto">
                            <button
                                className="absolute top-3 right-3 text-primary hover:text-white transition-colors duration-200 z-10"
                                title="Copiar código"
                                onClick={() => {
                                    const code = `import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});`;
                                    navigator.clipboard.writeText(code);
                                    toast.success('Código copiado!', {
                                        duration: 2000,
                                        position: 'top-right',
                                        style: {
                                            background: '#1d1e22',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderRadius: '8px',
                                        },
                                    });
                                }}
                            >
                                <Icon icon="solar:copy-outline" className="text-xl cursor-pointer" />
                            </button>
                            <pre className="text-xs text-white">
                                {`import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});`}
                            </pre>
                        </div>
                        <p className="text-white text-sm mt-4">Após isso o Deploy vai rodar normalmente.</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32 gap-32 flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2 items-start justify-start">
                    <h1 className="text-6xl font-bold text-primary">Configuração do Projeto</h1>
                    <h2 className="text-xl font-bold text-secondary w-160">Etapas para criar um projeto em AstroJS</h2>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300"
                    >
                        <button
                            onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                            className="w-full flex flex-row items-center justify-between p-6 text-left"
                        >
                            <div className="flex flex-row items-center gap-4">
                                <div className="bg-primary text-black font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold text-primary">{step.title}</h3>
                            </div>
                            <Icon
                                icon={expandedStep === step.number ? "mdi:chevron-up" : "mdi:chevron-down"}
                                className="text-primary text-3xl transition-transform duration-300"
                            />
                        </button>
                        {expandedStep === step.number && (
                            <div className="px-6 pb-6 pt-2 border-t-2 border-[#2a2b30]">
                                {step.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}