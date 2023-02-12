import React from 'react';
import { useQuery } from '@apollo/client';
import './styles/Homepage.css';
import { GET_ALL_PRODUCTS } from './queries/getAllProducts';

function Homepage() {
    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <h3>Something Went Wrong</h3>;
    }

    return (
        <div className="container mt-4 px-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {data &&
                    data.products.map((product) => {
                        return (
                            <div className="col" key={product.title}>
                                <div className="card h-100 border-0">
                                    <img
                                        src="https://i.imgur.com/3VTaSeb.png"
                                        className="card-img-top"
                                        alt={product.title}
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {product.title}
                                        </h4>
                                        <p className="card-text">
                                            {product.description}
                                        </p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Price
                                            <span>{product.price} $</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Listed By
                                            <span>{product.client.name}</span>
                                        </li>
                                    </ul>
                                    <div className="card-overlay"></div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Homepage;
