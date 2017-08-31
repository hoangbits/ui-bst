import { environment } from '../../../environments/environment';
let apiEndpoint = environment.apiEndpoint + ':9763/';

export const ProductConfiguration = Object.freeze({
	REST_URL: 					        apiEndpoint + 'api/product',
	GET_PRODUCTS_NO_PAGING_URL: apiEndpoint + 'api/getproductsNoPaging',
	GET_PRODUCT_URL: 		    		apiEndpoint + 'api/findOne'
});
