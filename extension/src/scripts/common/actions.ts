export const CONTENT_ACTIONS = {
	openSidePanel: "openSidePanel",
} as const;

export const createAction = (action: string, payload?: any) => {
	return {
		type: action,
		payload,
	};
};
