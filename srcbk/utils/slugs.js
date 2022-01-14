import {isEmpty} from 'lodash';
export const FALLBACK = 'blocking'
export const PAGES_COUNT = 10;
export const isCustomPageUri = (uri) =>{
    const pagesToExclude = [
        '/',
    ]
    return pagesToExclude.includes(uri)
}
export const handleRedirectsAndReturnData = ( defaultProps, data, errors, field, isPreview = false, loginRedirectURL = '' ) => {

	if ( isEmpty(data) ) {
		return {
			redirect: {
				destination: '/503',
				statusCode: 301
			}
		};
	}


	if ( field && isEmpty( data?.[field] ) ) {
		return {
			// returns the default 404 page with a status code of 404
			notFound: true
		};
	}

	return defaultProps;
};