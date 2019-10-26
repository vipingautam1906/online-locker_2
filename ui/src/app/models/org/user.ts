import { Resource } from './org';

export class User extends Resource {
  email: string;
  password: string;
  firstName: string;
	lastName: string;

	constructor(cfg: Partial<User> = {}) {
		super();
		Object.entries(cfg).map(e => this[e[0]] = e[1]);
	}

	get fullName(): string {
		return (this.firstName ? this.firstName : '') + ' ' +
			(this.lastName ? this.lastName: '');
	}
}
