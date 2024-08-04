import dynamic from "next/dynamic";

const OnOffSwitchButton = dynamic(
	() => import("./components/OnOffSwitchButton"),
	{ ssr: false },
);

export default function PopupPage() {
	return (
		<div className="flex justify-center items-center p-4">
			<OnOffSwitchButton />
		</div>
	);
}
