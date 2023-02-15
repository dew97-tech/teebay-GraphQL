import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT } from './mutations/ProductMutation';
import { GET_PRODUCTS_BY_CLIENT_ID } from './queries/getProductByClientQuery';
import { GET_PRODUCTS_BY_PRODUCT_ID } from './queries/getProductByProdID';

const UpdateProduct = ({ productID, client_id }) => {
    const [prod_id, setProdId] = useState(productID);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [is_available, setIsAvailable] = useState('');

    // First Fetch Product By {$id}
    const { error, data } = useQuery(GET_PRODUCTS_BY_PRODUCT_ID, {
        variables: { prod_id: productID },
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [
            {
                query: GET_PRODUCTS_BY_CLIENT_ID,
                variables: { client_id: client_id },
            },
        ],
    });
    useEffect(() => {
        if (data && data.product) {
            setProdId(data.product.prod_id);
            setTitle(data.product.title);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setIsAvailable(data.product.is_available);
        }
    }, [data]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            title === '' ||
            description === '' ||
            price === '' ||
            is_available === ''
        ) {
            return alert('Please Fill Up All Fields');
        }

        const parsedPrice = price === '' ? 0 : parseFloat(price);
        if (isNaN(parsedPrice)) {
            return alert('Invalid price');
        }

        updateProduct({
            variables: {
                prod_id: prod_id,
                title: title,
                description: description,
                price: price,
                is_available: is_available,
            },
        });
    };

    if (error) return <p>Something went wrong.</p>;

    return (
        <div>
            <button
                className="btn btn-warning btn-lg mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Update Product <FaEdit />
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel">
                                Add Product Details
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                {/* Prod_ID */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="title">
                                        Product ID
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="prod_id"
                                        value={prod_id}
                                        onChange={(e) =>
                                            setProdId(e.target.value)
                                        }
                                    />
                                </div>
                                {/* Title */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="title">
                                        Product Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                {/* Description */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="description">
                                        Product Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                                {/* Price */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="price">
                                        Product Price
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        className="form-control"
                                        id="price"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(parseFloat(e.target.value))
                                        }
                                    />
                                </div>
                                {/* isAvailabe */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="isAvailable">
                                        Product isAvailable
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="is_available"
                                        value={is_available}
                                        onChange={(e) =>
                                            setIsAvailable(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-secondary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
