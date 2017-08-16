import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Activity} from './index';
import {Observable} from 'rxjs/Rx';

import {environment} from '../../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ActivityService {

    private urlActivityApi = environment.apiEndpoint + 'activity';

    constructor(private http: Http) {
    }

    getActivities(perPage, page): Observable<any> {
        return this.http.get(this.urlActivityApi + '?perPage=' + perPage + '&page=' + page)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    addActivity(body: Object): Observable<Activity> {
        const bodyString = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(this.urlActivityApi, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    updateActivity(body: Object): Observable<Activity> {
        const bodyString = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.put(this.urlActivityApi, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    removeActivity(id: string): Observable<Activity> {
        return this.http.delete(this.urlActivityApi + '/' + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}
