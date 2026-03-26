import { useEffect } from "react";
import CreateHud from "@/components/CreateHud";
import TopHeader from "@/create/TopHeader";
import Header from "@/create/Header";
import Plans from "@/create/Plans";
import About from "@/create/About";
import Footer from "@/create/Footer";

export default function Create() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			if (!target) return;
			const editableTarget = target.closest<HTMLElement>(".editable");
			if (!editableTarget) return;

			// Já está em modo edição
			if (editableTarget.isContentEditable) return;

			editableTarget.contentEditable = "true";
			editableTarget.focus();

			// Selecionar todo o texto
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(editableTarget);
			selection?.removeAllRanges();
			selection?.addRange(range);

			const finishEdit = () => {
				editableTarget.contentEditable = "false";
				editableTarget.removeEventListener("blur", finishEdit);
				editableTarget.removeEventListener("keydown", handleKeyDown);
			};

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === "Enter") {
					e.preventDefault();
					editableTarget.blur();
				}
				if (e.key === "Escape") {
					e.preventDefault();
					editableTarget.blur();
				}
			};

			editableTarget.addEventListener("blur", finishEdit);
			editableTarget.addEventListener("keydown", handleKeyDown);
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className="bg-[#0d0d0d] py-16">
			<TopHeader />
			<Header />
			<Plans />
			<About />
			<Footer />
		</div>
	);
}