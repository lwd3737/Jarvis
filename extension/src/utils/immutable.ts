export function deepFreeze(obj: Object): Object {
	if (obj === null) return obj;

	Object.values(obj).forEach((val) => {
		if (typeof val === "object" && val !== null) deepFreeze(val);
	});

	return Object.freeze(obj);
}
