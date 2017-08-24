import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Company} from './index';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from '../../../environments/environment';

@Injectable()
export class CompanyService {
	private urlCompanyApi = environment.apiCompanyEndpoint + 'company';
	private urlUsersByCompanyApi = environment.apiCompanyEndpoint + 'getUsersByCompany';
	// private urlCompanyAdminUser = environment.apiCompanyEndpoint + 'getAdminCompany';

	constructor(private http: Http) {
	}

	getCompanies(searchText, perPage, page): Observable<any> {
		return this.http.get(this.urlCompanyApi + '?searchText=' + searchText + '&perPage=' + perPage + '&page=' + page)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getUsersByCompany(companyId, searchText, perPage, page): Observable<any> {
		return this.http.get(this.urlUsersByCompanyApi + '?companyId='+ companyId
			+'&searchText=' + searchText
			+ '&perPage=' + perPage
			+ '&page=' + page)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	addCompany(body: Object): Observable<Company> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.post(this.urlCompanyApi, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	updateCompany(body: Object): Observable<Company> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.put(this.urlCompanyApi, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	removeCompany(id: string): Observable<Company> {
		return this.http.delete(this.urlCompanyApi + '/' + id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getUsersAdminCompany(companyId): Observable<any> {
		return this.http.get('http://localhost:9761/api/getUsersCompany/' + companyId)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}
}