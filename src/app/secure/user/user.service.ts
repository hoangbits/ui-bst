import {Injectable} from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AdminConfiguration} from '../../config/apiName/admin.config';
import {CompanyConfiguration} from '../../config/apiName/company.config';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUsers(currentPage, itemsPerPage, criterial): Observable<any> {
    return this.http.get(AdminConfiguration.USER_REST_URL + '/' + currentPage + '/' + itemsPerPage + '/' + criterial)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(AdminConfiguration.USER_REST_URL + '/' + userId);
  }

  createUsers(user): Observable<any> {
    return this.http.post(AdminConfiguration.USER_REST_URL, user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateUsers(user): Observable<any> {
    return this.http.put(AdminConfiguration.USER_REST_URL, user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getRoles(): Observable<any> {
    return this.http.get(AdminConfiguration.ROLE_REST_URL)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  findOne(userId: string): Observable<any> {
    return this.http.get(AdminConfiguration.FIND_USER_BY_ID + userId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllCompany(): Observable<any> {
    return this.http.get(CompanyConfiguration.GET_LIST_COMPANY)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  findOneCompany(companyId: string): Observable<any> {
    return this.http.get(CompanyConfiguration.FIND_ONE_COMPANY + companyId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
