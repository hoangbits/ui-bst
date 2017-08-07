import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Scope, Activity} from './index';
import {Observable} from 'rxjs/Rx';

import {environment} from '../../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScopeService {

    private urlScopeApi = environment.apiEndpoint + 'scope';
    private urlActivityApi = environment.apiEndpoint + 'activities';

    constructor(private http: Http) {
    }

    getScopes(): Observable<Scope[]> {
        return this.http.get(this.urlScopeApi)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getActivities(): Observable<Activity[]> {
        return this.http.get(this.urlActivityApi)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addScope(body: Object): Observable<Scope> {
        const bodyString = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(this.urlScopeApi, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateComment(body: Object): Observable<Scope> {
        const bodyString = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.put(this.urlScopeApi, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    removeComment(id: string): Observable<Scope> {
        return this.http.delete(this.urlScopeApi + '/${id}')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
