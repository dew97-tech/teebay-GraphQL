import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './styles/Welcome.css';
import DeleteProduct from './DeleteProduct';
import { GET_PRODUCTS_BY_CLIENT_ID } from './queries/getProductByClientQuery';
import AddProductModal from './AddProductModal';

const Welcome = () => {
    const { client_id } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CLIENT_ID, {
        variables: { client_id },
    });
    if (loading)
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (error) return <p>Something went wrong.</p>;
    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                    Welcome to Teebay
                </h1>
            </div>
            <h4 style={{ textAlign: 'center' }}>Your Listed Products</h4>

            <div className="products-grid">
                {data.productsByClientID.map((product) => (
                    <div key={product.prod_id} className="product-item">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p style={{ fontWeight: 'bold' }}>
                            Price: {product.price} $
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                            Categories: [{product.categories}]
                        </p>
                        <p>Owner: {product.client.name}</p>
                        <p style={{ fontWeight: 'bold' }}>
                            Owner Email: {product.client.email}
                        </p>
                        <p>Owner Phone: {product.client.phone}</p>

                        <DeleteProduct
                            key={product.prod_id}
                            product={product}
                        />
                    </div>
                ))}
                <div>
                    <AddProductModal />
                </div>
            </div>
        </>
    );
};

export default Welcome;
