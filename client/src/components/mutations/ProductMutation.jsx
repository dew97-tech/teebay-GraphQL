import { gql } from '@apollo/client';

const ADD_PRODUCT = gql`
    mutation addProduct(
        $title: String!
        $description: String!
        $price: Float!
        $categories: [String]!
        $image_url: String!
        $is_available: String!
        $client_id: ID!
    ) {
        addProduct(
            title: $title
            description: $description
            price: $price
            categories: $categories
            image_url: $image_url
            is_available: $is_available
            client_id: $client_id
        ) {
            title
            description
            price
            categories
            image_url
            is_available
            client_id
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation deleteProduct($prod_id: ID!) {
        deleteProduct(prod_id: $prod_id) {
            prod_id
            title
            description
            price
        }
    }
`;

export { DELETE_PRODUCT, ADD_PRODUCT };
