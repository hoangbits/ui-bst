// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	apiEndpoint: 'http://localhost:9761/api/',
	apiCompanyEndpoint: 'http://10.1.5.201:9762/api/',
	apiAuthentication : 'http://localhost:3001/'
};
