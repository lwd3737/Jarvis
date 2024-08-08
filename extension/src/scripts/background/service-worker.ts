import { EventType } from "./event";

console.info("service worker loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	(async () => {
		console.log("service worker received message", msg);
		switch (msg.type) {
			case EventType.OPEN_SIDE_PANEL:
				{
					const windowId = sender?.tab?.windowId;
					if (!windowId) return;

					await chrome.sidePanel.open({ windowId });
				}
				break;
		}
	})();
});
