import * as moment from 'moment';

export class TypeClass {
	code: string;
	name: string;
}

export class Resource {
	id: string;
}

export class IndustryType extends TypeClass {
}

export class Organization extends Resource {
	name: string;
	contractExpirationDate: number;
	industryType: IndustryType;
	isActive: boolean;

	constructor(cfg: Partial<Organization>) {
		super();
		Object.entries(cfg).map(e => this[e[0]] = e[1]);
	}

	get expirationDate(): Date {
		const a = moment(this.contractExpirationDate).toDate();
		console.log('-------' + a);
		return a;
	}

	set expirationDate(val: Date) {
		this.contractExpirationDate = moment(val).valueOf();
	}
}
