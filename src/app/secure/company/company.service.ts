import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Company} from './index';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {CompanyConfiguration} from '../../config/apiName/company.config';

@Injectable()
export class CompanyService {
	constructor(private http: Http) {
	}

	getCompanies(searchText, perPage, page): Observable<any> {
		return this.http.get(CompanyConfiguration.COMPANY_REST_URL + '?searchText=' + searchText + '&perPage=' + perPage + '&page=' + page)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getCompany(id): Observable<Company> {
		return this.http.get(CompanyConfiguration.COMPANY_REST_URL + '?companyId='+id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getCompanyByUser(id): Observable<Company> {
		return this.http.get(CompanyConfiguration.COMPANY_GET_BY_USER_URL + '?userId='+id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getUsersByCompany(companyId, searchText, perPage, page): Observable<any> {
		return this.http.get(CompanyConfiguration.COMPANY_GET_USER_BY_COMPANY_URL + '?companyId='+ companyId
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

		return this.http.post(CompanyConfiguration.COMPANY_REST_URL, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	updateCompany(body: Object): Observable<Company> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.put(CompanyConfiguration.COMPANY_REST_URL, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	removeCompany(id: string): Observable<Company> {
		return this.http.delete(CompanyConfiguration.COMPANY_REST_URL + id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getUsersAdminCompany(companyId): Observable<any> {
		return this.http.get(CompanyConfiguration.COMPANY_GET_ADMIN_BY_COMPANY_URL + companyId)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	searchUserByName(companyId, userName): Observable<any> {
		return this.http.get(CompanyConfiguration.COMPANY_SEARCH_USER_BY_NAME_URL + companyId + '/' + userName)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	UpdateAdminCompany(body: Object): Observable<Company> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.put(CompanyConfiguration.COMPANY_REST_URL, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}
}