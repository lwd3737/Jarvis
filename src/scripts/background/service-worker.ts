import { CONTENT_ACTIONS } from "../common/actions";

console.info("service worker loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	(async () => {
		switch (msg.type) {
			case CONTENT_ACTIONS.openSidePanel:
				{
					const windowId = sender?.tab?.windowId;
					if (!windowId) return;

					await chrome.sidePanel.open({ windowId });
				}
				break;
		}
	})();
});
