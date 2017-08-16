import {Injectable} from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ROLE_API} from '../../config/apiName/roleApi';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Role} from '../role/role.model';
import {Scope} from '../role/scope.model';
@Injectable()
export class RoleService {

  constructor(private http: Http) {
  }

  getRoles(): Observable<Role[]> {
    return this.http.get(ROLE_API.GET_LIST_ROLE)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(ROLE_API.DELETE_ROLE + roleId);
  }


  createRoles(role): Observable<any> {

    return this.http.post(ROLE_API.CREATE_ROLE, {roleName: role.roleName, description: role.description})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateRole(role): Observable<any> {
    return this.http.put(ROLE_API.UPDATE_ROLE, {
      id: role.id,
      roleName: role.roleName,
      description: role.description,
      scopes: role.scopes
    });
  }


  findOne(roleId: string): Observable<any> {
    return this.http.get(ROLE_API.FIND_ROLE_BY_ID + roleId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getScopes(): Observable<Scope[]> {
    return this.http.get(ROLE_API.GET_LIST_SCOPE)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
