import { EventType, OnEvent, OpenSidePanelEvent } from "../event";
import Component from "./component";
import logo from "@images/logo.png";

export default class SidePanelOpenButton extends Component<HTMLButtonElement> {
	private shiftY: number | null = null;
	private dragging = false;

	constructor() {
		super(`
    <button id="sidepanel-open-btn">
			<img alt="logo" width="25" height="25" />
		</button>
  `);

		this.onClick = this.onClick.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragging = this.onDragging.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	private onClick() {
		if (this.dragging) return;
		chrome.runtime.sendMessage({
			type: EventType.OPEN_SIDE_PANEL,
		} as OpenSidePanelEvent);
	}

	private onDragStart(ev: MouseEvent) {
		ev.preventDefault();

		const el = (this.el = ev.currentTarget as HTMLButtonElement);

		this.shiftY = ev.clientY - el.getBoundingClientRect().top;

		document.addEventListener("mousemove", this.onDragging);
		document.addEventListener("mouseup", this.onDragEnd);
	}

	private onDragging(ev: MouseEvent) {
		this.dragging = true;

		this.moveAt(ev.clientY);
	}

	private moveAt(clientY: number) {
		if (!this.el) throw new Error("el is null on moving");
		if (!this.shiftY) throw new Error("shiftY is null on moving");

		let posY = clientY - this.shiftY;
		if (posY < 0) posY = 0;

		const bottomEdge = window.innerHeight - this.el.offsetHeight;
		if (posY > bottomEdge) posY = bottomEdge;

		this.el.style.top = posY + "px";
	}

	private onDragEnd() {
		this.shiftY = null;

		document.removeEventListener("mousemove", this.onDragging);
		document.removeEventListener("mouseup", this.onDragEnd);

		setTimeout(() => {
			this.dragging = false;
		}, 0);
	}

	protected componentDidMount(): void {
		this.el.style.top = window.innerHeight / 2 + "px";

		const imgEl = this.el.firstElementChild as HTMLImageElement;
		if (chrome.runtime) {
			const logoUrl = chrome.runtime.getURL("images/logo.png");
			imgEl.src = logoUrl;
		} else {
			imgEl.src = logo.src;
		}

		this.el.addEventListener("click", this.onClick);
		this.el.addEventListener("mousedown", this.onDragStart);
	}
}
