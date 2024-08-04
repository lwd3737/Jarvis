import SidePanelOpenButton from "./components/sidepanel-open-button";

console.info("content script loaded");

const render = async () => {
	const container = document.createElement("div");
	container.id = "jarvis-container";

	const sidePanelOpenButton = new SidePanelOpenButton() as SidePanelOpenButton;
	container.appendChild(sidePanelOpenButton.render());

	document.body.appendChild(container);
};

export default render;
