import { environment } from '../../../environments/environment';

const apiEndpoint = environment.apiEndpoint + ':9761/';

export const AdminConfiguration = Object.freeze({

  USER_REST_URL:                 apiEndpoint + 'api/user',
  FIND_USER_BY_ID:               apiEndpoint + 'api/user/findOne/',


  ROLE_REST_URL:                 apiEndpoint + 'api/role',
  GET_LIST_SCOPE:                apiEndpoint + 'api/scope/getAllScopes',
  FIND_ROLE_BY_ID:               apiEndpoint + 'api/role/findOne/',

  ACTIVITY_GET_NO_PAGING_URL:    apiEndpoint + 'api/getActivitiesNoPaging',
  SCOPE_REST_URL:                apiEndpoint + 'api/scope',
  ACTIVITY_REST_URL:             apiEndpoint + 'api/activity',


});
