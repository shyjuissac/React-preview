import client from '../src/apollo/client';
import {GET_PAGES_URI} from '../src/queries/pages/get-pages';
import {isEmpty} from 'lodash';
import {GET_PAGE} from '../src/queries/pages/get-page';
import {useRouter} from 'next/router';
import Layout from '../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from '../src/utils/slugs';


const Page = ({ data }) => {
    console.log('data', data);
    const router = useRouter()
    
    if(router.isFallback){
        return <div>Loading...</div>
    }
    return (
		<Layout data={data}>
			{router?.query?.slug.join("/")}
		</Layout>
	);
}
export default Page;

export async function getStaticProps( {params} ) {
	const {data, errors} = await client.query( {
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join( "/" ),
		},
	} );

	const defaultProps = {
        props:{
            data: data || {}
        },
        revalidate: 1,
    };
    return handleRedirectsAndReturnData(defaultProps, data, errors,   'page')

}

export async function getStaticPaths(){
    const { data } = await client.query({
        query: GET_PAGES_URI
    }

    );
    const pathsData = [];
    data?.pages?.nodes && data?.pages?.nodes.map( page => {
        if( ! isEmpty( page?.uri && ! isCustomPageUri(page?.uri))){
            const slugs = page?.uri?.split('/').filter( pageSlug => pageSlug);
            console.log('slug', slugs);
            pathsData.push( {params: { slug: slugs }})
        }
    }

    );
    return {
        paths: pathsData,
        fallback: FALLBACK
      };
}