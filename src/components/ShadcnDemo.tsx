import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Switch } from "@/components/ui/switch";

const carouselItems = [
	{
		title: "Slide 1",
		description: "Componentes de interface prontos para usar",
		bg: "bg-primary/20",
	},
	{
		title: "Slide 2",
		description: "Design acessível e responsivo",
		bg: "bg-secondary/20",
	},
	{
		title: "Slide 3",
		description: "Customizável com Tailwind CSS",
		bg: "bg-tertiary/20",
	},
];

const NPX_COMMANDS = [
	"npx shadcn@latest add tabs",
	"npx shadcn@latest add carousel",
	"npx shadcn@latest add switch",
] as const;

export default function ShadcnDemo() {
	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const handleCopy = async (command: string, index: number) => {
		try {
			await navigator.clipboard.writeText(command);
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 2000);
		} catch {
			const textArea = document.createElement("textarea");
			textArea.value = command;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 2000);
		}
	};

	return (
		<div className="container mx-auto max-w-4xl space-y-16 py-12 px-4">
			{/* Header */}
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
					Bibliotecas shadcn/ui
				</h1>
				<p className="text-muted-foreground text-lg">
					Principais componentes: Tabs, Carousel e Switch
				</p>
			</div>

			{/* Tabs Section */}
			<section className="space-y-6">
				<div>
					<h2 className="text-2xl font-semibold mb-1">Tabs</h2>
					<p className="text-muted-foreground text-sm">
						Organize conteúdo em abas navegáveis
					</p>
				</div>
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="grid w-full max-w-md grid-cols-3">
						<TabsTrigger value="overview">Visão geral</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						<TabsTrigger value="reports">Relatórios</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="mt-6 p-6 rounded-lg border bg-card">
						<h3 className="font-semibold mb-2">Visão geral do projeto</h3>
						<p className="text-muted-foreground">
							Este é um exemplo do componente Tabs do shadcn/ui. Use para organizar
							conteúdo em seções acessíveis via teclado e navegação por mouse.
						</p>
					</TabsContent>
					<TabsContent value="analytics" className="mt-6 p-6 rounded-lg border bg-card">
						<h3 className="font-semibold mb-2">Dados de analytics</h3>
						<p className="text-muted-foreground">
							Integre com suas ferramentas de analytics para visualizar métricas
							importantes do seu produto.
						</p>
					</TabsContent>
					<TabsContent value="reports" className="mt-6 p-6 rounded-lg border bg-card">
						<h3 className="font-semibold mb-2">Relatórios gerados</h3>
						<p className="text-muted-foreground">
							Exporte e visualize relatórios em diferentes formatos como PDF e CSV.
						</p>
					</TabsContent>
				</Tabs>
			</section>

			{/* Carousel Section */}
			<section className="space-y-6">
				<div>
					<h2 className="text-2xl font-semibold mb-1">Carousel</h2>
					<p className="text-muted-foreground text-sm">
						Slides navegáveis com suporte a gestos
					</p>
				</div>
				<div className="relative px-12">
					<Carousel
						opts={{
							align: "start",
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent>
							{carouselItems.map((item, index) => (
								<CarouselItem key={index}>
									<div
										className={`rounded-xl border p-8 text-center ${item.bg}`}
									>
										<h3 className="text-2xl font-bold mb-2">{item.title}</h3>
										<p className="text-muted-foreground">{item.description}</p>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-0" />
						<CarouselNext className="right-0" />
					</Carousel>
				</div>
			</section>

			{/* Switch Section */}
			<section className="space-y-6">
				<div>
					<h2 className="text-2xl font-semibold mb-1">Switch</h2>
					<p className="text-muted-foreground text-sm">
						Interruptores para ativar/desativar opções
					</p>
				</div>
				<div className="flex flex-col gap-6 p-6 rounded-lg border bg-card max-w-md">
					<div className="flex items-center justify-between">
						<label
							htmlFor="notifications"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Notificações
						</label>
						<Switch
							id="notifications"
							checked={notifications}
							onCheckedChange={setNotifications}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="dark-mode"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Modo escuro
						</label>
						<Switch
							id="dark-mode"
							checked={darkMode}
							onCheckedChange={setDarkMode}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="small-switch"
							className="text-sm font-medium leading-none"
						>
							Switch pequeno
						</label>
						<Switch id="small-switch" size="sm" />
					</div>
					<p className="text-xs text-muted-foreground pt-2 border-t">
						Notificações: {notifications ? "Ativado" : "Desativado"} • Modo escuro:{" "}
						{darkMode ? "Ativado" : "Desativado"}
					</p>
				</div>
			</section>

			{/* Install Section */}
			<section className="rounded-lg border bg-muted/50 p-6">
				<h3 className="font-semibold mb-4">Instalação</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Para adicionar estes componentes ao seu projeto:
				</p>
				<div className="space-y-2">
					{NPX_COMMANDS.map((command, index) => (
						<div key={command} className="relative">
							<pre className="bg-background p-4 pr-12 rounded-lg text-sm overflow-x-auto border">
								{command}
							</pre>
							<Button
								variant="outline"
								size="icon-sm"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(command, index)}
								title={copiedIndex === index ? "Copiado!" : "Copiar comando"}
							>
								{copiedIndex === index ? (
									<CheckIcon className="size-4 text-green-600" />
								) : (
									<CopyIcon className="size-4" />
								)}
							</Button>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
