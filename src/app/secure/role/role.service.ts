import {Injectable} from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AdminConfiguration} from '../../config/apiName/admin.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Role} from '../role/role.model';
import {Scope} from '../role/scope.model';
@Injectable()
export class RoleService {

  constructor(private http: Http) {
  }

  getRoles(): Observable<Role[]> {
    return this.http.get(AdminConfiguration.ROLE_REST_URL)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(AdminConfiguration.ROLE_REST_URL + '/' + roleId);
  }

  createRoles(role): Observable<any> {
    return this.http.post(AdminConfiguration.ROLE_REST_URL, {roleName: role.roleName, description: role.description})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateRole(role): Observable<any> {
    return this.http.put(AdminConfiguration.ROLE_REST_URL, {
      id: role.id,
      roleName: role.roleName,
      description: role.description,
      scopes: role.scopes
    })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  findOne(roleId: string): Observable<any> {
    return this.http.get(AdminConfiguration.FIND_ROLE_BY_ID + roleId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getScopes(): Observable<Scope[]> {
    return this.http.get(AdminConfiguration.GET_LIST_SCOPE)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
