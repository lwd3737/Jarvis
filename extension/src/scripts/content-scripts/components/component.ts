export default class Component<E extends Element = Element> {
	protected el: E;

	constructor(protected html: string) {
		const el = (this.el = new DOMParser().parseFromString(html, "text/html")
			.body.firstElementChild as E);
		if (!el) throw new Error("Element parsing failed");
	}

	protected componentDidMount() {}

	public render(): E {
		this.componentDidMount();

		return this.el;
	}
}
