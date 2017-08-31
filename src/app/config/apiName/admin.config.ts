import { environment } from '../../../environments/environment';
let apiEndpoint = environment.apiEndpoint + ':9761/';

export const AdminConfiguration = Object.freeze({
  //REST API INCLUDE GET/POST/PUT/DELETE METHODS
  ROLE_REST_URL:                 apiEndpoint + 'api/role',
  USER_REST_URL:                 apiEndpoint + 'api/user',
  SCOPE_REST_URL:                apiEndpoint + 'api/scope',  
  ACTIVITY_REST_URL:             apiEndpoint + 'api/activity',
  ACTIVITY_GET_NO_PAGING_URL:    apiEndpoint + 'api/getActivitiesNoPaging'
});
