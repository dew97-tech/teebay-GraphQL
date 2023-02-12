import { gql } from '@apollo/client';

const GET_PRODUCTS_BY_CLIENT_ID = gql`
    query ProductsByClientID($client_id: ID!) {
        productsByClientID(client_id: $client_id) {
            prod_id
            title
            description
            price
            categories
            image_url
            is_available
            client_id
            client {
                client_id
                name
                email
                phone
            }
        }
    }
`;

export { GET_PRODUCTS_BY_CLIENT_ID };
