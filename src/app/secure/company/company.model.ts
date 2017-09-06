export class Company{
	id: string;
	companyName: string;
	taxCode: string;
	phone: string;
	fax: string;
	locations:any;

	constructor(
				id: string = '',
				companyName: string = '',
				address: string = '',
				taxCode: string = '',
				phone: string = '',
				fax: string = ''){
		this.companyName = companyName;
		this.locations = [];
	}
}