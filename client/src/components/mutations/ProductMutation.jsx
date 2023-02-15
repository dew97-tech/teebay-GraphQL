import { gql } from '@apollo/client';

const ADD_PRODUCT = gql`
    mutation AddProduct(
        $title: String!
        $description: String!
        $price: Float!
        $categories: [String]
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
            client {
                client_id
                name
                phone
                email
            }
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
        $prod_id: ID!
        $title: String!
        $description: String!
        $price: Float!
        $is_available: String!
    ) {
        updateProduct(
            prod_id: $prod_id
            title: $title
            description: $description
            price: $price
            is_available: $is_available
        ) {
            prod_id
            title
            description
            price
            is_available
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

export { DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT };
