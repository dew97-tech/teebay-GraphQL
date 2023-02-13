import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_CLIENTS = gql`
    query getClients {
        clients {
            client_id
            name
            phone
            email
        }
    }
`;

const Login = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [logedIn, setLogedIn] = useState(false);
    const [client_id, setClient_ID] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (logedIn) {
            navigate(`/welcome/${client_id}`);
        }
    }, [logedIn, client_id, navigate]);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = data.clients.map((QueryData) => {
            const queryEmail = QueryData.email;
            const queryPhone = QueryData.phone;
            if (queryEmail === email && queryPhone === phone) {
                console.log('Log In Success');
                setClient_ID(QueryData.client_id);
                setLogedIn(true);
            }
        });
    };

    if (error) return <p>Something Went Wrong</p>;
    return (
        <>
            {logedIn && navigate(`/welcome/${client_id}`)}
            {!logedIn && !loading && !error && (
                <div className="d-flex justify-content-center align-items-center h-100 mt-5">
                    <form
                        className="bg-light p-5 rounded shadow"
                        onSubmit={handleSubmit}>
                        <h1 className="text-primary text-center mb-5">LOGIN</h1>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                required
                            />
                            <label htmlFor="password">Phone</label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mt-4">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Login;
