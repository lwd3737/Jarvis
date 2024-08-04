import { IService } from "../services/service";

export class ServiceNotBoundExeption extends Error {
	constructor(service: IService) {
		super(
			`[${ServiceNotBoundExeption.name}]${service.constructor.name} not bound to container`,
		);
	}
}
