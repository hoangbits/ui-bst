import { environment } from '../../../environments/environment';
let apiEndpoint = environment.apiEndpoint + ':9762/';

export const CompanyConfiguration = Object.freeze({
	COMPANY_GET_ADMIN_URL: 						apiEndpoint + 'api/getAdminsByCompany/',
	COMPANY_SEARCH_USER_URL: 					apiEndpoint + 'api/company/findUsersCompany/',
	COMPANY_REST_URL: 								apiEndpoint + 'api/company',
	COMPANY_GET_USER_BY_COMPANY_URL:	apiEndpoint + 'api/getUsersByCompany',
	COMPANY_FIND_ONE_URL: 						apiEndpoint + 'api/findOne',
	COMPANY_GET_BY_USER_URL: 					apiEndpoint + 'api/getCompanyByUser',
	COMPANY_SEARCH_USER_BY_NAME_URL:	apiEndpoint + 'api/company/searchUsersCompany/',
	COMPANY_GET_ADMIN_BY_COMPANY_URL:	apiEndpoint + 'api/company/getAdminsByCompany/',
	COMPANY_GET_COUNTRIES_URL:				apiEndpoint + 'api/country',
	COMPANY_GET_STATES_URL:						apiEndpoint + 'api/state',
	COMPANY_GET_CITIES_URL:						apiEndpoint + 'api/city',
	COMPANY_LOCATION:									apiEndpoint + 'api/location',

});
