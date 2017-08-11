import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { USER_API } from '../../config/apiName/userApi';
import { ROLE_API } from '../../config/apiName/roleApi';
import { User } from '../user/user.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUsers(): Observable<any> {
    return this.http.get(USER_API.GET_LIST_USER)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(USER_API.DELETE_USER + userId);
  }


  createUsers(user): Observable<any> {

    return this.http.post(USER_API.CREATE_USER, { email: user.email, fullName: user.fullName, roles: user.roles })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateUsers(user, roleId): Observable<any> {

    return this.http.put(USER_API.UPDATE_USER, { id: user.id, email: user.email, fullName: user.fullName, roles: roleId });
  }


  getRoles(): Observable<any> {
    return this.http.get(ROLE_API.GET_LIST_ROLE)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  findOne(userId: string): Observable<any> {
    return this.http.get(USER_API.FIND_USER_BY_ID + userId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }




}
