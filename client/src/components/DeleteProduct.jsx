import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from './mutations/ProductMutation';
import { GET_PRODUCTS_BY_CLIENT_ID } from './queries/getProductByClientQuery';

const DeleteProduct = ({ product }) => {
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        variables: { prod_id: product.prod_id },
        refetchQueries: [
            {
                query: GET_PRODUCTS_BY_CLIENT_ID,
                variables: { client_id: product.client.client_id },
            },
        ],
    });
    const handleDelete = async () => {
        await deleteProduct();
    };
    return (
        <div>
            <button className="btn btn-danger btn-lg" onClick={handleDelete}>
                Delete Product <FaTrash />
            </button>
        </div>
    );
};

export default DeleteProduct;
