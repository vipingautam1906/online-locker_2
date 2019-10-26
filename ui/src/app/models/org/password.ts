import { Resource } from './org';
import { User } from './user';

export class PasswordReset extends Resource {
	user: User;
	createdTimestamp: number;
	expiredTimestamp: number;

	constructor(cfg: Partial<User> = {}) {
		super();
		Object.entries(cfg).map(e => this[e[0]] = e[1]);
	}
}
