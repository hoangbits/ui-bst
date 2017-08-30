import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Product} from './index';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from '../../../environments/environment';

@Injectable()
export class ProductService {
	private urlApi = environment.apiProductEndpoint + 'product';

	constructor(private http: Http) {
	}

	getProducts(searchText, perPage, page): Observable<any> {
		return this.http.get(this.urlApi + '?searchText=' + searchText + '&perPage=' + perPage + '&page=' + page)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	getProduct(id): Observable<Product> {
		return this.http.get(this.urlApi + 'findOne?companyId='+id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	
	addProduct(body: Object): Observable<Product> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.post(this.urlApi, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	updateProduct(body: Object): Observable<Product> {
		const bodyString = JSON.stringify(body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const options = new RequestOptions({headers: headers});

		return this.http.put(this.urlApi, bodyString, options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	removeProduct(id: string): Observable<Product> {
		return this.http.delete(this.urlApi + '/' + id)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}	
}