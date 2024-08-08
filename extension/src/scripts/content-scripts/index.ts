import StorageService from "@/services/storage/storage.service";
import render from "./render";
import { EventType } from "./event";

async function main() {
	const storage = new StorageService();

	chrome.runtime.onMessage.addListener(async (msg) => {
		switch (msg.type) {
			case EventType.ON:
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
