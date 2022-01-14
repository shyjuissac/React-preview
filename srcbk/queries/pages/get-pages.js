import { gql } from '@apollo/client'
import { PAGES_COUNT } from '../../utils/slugs';
export const GET_PAGES_URI = gql`
query GET_PAGES_URI {
    pages: pages( first: ${PAGES_COUNT}){
        nodes {
            id
            uri
        }
    }
}
`;