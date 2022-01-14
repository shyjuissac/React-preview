import client from "../src/apollo/client"
import Layout from "../src/components/layout";
import { MENUS } from "../src/queries/get-menus";
import { handleRedirectsAndReturnData } from "../src/utils/slugs";
export default function home({data} ) {
  return (
    <Layout data={data}>
      main page
		</Layout>
      
  )}
  export async function getStaticProps() {
    const { data, errors } = await client.query({
      query: MENUS
    });
    
    const defaultProps = {
      props: {
        data: data || {}
      }, // will be passed to the page component as props
      revalidate:1
    }
   return handleRedirectsAndReturnData(defaultProps, data, errors,   'page')
  }
