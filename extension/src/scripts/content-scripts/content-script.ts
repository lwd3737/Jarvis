import StorageService from "@/src/services/storage/storage.service";
import { CONTENT_ACTIONS } from "./actions";
import render from "./render";

async function main() {
	const storage = new StorageService();

	chrome.runtime.onMessage.addListener(async (msg) => {
		switch (msg.type) {
			case CONTENT_ACTIONS.on:
				const { on } = msg.payload as { on: boolean };
				if (on) await render();
				else document.getElementById("jarvis-container")?.remove();
				break;
		}
	});

	const on = await storage.get("on");
	if (on) await render();
}

(async () => await main())();
