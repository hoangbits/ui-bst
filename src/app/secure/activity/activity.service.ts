import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Activity} from './index';
import {Observable} from 'rxjs/Rx';

import {AdminConfiguration} from '../../config/apiName/admin.config';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ActivityService {
    constructor(private http: Http) {
    }

    getActivities(perPage, page): Observable<any> {
        return this.http.get(AdminConfiguration.ACTIVITY_REST_URL + '?perPage=' + perPage + '&page=' + page)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    addActivity(body: Object): Observable<Activity> {
        const bodyString = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(AdminConfiguration.ACTIVITY_REST_URL, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    updateActivity(body: Object): Observable<Activity> {
        const bodyString = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.put(AdminConfiguration.ACTIVITY_REST_URL, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    removeActivity(id: string): Observable<Activity> {
        return this.http.delete(AdminConfiguration.ACTIVITY_REST_URL + '/' + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}
