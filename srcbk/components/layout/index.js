import Head from 'next/head';
import Header from "./header";
import Footer from "./footer";
import Seo from '../seo';
import { isEmpty } from 'lodash';
import {sanitize} from '../../utils/miscellaneous';
const Layout = ({data, children}) =>{
    console.log('mondae', data)
    if(isEmpty(data?.page)){
        return null
    }
    const {page, header, footer, headerMenus, footerMenus} = data || {};
    return(
        <div>
            <Seo seo={page?.seo} uri={page?.uri}/>
            <Head>
                <link rel="shortcut icon" href={header?.favicon} />
                {page?.seo?.schemaDetails && (
					<script
						type='application/ld+json'
						className='yoast-schema-graph'
						key='yoastSchema'
						dangerouslySetInnerHTML={{__html: sanitize(page?.seo?.schemaDetails )}}
					/>
				)}
            </Head>
            <Header header={header} headerMenus={headerMenus?.edges} />
            {children}
            <Footer footer={footer} footerMenus={footerMenus?.edges} /> 
        
    </div>
    )
}
export default Layout;