import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Scope} from './index';
import {Observable} from 'rxjs/Rx';

import {AdminConfiguration} from '../../config/apiName/admin.config';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScopeService {
	constructor(private http: Http) {
	}

	getScopes(perPage, page): Observable<any> {
		return this.http.get(AdminConfiguration.SCOPE_REST_URL + '?perPage=' + perPage + '&page=' + page)
			.map((res: Response) => {
				return res.json()
			})
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getActivities(): Observable<any> {
		return this.http.get(AdminConfiguration.ACTIVITY_GET_NO_PAGING_URL)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	addScope(body: Object): Observable<Scope> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.post(AdminConfiguration.SCOPE_REST_URL, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	updateScope(body: Object): Observable<Scope> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.put(AdminConfiguration.SCOPE_REST_URL, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	removeScope(id: string): Observable<Scope> {
		return this.http.delete(AdminConfiguration.SCOPE_REST_URL + '/' + id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}
}

