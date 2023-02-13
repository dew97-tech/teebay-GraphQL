import { gql } from '@apollo/client';

const GET_PRODUCTS_BY_PRODUCT_ID = gql`
    query Product($prod_id: ID!) {
        product(prod_id: $prod_id) {
            prod_id
            title
            description
            price
            is_available
            client {
                client_id
                name
                email
                phone
            }
        }
    }
`;

export { GET_PRODUCTS_BY_PRODUCT_ID };
