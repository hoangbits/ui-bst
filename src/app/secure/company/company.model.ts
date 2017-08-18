export class Company{
	id: string;
	companyName: string;
	address: string;
	taxCode: string;
	phone: string;
	fax: string;
	createdBy: string;
	createdAt: Date;

	constructor(companyName: string = '',
							address: string = '',
							taxCode: string = '',
							phone: string = '',
							fax: string = ''){
		this.companyName = companyName;
		this.address = address;

	}
}