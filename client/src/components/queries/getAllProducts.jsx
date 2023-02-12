import { gql } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
    {
        products {
            title
            description
            price
            categories
            image_url
            is_available
            client_id
            client {
                name
                email
            }
        }
    }
`;

export { GET_ALL_PRODUCTS };
