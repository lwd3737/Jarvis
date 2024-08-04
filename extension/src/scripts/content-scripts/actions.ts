// FIX: common 폴더에서 import 안되는 문제 해결
export const CONTENT_ACTIONS = {
	on: "on",
	openSidePanel: "openSidePanel",
} as const;

export const createAction = (action: string, payload?: any) => {
	return {
		type: action,
		payload,
	};
};
