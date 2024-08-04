import { IService, IServices, ServiceClass } from "./service";

export class DIContainer {
	private _services: IServices;

	constructor() {
		this._services = new Map<string, IService>();
	}

	public bind(service: ServiceClass, ...dependencies: any): void {
		this.throwIfAlreadyBound(service);

		const instance = dependencies
			? new service(...dependencies)
			: new service();
		this._services.set(service.name, instance);

		this.logBound(service);
	}

	public toFactory(
		service: {
			useClass: ServiceClass;
			dependencies?: any[];
		},
		factory: (serviceClass: ServiceClass, dependencies?: any[]) => IService,
	): void {
		this.throwIfAlreadyBound(service.useClass);

		const instance = factory(service.useClass, service.dependencies);
		this._services.set(service.useClass.name, instance);

		this.logBound(service.useClass);
	}

	private logBound(service: ServiceClass) {
		console.info(
			`[${DIContainer.name}] ${service.name} services is bound successfully`,
		);
	}

	private throwIfAlreadyBound(service: ServiceClass) {
		if (this._services.get(service.name))
			throw new Error(
				`[${DIContainer.name}]Class name of service(${service.name}) is already bound`,
			);
	}

	public get<T extends IService>(service: ServiceClass): T {
		const instance = this._services.get(service.name);
		if (!instance)
			throw new Error(`[${DIContainer.name}] ${service.name} is not bound`);

		return instance as T;
	}

	public info() {
		const boundServicesInfo = Array.from(this._services.entries())
			.map(([serviceName, instance]) => {
				return `${serviceName} -> ${typeof instance}`;
			})
			.join("\n");
		console.info(`[Bounded Services]\n${boundServicesInfo}`);
	}
}
