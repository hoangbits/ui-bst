import {Injectable} from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {LoginConfiguration} from '../../config/apiName/login.config';

@Injectable()
export class LoginService {
  constructor(private http: Http) {
  }

  Login (body: Object): Observable<any> {
	  const bodyString = JSON.stringify(body);
	  const headers = new Headers({'Content-Type': 'application/json'});
	  const options = new RequestOptions({headers: headers});

	  return this.http.post(LoginConfiguration.LOGIN_URL, bodyString, options)
		  .map((res: Response) => res.json())
		  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}