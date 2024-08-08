export interface Event {
	type: EventType;
	payload?: any;
}

export enum EventType {
	ON = "ON",
	OPEN_SIDE_PANEL = "OPEN_SIDE_PANEL",
}

export interface OnEvent extends Event {
	type: EventType.ON;
}

export interface OpenSidePanelEvent extends Event {
	type: EventType.OPEN_SIDE_PANEL;
}
