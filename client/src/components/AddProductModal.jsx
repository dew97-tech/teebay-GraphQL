import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { Multiselect } from 'multiselect-react-dropdown';
import { ADD_PRODUCT } from './mutations/ProductMutation';
import { GET_PRODUCTS_BY_CLIENT_ID } from './queries/getProductByClientQuery';

const AddProductModal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [categories, setCategories] = useState([
        'Electronics',
        'Sporting Goods',
        'Gadget',
        'Furniture',
    ]);
    // const { client_id } = useParams();

    const [image_url, setImageUrl] = useState('');
    const [is_available, setIsAvailable] = useState('');
    const [client_id, setClientId] = useState(0);

    // const handleCategoryChange = (event) => {
    //     const selectedOptions = event.target.selectedOptions
    //         ? Array.from(event.target.selectedOptions, (option) => option.value)
    //         : [];
    //     setCategory(selectedOptions);
    // };
    // console.log(category);

    const [addProduct] = useMutation(ADD_PRODUCT, {
        refetchQueries: [
            {
                query: GET_PRODUCTS_BY_CLIENT_ID,
                variables: { client_id },
            },
        ],
    });

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(
        //     title,
        //     description,
        //     price,
        //     categories,
        //     image_url,
        //     is_available,
        //     client_id
        // );
        if (
            title === '' ||
            description === '' ||
            price === '' ||
            categories === '' ||
            image_url === '' ||
            is_available === '' ||
            client_id === ''
        ) {
            return alert('Please Fill Up All Fields');
        }

        // await addProduct(
        //     title,
        //     description,
        //     price,
        //     categories,
        //     image_url,
        //     is_available,
        //     client_id
        // );

        addProduct({
            variables: {
                title: title,
                description: description,
                price: price,
                categories: categories.map((category) => ({
                    name: category,
                })),
                image_url: image_url,
                is_available: is_available,
                client_id: client_id,
            },
        });

        setTitle('');
        setDescription('');
        setPrice(0.0);
        setCategories([]);
        setImageUrl('');
        setIsAvailable(false);
        setClientId(0);
    };
    return (
        <>
            <button
                type="button"
                className="btn btn-primary btn-lg mt-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Add Product <FaPlus />
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
                                            setPrice(e.target.value)
                                        }
                                    />
                                </div>
                                {/* Categories */}
                                <div className="mb-3">
                                    <Multiselect
                                        isObject={false}
                                        options={categories}
                                        onRemove={(event) => {
                                            console.log(event);
                                        }}
                                        onSelect={(event) => {
                                            console.log(event);
                                        }}
                                        showCheckbox
                                    />
                                </div>
                                {/* ImageURL */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="imageUrl">
                                        Product ImageURL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        value={image_url}
                                        onChange={(e) =>
                                            setImageUrl(e.target.value)
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
                                {/* client_id */}
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="clientId">
                                        Owner Client ID
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="client_id"
                                        value={client_id}
                                        onChange={(e) =>
                                            setClientId(e.target.value)
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
        </>
    );
};

export default AddProductModal;
