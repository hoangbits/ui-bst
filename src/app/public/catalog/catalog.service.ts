import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AdminConfiguration } from '../../config/apiName/admin.config';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CatalogService {
	constructor(private http: Http) {
	}

	// getCatalogs(perPage, page): Observable<any> {
	// 	return this.http.get(AdminConfiguration.Catalog_REST_URL + '?perPage=' + perPage + '&page=' + page)
	// 		.map((res: Response) => {
	// 			return res.json()
	// 		})
	// 		.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	// }


}

