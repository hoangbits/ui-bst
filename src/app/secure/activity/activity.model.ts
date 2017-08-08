export class Activity {
	id: string;
	url: string;
	method: string;
	urlRegex: string;
	createdBy: string;
	createdAt: Date;

	public constructor(url: string = '', method: string = '', urlRegex: string = '') {
		this.url = url;
		this.method = method;
		this.urlRegex = urlRegex;
	}
}
