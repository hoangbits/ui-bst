import { environment } from '../../../environments/environment';
let apiEndpoint = environment.apiEndpoint + ':9760/';

export const LoginConfiguration = Object.freeze({
  //REST API INCLUDE GET/POST/PUT/DELETE METHODS
  LOGIN_URL: apiEndpoint + 'api/login/'
});