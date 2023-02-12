import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password)
    }
`;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { data }] = useMutation(REGISTER_MUTATION, {
        variables: { email, password },
    });

    return (
        <form
            className="form-group border p-5"
            onSubmit={(e) => {
                e.preventDefault();
                register();
            }}>
            <input
                className="form-control mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="form-control mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
                Register
            </button>
        </form>
    );
};

export default Register;
